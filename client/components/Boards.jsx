import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router';
import { getRequest, deleteRequest } from './webRequests';
import { ViewBoard } from './Modal';
import { baseURL } from '../src/global.js';
import { useSearch } from './SearchContext.jsx';

const Cards = forwardRef((_, ref) => {
  const { searchQuery, selectedCategory } = useSearch();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await getRequest(`${baseURL}/boards`);
      setBoards(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching boards:", err);
      setError("Failed to load boards");
      setLoading(false);
    }
  };


  const handleBoardCreated = (newBoard) => {
    setBoards(prevBoards => [...prevBoards, newBoard]);
  };


  useImperativeHandle(ref, () => ({
    handleBoardCreated
  }));

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedBoard(null);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const success = await deleteRequest(`${baseURL}/board/${boardId}`);

      if (success) {
        setBoards(prevBoards => prevBoards.filter(board => board.board_id !== boardId));
      } else {
        console.error("Failed to delete board");
      }
    } catch (err) {
      console.error("Error deleting board:", err);
    }
  };

  const filteredBoards = boards.filter(board => {
    if (!board || !board.title) return false;

    // Filter by search query
    const matchesSearch = searchQuery === '' ||
      board.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory = selectedCategory === 'All' ||
      (selectedCategory === 'Recent' ? true : board.category === selectedCategory);

    if (selectedCategory === 'Recent') {
      return matchesSearch;
    }

    return matchesSearch && matchesCategory;
  });


  const finalFilteredBoards = selectedCategory === 'Recent'
    ? filteredBoards.slice(0, 5)
    : filteredBoards;

  if (loading) return <div>Loading boards...</div>;
  if (error) return <div>{error}</div>;
  if (boards.length === 0) return <div className="no-boards">No boards found. Create a new board to get started!</div>;
  if (finalFilteredBoards.length === 0) {
    if (searchQuery) {
      return <div className="no-boards">No boards match your search criteria. Try a different search term or category.</div>;
    } else {
      return <div className="no-boards">No boards found in the "{selectedCategory}" category.</div>;
    }
  }


  return (
    <>
      <div className="card-container">
        {finalFilteredBoards.map((board) => (
          <div className="card" key={board.board_id || `board-${Math.random()}`}>
            <img src={`https://picsum.photos/${board.board_id + 200}`} alt="Board thumbnail" />
            <div className="card-info">
              <h2>{board.title}</h2>
              <h3>{board.category}</h3>
              {board.author && <p>By: {board.author}</p>}
            </div>

            <div className="card-buttons">
              <Link to={`/board/${board.board_id}`} className="cardButton-container">
                <button className="cardButton">View Board</button>
              </Link>
              <button className="cardButton"
                onClick={() => handleDeleteBoard(board.board_id)}
              >
                Delete Board
              </button>
            </div>
          </div>
        ))}
      </div>

      {showViewModal && selectedBoard && (
        <ViewBoard
          board={selectedBoard}
          onClose={handleCloseViewModal}
        />
      )}
    </>
  );
});

export default Cards;

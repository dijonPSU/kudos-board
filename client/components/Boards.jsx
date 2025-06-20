import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { getRequest, deleteRequest } from './webRequests';
import { ViewBoard } from './Modal';
import { useSearch } from './SearchContext.jsx';

const Cards = forwardRef((_, ref) => {
  const { searchQuery } = useSearch();
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
      const data = await getRequest("http://localhost:3000/");
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

  const handleViewBoard = (boardId) => {
    const board = boards.find(b => b.board_id === boardId);
    if (board) {
      setSelectedBoard(board);
      setShowViewModal(true);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedBoard(null);
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const success = await deleteRequest(`http://localhost:3000/board/${boardId}`);

      if (success) {
        setBoards(prevBoards => prevBoards.filter(board => board.board_id !== boardId));
      } else {
        console.error("Failed to delete board");
      }
    } catch (err) {
      console.error("Error deleting board:", err);
    }
  };

  const filteredBoards = boards.filter(board =>
    board &&
    board.title &&
    (searchQuery === '' || board.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div>Loading boards...</div>;
  if (error) return <div>{error}</div>;
  if (boards.length === 0 || filteredBoards.length === 0) return <div className="no-boards">No boards found. Create a new board to get started!</div>;


  return (
    <>
      <div className="card-container">
        {filteredBoards.map((board) => (
          <div className="card" key={board.board_id || `board-${Math.random()}`}>
            <img src="https://picsum.photos/200/" alt="Board thumbnail" />
            <div className="card-info">
              <h2>{board.title}</h2>
              <h3>{board.category}</h3>
              {board.author && <p>By: {board.author}</p>}
            </div>

            <div className="card-buttons">
              <button
                className="cardButton"
                onClick={() => handleViewBoard(board.board_id)}
              >
                View Board
              </button>
              <button
                className="cardButton"
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

import { React, useEffect, useState } from 'react';
import getCards from './webRequests';

const Cards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await getCards("http://localhost:3000/");
        setBoards(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching boards:", err);
        setError("Failed to load boards");
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  const handleViewBoard = (boardId) => {
    console.log(`Viewing board with ID: ${boardId}`);

  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(`http://localhost:3000/board/${boardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBoards(boards.filter(board => board.board_id !== boardId));
      } else {
        console.error("Failed to delete board");
      }
    } catch (err) {
      console.error("Error deleting board:", err);
    }
  };

  if (loading) return <div>Loading boards...</div>;
  if (error) return <div>{error}</div>;
  if (boards.length === 0) return <div>No boards found</div>;

  return (
    <div className="card-container">
      {boards.map((board) => (
        <div className="card" key={board.board_id}>
          <img src="https://picsum.photos/200/" alt="Board thumbnail" />
          <div className="card-info">
            <h2>{board.title}</h2>
            <h3>{board.category}</h3>
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
  );
}


export default Cards;

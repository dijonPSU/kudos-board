import React from 'react';

const Category = ({ onCreateBoardClick }) => {
  return (
    <div className='categories'>
      <button>All</button>
      <button>Recent</button>
      <button>Celebration</button>
      <button>Thank You</button>
      <button>Inspiration</button>
      <button onClick={onCreateBoardClick}>Create a New Board</button>
    </div>
  );
};

export default Category;

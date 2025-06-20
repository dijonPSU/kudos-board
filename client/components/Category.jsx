import React from 'react';
import { useSearch } from './SearchContext.jsx';
import './Category.css';

const Category = ({ onCreateBoardClick }) => {
  const { selectedCategory, updateCategory } = useSearch();

  const handleCategoryClick = (category) => {
    updateCategory(category);
  };

  return (
    <div className='categories'>
      <button
        className={selectedCategory === 'All' ? 'active' : ''}
        onClick={() => handleCategoryClick('All')}
      >
        All
      </button>
      <button
        className={selectedCategory === 'Recent' ? 'active' : ''}
        onClick={() => handleCategoryClick('Recent')}
      >
        Recent
      </button>
      <button
        className={selectedCategory === 'Celebration' ? 'active' : ''}
        onClick={() => handleCategoryClick('Celebration')}
      >
        Celebration
      </button>
      <button
        className={selectedCategory === 'Thank You' ? 'active' : ''}
        onClick={() => handleCategoryClick('Thank You')}
      >
        Thank You
      </button>
      <button
        className={selectedCategory === 'Inspiration' ? 'active' : ''}
        onClick={() => handleCategoryClick('Inspiration')}
      >
        Inspiration
      </button>
      <button
        className="create-board"
        onClick={onCreateBoardClick}
      >
        Create a New Board
      </button>
    </div>
  );
};

export default Category;

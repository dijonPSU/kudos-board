import React from 'react';
import Search from './Search';
import Category from './Category';

const Header = ({ onCreateBoardClick }) => {
  return (
    <header>
      <div className="banner">
        <img src="./src/assets/react.svg" alt="react-logo" />
        <h1>Kudos Board</h1>
      </div>

      <Search />
      <Category onCreateBoardClick={onCreateBoardClick} />
    </header>
  );
};

export default Header;

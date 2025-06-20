import React from 'react';
import Search from './Search';
import Category from './Category';
import ThemeToggle from './ThemeToggle';

const Header = ({ onCreateBoardClick }) => {
  return (
    <header>
      <div className="banner">
        <img src="./src/assets/react.svg" alt="react-logo" />
        <h1>Kudos Board</h1>
        <ThemeToggle />
      </div>

      <Search />
      <Category onCreateBoardClick={onCreateBoardClick} />
    </header>
  );
};

export default Header;

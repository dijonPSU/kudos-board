import React from 'react';
import Search from './Search';
import Category from './Category';
import ThemeToggle from './ThemeToggle';

const Header = ({ onCreateBoardClick }) => {
  return (
    <header>
      <div className="banner">
        <h1>Kudos Board</h1>
        <ThemeToggle />
      </div>

      <Search />
      <Category onCreateBoardClick={onCreateBoardClick} />
    </header>
  );
};

export default Header;

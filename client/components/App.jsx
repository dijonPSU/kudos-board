import React, { useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from '../components/Header'
import Cards from "./Boards"
import BoardDetails from './BoardDetails'
import Footer from "../components/Footer"
import { CreateBoard } from './Modal'
import { SearchProvider } from './SearchContext.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const cardsRef = useRef();
  const location = useLocation();
  const isViewingBoard = location.pathname.startsWith('/board/');

  const handleCreateBoardClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };


  const handleAddBoard = (newBoard) => {
    if (cardsRef.current && cardsRef.current.handleBoardCreated) {
      cardsRef.current.handleBoardCreated(newBoard);
    } else {
      console.log('handleBoardCreated not available:', newBoard);
    }
  };

  return (
    <ThemeProvider>
      <SearchProvider>
        <div className={`App ${isViewingBoard ? 'full-page-view' : ''}`}>
          {!isViewingBoard && <Header onCreateBoardClick={handleCreateBoardClick} />}

          <Routes>
            <Route path="/" element={<Cards ref={cardsRef} />} />
            <Route path="/board/:boardId" element={<BoardDetails />} />
          </Routes>

          {!isViewingBoard && <Footer />}

          {showCreateModal && (
            <CreateBoard
              onClose={handleCloseModal}
              onBoardCreated={handleAddBoard}
            />
          )}
        </div>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default App;

import React, { useState, useRef } from 'react'
import './App.css'
import Header from '../components/Header'
import Cards from "./Boards"
import Footer from "../components/Footer"
import { CreateBoard } from './Modal'
import { SearchProvider } from './SearchContext.jsx'

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const cardsRef = useRef();

  const handleCreateBoardClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  // This function will be passed to the CreateBoard modal
  const handleAddBoard = (newBoard) => {
    // We'll manually update the boards state in the Cards component
    if (cardsRef.current && cardsRef.current.handleBoardCreated) {
      cardsRef.current.handleBoardCreated(newBoard);
    } else {
      console.log('Cards ref or handleBoardCreated not available:', newBoard);
    }
  };

  return (
    <SearchProvider>
      <div className="App">
        <Header onCreateBoardClick={handleCreateBoardClick} />
        <Cards ref={cardsRef} />
        <Footer />

        {showCreateModal && (
          <CreateBoard
            onClose={handleCloseModal}
            onBoardCreated={handleAddBoard}
          />
        )}
      </div>
    </SearchProvider>
  )
}

export default App;

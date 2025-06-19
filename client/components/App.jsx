import { useState } from 'react'
import './App.css'
import Header from '../components/Header'
import Cards from "./Boards"
import Footer from "../components/Footer"



function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Cards />
        <Footer />
      </div>
    </>
  )
}

export default App;

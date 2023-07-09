import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}
  from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'

function App() {

  return (
    <Router>
      <Navbar />
      <Home />
    </Router>
  )
}

export default App

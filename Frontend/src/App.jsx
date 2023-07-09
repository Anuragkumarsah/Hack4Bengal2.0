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

function App() {

  return (
    <Router>
      <Navbar />
    </Router>
  )
}

export default App

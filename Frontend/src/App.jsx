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
import Cancer from './pages/Prediction/Cancer'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/prediction/cancer" element={<Cancer />} />
      </Routes>
    </Router>
  )
}

export default App

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
import Cancer from './pages/Prediction/Cancer'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/prediction/cancer" element={<Cancer />} />
      </Routes>
    </Router>
  )
}

export default App

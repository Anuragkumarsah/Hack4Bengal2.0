import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cancer from "./pages/Prediction/Cancer";
import Chat from "./components/Chat/Chat";
import Braintumer from "./pages/Prediction/Braintumer";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prediction/cancer" element={<Cancer />} />
        <Route path="/prediction/brain-tumor" element={<Braintumer />} />
        <Route path="/general/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

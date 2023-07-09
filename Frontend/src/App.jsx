import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Adeno from "./pages/Prediction/Adeno";
import Chat from "./components/Chat/Chat";
import Braintumer from "./pages/Prediction/Braintumer";
import Login from "./pages/Login/Login";
import Pneumonia from "./pages/Prediction/Pneumonia";
import Cancer from "./pages/Prediction/Cancer";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Appointment from "./pages/Appointment/Appointment";
import DoctorLogin from "./pages/Doctor/DoctorLogin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prediction/adeno" element={<Adeno />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/prediction/brain-tumor" element={<Braintumer />} />
        <Route path="/prediction/pneumonia" element={<Pneumonia />} />
        <Route path="/prediction/cancer" element={<Cancer />} />
        <Route path="/general/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointment" element={<Appointment/>} />
        <Route path="/doctor/login" element={<DoctorLogin/>} />
        {/* <Route path="/doctor/signup" element={<DoctorSignup/>} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

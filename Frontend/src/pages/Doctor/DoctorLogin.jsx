import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Doctor/DoctorLogin.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import docLoginImage from '../../assets/Images/DoctorLogin.png'

import { doctorLoginRoute } from "../../Utils/APIRoutes";

const DoctorLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        if (username.length < 3) {
            toast.error("Username must be of at least 3 characters");
            return false;
        } else if (password.length < 0) {
            toast.error("Password must be of at least 10 characters");
            return false;
        }
        return true;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        } else {
            try {
                const res = await axios.post(doctorLoginRoute, {
                    username,
                    password,
                });
                if (res.data.success) {
                    localStorage.setItem("doctor_ai_userID", res.data.user);
                    localStorage.setItem("doctor_ai_isDoc", "1");
                    toast.success(res.data.message);
                    // Navigate to the profile page
                    navigate("/doctor/dashboard");
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                //   if (
                //     error.response &&
                //     error.response.data &&
                //     error.response.data.error === "Incorrect password"
                //   ) {
                //     toast.error("Incorrect password!");
                //   } else if (
                //     error.response &&
                //     error.response.data &&
                //     error.response.data.error === "User not found"
                //   ) {
                //     toast.error("Incorrect username password");
                //   } else {
                //     // If the login request encounters an error, show an error toast message
                //     toast.error("An error occurred while logging in.");
                //   }
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="left-section">
                <img
                    className="image"
                    // src="./Image/doctors.gif"
                    src={docLoginImage}
                    alt="Image"
                />
            </div>
            <div className="right-section">
                <h1>
                    Login to <span>DOCTOR.AI</span>
                </h1>
                <form action="POST">
                    <div className="name-number">
                        <label className="label">
                            Username
                            <input
                                type="text"
                                value={username}
                                name="username"
                                className="form-input input"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="label">
                            Password
                            <input
                                type="password"
                                name="password"
                                className="form-input input"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="*****"
                            />
                        </label>
                    </div>
                    <div className="form-footer">
                        <button
                            type="button"
                            className="action_btn"
                            onClick={handleSubmitForm}
                        >
                            Login
                        </button>
                    </div>
                    <p className="already-account">
                        Don't have an account? <Link to="/doctor/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default DoctorLogin;

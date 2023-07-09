import React, { useEffect, useState } from "react";
import LoginImg from '../../assets/Images/Login_page_image.png'
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'
import { Link, useNavigate} from "react-router-dom";
import '../Login/Login.css'
import { userLoginRoute } from "../../Utils/APIRoutes";

const Login = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("doctor_ai_userID");
        if (userId) {
            navigate("/");
        }
    });

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
        console.log("Btn triggred");
        if (!validateForm()) {
            return;
        } else {
            try {
                const res = await axios.post(userLoginRoute, {
                    username,
                    password,
                });
                localStorage.setItem("doctor_ai_userID", res.data.user);
                localStorage.setItem("doctor_ai_isDoc", "0");
                // If the login request is successful, show a success toast message
                toast.success("User logged in successfully!");
                window.location.href="/"
            } catch (error) {
                console.log(error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error === "Incorrect password"
                ) {
                    toast.error("Incorrect password!");
                } else if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error === "User not found"
                ) {
                    toast.error("Incorrect username password");
                } else {
                    // If the login request encounters an error, show an error toast message
                    toast.error("An error occurred while logging in.");
                }
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="left-section">
                <img
                    className="image"
                    src={LoginImg}
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
                            Login <FontAwesomeIcon icon={faRightToBracket} />
                        </button>
                    </div>
                    <p className="already-account">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

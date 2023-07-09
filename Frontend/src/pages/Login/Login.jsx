import React from 'react'
import LoginImg from '../../assets/Images/Login_page_image.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import '../Login/Login.css'

const Login = () => {
    return (
        <div className="signup-page">
            <div className="left-section">
                <img
                    className="image"
                    // src="./Image/doctors.gif"
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
                                // value={username}
                                name="username"
                                className="form-input input"
                                placeholder="Username"
                                // onChange={(e) => setUsername(e.target.value)}
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
                            // onClick={handleSubmitForm}
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

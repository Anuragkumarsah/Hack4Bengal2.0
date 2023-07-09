import React from 'react'
import '../Signup/Signup.css'
import SignupImg from '../../assets/Images/Signup_page_image.png'
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="signup-page">
            <div className="left-section">
                <img
                    className="image"
                    src={SignupImg}
                    alt="Image"
                />
            </div>
            <div className="right-section">
                <h1>Create Your Account</h1>
                <form>
                    <div className="name-number">
                        <label className="label">
                            Username
                            <input
                                type="text"
                                // value={username}
                                name="username"
                                className="form-input input"
                                required // Make username required
                                // onChange={handleChange}
                            />
                        </label>
                        <label className="label">
                            Phone Number
                            <input
                                type="text"
                                // value={phoneNumber}
                                name="phoneNumber"
                                className="form-input input"
                                // onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="name-number">
                        <label className="label">
                            Gender
                            <select
                                // value={gender}
                                name="gender"
                                className="form-input input"
                                // onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </label>
                        <label className="label">
                            Age
                            <input
                                type="date"
                                // value={dob}
                                name="dob"
                                className="form-input input"
                                // onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label className="label">
                        Email
                        <input
                            // value={email}
                            type="email"
                            name="email"
                            className="form-input input"
                            required // Make email required
                            // onChange={handleChange}
                        />
                    </label>
                    <div className="name-number">
                        <label className="label">
                            Password
                            <input
                                type="password"
                                // value={password}
                                name="password"
                                className="form-input input"
                                required // Make password required
                                // onChange={handleChange}
                            />
                        </label>
                        <label className="label">
                            Confirm Password
                            <input
                                type="password"
                                // value={confirmPassword}
                                name="confirmPassword"
                                className="form-input input"
                                // onChange={handleChange}
                            />
                        </label>
                    </div>

                        <span className="password-requirements">
                            <ul className="password-errors">
                            </ul>
                        </span>


                    {/* <span className="password-requirements">
                            Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, #, $, %, ^, &, *).
                        </span> */}
                    <div className="form-footer">
                        <button
                            type="button"
                            className="action_btn"
                            // onClick={handleSubmitForm}
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="already-account">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup
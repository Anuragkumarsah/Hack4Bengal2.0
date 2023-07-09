import React from 'react'
import '../Signup/Signup.css'
import SignupImg from '../../assets/Images/Signup_page_image.png'
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios'
import { userSignupRoute } from '../../Utils/APIRoutes';

const Signup = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordErrors, setPasswordErrors] = useState([]);


    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem("doctor_ai_userID");
        if (userId) {
            navigate("/");
        }
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === "password") {
            const { value } = e.target;
            const passwordRequirements = [
                {
                    regex: /[A-Z]/,
                    message: "Password must contain at least one uppercase letter.",
                },
                {
                    regex: /[a-z]/,
                    message: "Password must contain at least one lowercase letter.",
                },
                { regex: /\d/, message: "Password must contain at least one digit." },
                {
                    regex: /[@#$%^&*]/,
                    message:
                        "Password must contain at least one special character (@, #, $, %, ^, &, *).",
                },
                {
                    regex: /.{8,}/,
                    message: "Password must be at least 8 characters long.",
                },
            ];

            const passwordValidationErrors = passwordRequirements
                .filter((requirement) => !requirement.regex.test(value))
                .map((requirement) => requirement.message);

            setPasswordErrors(passwordValidationErrors);
        }
    };

    const {
        username,
        email,
        phoneNumber,
        gender,
        dob,
        password,
        confirmPassword,
    } = state;

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
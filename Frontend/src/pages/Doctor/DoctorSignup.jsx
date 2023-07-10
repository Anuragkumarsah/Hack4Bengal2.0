import React, { useState, useEffect } from "react";
import "../Doctor/DoctorLogin.css";
import bcrypt from "bcryptjs";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DoctorSignupImage from "../../assets/Images/Doctors_signup.png"
import { doctorSignupRoute } from "../../Utils/APIRoutes";

const DoctorSignup = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
        specialization: [],
    });
    const [passwordErrors, setPasswordErrors] = useState([]);

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

    const convertSpecializations = (specializations) => {
        const trimmedSpecializations = specializations.trim();
        const splitSpecializations = trimmedSpecializations
            .split(",")
            .filter((spec) => spec.trim() !== "");
        return splitSpecializations;
    };

    const {
        username,
        email,
        phoneNumber,
        gender,
        dob,
        password,
        confirmPassword,
        specialization,
    } = state;

    const validateForm = () => {
        if (phoneNumber.length < 10) {
            toast.error("Phone Number must be at least 10 characters long.");
            return false;
        }
        if (username.length < 3) {
            toast.error("Username must be at least 3 characters long.");
            return false;
        }
        if (email.trim() === "") {
            toast.error("Please enter an email.");
            return false;
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter.');
            return false;
        }
        if (!/[a-z]/.test(password)) {
            toast.error('Password must contain at least one lowercase letter.');
            return false;
        }
        if (!/\d/.test(password)) {
            toast.error('Password must contain at least one digit.');
            return false;
        }
        if (!/[@#$%^&*]/.test(password)) {
            toast.error('Password must contain at least one special character (@, #, $, %, ^, &, *).');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleSubmitForm = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const specializationArray = convertSpecializations(specialization);
            await axios
                .post(doctorSignupRoute, {
                    username,
                    email,
                    phoneNumber,
                    gender,
                    dob,
                    password: hashedPassword,
                    specialization: specializationArray,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    // Additional actions or redirection can be performed here
                    toast.success("Doctor created successfully!");
                    setTimeout(() => {
                        window.location.href="/doctor/login"
                    }, 2000);
                })
                .catch((error) => {
                    // Error message for existing email
                    console.error("Error while sending signup request:", error);
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error === "Email already exists"
                    ) {
                        toast.error("Email already exists. Please use a different email.");
                    }
                    // Error message for existing username
                    else if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error === "Username already exists"
                    ) {
                        toast.error(
                            "Username already exists. Please use a different username."
                        );
                    } else {
                        toast.error("An error occurred while signing up.");
                    }
                });
        } catch (error) {
            console.error("Error while sending signup request:", error);
            toast.error("An error occurred while signing up.");
        }
    };

    return (
        <div className="signup-page">
            <div className="left-section">
                <img className="image" src={DoctorSignupImage} alt="Doc Image" />
            </div>
            <div className="right-section">
                <h1>Enter Doctor Details</h1>
                <form>
                    <div className="name-number">
                        <label className="label">
                            Username
                            <input
                                type="text"
                                value={username}
                                name="username"
                                className="form-input input"
                                required // Make username required
                                onChange={handleChange}
                            />
                        </label>
                        <label className="label">
                            Phone Number
                            <input
                                type="text"
                                value={phoneNumber}
                                name="phoneNumber"
                                className="form-input input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="name-number">
                        <label className="label">
                            Gender
                            <select
                                value={gender}
                                name="gender"
                                className="form-input input"
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label className="label">
                            Age
                            <input
                                type="date"
                                value={dob}
                                name="dob"
                                className="form-input input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label className="label">
                        Email
                        <input
                            value={email}
                            type="email"
                            name="email"
                            className="form-input input"
                            required // Make email required
                            onChange={handleChange}
                        />
                    </label>
                    <div className="name-number">
                        <label className="label">
                            Password
                            <input
                                type="password"
                                value={password}
                                name="password"
                                className="form-input input"
                                required // Make password required
                                onChange={handleChange}
                            />
                        </label>
                        <label className="label">
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
                                className="form-input input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    {passwordErrors.length > 0 && (
                        <span className="password-requirements">
                            <ul className="password-errors">
                                {passwordErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </span>
                    )}
                    <div>
                        <label className="label">
                            Specialization{" "}
                            <span className="doc_span">(Enter coma separated)</span>
                            <input
                                type="text"
                                value={specialization}
                                name="specialization"
                                className="form-input input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-footer">
                        <button
                            type="button"
                            className="action_btn"
                            onClick={handleSubmitForm}
                        >
                            Create
                        </button>
                    </div>
                </form>
                <p className="already-account">
                    Already have an account? <Link to="/doctor/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default () => (
    <>
        <ToastContainer position="bottom-right" theme="colored" />
        <DoctorSignup />
    </>
);

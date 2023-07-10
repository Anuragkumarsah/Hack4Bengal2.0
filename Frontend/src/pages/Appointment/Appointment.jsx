import React, { useEffect } from "react";
import { useRef, useState } from "react";
import TimeSlot from "../../components/Timeslot/Timeslot";
// import DoctorDetails from "../components/DoctorDetails";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import doctorDetails from "../assets/json-data/doctorDetails.json";
import "../Appointment/Appointment.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorDetailsRoute, appointmentRoute, getUserDataRoute} from '../../Utils/APIRoutes'
import profileImage from "../../assets/Images/profile.png"
import doctorImage from "../../assets/Images/doctor.png"

const Appointment = () => {
    const dateInputRef = useRef(null);
    const [time, setTime] = useState(null);
    const [userID, setUserID] = useState("");
    const [doctorID, setDoctorID] = useState(null);
    const [userData, setUserData] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();
    console.log(location.state);
    const [about, setAbout] = useState(location.state !== null ? location.state.about : "");

    const calculateAge = (dateString) => {
        const birthDate = new Date(dateString);
        const currentDate = new Date();

        const age = currentDate.getFullYear() - birthDate.getFullYear();

        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            return age - 1;
        }

        return age;
    };
    const getDateofbirth = (dateString) => {
        const formattedDate = dateString.slice(0, 10);
        return formattedDate;
    };
    const handleDoctorClick = (doctor) => {
        console.log("Doctor: " + doctor);
        setDoctorID(doctor);
    };
    useEffect(() => {
        const isDoc = localStorage.getItem("doctor_ai_isDoc");
        if (isDoc == "1") {
            navigate("/login");
            return;
        }
        fetchDoctorData();
        const userId = localStorage.getItem("doctor_ai_userID");
        if (userId) {
            setUserID(userId);
            fetchUserData(userId);
        } else {
            navigate("/login"); // Redirect to the login page if user is not logged in
        }
    }, []);

    const fetchDoctorData = async () => {
        try {
            const doctors = await axios.get(doctorDetailsRoute);
            console.log(doctors.data);
            setDoctorDetails(doctors.data);
        } catch (error) {
            // toast.error(error);
            console.log(error);
        }
    };

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(getUserDataRoute(userId));
            const data = await response.json();
            if (response.ok) {
                setUserData(data.user);
                toast.success("Successfully fetched user data.");
            } else {
                toast.error("Error retrieving user data"); // Display toast error
                console.error("Error retrieving user data:", data.error);
            }
        } catch (error) {
            toast.error("Error retrieving user data"); // Display toast error
            console.error("Error retrieving user data:", error);
        }
    };


    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log("Appointment button clicked");

        if (!doctorID) {
            toast.error("Doctor is a required field");
            return;
        }
        if (!time || !dateInputRef.current.value) {
            toast.error("Time and Date are required fields");
            return;
        }

        try {
            const response = await axios.post(appointmentRoute, {
                doctorId: doctorID,
                clientId: userID,
                timeOfAppointment: time,
                dateOfAppointment: dateInputRef.current.value,
                about: about,
            });

            if (response.status === 200) {
                toast.success("Appointment booked successfully");
                navigate("/profile");
            } else {
                toast.error("Failed to book appointment");
            }
        } catch (error) {
            console.log("Error", error);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="appointment_container">
            <h1 className="main_heading">Make Appointment</h1>
            <div className="top__section">
                {userData && (
                    <div className="user_container">
                        <img src={profileImage} alt="image" />
                        <h2>
                            {userData.username} <br />{" "}
                            <span className="user_dob">
                                DOB: {getDateofbirth(userData.dob)}
                            </span>
                        </h2>
                    </div>
                )}
                <button onClick={handleSubmit}>Confirm Appointment</button>
            </div>
            <hr />
            <div className="book_time_container">
                <p>Select The Date And Time Of Appointment As Per Your Need</p>
                <div className="book_time">
                    <label htmlFor="date-input">Select a date:</label>
                    <input
                        ref={dateInputRef}
                        type="date"
                        id="date-input"
                        name="date-input"
                        pattern="\d{1,2}/\d{1,2}/\d{4}"
                        placeholder="dd/mm/yyyy"
                        required
                    />
                    <TimeSlot setTime={setTime} time={time} />
                    {/* <hr/> */}
                    <label htmlFor="about-input">About: </label>
                    <textarea id="about-input" type="text" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                </div>
            </div>
            <hr />
            <div>
                <div className="card-container">
                    {doctorDetails &&
                        doctorDetails.map((item, idx) => (
                            <div
                                className="col-sm-6 col-md-6 col-lg-3 doctorContainer"
                                key={idx}
                                onClick={() => handleDoctorClick(item._id)}
                            >
                                <div
                                    className={`card p-3 mb-4 shadow ${doctorID === item._id ? "selected" : ""
                                        }`}
                                >
                                    <div className="d-flex justify-content-between mb-4">
                                        <div className="user-info">
                                            <div className="user-info__img">
                                                <img
                                                    src={doctorImage}
                                                    alt="doctor Img"
                                                    width="30"
                                                />
                                            </div>
                                            <div className="user-info__basic">
                                                <h5 className="mb-0">{item.username}</h5>
                                                <p className="text-muted mb-0">
                                                    {calculateAge(item.dob)} yrs, {item.gender}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="select-item">
                                            {doctorID === item._id ? "Selected" : "Select"}
                                        </div>
                                    </div>
                                    <h6 className="mb-0">
                                        <i className="fa-solid fa-phone fa-bounce fa-margin"></i>{" "}
                                        {item.phoneNumber}
                                    </h6>
                                    <div className="specialization">
                                        <i className="fa-solid fa-stethoscope fa-margin"></i>
                                        <div className="specialization-container">
                                            {item.specialization.map((sp, index) => (
                                                <small key={index} className="specialization-item">{sp}</small>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Appointment;


import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Doctor/DoctorLogin.css";
import axios from "axios";
import { getUserDataRoute } from '../../Utils/APIRoutes'
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faStethoscope,
    faCalendarDays,
    faClock,
    faEllipsisVertical,
    faTrashCan,
    faPenToSquare,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import profileImage from '../../assets/Images/doctor.png'
import userProfileImage from "../../assets/Images/profile.png"
import { getDoctorDetailsRoute, appointmentDetails } from "../../Utils/APIRoutes";

export default function DoctorDashboard() {
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const isDoc = localStorage.getItem("doctor_ai_isDoc");
        // console.log("isDoc: " + isDoc);
        if (isDoc != "1") {
            navigate("/profile");
            return;
        }
        const userId = localStorage.getItem("doctor_ai_userID");
        if (userId) {
            fetchDoctorData(userId);
        } else {
            navigate("/doctor/login"); // Redirect to the login page if user is not logged in
        }
    }, [navigate]);

    const fetchDoctorData = async (userId) => {
        try {
            const response = await axios.get(
                getDoctorDetailsRoute(userId)
            );
            setUserData(response.data);
            // console.log(response.data);
            response.data.schedule.map((s) => fetchAppointmentDetails(s));
            toast.success("Successfully fetched user data.");
        } catch (error) {
            toast.error("Error retrieving user data"); // Display toast error
            console.error("Error retrieving user data:", error);
        }
    };

    const handleEdit = () => {
        setIsEditMode(true);
        setEditedData({
            username: userData.username,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender,
            dob: userData.dob,
        });
    };

    const handleSave = async () => {
        try {
            // Perform save operation or API call with editedData
            const response = await fetch(
                `https://doctorai-392406.uw.r.appspot.com/user/${userData._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editedData),
                }
            );

            if (response.ok) {
                // Update the userData state and exit edit mode
                setUserData(editedData);
                setIsEditMode(false);
                toast.success("Data saved successfully"); // Display toast success message
            } else {
                console.error("Error saving user data:", response.statusText);
            }
        } catch (error) {
            if (
                (error.response &&
                    error.response.data &&
                    error.response.data.error === "User not found") ||
                error.response.data.error === "Internal server error"
            ) {
                toast.error("Cannot update user Details!");
            } else {
                console.error("Error saving user data:", error);
            }
        }
    };

    const fetchAppointmentDetails = async (appointmentId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                appointmentDetails(appointmentId)
            );
            const appointment = response.data.appointment;
            const clientId = appointment.clientId;
            const clientDetails = await axios.get(
                getUserDataRoute(clientId)
            );
            const client = clientDetails.data;
            console.log(client)
            setSchedule((prev) => {
                let isAlreadyScheduled = false;
                prev.forEach((item) =>
                    item._id == appointment._id ? (isAlreadyScheduled = true) : null
                );
                if (!isAlreadyScheduled) {
                    return [...prev, { ...appointment, client: client.user }];
                }
                return prev;
            });
            setIsLoading(false);
        } catch (error) { }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // console.log(schedule)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        const day = date.getDate();
        let suffix = "th";

        if (day === 1 || day === 21 || day === 31) {
            suffix = "st";
        } else if (day === 2 || day === 22) {
            suffix = "nd";
        } else if (day === 3 || day === 23) {
            suffix = "rd";
        }

        return `${day}${suffix} ${formattedDate}`;
    };

    // console.log(schedule);

    return (
        <div className="profile-main">
            <aside className="profile-left-panel">
                <div className="pbtn active profile">
                    <img src={profileImage} alt="profile" />
                    <div className="name">
                        <p>
                            {isEditMode
                                ? editedData?.username
                                : userData?.username || "Your name"}
                        </p>
                    </div>
                </div>
                {/* <div className="pbtn">Schedules</div> */}
            </aside>
            <section className="profile-right-pannel">
                <div className="right-container">
                    <div className="personal-info">
                        <h2>My Details</h2>
                        <p>Personal Information</p>
                        <hr />
                        <div className="personal-info-container">
                            <div className="personal-info-text">
                                <p>
                                    Assertively utilize adaptive customer service for future-proof
                                    platforms. Completely drive optimal markets.
                                </p>
                            </div>
                            <div className="personal-field">
                                <div className="personal-info-field">
                                    <input
                                        type="text"
                                        className="username"
                                        name="username"
                                        placeholder="Username"
                                        value={
                                            isEditMode
                                                ? editedData?.username
                                                : userData?.username || ""
                                        }
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                    <input
                                        type="text"
                                        className="phonenumber"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={
                                            isEditMode
                                                ? editedData?.phoneNumber
                                                : userData?.phoneNumber || ""
                                        }
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                    <input
                                        type={isEditMode ? "date" : "text"}
                                        className="dob"
                                        name="dob"
                                        placeholder="age"
                                        value={
                                            isEditMode
                                                ? editedData?.dob
                                                : calculateAge(userData?.dob) || ""
                                        }
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                    <input
                                        type="text"
                                        className="gender"
                                        name="gender"
                                        placeholder="Gender"
                                        value={
                                            isEditMode ? editedData?.gender : userData?.gender || ""
                                        }
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                    <input
                                        type="email"
                                        className="email"
                                        name="email"
                                        placeholder="Email"
                                        value={
                                            isEditMode ? editedData?.email : userData?.email || ""
                                        }
                                        onChange={handleChange}
                                        disabled={!isEditMode}
                                    />
                                </div>
                                <div className="save_edit_container">
                                    {isEditMode ? (
                                        <button onClick={handleSave} className="save_edit">
                                            <FontAwesomeIcon
                                                className="fa-margin"
                                                icon={faFloppyDisk}
                                            />
                                            Save
                                        </button>
                                    ) : (
                                        <button onClick={handleEdit} className="save_edit">
                                            <FontAwesomeIcon
                                                className="fa-margin"
                                                icon={faPenToSquare}
                                            />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-info">
                        <h2>My Schedules</h2>
                        <p>Meeting Information</p>
                        <hr />
                        {isLoading ? (
                            <div className="d-flex justify-content-center text-primary">
                                <div
                                    className="spinner-border"
                                    style={{ width: "3rem", height: "3rem" }}
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : schedule.length === 0 ? (
                            <h3>
                                {" "}
                                <span className="profile_span">No </span>upcoming appointments
                                scheduled at the moment.
                            </h3>
                        ) : (
                            <div className="row">
                                {schedule &&
                                    schedule.map((item, idx) => (
                                        <div className="col-sm-6 col-md-6 col-lg-4" key={idx}>
                                            <div className="card bg-white p-3 mb-4 shadow">
                                                <div className="d-flex justify-content-between mb-4">
                                                    <div className="user-info">
                                                        <div className="user-info__img">
                                                            <img
                                                                src={userProfileImage}
                                                                alt="profile Img"
                                                                width="30"
                                                            />
                                                        </div>
                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0">{item.client.username}</h5>
                                                            <p className="text-muted mb-0">
                                                                {calculateAge(item.client.dob)} yrs,{" "}
                                                                {item.client.gender}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h6 className="mb-0">
                                                    {" "}
                                                    <FontAwesomeIcon
                                                        className="fa-margin"
                                                        icon={faPhone}
                                                        bounce
                                                    />{" "}
                                                    {item.client.phoneNumber}
                                                </h6>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className="fa-margin"
                                                        icon={faStethoscope}
                                                    />
                                                    <small>{item.about}</small>
                                                </div>
                                                <div className="d-flex justify-content-between mt-4">
                                                    <div>
                                                        <h5 className="mb-0">
                                                            <FontAwesomeIcon
                                                                className="fa-margin"
                                                                icon={faClock}
                                                                spin
                                                            />
                                                            {item.timeOfAppointment}
                                                            <hr className="card-hr" />
                                                            <small className="ml-1">
                                                                <FontAwesomeIcon
                                                                    className="fa-margin"
                                                                    icon={faCalendarDays}
                                                                />
                                                                {formatDate(item.dateOfAppointment)}
                                                            </small>
                                                        </h5>
                                                    </div>
                                                    <Link
                                                        to={`/rooms/${item.meetingId}`}
                                                        className="text-success font-weight-bold btn join-room-btn"
                                                        style={{ width: "auto", display: "flex", alignItems: "center" }}
                                                    >
                                                        Join
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

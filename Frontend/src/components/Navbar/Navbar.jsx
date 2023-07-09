import React from 'react'
import logo from "../../assets/Images/doctorai_logo.svg"
import { Link } from "react-router-dom";
import '../Navbar/Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBarsStaggered,
    faXmark,
    faAngleUp,
    faAngleDown,
    faUser,
    faRightFromBracket,
    faBrain
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <div className="header">
            {/*--------Navbar--------*/}
            <div className="topNav">
                {/* logo */}
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="" />
                    </a>
                </div>
                {/* menu */}
                <ul className="links">
                    <li>
                        <a href="/general/chat">General</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact Us</a>
                    </li>
                </ul>
                <Link to="/login" className="action_btn">
                    Sign In
                </Link>
                <div className="profile_dropdown">
                    <button className="action_btn">
                        <FontAwesomeIcon className="fa-margin" icon={faUser} />
                        Profile
                    </button>
                    <div className="profile_dropdown_content">
                        <Link to="/profile">View Profile</Link>
                        <Link> 
                            {" "}
                            <FontAwesomeIcon
                                className="fa-margin"
                                icon={faRightFromBracket}
                            />{" "}
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            <div className="dropdown_menu" >
                <ul>
                    <li className="dropdown_links">
                        <a className="no-link">Services</a>
                    </li>
                    <li className="dropdown_links">
                        <a href="about">About</a>
                    </li>
                    <li className="dropdown_links">
                        <a href="contact">Contact Us</a>
                    </li>

                    <Link to="/login" className="action_btn">
                        Sign In
                    </Link>

                    <div className="profile_dropdown">
                        <button className="action_btn">
                            Profile
                        </button>

                        <div className="profile_dropdown_content">
                            <Link to="/profile">View Profile</Link>
                            <Link>Logout</Link>
                        </div>

                    </div>

                </ul>
            </div>
        </div>
    );
};

export default Navbar
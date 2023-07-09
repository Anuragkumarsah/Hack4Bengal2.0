import React from "react";
import "./Footer.css";
import logo from "../../assets/Images/doctorai_logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="docAI_logo">
          {/* Company Logo */}
          <img src={logo} alt="Logo" />
          <p>Empowering Healthcare through Artificial Intelligence</p>
        </div>
        <div className="content">
          <div className="social-media">
            {/* Social Media Links */}
            <label htmlFor="social_handles">Socials</label>
            <ul id="social_handles">
              <li>
                <FontAwesomeIcon className="social-icons" icon={faFacebook} />
                <a href="https://www.facebook.com">Facebook</a>
              </li>
              <li>
                <FontAwesomeIcon className="social-icons" icon={faTwitter} />
                <a href="https://www.twitter.com">Twitter</a>
              </li>
              <li>
                <FontAwesomeIcon className="social-icons" icon={faInstagram} />
                <a href="https://www.instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="product-list">
            {/* Product List */}
            <label htmlFor="Products">Products</label>
            <ul id="Products">
              <li>
                <Link className="product-link" to="/prediction/ctscan">
                  CT-Scan
                </Link>
              </li>
              <li>
                <Link className="product-link" to="/prediction/mri">
                  MRI-Scan
                </Link>
              </li>
              <li>
                <Link className="product-link" to="/prediction/xray">
                  Lungs-X-Ray
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contact">
        {/* Contact Us */}
        <p>Contact Us: contact@example.com</p>
        <div className="footer-hr"></div>
        <Link className="join-doctor" to="/doctor/signup">
          Join us as Doctor
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

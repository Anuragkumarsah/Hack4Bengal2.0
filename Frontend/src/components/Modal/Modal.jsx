import React from "react";
import "../Modal/Modal.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

// image import
import img from "../../assets/Images/modelBanner.jpg";

export default function Modal({
  show,
  onClose,
  bigText,
  smallText,
  percentage,
}) {
  return (
    <div className="modalWrapper">
      <div className="modal_custom">
        <button onClick={onClose} className="btnClose btn-close" />
        <div className="mainContainer">
          <img src={img} alt="" className="main__img" />
          <div className="textPart" align="center">
            <div className="header_modal">
              <h2
                className={`big__text ${
                  bigText === "Normal" || bigText === "Notumor"
                    ? "text_normal"
                    : "text_red"
                }`}
              >
                <span style={{ color: "#555", fontSize: "18px" }}>
                  It seem to be
                </span>
                <br />
                {bigText}
              </h2>
              {/* <CircularProgressbar
                                className="probality_bar"
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    trailColor: "#d6d6d6",
                                })}
                            /> */}
            </div>
            <p className="small__text">{smallText}</p>
            <div className="AllBtn">
              <button className="Thanks__btn btnGive" onClick={onClose}>
                No Thanks
              </button>
              <Link
                className="btnGive shop__btnGive"
                style={{ backgroundColor: "black" }}
                onClick={onClose}
                to="/appointment"
                state={{
                  about: `Paitent's disease type is expected to be: ${bigText}, with an accuracy of ${percentage}%. The reports link are given below.`,
                }}
              >
                Appointment
              </Link>
            </div>
            <p className="nointerest" onClick={onClose}></p>
          </div>
        </div>
      </div>
    </div>
  );
}

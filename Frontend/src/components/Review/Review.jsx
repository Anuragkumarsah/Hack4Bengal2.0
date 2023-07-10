import React, { useState } from "react";
import "./Review.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

// image import
import img from "../../assets/Images/RATING_POPUP.png";
import { Button } from "bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { postUserReview } from "../../Utils/APIRoutes";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function Review({ onClose, appointmentId }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [textValue, setTextValue] = useState("");
  const stars = Array(5).fill(0);

  const handleClick = async (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(postUserReview, {
        rating: currentValue,
        review: textValue,
        appointmentId: appointmentId,
      });

      if (response.status === 200) {
        // Handle successful response
        console.log("Review posted successfully!");
      } else {
        // Handle error response
        console.log("Failed to post review");
      }
      localStorage.removeItem("doctorAI_pop_up");
      window.location.reload();
    } catch (error) {
      // Handle network error
      console.log("Network error occurred:", error);
    }
  };
  return (
    <div className="modalWrapper">
      <div className="modal_custom">
        <button onClick={onClose} className="btnClose btn-close" />
        <div className="mainContainer">
          <img src={img} alt="" className="main__img" />
          <div className="textPart" align="center">
            <div className="header_modal">
              <div style={styles.container}>
                <h2> Doctor review </h2>
                <div style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>
                <textarea
                  placeholder="What's your experience?"
                  style={styles.textarea}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />
              </div>
            </div>

            <div className="AllBtn">
              <button className="Thanks__btn btnGive" onClick={onClose}>
                No Thanks
              </button>
              <button
                className="btnGive shop__btnGive"
                style={{ backgroundColor: "black" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <p className="nointerest" onClick={onClose}></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

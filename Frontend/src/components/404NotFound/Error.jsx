import React from 'react'
import "../404NotFound/Error.css";
import errorImage from "../../assets/Svg/error.svg"

const Error = () => {

    const handleNavigate = (() => {
        window.location.href = "/"
    })

    return (
        <div className="error-page">
            <img src={errorImage} alt="404 error" />
            <button onClick={handleNavigate} type="button" className="action_btn" style={{ "margin": "1rem" }}>
                Back to Home
            </button>
        </div>
    )
}

export default Error
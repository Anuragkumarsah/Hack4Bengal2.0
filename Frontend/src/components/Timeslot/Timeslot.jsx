import React, { useState } from 'react';
import timeSlots from "../../assets/json-data/timeSlots.json";
import "../Timeslot/Timeslot.css";


const TimeSlot = ({ setTime, time }) => {

    const handleTimeSlotClick = (timeSlot) => {
        setTime(timeSlot.label);
    };

    return (
        <div className="time-slot-container">
            <h2>Select a time slot:</h2>
            <div className="time-slot-list">
                {timeSlots.map((timeSlot, index) => (
                    <div
                        key={index}
                        onClick={() => handleTimeSlotClick(timeSlot)}
                        className={`time-slot ${time === timeSlot.label ? 'selected' : ''}`}
                    >
                        {timeSlot.label}
                    </div>
                ))}
            </div>
            <p>Selected time slot: <span>{time || '--:-- --'}</span></p>
        </div>
    );
};

export default TimeSlot;

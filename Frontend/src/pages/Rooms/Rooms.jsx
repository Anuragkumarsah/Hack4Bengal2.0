import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from 'axios'
import "../Rooms/Rooms.css";
import { getUserDataRoute, getDoctorDetailsRoute } from '../../Utils/APIRoutes'
import { toast } from "react-toastify";

const Rooms = () => {

    const [user, setUser] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const isDoc = localStorage.getItem('doctor_ai_isDoc');
    const userId = localStorage.getItem('doctor_ai_userID');
    const doctorId = localStorage.getItem('doctor_ai_userID');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (isDoc == '1') {
                    const response = await axios.get(getDoctorDetailsRoute(doctorId));
                    setDoctor(response.data);
                }
                else {
                    const response = await axios.get(getUserDataRoute(userId));
                    setUser(response.data);
                }

            }
            catch (error) {
                toast.error("Error in fetching user name")
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, [userId, isDoc, doctorId])

    const appID = parseInt(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_APP_SERVER_SECRET;
    const { roomId } = useParams();
    const myMeeting = async (element) => {
        const userName = isDoc === '1' ? doctor?.username : user?.user?.username;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            userName //userName goes here
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <div className="room-page">
            <div ref={myMeeting} style={{ height: "100%" }} />
        </div>
    );
};

export default Rooms;

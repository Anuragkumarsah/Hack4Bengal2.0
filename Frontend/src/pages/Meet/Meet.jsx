import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Meet/Meet.css'

const Meet = () => {

    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    console.log((parseInt(import.meta.env.VITE_APP_ID)));
    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/rooms/${roomCode}` )
    }

    return (
        <div className='meet-container home-page' >
            <h2>Meetings</h2>
            <form onSubmit={handleFormSubmit} className='form'>
                <div>
                    <label htmlFor="">Enter Room Code </label>
                    <input value={roomCode} onChange={ e => setRoomCode(e.target.value)} type="text" required  placeholder='enter room code'/>
                </div>
                <button>Enter Room</button>
            </form>
        </div>
    )
}

export default Meet
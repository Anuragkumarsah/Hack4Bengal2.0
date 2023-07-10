import React from 'react'
import "../ContactUs/Contact.css"

const Contact = () => {
    return (
        <div class="signup-page">
            <div class="left-section">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.021548500945!2d88.39316062548166!3d22.54086553413242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276a208cb6793%3A0x676bbf22d04354e8!2sScience%20City%2CKolkata!5e0!3m2!1sen!2sin!4v1688450737670!5m2!1sen!2sin" width="600" height="450" style={{ marginLeft: '1.5rem' }} allowFullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="right-section">
                <h1>Contact Us</h1>
                <form action="https://formspree.io/f/xeqbjbwq"
                    method="POST">
                    <label className="label">
                        Username
                        <input
                            type="text"
                            name="username"
                            class="form-input input"
                            required
                        />
                    </label>
                    <label className="label">
                        Email
                        <input
                            type="email"
                            name="email"
                            class="form-input input"
                            required
                        />
                    </label>
                    <label className='label'>
                        <textarea className='text-area' name="message" id="" cols="60" rows="10">
                            Type your message
                        </textarea>
                    </label>
                    <div class="form-footer">
                        <button type="submit" class="action_btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact
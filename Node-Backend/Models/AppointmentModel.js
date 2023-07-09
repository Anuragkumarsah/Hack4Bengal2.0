const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: String,
    clientId: String,
    meetingId: String,
    timeOfAppointment: String,
    dateOfAppointment: Date,
    about: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
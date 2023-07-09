const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    gender: String,
    dob: Date,
    password: String,
    schedule: [String],
});

// Create the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
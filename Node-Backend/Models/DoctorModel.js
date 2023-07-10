const mongoose = require("mongoose");

// Create a doctor schema
const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: [String],
    required: true,
  },
  schedule: {
    type: [String],
  },
  feedback: {
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: [String],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
});

// Create a doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

// Export the doctor model
module.exports = Doctor;

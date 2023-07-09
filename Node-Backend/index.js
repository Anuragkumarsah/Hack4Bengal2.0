const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB = process.env.VITE_APP_MONGO_SERVER;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Error in connecting to server", error);
    })

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});


// Start the server
const port = 3001; // Choose any port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
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

    const User = require("./Models/UsersModel")

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body); // Logging the entire request body

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });

        if (!user) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Invalid password
            return res.status(401).json({ error: "Incorrect password" });
        }
        // Password is valid, user is authenticated
        // Send a success response
        res
            .status(200)
            .json({ message: "User logged in successfully", user: user._id });
    } catch (err) {
        // Handle any errors that occurred during the login process
        console.error("Error while logging in:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/signup", async (req, res) => {
    const { username, email, phoneNumber, gender, dob, password } = req.body;
    console.log(req.body); // Logging the entire request body

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        const existingUserName = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        if (existingUserName) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Create a new user document
        const newUser = new User({
            username,
            email,
            phoneNumber,
            gender,
            dob,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        // Handle any errors that occurred during saving
        console.error("Error while saving user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Start the server
const port = 3001; // Choose any port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
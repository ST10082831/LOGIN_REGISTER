const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs");
const fs = require('fs'); 
const https = require('https');
const UserModel = require('./models/User')
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://st10082068:yFTZOzGaZTsRaq7r@cluster0.70zzob1.mongodb.net/");

// Load your SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('keys/privatekey.pem'), 
    cert: fs.readFileSync('keys/certificate.pem'), 
};

const generateAccountNumber = () => {
    // Generate a random 10-digit account number (or any format you prefer)
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
}


app.post('/register', async (req, res) => {
    const { name, surname, email, password, confirmPassword, id } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
    }
    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a unique account number
        let accountNumber;
        let accountNumberExists = true;

        // Ensure the generated account number is unique
        while (accountNumberExists) {
            accountNumber = generateAccountNumber();
            const existingAccount = await UserModel.findOne({ accountNumber });
            accountNumberExists = !!existingAccount;
        }

        // Create and save the user
        const user = new UserModel({
            name,
            surname,
            email,
            password: hashedPassword,
            id,
            accountNumber
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.json("SUCCESS");
            } else {
                return res.status(400).json("Incorrect password");
            }
        } else {
            return res.status(400).json("User does not exist");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create HTTPS server
/*http.createserver(sslOptions, app).listen(3000, () => {
    console.log("HTTPS server is running on port 3000!");
});*/

app.listen(3000, () => {
    console.log("server is running!")
});
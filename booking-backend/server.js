require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root Route (Fixes "Cannot GET /" Error)
app.get("/", (req, res) => {
    res.send("Welcome to the Booking API! Use /book-now to submit a request.");
});

// Route to handle form submission
app.post("/book-now", async (req, res) => {
    const { fullName, contactNumber, emailAddress, eventDescription } = req.body;

    if (!fullName || !contactNumber || !emailAddress || !eventDescription) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "New Booking Inquiry!",
            text: `
                Full Name: ${fullName}
                Contact Number: ${contactNumber}
                Email Address: ${emailAddress}
                Event Description: ${eventDescription}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Booking request submitted successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

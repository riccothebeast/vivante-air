const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        // Bearer token handling
        const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
        const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Create Booking (Contact Form Submission)
router.post('/', verifyToken, async (req, res) => {
    try {
        const {
            firstName, lastName, email, phone,
            date, returnDate, aircraft, passengers,
            serviceType, message
        } = req.body;

        const newBooking = new Booking({
            user: req.user.id,
            firstName,
            lastName,
            email,
            phone,
            date,
            returnDate, // optional
            aircraft,
            passengers,
            serviceType,
            message
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// Get Bookings
router.get('/', verifyToken, async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'admin') {
            // Admin sees all bookings, sorted by newest
            bookings = await Booking.find().populate('user', 'email').sort({ createdAt: -1 });
        } else {
            // User sees own bookings
            bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
        }
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

module.exports = router;

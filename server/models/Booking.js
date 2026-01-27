const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { // contact email might differ from account email
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: { // Departure Date
        type: Date,
        required: true
    },
    returnDate: {
        type: Date
    },
    aircraft: {
        type: String,
    },
    passengers: {
        type: Number,
        required: true,
        min: 1
    },
    serviceType: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Cancelled']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);

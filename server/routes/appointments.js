// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointment'); // Import the Appointment model

// Change the endpoint to /book
router.post('/book', async (req, res) => {
  console.log("HI");
    const { name, email, date, time, reason,phone } = req.body;
    
    try {
        const newAppointment = new Appointment({ name, email, date, time, reason,phone });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book appointment' });
    }
});

module.exports = router;

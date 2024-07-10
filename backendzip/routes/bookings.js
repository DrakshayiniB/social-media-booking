const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');

router.post('/', async (req, res) => {
  try {
    const { cinemaId, movieId, seatIds } = req.body;

    // Check if seats are available
    const seats = await Seat.find({ _id: { $in: seatIds }, status: 'available' });
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ message: 'One or more seats are not available' });
    }

    // Create booking
    const booking = new Booking({ cinemaId, movieId, seatIds });
    await booking.save();

    // Update seat status
    await Seat.updateMany(
      { _id: { $in: seatIds } },
      { $set: { status: 'booked' } }
    );

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
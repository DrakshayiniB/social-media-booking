const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');


// get all seats
router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find({ movieId: req.query.movieId });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a seats
router.post('/', async (req, res) => {
  const seat = new Seat({
    movieId: req.body.movieId,
    seatNumber: req.body.seatNumber,
    seatType: req.body.seatType,
    price: req.body.price,
    status: req.body.status,
    number:req.body.number

    });
    try {
      const newSeat = await seat.save();
      res.status(201).json(newSeat);
      } catch (err) {
        res.status(400).json({ message: err.message });
        }
        }
      );


      // get a seat
      // router.get('/:id', getSeat, (req, res) => {
      //   res.json(res.seat);
      //   });




module.exports = router;
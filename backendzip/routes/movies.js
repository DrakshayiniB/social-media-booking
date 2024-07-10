const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');


// get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({ cinemaId: req.query.cinemaId });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// create a movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    duration: req.body.duration,
    genre: req.body.genre,
    cinemaId: req.body.cinemaId
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
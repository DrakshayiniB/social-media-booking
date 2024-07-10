const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');


//get all cinema
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create cinema

router.post('/', async (req, res) => {
  const cinema = new Cinema({
    name: req.body.name,
    location: req.body.location
  });

  try {
    const newCinema = await cinema.save();
    res.status(201).json(newCinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//get cinema by id
// router.get('/:id', getCinema, (req, res) => {
//   res.json(res.cinema);
//   });
//   //update cinema by id
//   router.patch('/:id', getCinema, async (req, res) => {
//     if (req.body.name != null) {
//       res.cinema.name = req.body.name;
//       }
//       if (req.body.location != null) {
//         res.cinema.location = req.body.location;
//         }
//         try {
//           const updatedCinema = await res.cinema.save();
//           res.json(updatedCinema);
//           } catch (err) {
//             res.status(400).json({ message: err.message });
//             }
//             });


//  //delete cinema by id
//             router.delete('/:id', getCinema, async (req, res) => {
//               try {
//                 await res.cinema.remove();
//                 res.json({ message: 'Deleted cinema' });
//                 } catch (err) {
//                   res.status(500).json({ message: err.message });
//                   }
//                   });
                  


module.exports = router;
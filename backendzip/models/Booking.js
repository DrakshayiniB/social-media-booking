const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  cinemaId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Cinema',
      required: true 
    },
  movieId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Movie',
      required: true
     },
  seatIds: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Seat' }],
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model('Booking', bookingSchema);
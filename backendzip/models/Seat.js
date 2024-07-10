const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: {
     type: String,
      required: true
     },
     seatType:{
      type: String,
      required: true
     },
     price:{
      type: Number,
      required: true
      },
  status: { 
     type: String,
     enum: ['available', 'booked','reserved'],
     required:true
      },
  movieId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Movie',
      required: true },
});

module.exports = mongoose.model('Seat', seatSchema);
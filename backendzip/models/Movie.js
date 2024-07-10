const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
     type: String,
     required: true
     },
  duration: { 
    type: Number, 
    required: true 
},
  genre: { 
    type: String,
     required: true },
  cinemaId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Cinema', 
     equired: true 
    },
});

module.exports = mongoose.model('Movie', movieSchema);
const mongoose = require('mongoose');

const buyHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill this field"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please fill this field"],
  },
  price: {
    type: Number,
    required: [true, "Please fill this field"],
    maxLength: [8, "Price can't exceed 8 digits."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }], // Define the media field

});

module.exports = mongoose.model('BuyHome', buyHomeSchema);
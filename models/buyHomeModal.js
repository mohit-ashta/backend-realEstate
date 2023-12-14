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
  bedroom: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 0,
  },
  floor: {
    type: Number,
    default: 0,
  },
  renovation: {
    type: String,
    default: 0,
  },
  constructionYear: {
    type: Number,
    default: 0,
  },
  garage: {
    type: String,
    default: 0,
  },
  furnishing: {
    type: String,
    default: 0,
  },
  media: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media'
  }], // Define the media field

});

module.exports = mongoose.model('BuyHome', buyHomeSchema);
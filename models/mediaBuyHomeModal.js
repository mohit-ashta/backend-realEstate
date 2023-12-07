const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['image', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif','image/avif', 'video'],
    required: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BuyHome',
    required: true,
  },
});

module.exports = mongoose.model('Media', mediaSchema);
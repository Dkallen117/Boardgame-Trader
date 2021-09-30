const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    max: [250, 'Description can only be 250 characters.']  
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: [1, 'Must have at least one to sell.']
  },
  available: {
    type: Boolean,
    default: true,
  },
  genre: {
    type: String,
    required: false,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  }
});

const Listing = model('Listing', userSchema);

module.exports = Listing;
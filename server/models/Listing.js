const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxLength: [250, 'Description can only be 250 characters.']  
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
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
    required: true,
  },
  img: {
    type: String,
    default: 'https://img.favpng.com/2/21/19/green-currency-dollar-symbol-font-png-favpng-C6VptbApxPTf0ws4hxyxtErCR.jpg'
  }
}, {
    timestamps: true,
});

const Listing = model('Listing', userSchema);

module.exports = Listing;
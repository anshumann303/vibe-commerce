const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    default: 1
  }
});

const cartSchema = mongoose.Schema({
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
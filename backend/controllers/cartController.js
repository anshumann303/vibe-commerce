const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { products } = require('./productController');

// Global cart variable for simplicity (in a real app, this would be stored in a database per user)
let currentCart = {
  items: [],
  totalPrice: 0
};

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    // Return cart items in frontend format
    res.json(currentCart.items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Handle both frontend format (string IDs like "1", "2") and backend format ("product-1", "product-2")
    let mockIndex;
    if (productId.startsWith('product-')) {
      mockIndex = parseInt(productId.split('-')[1]) - 1;
    } else {
      mockIndex = parseInt(productId) - 1;
    }
    
    // Get mock product data
    if (mockIndex >= 0 && mockIndex < products.length) {
      const productToAdd = {
        id: productId,
        ...products[mockIndex]
      };
      
      // Check if item already exists in cart
      const existingItemIndex = currentCart.items.findIndex(
        item => item.productId === productId
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        currentCart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart - use frontend format
        currentCart.items.push({
          productId,
          quantity
        });
      }
      
      res.json({ message: 'Item added to cart', cart: currentCart });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Filter out the item to remove
    currentCart.items = currentCart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );
    
    // Recalculate total price
    currentCart.totalPrice = currentCart.items.reduce(
      (total, item) => total + item.price * item.qty, 0
    );
    
    res.json(currentCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};
const Product = require('../models/Product');

// Mock products data
const products = [
  {
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1648447265709-67a4e785d7e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzJTIwd2lyZWxlc3MlMjB0ZWNobm9sb2d5fGVufDB8Mnx8fDE3NjE3Njk2MTF8MA&ixlib=rb-4.1.0&q=85',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life'
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1697490057407-34c996cab84f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxzbWFydHdhdGNoJTIwZml0bmVzcyUyMHdlYXJhYmxlfGVufDB8Mnx8fDE3NjE3Njk2MTF8MA&ixlib=rb-4.1.0&q=85',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS'
  },
  {
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1645106281638-79585657aa4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHNwb3J0c3xlbnwwfDJ8fHwxNzYxNzY5NjExfDA&ixlib=rb-4.1.0&q=85',
    description: 'Lightweight running shoes with superior cushioning and support'
  },
  {
    name: 'Leather Backpack',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1691480250099-a63081ecfcb8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxiYWNrcGFjayUyMGxlYXRoZXIlMjBiYWd8ZW58MHwyfHx8MTc2MTc2OTYxMXww&ixlib=rb-4.1.0&q=85',
    description: 'Stylish leather backpack with laptop compartment and multiple pockets'
  },
  {
    name: 'Coffee Maker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1637029680169-8304d6a10816?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBtYWtlciUyMGFwcGxpYW5jZSUyMGtpdGNoZW58ZW58MHwyfHx8MTc2MTc2OTYxMXww&ixlib=rb-4.1.0&q=85',
    description: 'Programmable coffee maker with thermal carafe and auto-brew feature'
  }
];

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Use mock data directly for simplicity
    res.json(products.map((product, index) => ({
      id: `product-${index + 1}`,
      ...product
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Seed products to database
// @route   GET /api/products/seed
// @access  Public
const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    res.json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  seedProducts,
  products
};
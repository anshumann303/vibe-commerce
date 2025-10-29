const Product = require('../models/Product');

// Mock products data
const products = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    name: 'Smartphone',
    price: 699.99,
    image: 'https://via.placeholder.com/150',
    description: 'Latest smartphone with advanced camera and long battery life'
  },
  {
    name: 'Laptop',
    price: 1299.99,
    image: 'https://via.placeholder.com/150',
    description: 'Powerful laptop for work and gaming'
  },
  {
    name: 'Smartwatch',
    price: 249.99,
    image: 'https://via.placeholder.com/150',
    description: 'Fitness tracking smartwatch with heart rate monitor'
  },
  {
    name: 'Wireless Earbuds',
    price: 129.99,
    image: 'https://via.placeholder.com/150',
    description: 'Compact wireless earbuds with charging case'
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
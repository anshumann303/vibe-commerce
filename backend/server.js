const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
// Uncomment to connect to MongoDB
// connectDB();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Port and server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
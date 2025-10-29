const express = require('express');
const router = express.Router();
const { getProducts, seedProducts } = require('../controllers/productController');

router.route('/').get(getProducts);
router.route('/seed').get(seedProducts);

module.exports = router;
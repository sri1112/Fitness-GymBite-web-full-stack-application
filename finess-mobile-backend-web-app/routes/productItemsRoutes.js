const express = require('express');
const router = express.Router();
const controller = require('../controllers/productItemsController');

// Add or update items in a product
router.post('/', controller.addProductItems);

// Get items of a product
router.get('/:productId', controller.getProductItems);

module.exports = router;

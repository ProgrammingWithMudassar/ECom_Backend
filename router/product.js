const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload'); // Middleware for handling image uploads

// Get all products
router.get('/get-all-products', productController.getAllProducts);

// Get product by ID
router.get('/get-product-by-id/:id', productController.getProductById);

// Create new product
router.post('/add-product', upload.fields([
  { name: 'images', maxCount: 4 },
  { name: 'images360', maxCount: 36 } // Adjust maxCount based on your needs
]), productController.createProduct);

// Update product
router.put('/update-product/:id', upload.fields([
  { name: 'images', maxCount: 4 },
  { name: 'images360', maxCount: 36 } // Adjust maxCount based on your needs
]), productController.updateProduct);

// Delete product by ID
router.delete('/delete-product/:id', productController.deleteProductById);

module.exports = router;

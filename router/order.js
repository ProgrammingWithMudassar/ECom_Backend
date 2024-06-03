const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/create', orderController.createOrder);

// Cancel an order
router.post('/cancel', orderController.cancelOrder);

// Admin remove/unlist order
router.delete('/remove/:id', orderController.removeOrder);

// Get all pending orders
router.get('/pending', orderController.getPendingOrders);

module.exports = router;

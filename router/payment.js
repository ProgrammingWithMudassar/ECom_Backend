const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.post('/payment-success', paymentController.handlePaymentSuccess);

module.exports = router;

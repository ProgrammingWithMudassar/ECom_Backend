const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Forgot Password - Send OTP
router.post('/forgot-password', authController.forgotPassword);

// Reset Password - Verify OTP and Reset
router.post('/reset-password', authController.resetPassword);

module.exports = router;

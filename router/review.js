const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create new review
router.post('/add-review', reviewController.createReview);

module.exports = router;

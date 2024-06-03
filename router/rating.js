const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Create new rating
router.post('/add-rating', ratingController.createRating);

module.exports = router;

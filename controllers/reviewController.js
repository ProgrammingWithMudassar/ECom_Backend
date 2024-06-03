const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
  const { reviewText, reviewedBy, productId } = req.body;

  try {
    const newReview = new Review({
      reviewText,
      reviewedBy,
      product: productId
    });

    const savedReview = await newReview.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: savedReview._id }
    });

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

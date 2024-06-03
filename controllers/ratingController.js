const Rating = require('../models/ratingModel');
const Product = require('../models/productModel');

exports.createRating = async (req, res) => {
  const { star, comment, postedby, productId } = req.body;

  try {
    const newRating = new Rating({
      star,
      comment,
      postedby,
      product: productId
    });

    const savedRating = await newRating.save();

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.totalrating += star; // Increment totalrating
    product.ratings.push(savedRating._id);

    await product.save();

    res.status(201).json(savedRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

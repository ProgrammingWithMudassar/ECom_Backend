const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

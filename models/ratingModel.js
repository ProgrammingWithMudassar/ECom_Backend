const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  star: { type: Number, required: true },
  comment: { type: String, required: true },
  postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);

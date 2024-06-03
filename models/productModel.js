const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  images: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
  images360: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
  color: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  totalrating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  warranty: { type: String },
  returnPolicy: { type: String },
  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  weight: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Cancelled', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  deliveryTime: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

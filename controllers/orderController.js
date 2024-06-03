const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const axios = require('axios');

// Create a new order
exports.createOrder = async (req, res) => {
    const { products, userId, amount, currency } = req.body;
    const deliveryTime = new Date();
    deliveryTime.setDate(deliveryTime.getDate() + 5);

    try {
        const newOrder = new Order({
            products,
            user: userId,
            amount,
            currency,
            deliveryTime,
            status: 'Pending'
        });

        const savedOrder = await newOrder.save();

        // Initiate payment
        const paymentResponse = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
            amount,
            currency,
        });

        res.status(201).json({ order: savedOrder, paymentResponse: paymentResponse.data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get pending orders
exports.getPendingOrders = async (req, res) => {
    try {
        const pendingOrders = await Order.find({ status: 'Pending' })
            .populate('user', 'firstname lastname email')
            .populate('products.product', 'title price');

        res.status(200).json(pendingOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
    const { orderId, userId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const cancelDeadline = new Date(order.createdAt);
        cancelDeadline.setDate(cancelDeadline.getDate() + 2);

        if (new Date() > cancelDeadline) {
            return res.status(400).json({ message: 'Cancellation period has expired' });
        }

        if (order.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to cancel this order' });
        }

        const refundAmount = order.amount * 0.9;
        order.status = 'Cancelled';

        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', refundAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin remove/unlist order
exports.removeOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

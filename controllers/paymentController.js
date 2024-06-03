const stripe = require('../config/stripe');
const Order = require('../models/orderModel');

exports.createPaymentIntent = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: currency,
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.handlePaymentSuccess = async (req, res) => {
    const { orderId, paymentIntentId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const order = await Order.findById(orderId);
            order.status = 'Completed';
            await order.save();

            res.status(200).json({ message: 'Payment successful and order placed', order });
        } else {
            res.status(400).json({ message: 'Payment failed or not completed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

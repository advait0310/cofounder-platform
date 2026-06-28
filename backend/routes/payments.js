const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { amount, productName } = req.body;

    // Mock Razorpay integration
    const order = {
      id: 'order_' + Date.now(),
      amount: amount * 100,
      currency: 'INR',
      status: 'created',
      productName
    };

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/verify-payment', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    // Mock verification
    res.json({
      success: true,
      message: 'Payment verified',
      orderId,
      paymentId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

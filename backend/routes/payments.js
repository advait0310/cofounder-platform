const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/create-order', auth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Payment integration coming soon', orderId: null });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/verify', auth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Payment verified' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/orders', auth, async (req, res) => {
  try {
    res.json({ success: true, orders: [] });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

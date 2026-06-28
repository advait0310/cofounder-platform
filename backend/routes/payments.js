const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.post('/create-order', auth, async (req, res) => { res.json({ success: true, message: 'Payment coming soon' }); });
router.post('/verify', auth, async (req, res) => { res.json({ success: true, message: 'Verified' }); });
router.get('/orders', auth, async (req, res) => { res.json({ success: true, orders: [] }); });
module.exports = router;

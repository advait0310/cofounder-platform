const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { res.json({ success: true, rounds: [] }); });
router.post('/', auth, async (req, res) => { res.json({ success: true, message: 'Created' }); });
module.exports = router;

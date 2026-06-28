const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { res.json({ success: true, mentors: [] }); });
router.post('/request', auth, async (req, res) => { res.json({ success: true, message: 'Request sent' }); });
module.exports = router;

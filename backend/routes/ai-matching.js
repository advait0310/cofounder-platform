const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/suggestions', auth, async (req, res) => { try { res.json({ success: true, suggestions: [] }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
module.exports = router;

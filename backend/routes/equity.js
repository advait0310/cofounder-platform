const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    res.json({ success: true, equity: [], message: 'Equity management coming soon' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Equity agreement created' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

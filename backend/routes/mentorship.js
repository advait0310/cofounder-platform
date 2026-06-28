const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    res.json({ success: true, mentors: [], message: 'Mentorship coming soon' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/request', auth, async (req, res) => {
  try {
    res.json({ success: true, message: 'Mentorship request sent' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

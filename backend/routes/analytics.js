const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const auth = require('../middleware/auth');

router.get('/:startupId', auth, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId);
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    if (startup.owner.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });
    res.json({ success: true, analytics: startup.analytics, leads: startup.leads });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/suggestions', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const alreadySwiped = [...(currentUser.interestedIn || []), ...(currentUser.passedOn || [])];
    const filter = {
      _id: { $ne: req.user._id, $nin: alreadySwiped },
      availability: 'Active',
      isBanned: false
    };
    if (currentUser.lookingFor?.length > 0) {
      filter.primaryRole = { $in: currentUser.lookingFor };
    }
    if (currentUser.startupGoal) {
      filter.startupGoal = currentUser.startupGoal;
    }
    const suggestions = await User.find(filter)
      .select('-password -notifications -interestedIn -passedOn')
      .sort({ 'doerScore.total': -1 })
      .limit(20);
    res.json({ success: true, suggestions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

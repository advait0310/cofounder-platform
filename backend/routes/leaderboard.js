const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { type = 'builders' } = req.query;
    if (type === 'builders') {
      const users = await User.find({ isBanned: false })
        .select('name avatar primaryRole skills doerScore badges')
        .sort({ 'doerScore.total': -1 })
        .limit(50);
      return res.json({ success: true, entries: users.map((u, i) => ({ rank: i + 1, user: u, score: u.doerScore.total })) });
    }
    const teams = await Team.find({ status: 'active' })
      .populate('founder', 'name')
      .sort({ teamScore: -1 })
      .limit(50);
    res.json({ success: true, entries: teams.map((t, i) => ({ rank: i + 1, team: t, score: t.teamScore })) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

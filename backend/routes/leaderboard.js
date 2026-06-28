const express = require('express');
const User = require('../models/User');
const Team = require('../models/Team');
const Startup = require('../models/Startup');
const router = express.Router();

router.get('/top-builders', async (req, res) => {
  try {
    const builders = await User.find()
      .sort({ doerScore: -1 })
      .limit(100)
      .select('name doerScore tasksCompleted profileImage location');

    res.json(builders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/top-teams', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('members.userId', 'doerScore')
      .limit(50);

    const teamsWithScore = teams.map((team) => {
      const totalScore = team.members.reduce((sum, member) => sum + (member.userId?.doerScore || 0), 0);
      const avgScore = totalScore / team.members.length;
      return { ...team.toObject(), avgScore };
    });

    teamsWithScore.sort((a, b) => b.avgScore - a.avgScore);

    res.json(teamsWithScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rank/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const rank = await User.countDocuments({ doerScore: { $gt: user.doerScore } });

    res.json({
      rank: rank + 1,
      doerScore: user.doerScore,
      totalBuilders: await User.countDocuments()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

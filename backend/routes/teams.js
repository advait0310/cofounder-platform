const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Team = require('../models/Team');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { teamName, members } = req.body;

    const team = new Team({
      teamName,
      createdBy: req.userId,
      members: [{ userId: req.userId, role: 'Tech', isCofounder: true }, ...members]
    });

    await team.save();
    await team.populate('members.userId createdBy');
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:teamId', authMiddleware, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('members.userId createdBy');
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:teamId/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.userId);

    const team = await Team.findByIdAndUpdate(
      req.params.teamId,
      {
        $push: {
          teamChat: {
            userId: req.userId,
            userName: user.name,
            message,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [
        { createdBy: req.params.userId },
        { 'members.userId': req.params.userId }
      ]
    }).populate('members.userId createdBy');

    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const User = require('../models/User');

module.exports = router;

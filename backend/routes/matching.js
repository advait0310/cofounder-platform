const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Match = require('../models/Match');
const User = require('../models/User');
const router = express.Router();

router.post('/swipe', authMiddleware, async (req, res) => {
  try {
    const { targetUserId, action, reason } = req.body;

    let match = await Match.findOne({
      $or: [
        { userId1: req.userId, userId2: targetUserId },
        { userId1: targetUserId, userId2: req.userId }
      ]
    });

    if (!match) {
      match = new Match({
        userId1: req.userId,
        userId2: targetUserId,
        userId1Status: action,
        reason
      });
    } else {
      if (match.userId1.toString() === req.userId) {
        match.userId1Status = action;
        match.userId1SwipeDate = new Date();
      } else {
        match.userId2Status = action;
        match.userId2SwipeDate = new Date();
      }

      if ((match.userId1Status === 'like' || match.userId1Status === 'super') &&
          (match.userId2Status === 'like' || match.userId2Status === 'super')) {
        match.isMatched = true;
        match.chatUnlocked = true;
        match.matchedAt = new Date();
        match.status = 'Matched';
      }
    }

    await match.save();
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-matches', authMiddleware, async (req, res) => {
  try {
    const matches = await Match.find({
      isMatched: true,
      $or: [{ userId1: req.userId }, { userId2: req.userId }]
    }).populate('userId1 userId2');

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:matchId/assign-trial', authMiddleware, async (req, res) => {
  try {
    const { taskDescription } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.matchId,
      {
        trialTask: 'Build a feature together',
        trialDescription: taskDescription,
        trialDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      },
      { new: true }
    );

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

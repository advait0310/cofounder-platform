const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.isAdmin;
    delete updates.doerScore;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({ success: true, user, message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/swipe-candidates', authMiddleware, async (req, res) => {
  try {
    const { skills, experience } = req.query;
    
    let query = { _id: { $ne: req.userId } };

    if (skills) query.skills = { $in: skills.split(',') };
    if (experience) query.experienceLevel = experience;

    const users = await User.find(query).limit(20);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/doer-score/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('doerScore tasksCompleted weeklyConsistency');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

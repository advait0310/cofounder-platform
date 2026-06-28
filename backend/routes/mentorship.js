const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Mentor = require('../models/Mentor');
const User = require('../models/User');
const router = express.Router();

router.post('/register-mentor', authMiddleware, async (req, res) => {
  try {
    const { expertise, hourlyRate, bio } = req.body;

    const mentor = new Mentor({
      mentorId: req.userId,
      expertise,
      hourlyRate,
      bio,
      experience: 5,
      availableHours: 10
    });

    await mentor.save();

    await User.findByIdAndUpdate(req.userId, { isMentor: true });

    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('mentorId', 'name bio profileImage');
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:mentorId', async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ mentorId: req.params.mentorId }).populate('mentorId');
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:mentorId/request-mentorship', authMiddleware, async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.mentorId,
      {
        $push: {
          currentMentees: {
            menteeId: req.userId,
            startDate: new Date(),
            status: 'Active'
          }
        }
      },
      { new: true }
    );

    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

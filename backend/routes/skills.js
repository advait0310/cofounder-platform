const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const SkillCertification = require('../models/SkillCertification');
const router = express.Router();

router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { skill, verificationMethod, data } = req.body;

    const certification = new SkillCertification({
      userId: req.userId,
      skill,
      verificationMethod,
      ...data
    });

    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const certifications = await SkillCertification.find({
      userId: req.params.userId,
      verified: true
    });

    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/test/:skill', authMiddleware, async (req, res) => {
  try {
    const { skill } = req.params;
    const { answers } = req.body;

    // Simple scoring logic
    const score = Math.floor(Math.random() * 100);

    const certification = new SkillCertification({
      userId: req.userId,
      skill,
      verificationMethod: 'test',
      testScore: score,
      testDate: new Date(),
      verified: score >= 70
    });

    await certification.save();

    res.json({
      score,
      passed: score >= 70,
      certification
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

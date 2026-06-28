const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const FounderProfile = require('../models/FounderProfile');
const Match = require('../models/Match');
const router = express.Router();

const calculateCompatibilityScore = (profile1, profile2) => {
  let score = 0;

  // Skill complementarity (30%)
  const skills1 = new Set([...profile1.skillsMatrix.technical, ...profile1.skillsMatrix.business]);
  const skills2 = new Set([...profile2.skillsMatrix.technical, ...profile2.skillsMatrix.business]);
  const complementary = [...skills1].filter(s => !skills2.has(s)).length;
  score += (complementary / Math.max(skills1.size, 1)) * 30;

  // Personality compatibility (25%)
  const personalityDiff = Object.keys(profile1.traits).reduce((sum, key) => {
    return sum + Math.abs(profile1.traits[key] - profile2.traits[key]);
  }, 0);
  score += (50 - personalityDiff) / 50 * 25;

  // Work style match (20%)
  if (profile1.workStyle.remoteFirst === profile2.workStyle.remoteFirst) score += 10;
  if (profile1.workStyle.collaborationStyle === profile2.workStyle.collaborationStyle) score += 10;

  // Goal alignment (15%)
  const goalOverlap = profile1.industryPreferences.filter(
    ind => profile2.industryPreferences.includes(ind)
  ).length;
  score += (goalOverlap / Math.max(profile1.industryPreferences.length, 1)) * 15;

  // Experience balance (10%)
  if ((profile1.previousStartups > 0 && profile2.previousStartups === 0) ||
      (profile1.previousStartups === 0 && profile2.previousStartups > 0)) {
    score += 10;
  }

  return Math.min(Math.max(score, 0), 100);
};

router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const myProfile = await FounderProfile.findOne({ userId: req.userId });
    
    if (!myProfile) {
      return res.status(400).json({ error: 'Complete your profile first' });
    }

    const allProfiles = await FounderProfile.find({
      userId: { $ne: req.userId }
    }).populate('userId', 'name doerScore skills');

    const recommendations = allProfiles.map(profile => {
      const compatibilityScore = calculateCompatibilityScore(myProfile, profile);
      return {
        profile: profile,
        compatibilityScore
      };
    });

    const topRecommendations = recommendations
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 10);

    res.json(topRecommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

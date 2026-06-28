const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Task = require('../models/Task');
const Team = require('../models/Team');
const User = require('../models/User');
const router = express.Router();

const calculateMemberScore = (member, requiredSkills) => {
  let score = 0;

  const skillMatch = requiredSkills.filter(skill =>
    member.userId.skills.includes(skill)
  ).length;
  score += (skillMatch / Math.max(requiredSkills.length, 1)) * 50;

  score += (member.userId.doerScore / 100) * 30;

  if (member.userId.availability === 'Active') score += 20;

  return score;
};

router.post('/auto-assign', authMiddleware, async (req, res) => {
  try {
    const { teamId, title, description, deadline, requiredSkills, priority } = req.body;

    const team = await Team.findById(teamId).populate('members.userId');

    const memberScores = team.members.map(member => ({
      memberId: member.userId._id,
      score: calculateMemberScore(member, requiredSkills)
    }));

    const bestMatch = memberScores.sort((a, b) => b.score - a.score)[0];

    const task = new Task({
      teamId,
      title,
      description,
      assignedTo: bestMatch.memberId,
      deadline,
      priority,
      requiredSkills,
      createdBy: req.userId
    });

    await task.save();
    await task.populate('assignedTo');

    res.status(201).json({
      task,
      assignedToScore: bestMatch.score
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/find-best-match', authMiddleware, async (req, res) => {
  try {
    const { teamId, requiredSkills, priority } = req.body;

    const team = await Team.findById(teamId).populate('members.userId');

    const recommendations = team.members
      .map(member => ({
        member: member.userId,
        matchScore: calculateMemberScore(member, requiredSkills)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

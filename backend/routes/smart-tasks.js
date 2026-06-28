const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Team = require('../models/Team');
const auth = require('../middleware/auth');

router.get('/suggestions/:teamId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    const existingTasks = await Task.find({ team: req.params.teamId }).select('title');
    const suggestions = [
      'Set up project repository and folder structure',
      'Create wireframes for main screens',
      'Define MVP features list',
      'Research target audience',
      'Set up development environment',
      'Create landing page',
      'Write project documentation',
      'Set up CI/CD pipeline',
      'Define API endpoints',
      'Create database schema'
    ].filter(s => !existingTasks.find(t => t.title.toLowerCase().includes(s.toLowerCase())));
    res.json({ success: true, suggestions: suggestions.slice(0, 5) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/auto-assign/:teamId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('members.user', 'name skills primaryRole');
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    const unassignedTasks = await Task.find({ team: req.params.teamId, assignedTo: null, status: 'todo' });
    const assignments = [];
    for (const task of unassignedTasks) {
      const member = team.members[Math.floor(Math.random() * team.members.length)];
      if (member?.user) {
        await Task.findByIdAndUpdate(task._id, { assignedTo: member.user._id });
        assignments.push({ task: task.title, assignedTo: member.user.name });
      }
    }
    res.json({ success: true, assignments });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

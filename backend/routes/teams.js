const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Team name required' });
    const team = await Team.create({ name, description, founder: req.user._id, members: [{ user: req.user._id, role: 'Founder' }] });
    await User.findByIdAndUpdate(req.user._id, { currentTeam: team._id });
    res.status(201).json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/my', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ 'members.user': req.user._id, status: { $in: ['forming','active'] } })
      .populate('members.user', 'name avatar skills primaryRole doerScore')
      .populate('founder', 'name avatar')
      .populate('startup', 'name slug');
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('members.user', 'name avatar skills primaryRole doerScore')
      .populate('founder', 'name avatar');
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Not found' });
    if (team.founder.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Only founder can update' });
    const allowed = ['name','description','status'];
    allowed.forEach(f => { if (req.body[f] !== undefined) team[f] = req.body[f]; });
    await team.save();
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:id/invite', auth, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Not found' });
    if (team.founder.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Only founder can invite' });
    if (team.members.length >= team.maxMembers) return res.status(400).json({ success: false, message: 'Team is full' });
    const already = team.members.find(m => m.user.toString() === userId);
    if (already) return res.status(400).json({ success: false, message: 'Already a member' });
    team.members.push({ user: userId, role: role || 'Member' });
    await team.save();
    await User.findByIdAndUpdate(userId, { currentTeam: team._id });
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id/member/:userId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Not found' });
    const isFounder = team.founder.toString() === req.user._id.toString();
    const isSelf = req.params.userId === req.user._id.toString();
    if (!isFounder && !isSelf) return res.status(403).json({ success: false, message: 'Not authorized' });
    team.members = team.members.filter(m => m.user.toString() !== req.params.userId);
    await team.save();
    await User.findByIdAndUpdate(req.params.userId, { currentTeam: null });
    res.json({ success: true, message: 'Member removed' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/join/:code', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ inviteCode: req.params.code.toUpperCase() });
    if (!team) return res.status(404).json({ success: false, message: 'Invalid invite code' });
    if (team.members.length >= team.maxMembers) return res.status(400).json({ success: false, message: 'Team is full' });
    const already = team.members.find(m => m.user.toString() === req.user._id.toString());
    if (already) return res.status(400).json({ success: false, message: 'Already a member' });
    team.members.push({ user: req.user._id, role: req.body.role || 'Member' });
    await team.save();
    await User.findByIdAndUpdate(req.user._id, { currentTeam: team._id });
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:id/review', auth, async (req, res) => {
  try {
    const { revieweeId, workEthic, skill, communication, comment } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Not found' });
    team.reviews.push({ reviewer: req.user._id, reviewee: revieweeId, workEthic, skill, communication, comment });
    await team.save();
    res.json({ success: true, message: 'Review submitted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:id/weekly-goals', auth, async (req, res) => {
  try {
    const { goals } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Not found' });
    const now = new Date();
    team.weeklyGoals.push({ week: Math.ceil(now.getDate() / 7), year: now.getFullYear(), goals: goals.map(g => ({ text: g, completed: false })) });
    await team.save();
    res.json({ success: true, team });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

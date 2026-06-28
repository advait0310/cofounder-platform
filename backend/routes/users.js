const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { try { const { skills, goal, page = 1, limit = 20 } = req.query; const user = await User.findById(req.user._id); const alreadySwiped = [...(user.interestedIn || []), ...(user.passedOn || [])]; const filter = { _id: { $ne: req.user._id, $nin: alreadySwiped }, availability: 'Active', isBanned: false }; if (skills) filter.skills = { $in: skills.split(',') }; if (goal) filter.startupGoal = goal; const users = await User.find(filter).select('-password -notifications -interestedIn -passedOn').sort({ 'doerScore.total': -1 }).skip((page-1)*limit).limit(Number(limit)); res.json({ success: true, users, swipesLeft: user.swipesLeft }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
router.get('/:id', auth, async (req, res) => { try { const user = await User.findById(req.params.id).select('-password -notifications').populate('currentTeam', 'name'); if (!user) return res.status(404).json({ success: false, message: 'User not found' }); res.json({ success: true, user }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => { try { const user = await User.findById(req.user._id).select('notifications'); const sorted = (user.notifications || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); res.json({ success: true, notifications: sorted, unreadCount: sorted.filter(n => !n.read).length }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
router.put('/read-all', auth, async (req, res) => { try { await User.findByIdAndUpdate(req.user._id, { $set: { 'notifications.$[].read': true } }); res.json({ success: true }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
router.delete('/:id', auth, async (req, res) => { try { await User.findByIdAndUpdate(req.user._id, { $pull: { notifications: { _id: req.params.id } } }); res.json({ success: true }); } catch (err) { res.status(500).json({ success: false, message: err.message }); } });
module.exports = router;

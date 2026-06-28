const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const startup = await Startup.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, startup });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/my', auth, async (req, res) => {
  try {
    const startups = await Startup.find({ owner: req.user._id });
    res.json({ success: true, startups });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/public/:slug', async (req, res) => {
  try {
    const startup = await Startup.findOne({ slug: req.params.slug, isActive: true });
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    await Startup.findByIdAndUpdate(startup._id, { $inc: { 'analytics.totalViews': 1 } });
    res.json({ success: true, startup });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate('owner', 'name avatar')
      .populate('team', 'name');
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, startup });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    if (startup.owner.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });
    const allowed = ['name','tagline','problem','solution','targetAudience','category','stage','landingPage'];
    allowed.forEach(f => { if (req.body[f] !== undefined) startup[f] = req.body[f]; });
    await startup.save();
    res.json({ success: true, startup });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/public/:slug/lead', async (req, res) => {
  try {
    const startup = await Startup.findOne({ slug: req.params.slug });
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const exists = startup.leads.find(l => l.email === email);
    if (exists) return res.json({ success: true, message: 'Already subscribed' });
    startup.leads.push({ email, name: name || '' });
    startup.analytics.totalSignups += 1;
    await startup.save();
    res.json({ success: true, message: 'Subscribed!' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Not found' });
    if (startup.owner.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: 'Not authorized' });
    await startup.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;

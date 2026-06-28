const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Startup = require('../models/Startup');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { startupName, teamId, idea, problem, solution } = req.body;

    const startup = new Startup({
      startupName,
      teamId,
      idea,
      problem,
      solution,
      publicURL: startupName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    });

    await startup.save();
    res.status(201).json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:startupId/landing-page', authMiddleware, async (req, res) => {
  try {
    const { template, sections } = req.body;

    const startup = await Startup.findByIdAndUpdate(
      req.params.startupId,
      { template, sections, isPublished: true },
      { new: true }
    );

    res.json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:startupId/products', authMiddleware, async (req, res) => {
  try {
    const { productName, price, description } = req.body;

    const startup = await Startup.findByIdAndUpdate(
      req.params.startupId,
      { $push: { products: { productName, price, description } } },
      { new: true }
    );

    res.json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:startupId/leads', async (req, res) => {
  try {
    const { email, name } = req.body;

    const startup = await Startup.findByIdAndUpdate(
      req.params.startupId,
      {
        $push: { leads: { email, name, timestamp: new Date() } },
        $inc: { 'analytics.signups': 1 }
      },
      { new: true }
    );

    res.json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:startupId/analytics', authMiddleware, async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.startupId);
    res.json(startup.analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/public/:url', async (req, res) => {
  try {
    const startup = await Startup.findOne({ publicURL: req.params.url });
    if (!startup) return res.status(404).json({ error: 'Not found' });

    await Startup.updateOne({ _id: startup._id }, { $inc: { 'analytics.pageViews': 1 } });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

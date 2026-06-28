const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const FundingRound = require('../models/FundingRound');
const Investor = require('../models/Investor');
const router = express.Router();

router.post('/create-round', authMiddleware, async (req, res) => {
  try {
    const {
      startupId,
      round,
      targetAmount,
      equityOffered,
      valuation,
      description,
      useOfFunds
    } = req.body;

    const fundingRound = new FundingRound({
      startupId,
      round,
      targetAmount,
      equityOffered,
      valuation,
      description,
      useOfFunds
    });

    await fundingRound.save();
    res.status(201).json(fundingRound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/find-investors', authMiddleware, async (req, res) => {
  try {
    const { fundingRoundId } = req.query;
    const fundingRound = await FundingRound.findById(fundingRoundId);

    const investors = await Investor.find({
      stage: { $in: [fundingRound.round] }
    });

    const matchedInvestors = investors.map(investor => {
      let score = 0;
      if (investor.fundSize >= fundingRound.targetAmount) score += 40;
      score += 30;
      return { investor, matchScore: score };
    });

    const sorted = matchedInvestors.sort((a, b) => b.matchScore - a.matchScore);

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:roundId/invest', authMiddleware, async (req, res) => {
  try {
    const { investmentAmount, equityGiven } = req.body;

    const fundingRound = await FundingRound.findByIdAndUpdate(
      req.params.roundId,
      {
        $push: {
          investors: {
            investorId: req.userId,
            investmentAmount,
            equityGiven,
            investmentDate: new Date()
          }
        },
        $inc: { raisedAmount: investmentAmount }
      },
      { new: true }
    );

    if (fundingRound.raisedAmount >= fundingRound.targetAmount) {
      await FundingRound.updateOne({ _id: req.params.roundId }, { status: 'Closed' });
    }

    res.json(fundingRound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dashboard/:startupId', authMiddleware, async (req, res) => {
  try {
    const fundingRounds = await FundingRound.find({
      startupId: req.params.startupId
    }).populate('investors.investorId');

    const totalRaised = fundingRounds.reduce((sum, r) => sum + r.raisedAmount, 0);

    res.json({
      rounds: fundingRounds,
      totalRaised,
      investorCount: fundingRounds.reduce((sum, r) => sum + r.investors.length, 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

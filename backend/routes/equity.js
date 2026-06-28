const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const EquityAgreement = require('../models/EquityAgreement');
const Team = require('../models/Team');
const router = express.Router();

router.post('/generate-agreement', authMiddleware, async (req, res) => {
  try {
    const { teamId, equityDistribution, vestingSchedule } = req.body;

    const team = await Team.findById(teamId).populate('members.userId');

    const equityStructure = team.members.map((member, index) => ({
      memberId: member.userId._id,
      percentage: equityDistribution[index],
      vestingSchedule,
      vestingStartDate: new Date()
    }));

    const agreement = new EquityAgreement({
      teamId,
      equityStructure
    });

    await agreement.save();

    res.status(201).json(agreement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:agreementId', authMiddleware, async (req, res) => {
  try {
    const agreement = await EquityAgreement.findById(req.params.agreementId).populate('equityStructure.memberId');
    res.json(agreement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:agreementId/sign', authMiddleware, async (req, res) => {
  try {
    const agreement = await EquityAgreement.findByIdAndUpdate(
      req.params.agreementId,
      {
        $push: {
          signedBy: {
            memberId: req.userId,
            signedAt: new Date()
          }
        }
      },
      { new: true }
    );

    const team = await Team.findById(agreement.teamId);
    if (agreement.signedBy.length === team.members.length) {
      agreement.status = 'Signed';
      await agreement.save();
    }

    res.json(agreement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

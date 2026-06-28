const mongoose = require('mongoose');

const equityAgreementSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  
  equityStructure: [{
    memberId: mongoose.Schema.Types.ObjectId,
    percentage: Number,
    vestingSchedule: String,
    vestingStartDate: Date
  }],
  
  documentUrl: String,
  
  status: { type: String, enum: ['Draft', 'Signed', 'Executed'], default: 'Draft' },
  
  signedBy: [{
    memberId: mongoose.Schema.Types.ObjectId,
    signedAt: Date
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EquityAgreement', equityAgreementSchema); 

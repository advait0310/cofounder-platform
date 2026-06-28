const mongoose = require('mongoose');

const fundingRoundSchema = new mongoose.Schema({
  startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  teamId: mongoose.Schema.Types.ObjectId,
  
  round: { type: String, enum: ['Seed', 'Series A', 'Series B', 'Series C'], default: 'Seed' },
  targetAmount: Number,
  raisedAmount: { type: Number, default: 0 },
  
  description: String,
  useOfFunds: [String],
  
  equityOffered: Number,
  valuation: Number,
  
  investors: [{
    investorId: mongoose.Schema.Types.ObjectId,
    investmentAmount: Number,
    equityGiven: Number,
    investmentDate: Date
  }],
  
  documentUrl: String,
  videoUrl: String,
  
  status: { type: String, enum: ['Open', 'Closed', 'Cancelled'], default: 'Open' },
  
  startDate: Date,
  endDate: Date,
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FundingRound', fundingRoundSchema);

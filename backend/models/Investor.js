const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  company: String,
  fundSize: Number,
  
  focusAreas: [String],
  stage: [String],
  geographicFocus: [String],
  
  portfolio: [{
    startupId: mongoose.Schema.Types.ObjectId,
    investmentAmount: Number,
    equityPercentage: Number,
    investmentDate: Date,
    round: String
  }],
  
  averageDealSize: Number,
  totalInvested: Number,
  successRate: Number,
  
  profileImage: String,
  bio: String,
  websiteUrl: String,
  
  isVerified: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investor', investorSchema); 

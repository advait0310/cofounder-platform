const mongoose = require('mongoose');

const skillCertificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: String,
  
  verificationMethod: { type: String, enum: ['test', 'portfolio', 'certificate', 'peer-review'], default: 'test' },
  
  testScore: Number,
  testDate: Date,
  
  portfolioUrl: String,
  certificateUrl: String,
  
  badge: {
    name: String,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
    icon: String
  },
  
  verified: { type: Boolean, default: false },
  verifiedAt: Date,
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SkillCertification', skillCertificationSchema); 

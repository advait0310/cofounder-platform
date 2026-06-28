 const mongoose = require('mongoose');

const founderProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  traits: {
    leadership: { type: Number, min: 1, max: 10 },
    problemSolving: { type: Number, min: 1, max: 10 },
    creativity: { type: Number, min: 1, max: 10 },
    reliability: { type: Number, min: 1, max: 10 },
    communication: { type: Number, min: 1, max: 10 }
  },
  
  workStyle: {
    preferredHours: String,
    remoteFirst: Boolean,
    collaborationStyle: String
  },
  
  skillsMatrix: {
    technical: [String],
    business: [String],
    design: [String],
    marketing: [String]
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FounderProfile', founderProfileSchema);

 const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId1Status: { type: String, enum: ['like', 'skip', 'super'], default: 'skip' },
  userId2Status: { type: String, enum: ['like', 'skip', 'super'], default: 'skip' },
  userId1SwipeDate: Date,
  userId2SwipeDate: Date,
  
  reason: String,
  compatibilityScore: { type: Number, min: 0, max: 100 },
  isMatched: { type: Boolean, default: false },
  matchedAt: Date,
  chatUnlocked: { type: Boolean, default: false },
  
  trialTask: String,
  trialDescription: String,
  trialCompleted: { type: Boolean, default: false },
  trialDeadline: Date,
  trialFeedback: String,
  
  teamId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['Pending', 'Matched', 'Rejected', 'TeamFormed'], default: 'Pending' },
  
  messages: [{
    senderId: mongoose.Schema.Types.ObjectId,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

matchSchema.index({ userId1: 1, userId2: 1 });
matchSchema.index({ isMatched: 1 });

module.exports = mongoose.model('Match', matchSchema);

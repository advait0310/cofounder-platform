const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  description: String,
  icon: String,
  level: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
  criteria: String,
  unlockedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema); 

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, trim: true },
  description: String,
  logoUrl: String,
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['Tech', 'Marketing', 'Ops', 'Designer', 'Other'] },
    joinedAt: { type: Date, default: Date.now },
    isCofounder: Boolean,
    equity: Number
  }],
  
  startupId: mongoose.Schema.Types.ObjectId,
  
  teamChat: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  
  weeklyGoals: [{
    week: Number,
    goal: String,
    status: { type: String, enum: ['Active', 'Completed', 'Failed'] },
    startDate: Date,
    endDate: Date
  }],
  
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    completedAt: Date
  }],
  
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['Formation', 'Active', 'Paused', 'Dissolved'], default: 'Active' },
  teamHealth: { type: Number, min: 0, max: 100, default: 75 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

teamSchema.index({ createdBy: 1 });
teamSchema.index({ 'members.userId': 1 });

module.exports = mongoose.model('Team', teamSchema); 

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, maxlength: 1000 },
  
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedDate: { type: Date, default: Date.now },
  
  status: { type: String, enum: ['To-do', 'In progress', 'Review', 'Done', 'Blocked'], default: 'To-do' },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now }
  }],
  
  deadline: Date,
  completedAt: Date,
  daysToComplete: Number,
  
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  tags: [String],
  category: String,
  
  requiredSkills: [String],
  estimatedHours: Number,
  actualHours: Number,
  
  progressPercentage: { type: Number, min: 0, max: 100, default: 0 },
  checklist: [{
    item: String,
    completed: Boolean
  }],
  
  attachments: [{
    fileName: String,
    fileUrl: String,
    uploadedAt: Date
  }],
  
  comments: [{
    userId: mongoose.Schema.Types.ObjectId,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  
  completionQuality: { type: Number, min: 1, max: 5 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

taskSchema.index({ teamId: 1, status: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ deadline: 1 });

module.exports = mongoose.model('Task', taskSchema); 

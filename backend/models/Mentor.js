const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertise: [String],
  experience: Number,
  successfulExits: Number,
  
  menteeLimit: Number,
  currentMentees: [{
    menteeId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    status: { type: String, enum: ['Active', 'Completed'] }
  }],
  
  hourlyRate: Number,
  availableHours: Number,
  
  rating: { type: Number, default: 5, min: 1, max: 5 },
  reviews: Number,
  
  bio: String,
  profileImage: String,
  
  sessionHistory: [{
    menteeId: mongoose.Schema.Types.ObjectId,
    date: Date,
    topic: String,
    duration: Number,
    notes: String
  }],
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', mentorSchema); 

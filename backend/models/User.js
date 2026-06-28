const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  bio: { type: String, maxlength: 500 },
  profileImage: String,
  location: String,
  timezone: String,
  
  // Skills & Experience
  skills: [String],
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Beginner' },
  previousStartups: { type: Number, default: 0 },
  successRate: Number,
  hoursPerWeek: { type: Number, min: 0, max: 168 },
  portfolioLinks: [String],
  
  // Availability
  availability: { type: String, enum: ['Active', 'Busy', 'Inactive'], default: 'Active' },
  
  // Scores & Reputation
  doerScore: { type: Number, default: 50, min: 0, max: 100 },
  tasksCompleted: { type: Number, default: 0 },
  weeklyConsistency: { type: Number, default: 0 },
  teamReviews: [{
    rating: { type: Number, min: 1, max: 5 },
    reviewer: String,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  
  // Preferences
  industryPreferences: [String],
  stagePref: String,
  riskTolerance: String,
  fundingGoal: Number,
  equityExpectations: { min: Number, max: Number },
  
  // Account
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isMentor: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema); 

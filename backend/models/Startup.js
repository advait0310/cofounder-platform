const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  startupName: { type: String, required: true },
  teamId: mongoose.Schema.Types.ObjectId,
  
  idea: String,
  problem: String,
  solution: String,
  targetAudience: String,
  
  products: [{
    productName: String,
    price: Number,
    description: String,
    image: String
  }],
  
  sections: {
    hero: String,
    features: String,
    pricing: String,
    cta: String
  },
  
  publicURL: { type: String, unique: true },
  template: { type: String, default: 'minimal' },
  
  leads: [{
    email: String,
    name: String,
    timestamp: Date
  }],
  
  analytics: {
    pageViews: { type: Number, default: 0 },
    signups: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  
  paymentGateway: { type: String, enum: ['Razorpay', 'Stripe'] },
  isPublished: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Startup', startupSchema); 

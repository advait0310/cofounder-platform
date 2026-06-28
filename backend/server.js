const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
require('dotenv').config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes - Auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Routes - Users
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Routes - Matching
const matchingRoutes = require('./routes/matching');
app.use('/api/matching', matchingRoutes);

// Routes - AI Matching
const aiMatchingRoutes = require('./routes/ai-matching');
app.use('/api/ai-matching', aiMatchingRoutes);

// Routes - Teams
const teamRoutes = require('./routes/teams');
app.use('/api/teams', teamRoutes);

// Routes - Tasks
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Routes - Smart Tasks
const smartTaskRoutes = require('./routes/smart-tasks');
app.use('/api/smart-tasks', smartTaskRoutes);

// Routes - Startups
const startupRoutes = require('./routes/startups');
app.use('/api/startups', startupRoutes);

// Routes - Payments
const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);

// Routes - Leaderboard
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);

// Routes - Skills
const skillRoutes = require('./routes/skills');
app.use('/api/skills', skillRoutes);

// Routes - Funding
const fundingRoutes = require('./routes/funding');
app.use('/api/funding', fundingRoutes);

// Routes - Mentorship
const mentorshipRoutes = require('./routes/mentorship');
app.use('/api/mentorship', mentorshipRoutes);

// Routes - Equity
const equityRoutes = require('./routes/equity');
app.use('/api/equity', equityRoutes);

// Routes - Analytics
const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

// Routes - Admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Join team room
  socket.on('join_team', (teamId) => {
    socket.join(`team_${teamId}`);
    console.log(`User joined team: ${teamId}`);
  });

  // Send message
  socket.on('send_message', (data) => {
    io.to(`team_${data.teamId}`).emit('receive_message', {
      userId: data.userId,
      userName: data.userName,
      message: data.message,
      timestamp: data.timestamp
    });
  });

  // Join match room
  socket.on('join_match', (matchId) => {
    socket.join(`match_${matchId}`);
  });

  // Match notification
  socket.on('match_found', (data) => {
    io.emit('new_match', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════╗');
  console.log('║  🚀 CoBuilder Server Running      ║');
  console.log('╠════════════════════════════════════╣');
  console.log(`║  Port: ${PORT}                       ║`);
  console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}      ║`);
  console.log('║  Socket.io: Enabled                ║');
  console.log('╚════════════════════════════════════╝');
  console.log('');
});

module.exports = { app, io }; 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

app.use((req, res, next) => { req.io = io; next(); });

app.use('/api/auth',          require('./routes/auth'));
app.use('/api/users',         require('./routes/users'));
app.use('/api/matching',      require('./routes/matching'));
app.use('/api/ai-matching',   require('./routes/ai-matching'));
app.use('/api/teams',         require('./routes/teams'));
app.use('/api/tasks',         require('./routes/tasks'));
app.use('/api/smart-tasks',   require('./routes/smart-tasks'));
app.use('/api/startups',      require('./routes/startups'));
app.use('/api/payments',      require('./routes/payments'));
app.use('/api/leaderboard',   require('./routes/leaderboard'));
app.use('/api/skills',        require('./routes/skills'));
app.use('/api/funding',       require('./routes/funding'));
app.use('/api/mentorship',    require('./routes/mentorship'));
app.use('/api/analytics',     require('./routes/analytics'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin',         require('./routes/admin'));

app.get('/health', (req, res) => res.json({ status: 'OK', db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' }));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join_team', (teamId) => socket.join(`team_${teamId}`));
  socket.on('send_message', (data) => io.to(`team_${data.teamId}`).emit('receive_message', data));
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { app, io };

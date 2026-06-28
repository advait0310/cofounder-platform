const express = require('express');
const router = express.Router();
require('dotenv').config();

// Import Models
const User = require('../models/User');
const Team = require('../models/Team');
const Startup = require('../models/Startup');
const Task = require('../models/Task');

// Admin Middleware - Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.id);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }
    
    req.adminUser = user;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Admin verification failed',
      error: error.message 
    });
  }
};

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ============================================
// DASHBOARD STATS
// ============================================
router.get('/dashboard', verifyToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTeams = await Team.countDocuments();
    const totalStartups = await Startup.countDocuments();
    const totalTasks = await Task.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const mentors = await User.countDocuments({ isMentor: true });
    const bannedUsers = await User.countDocuments({ isBanned: true });

    // Recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email doerScore createdAt');

    // Active teams
    const activeTeams = await Team.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name members createdAt');

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTeams,
        totalStartups,
        totalTasks,
        verifiedUsers,
        mentors,
        bannedUsers
      },
      recentUsers,
      activeTeams
    });

  } catch (error) {
    console.error('❌ Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Dashboard fetch failed',
      error: error.message 
    });
  }
});

// ============================================
// GET ALL USERS
// ============================================
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt' } = req.query;
    const skip = (page - 1) * limit;

    // Build search query
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const users = await User.find(searchQuery)
      .sort({ [sortBy]: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-password');

    const total = await User.countDocuments(searchQuery);

    res.json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get users failed',
      error: error.message 
    });
  }
});

// ============================================
// GET USER BY ID
// ============================================
router.get('/users/:userId', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Get user stats
    const userTeams = await Team.countDocuments({ members: user._id });
    const userStartups = await Startup.countDocuments({ founders: user._id });

    res.json({
      success: true,
      user,
      stats: {
        teams: userTeams,
        startups: userStartups,
        matches: user.matches?.length || 0,
        skills: user.skills?.length || 0
      }
    });

  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get user failed',
      error: error.message 
    });
  }
});

// ============================================
// UPDATE USER
// ============================================
router.put('/users/:userId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, email, isVerified, isMentor, isAdmin: adminStatus, doerScore } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name,
        email,
        isVerified,
        isMentor,
        isAdmin: adminStatus,
        doerScore
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log('✅ User updated:', user.email);

    res.json({
      success: true,
      message: 'User updated successfully',
      user
    });

  } catch (error) {
    console.error('❌ Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Update user failed',
      error: error.message 
    });
  }
});

// ============================================
// DELETE USER
// ============================================
router.delete('/users/:userId', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Remove user from teams
    await Team.updateMany(
      { members: user._id },
      { $pull: { members: user._id } }
    );

    console.log('✅ User deleted:', user.email);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Delete user failed',
      error: error.message 
    });
  }
});

// ============================================
// BAN/UNBAN USER
// ============================================
router.put('/users/:userId/ban', verifyToken, isAdmin, async (req, res) => {
  try {
    const { ban } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { 
        isBanned: ban,
        bannedAt: ban ? new Date() : null
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const message = ban ? 'User banned successfully' : 'User unbanned successfully';
    console.log(`✅ ${message}:`, user.email);

    res.json({
      success: true,
      message,
      user
    });

  } catch (error) {
    console.error('❌ Ban user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ban user failed',
      error: error.message 
    });
  }
});

// ============================================
// MAKE USER ADMIN
// ============================================
router.put('/users/:userId/admin', verifyToken, isAdmin, async (req, res) => {
  try {
    const { makeAdmin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin: makeAdmin },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const message = makeAdmin ? 'Admin privileges granted' : 'Admin privileges revoked';
    console.log(`✅ ${message}:`, user.email);

    res.json({
      success: true,
      message,
      user
    });

  } catch (error) {
    console.error('❌ Admin update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Admin update failed',
      error: error.message 
    });
  }
});

// ============================================
// GET ALL TEAMS
// ============================================
router.get('/teams', verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = search ? {
      name: { $regex: search, $options: 'i' }
    } : {};

    const teams = await Team.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('members', 'name email');

    const total = await Team.countDocuments(searchQuery);

    res.json({
      success: true,
      teams,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get teams error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get teams failed',
      error: error.message 
    });
  }
});

// ============================================
// GET ALL STARTUPS
// ============================================
router.get('/startups', verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const startups = await Startup.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('founders', 'name email');

    const total = await Startup.countDocuments(searchQuery);

    res.json({
      success: true,
      startups,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get startups error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get startups failed',
      error: error.message 
    });
  }
});

// ============================================
// DELETE STARTUP
// ============================================
router.delete('/startups/:startupId', verifyToken, isAdmin, async (req, res) => {
  try {
    const startup = await Startup.findByIdAndDelete(req.params.startupId);

    if (!startup) {
      return res.status(404).json({ 
        success: false, 
        message: 'Startup not found' 
      });
    }

    console.log('✅ Startup deleted:', startup.name);

    res.json({
      success: true,
      message: 'Startup deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete startup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Delete startup failed',
      error: error.message 
    });
  }
});

// ============================================
// GET ALL TASKS
// ============================================
router.get('/tasks', verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const skip = (page - 1) * limit;

    const searchQuery = status ? { status } : {};

    const tasks = await Task.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email');

    const total = await Task.countDocuments(searchQuery);

    res.json({
      success: true,
      tasks,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get tasks error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get tasks failed',
      error: error.message 
    });
  }
});

// ============================================
// GET SYSTEM ANALYTICS
// ============================================
router.get('/analytics/system', verifyToken, isAdmin, async (req, res) => {
  try {
    const { timeRange = 'month' } = req.query;

    // Count by date range
    let dateFilter = {};
    const now = new Date();

    if (timeRange === 'week') {
      dateFilter = { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    } else if (timeRange === 'month') {
      dateFilter = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
    } else if (timeRange === 'year') {
      dateFilter = { $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000) };
    }

    const newUsers = await User.countDocuments({ createdAt: dateFilter });
    const newTeams = await Team.countDocuments({ createdAt: dateFilter });
    const newStartups = await Startup.countDocuments({ createdAt: dateFilter });
    const newTasks = await Task.countDocuments({ createdAt: dateFilter });

    // User stats
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const mentors = await User.countDocuments({ isMentor: true });
    const avgDoerScore = await User.aggregate([
      { $group: { _id: null, avg: { $avg: '$doerScore' } } }
    ]);

    res.json({
      success: true,
      analytics: {
        period: timeRange,
        new: {
          users: newUsers,
          teams: newTeams,
          startups: newStartups,
          tasks: newTasks
        },
        total: {
          users: await User.countDocuments(),
          teams: await Team.countDocuments(),
          startups: await Startup.countDocuments(),
          tasks: await Task.countDocuments()
        },
        stats: {
          verifiedUsers,
          mentors,
          avgDoerScore: avgDoerScore[0]?.avg || 0
        }
      }
    });

  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Analytics fetch failed',
      error: error.message 
    });
  }
});

// ============================================
// GET USER REPORTS/COMPLAINTS
// ============================================
router.get('/reports', verifyToken, isAdmin, async (req, res) => {
  try {
    // In production, fetch from reports collection
    const reports = [
      {
        _id: '1',
        reportedUser: 'John Doe',
        reporter: 'Jane Smith',
        reason: 'Inappropriate behavior',
        status: 'pending',
        createdAt: new Date()
      },
      {
        _id: '2',
        reportedUser: 'Bob Wilson',
        reporter: 'Alice Brown',
        reason: 'Spam messages',
        status: 'resolved',
        createdAt: new Date()
      }
    ];

    res.json({
      success: true,
      reports,
      total: reports.length
    });

  } catch (error) {
    console.error('❌ Get reports error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get reports failed',
      error: error.message 
    });
  }
});

// ============================================
// RESOLVE REPORT
// ============================================
router.put('/reports/:reportId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, action } = req.body;

    // In production, update report in database
    console.log(`✅ Report ${req.params.reportId} status updated to: ${status}`);

    res.json({
      success: true,
      message: 'Report status updated',
      report: {
        _id: req.params.reportId,
        status,
        action,
        resolvedAt: new Date(),
        resolvedBy: req.adminUser.name
      }
    });

  } catch (error) {
    console.error('❌ Update report error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Update report failed',
      error: error.message 
    });
  }
});

// ============================================
// GET ACTIVITY LOG
// ============================================
router.get('/activity-log', verifyToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // In production, fetch from activity log collection
    const activityLog = [
      {
        _id: '1',
        action: 'User registered',
        user: 'john@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        details: 'New user signup'
      },
      {
        _id: '2',
        action: 'Team created',
        user: 'jane@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        details: 'Team "Tech Stack" created'
      },
      {
        _id: '3',
        action: 'User banned',
        admin: 'admin@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        details: 'User banned for spam'
      }
    ];

    res.json({
      success: true,
      activityLog: activityLog.slice(skip, skip + parseInt(limit)),
      total: activityLog.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(activityLog.length / limit)
      }
    });

  } catch (error) {
    console.error('❌ Activity log error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Activity log fetch failed',
      error: error.message 
    });
  }
});

// ============================================
// SEND NOTIFICATION
// ============================================
router.post('/notifications/send', verifyToken, isAdmin, async (req, res) => {
  try {
    const { userId, title, message, type = 'info' } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Required fields missing' 
      });
    }

    // In production, save to notifications collection
    console.log(`✅ Notification sent to user ${userId}: ${title}`);

    res.json({
      success: true,
      message: 'Notification sent successfully',
      notification: {
        userId,
        title,
        message,
        type,
        sentAt: new Date(),
        sentBy: req.adminUser.name
      }
    });

  } catch (error) {
    console.error('❌ Send notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Send notification failed',
      error: error.message 
    });
  }
});

// ============================================
// SEND BROADCAST NOTIFICATION
// ============================================
router.post('/notifications/broadcast', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, message, type = 'info', targetGroup = 'all' } = req.body;

    if (!title || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and message required' 
      });
    }

    // In production, send to all users or target group
    console.log(`✅ Broadcast notification sent to ${targetGroup}: ${title}`);

    let targetCount = 0;
    if (targetGroup === 'all') {
      targetCount = await User.countDocuments();
    } else if (targetGroup === 'verified') {
      targetCount = await User.countDocuments({ isVerified: true });
    } else if (targetGroup === 'mentors') {
      targetCount = await User.countDocuments({ isMentor: true });
    }

    res.json({
      success: true,
      message: 'Broadcast sent successfully',
      broadcast: {
        title,
        message,
        type,
        targetGroup,
        targetCount,
        sentAt: new Date(),
        sentBy: req.adminUser.name
      }
    });

  } catch (error) {
    console.error('❌ Broadcast error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Broadcast failed',
      error: error.message 
    });
  }
});

// ============================================
// MANAGE MENTOR APPLICATIONS
// ============================================
router.get('/mentor-applications', verifyToken, isAdmin, async (req, res) => {
  try {
    // In production, fetch from mentor applications collection
    const applications = [
      {
        _id: '1',
        userId: 'user1',
        userName: 'John Doe',
        experience: 'Advanced',
        expertise: 'Tech, Startup',
        status: 'pending',
        createdAt: new Date()
      }
    ];

    res.json({
      success: true,
      applications,
      total: applications.length
    });

  } catch (error) {
    console.error('❌ Get applications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get applications failed',
      error: error.message 
    });
  }
});

// ============================================
// APPROVE/REJECT MENTOR APPLICATION
// ============================================
router.put('/mentor-applications/:appId', verifyToken, isAdmin, async (req, res) => {
  try {
    const { approved } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isMentor: approved },
      { new: true }
    );

    const status = approved ? 'approved' : 'rejected';
    console.log(`✅ Mentor application ${status}`);

    res.json({
      success: true,
      message: `Application ${status}`,
      user
    });

  } catch (error) {
    console.error('❌ Update application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Update application failed',
      error: error.message 
    });
  }
});

// ============================================
// SYSTEM SETTINGS
// ============================================
router.get('/settings', verifyToken, isAdmin, async (req, res) => {
  try {
    const settings = {
      platformName: 'CoBuilder',
      version: '1.0.0',
      maintenanceMode: false,
      allowNewRegistrations: true,
      doerScoreMultiplier: 1.5,
      maxTeamSize: 10,
      minProfileCompletion: 70,
      emailVerificationRequired: true,
      phoneVerificationRequired: false,
      premiumEnabled: true
    };

    res.json({
      success: true,
      settings
    });

  } catch (error) {
    console.error('❌ Get settings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Get settings failed',
      error: error.message 
    });
  }
});

// ============================================
// UPDATE SYSTEM SETTINGS
// ============================================
router.put('/settings', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedSettings = req.body;

    console.log('✅ System settings updated');

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings: updatedSettings
    });

  } catch (error) {
    console.error('❌ Update settings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Update settings failed',
      error: error.message 
    });
  }
});

module.exports = router; 

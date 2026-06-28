const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { teamId, title, description, assignedTo, deadline, priority } = req.body;

    const task = new Task({
      teamId,
      title,
      description,
      assignedTo,
      deadline,
      priority,
      createdBy: req.userId
    });

    await task.save();
    await task.populate('assignedTo');
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:taskId', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        status,
        completedAt: status === 'Done' ? new Date() : null,
        $push: {
          statusHistory: {
            status,
            changedAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (status === 'Done' && task.assignedTo) {
      await User.findByIdAndUpdate(
        task.assignedTo,
        {
          $inc: { tasksCompleted: 1, doerScore: 2 }
        }
      );
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/team/:teamId', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ teamId: req.params.teamId })
      .populate('assignedTo')
      .sort({ deadline: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:taskId/progress', authMiddleware, async (req, res) => {
  try {
    const { progressPercentage } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { progressPercentage },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 

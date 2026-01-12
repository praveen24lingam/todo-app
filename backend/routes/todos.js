const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add task
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).json({ message: 'Task cannot be empty' });
    }
    const task = new Task({ title: req.body.title });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT toggle completed / edit
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.completed !== undefined) task.completed = req.body.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', task: deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

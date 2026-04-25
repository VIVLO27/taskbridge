const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const filter = { createdBy: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = await Task.create({
      title, description, status, priority, dueDate,
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

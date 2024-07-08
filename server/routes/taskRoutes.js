// tasksRoutes.js
const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel"); // Ensure this model is correctly imported

const router = express.Router();

// Create a task and add it to the user's tasks list
router.post("/", auth, async (req, res) => {
  const { title, description, type, dueAt, status } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      type,
      dueAt,
      createdBy: req.user.id,
      status,
    });

    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { tasks: savedTask._id },
    });

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve tasks by id]
router.get("/single/:taskId", auth, async (req, res) => {
  const { taskId } = req.params;

  // Check if taskId is a valid ObjectId
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid task ID format." });
  }

  try {
    const task = await Task.findById(taskId).populate("createdBy", "username");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving task" });
  }
});

// Retrieve tasks by date
router.get("/:date", auth, async (req, res) => {
  const { date } = req.params;
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setHours(23, 59, 59, 999);

  try {
    const tasks = await Task.find({
      createdBy: req.user.id,
      dueAt: { $gte: startDate, $lte: endDate },
    }).populate("createdBy", "username");

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update a specific task
router.put("/:taskId", auth, async (req, res) => {
  const { title, description, reminderTime, frequency, status, dueAt } =
    req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, createdBy: req.user.id },
      { $set: { title, description, reminderTime, frequency, status, dueAt } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      createdBy: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Also update the user's task list
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { tasks: req.params.taskId },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

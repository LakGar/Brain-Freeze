// tasksRoutes.js
const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel"); // Ensure this model is correctly imported

const router = express.Router();

// Create a task and add it to the user's tasks list

router.post("/", auth, async (req, res) => {
  const {
    title,
    description,
    type,
    dueAt,
    status,
    patientId,
    careTakerId,
    doctorNotes,
  } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      type,
      dueAt,
      createdBy: careTakerId,
      createdFor: patientId,
      status,
      doctorNotes,
    });

    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { tasks: savedTask._id },
    });
    await User.findByIdAndUpdate(patientId, {
      $push: { tasks: savedTask._id },
    });

    if (type === "prescription") {
      for (let i = 0; i < timesPerDay; i++) {
        const prescriptionTask = new Task({
          title,
          description,
          type,
          dueAt: new Date(
            dueAt.getTime() + i * (24 / timesPerDay) * 60 * 60 * 1000
          ), // distribute times per day
          createdBy: req.user.id,
          createdFor: patientId,
          status,
          doctorNotes,
        });
        await prescriptionTask.save();
        await User.findByIdAndUpdate(req.user.id, {
          $push: { tasks: prescriptionTask._id },
        });
        await User.findByIdAndUpdate(patientId, {
          $push: { tasks: savedTask._id },
        });
      }
    }

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
    const task = await Task.findById(taskId).populate("createdFor", "username");
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
      createdFor: req.user.id,
      dueAt: { $gte: startDate, $lte: endDate },
    }).populate("createdFor", "username");

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

//Retrieve all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate(
      "createdFor",
      "username"
    );
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving tasks" });
  }
});

// Get all appointments for a specific patient
router.get("/appointments/:patientId", auth, async (req, res) => {
  const { patientId } = req.params;

  try {
    const tasks = await Task.find({
      createdFor: patientId,
      type: "appointment",
    })
      .sort({ dueAt: -1 }) // Sort by due date descending
      .populate("createdFor", "username");

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving tasks" });
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

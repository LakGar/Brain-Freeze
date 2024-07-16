const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["appointment", "prescription", "task"],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdFor: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  dueAt: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["due", "completed", "in progress", "missed"],
  },
  description: { type: String, required: true, maxlength: 1000 },
  title: { type: String, required: true, trim: true },
  doctorNotes: { type: String },
});

// Compile model from schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

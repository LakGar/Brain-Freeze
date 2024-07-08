const mongoose = require("mongoose");
const { Schema } = mongoose;

// Reminder Subschema
const reminderSchema = new Schema({
  title: String,
  description: String,
  reminderTime: Date,
  frequency: {
    type: String,
    enum: ["once", "daily", "weekly", "monthly"],
  },
});

// Care Team Subschema
const careTeamSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  relation: String,
});

// Medical Information Subschema
const medicalInformationSchema = new Schema({
  primaryDoctor: {
    name: String,
    contact: String,
  },
  medicalConditions: [String],
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  allergies: [String],
});

// Health Metrics Subschema
const healthMetricSchema = new Schema({
  type: String,
  value: Number,
  recordedAt: Date,
});

// Activity Log Subschema
const activityLogSchema = new Schema({
  activityType: String,
  description: String,
  timestamp: Date,
});

// Emergency Contact Subschema
const emergencyContactSchema = new Schema({
  name: String,
  relationship: String,
  phone: String,
  email: String,
  primary: Boolean,
});

// Main User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  bio: { type: String, maxlength: 500 },
  profilePicture: { type: String, default: "default-profile-pic.jpg" },
  coverPhoto: { type: String, default: "default-cover-photo.jpg" },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  reminders: [reminderSchema],
  careTeam: [careTeamSchema],
  medicalInformation: medicalInformationSchema,
  healthMetrics: [healthMetricSchema],
  activityLog: [activityLogSchema],
  emergencyContacts: [emergencyContactSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  DOB: { type: Date },
  height: { type: Number },
  weight: [
    {
      value: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  steps: [
    {
      value: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  exercise: [
    {
      value: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  MentalExercise: [
    {
      value: Number,
      date: { type: Date, default: Date.now },
    },
  ],

  privacySettings: {
    profileVisibility: { type: String, enum: ["public", "private", "custom"] },
    dataSharingPermissions: [{ type: String }],
  },
  userType: {
    type: String,
    enum: ["Patient", "Caretaker", "Doctor", "Family"],
    default: "caretaker",
  },
  patients: [{ type: Schema.Types.ObjectId, ref: "User" }],
  loginStreak: {
    count: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
  },
});

// Pre-save middleware to update the updatedAt field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;

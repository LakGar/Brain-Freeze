const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const auth = require("../middlewares/auth"); // Assuming you have an auth middleware
const updateLoginStreak = require("../middlewares/updateLoginStreak");

const router = express.Router();

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      async (err, token) => {
        if (err) throw err;

        const loginStreak = await updateLoginStreak(user.id);
        res.json({ token, loginStreak });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Check username or email address exists
router.post("/check", async (req, res) => {
  const { identifier, type } = req.body; // identifier could be either username or email
  try {
    let user;
    if (type === "username") {
      user = await User.findOne({ username: identifier });
      if (user) {
        return res.status(400).json({ message: "Username already exists" });
      } else {
        return res.status(200).json({ message: "Username does not exist" });
      }
    } else if (type === "email") {
      user = await User.findOne({ email: identifier });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        return res.status(200).json({ message: "Email does not exist" });
      }
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password, firstName, lastName, userType } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register a new patient
router.post("/register-patient", async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    age,
    weight,
    DOB,
    height,
  } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    // Check if the user is a caretaker or doctor
    let caretakerOrDoctor = await User.findById(userId);
    if (
      !caretakerOrDoctor ||
      (caretakerOrDoctor.userType !== "Caretaker" &&
        caretakerOrDoctor.userType !== "Doctor")
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new patient
    user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType: "Patient",
      age,
      weight: [{ value: weight }], // Wrap the weight value in an object
      DOB,
      height,
      careTeam: [
        { userId: caretakerOrDoctor._id, relation: caretakerOrDoctor.userType },
      ],
    });

    await user.save();

    // Add the new patient to the caretaker's or doctor's patients array
    caretakerOrDoctor.patients.push(user._id);
    await caretakerOrDoctor.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from environment variables
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch the authenticated user's profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update the authenticated user's profile
router.put("/", auth, async (req, res) => {
  const { firstName, lastName, bio, profilePicture, coverPhoto } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    user.coverPhoto = coverPhoto || user.coverPhoto;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send a friend request
router.post("/friend-request/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const recipient = await User.findById(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    if (recipient.friendRequestsReceived.includes(user.id)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    recipient.friendRequestsReceived.push(user.id);
    user.friendRequestsSent.push(recipient.id);

    await user.save();
    await recipient.save();

    res.json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept a friend request
router.post("/accept-friend-request/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const requester = await User.findById(req.params.id);

    if (!requester) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequestsReceived.includes(requester.id)) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    user.friends.push(requester.id);
    requester.friends.push(user.id);

    user.friendRequestsReceived = user.friendRequestsReceived.filter(
      (id) => id.toString() !== requester.id.toString()
    );
    requester.friendRequestsSent = requester.friendRequestsSent.filter(
      (id) => id.toString() !== user.id.toString()
    );

    await user.save();
    await requester.save();

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Decline a friend request
router.post("/decline-friend-request/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const requester = await User.findById(req.params.id);

    if (!requester) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequestsReceived.includes(requester.id)) {
      return res.status(400).json({ message: "Friend request not found" });
    }

    user.friendRequestsReceived = user.friendRequestsReceived.filter(
      (id) => id.toString() !== requester.id.toString()
    );
    requester.friendRequestsSent = requester.friendRequestsSent.filter(
      (id) => id.toString() !== user.id.toString()
    );

    await user.save();
    await requester.save();

    res.json({ message: "Friend request declined" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Reminder
router.post("/reminder", auth, async (req, res) => {
  const { title, description, reminderTime, frequency } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.reminders.push({ title, description, reminderTime, frequency });
    await user.save();
    res.json(user.reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Care Team Member
router.post("/care-team", auth, async (req, res) => {
  const { userId, relation, accessLevel } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.careTeam.push({ userId, relation, accessLevel });
    await user.save();
    res.json(user.careTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Medical Information
router.post("/medical-information", auth, async (req, res) => {
  const {
    primaryDoctor,
    medicalConditions,
    medications,
    allergies,
    patientId,
  } = req.body;
  try {
    const user = await User.findById(patientId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.medicalInformation = {
      primaryDoctor,
      medicalConditions,
      medications,
      allergies,
    };
    await user.save();
    res.json(user.medicalInformation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get Medical Information
router.get("/medical-information/:id", async (req, res) => {
  const patientId = req.params.id;
  try {
    const user = await User.findById(patientId).select("medicalInformation");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user.medicalInformation);
    res.json(user.medicalInformation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Health Metric
router.post("/health-metric", auth, async (req, res) => {
  const { type, value, recordedAt } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.healthMetrics.push({ type, value, recordedAt });
    await user.save();
    res.json(user.healthMetrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Activity Log
router.post("/activity-log", auth, async (req, res) => {
  const { activityType, description, timestamp } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.activityLog.push({ activityType, description, timestamp });
    await user.save();
    res.json(user.activityLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Emergency Contact
router.post("/emergency-contact", auth, async (req, res) => {
  const { name, relationship, phone, email, primary } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.emergencyContacts.push({ name, relationship, phone, email, primary });
    await user.save();
    res.json(user.emergencyContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getTodayDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

router.post("/weight", auth, async (req, res) => {
  const { weight, userId } = req.body;
  console.log("Received payload:", req.body); // Log the received payload
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Push a new weight entry
    user.weight.push({ value: weight, date: new Date() });

    await user.save();
    console.log("Updated weight data:", user.weight);
    res.json(user.weight);
  } catch (err) {
    console.error("Error processing weight:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/steps", auth, async (req, res) => {
  const { steps, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = getTodayDate();
    const existingSteps = user.steps.find(
      (entry) => entry.date.getTime() === today.getTime()
    );

    if (existingSteps) {
      existingSteps.value += steps;
    } else {
      user.steps.push({ value: steps, date: today });
    }

    await user.save();
    res.json(user.steps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Exercise
router.post("/exercise", auth, async (req, res) => {
  const { exercise, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = getTodayDate();
    const existingExercise = user.exercise.find(
      (entry) => entry.date.getTime() === today.getTime()
    );

    if (existingExercise) {
      existingExercise.value += exercise;
    } else {
      user.exercise.push({ value: exercise, date: today });
    }

    await user.save();
    res.json(user.exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Mental Exercise
router.post("/mental-exercise", auth, async (req, res) => {
  const { mentalExercise, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = getTodayDate();
    const existingMentalExercise = user.MentalExercise.find(
      (entry) => entry.date.getTime() === today.getTime()
    );

    if (existingMentalExercise) {
      existingMentalExercise.value += mentalExercise;
    } else {
      user.MentalExercise.push({ value: mentalExercise, date: today });
    }

    await user.save();
    res.json(user.MentalExercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (user.streak.lastUpdated) {
    const lastUpdatedDate = new Date(user.streak.lastUpdated);
    if (lastUpdatedDate.toDateString() === yesterday.toDateString()) {
      user.streak.count += 1;
    } else if (lastUpdatedDate.toDateString() !== today.toDateString()) {
      user.streak.count = 1;
    }
  } else {
    user.streak.count = 1;
  }

  user.streak.lastUpdated = today;
  await user.save();

  return user.streak;
};

router.post("/patient-details", auth, async (req, res) => {
  const { patientIds } = req.body;

  if (!Array.isArray(patientIds)) {
    return res.status(400).json({ message: "patientIds should be an array" });
  }

  try {
    const patients = await User.find({
      _id: { $in: patientIds },
      userType: "Patient",
    }).select("-password");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch patient details" });
  }
});

module.exports = router;

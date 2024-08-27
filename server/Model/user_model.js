const mongoose = require("mongoose");

// Define the meeting schema
const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  meetings: [meetingSchema], // Array of meeting documents
});

module.exports = mongoose.model("User", userSchema);

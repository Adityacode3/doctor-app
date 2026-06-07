const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    availableDays: {
      type: [String], // e.g. ["Monday", "Wednesday", "Friday"]
      required: true,
    },
    availableSlots: {
      type: [String], // e.g. ["09:00 AM", "10:00 AM", "11:00 AM"]
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);

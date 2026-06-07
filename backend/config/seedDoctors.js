// Run this script once to add sample doctors to your database
// Command: node config/seedDoctors.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("../models/Doctor");

dotenv.config();

const sampleDoctors = [
  {
    name: "Dr. Arjun Sharma",
    specialization: "Cardiologist",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
  },
  {
    name: "Dr. Priya Mehta",
    specialization: "Dermatologist",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM", "11:00 AM", "03:00 PM", "04:00 PM"],
  },
  {
    name: "Dr. Ravi Kumar",
    specialization: "Neurologist",
    availableDays: ["Monday", "Tuesday", "Friday"],
    availableSlots: ["08:00 AM", "09:00 AM", "01:00 PM", "02:00 PM"],
  },
  {
    name: "Dr. Sunita Rao",
    specialization: "Orthopedist",
    availableDays: ["Wednesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM"],
  },
  {
    name: "Dr. Anil Verma",
    specialization: "Gastroenterologist",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
  },
  {
    name: "Dr. Kavya Singh",
    specialization: "Psychiatrist",
    availableDays: ["Tuesday", "Thursday"],
    availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
  },
  {
    name: "Dr. Meena Patel",
    specialization: "Pediatrician",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM"],
  },
  {
    name: "Dr. Suresh Nair",
    specialization: "ENT",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: ["09:00 AM", "10:00 AM", "01:00 PM", "03:00 PM"],
  },
  {
    name: "Dr. Deepa Iyer",
    specialization: "Ophthalmologist",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
  },
  {
    name: "Dr. Rajesh Gupta",
    specialization: "General Physician",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Doctor.deleteMany({}); // Clear existing doctors
    const inserted = await Doctor.insertMany(sampleDoctors);
    console.log(`${inserted.length} doctors added successfully!`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDoctors();

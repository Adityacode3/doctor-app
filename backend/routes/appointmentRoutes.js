const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getUserAppointments,
  deleteAppointment,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

// All appointment routes are protected (require login)

// POST /api/appointments
router.post("/", protect, createAppointment);

// GET /api/appointments
router.get("/", protect, getUserAppointments);

// DELETE /api/appointments/:id
router.delete("/:id", protect, deleteAppointment);

module.exports = router;

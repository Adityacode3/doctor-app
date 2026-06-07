const express = require("express");
const router = express.Router();
const { getDoctors } = require("../controllers/doctorController");
const protect = require("../middleware/authMiddleware");

// GET /api/doctors  — protected route (must be logged in)
// Optional query param: ?specialization=Cardiologist
router.get("/", protect, getDoctors);

module.exports = router;

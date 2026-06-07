const express = require("express");
const router = express.Router();
const { analyzeSymptoms } = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

// POST /api/ai/analyze  — protected route
router.post("/analyze", protect, analyzeSymptoms);

module.exports = router;

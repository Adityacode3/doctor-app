const Doctor = require("../models/Doctor");

// Get all doctors — optionally filter by specialization
const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;

    // If a specialization query param is passed, filter by it (case-insensitive)
    const filter = specialization
      ? { specialization: { $regex: specialization, $options: "i" } }
      : {};

    const doctors = await Doctor.find(filter);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = { getDoctors };

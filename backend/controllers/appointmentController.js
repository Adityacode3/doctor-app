const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// ─── CREATE APPOINTMENT ───────────────────────────────────────────────────────
const createAppointment = async (req, res) => {
  const { doctorId, symptoms, appointmentDate, appointmentTime } = req.body;

  if (!doctorId || !symptoms || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Make sure the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    const appointment = await Appointment.create({
      user: req.userId, // comes from the auth middleware
      doctor: doctorId,
      symptoms,
      appointmentDate,
      appointmentTime,
    });

    // Populate doctor details before sending response
    const populated = await appointment.populate("doctor", "name specialization");

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: populated,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// ─── GET USER APPOINTMENTS ────────────────────────────────────────────────────
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 }); // newest first

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// ─── DELETE APPOINTMENT ───────────────────────────────────────────────────────
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Make sure the appointment belongs to the logged-in user
    if (appointment.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this appointment." });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment cancelled successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = { createAppointment, getUserAppointments, deleteAppointment };

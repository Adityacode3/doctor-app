import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/api";

function BookAppointment() {
  const navigate = useNavigate();

  // 4 steps: 1=Enter Symptoms, 2=View AI Result, 3=Select Doctor, 4=Confirm
  const [step, setStep] = useState(1);

  const [symptoms, setSymptoms] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── STEP 1: Analyze symptoms ───────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      return setError("Please describe your symptoms.");
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/ai/analyze", { symptoms });
      setSpecialist(res.data.specialist);

      // Fetch doctors for that specialist
      const doctorRes = await API.get(`/doctors?specialization=${res.data.specialist}`);
      setDoctors(doctorRes.data);

      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze symptoms.");
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 3: Book the appointment ──────────────────────────────────────────
  const handleBook = async () => {
    if (!selectedDoctor) return setError("Please select a doctor.");
    if (!selectedDate) return setError("Please select a day.");
    if (!selectedTime) return setError("Please select a time slot.");

    setError("");
    setLoading(true);

    try {
      await API.post("/appointments", {
        doctorId: selectedDoctor._id,
        symptoms,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      });

      setSuccess("✅ Appointment booked successfully!");
      setStep(4);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="page-title">Book an Appointment</h2>

        {/* Step indicators */}
        <div className="step-indicator">
          <span className={`step ${step >= 1 ? (step > 1 ? "done" : "active") : ""}`}>1. Symptoms</span>
          <span className={`step ${step >= 2 ? (step > 2 ? "done" : "active") : ""}`}>2. AI Result</span>
          <span className={`step ${step >= 3 ? (step > 3 ? "done" : "active") : ""}`}>3. Select Doctor</span>
          <span className={`step ${step >= 4 ? "done" : ""}`}>4. Done</span>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {/* ── STEP 1: Enter Symptoms ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="card">
            <h3>Describe Your Symptoms</h3>
            <p style={{ fontSize: "13px", color: "#555", marginBottom: "12px" }}>
              Tell us what you're experiencing and our AI will suggest the right specialist.
            </p>
            <div className="form-group">
              <label>Symptoms</label>
              <textarea
                placeholder="e.g. I have a severe headache and dizziness for the past 2 days..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Symptoms →"}
            </button>
          </div>
        )}

        {/* ── STEP 2: Show AI result and list doctors ───────────────────── */}
        {step === 2 && (
          <div>
            <div className="info-msg">
              🤖 AI Recommendation: <strong>{specialist}</strong>
            </div>

            <p className="section-title">Available {specialist}s:</p>

            {doctors.length === 0 ? (
              <div className="error-msg">No doctors found for this specialization right now.</div>
            ) : (
              doctors.map((doc) => (
                <div
                  key={doc._id}
                  className={`doctor-card ${selectedDoctor?._id === doc._id ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                >
                  <h4>👨‍⚕️ {doc.name}</h4>
                  <p>🏥 {doc.specialization}</p>
                  <p>📅 Available Days: {doc.availableDays.join(", ")}</p>
                  <p>🕐 Slots: {doc.availableSlots.join(", ")}</p>
                </div>
              ))
            )}

            {selectedDoctor && (
              <div style={{ marginTop: "20px" }}>
                <p className="section-title">Select Day for {selectedDoctor.name}:</p>
                <div className="slots-grid">
                  {selectedDoctor.availableDays.map((day) => (
                    <button
                      key={day}
                      className={`slot-btn ${selectedDate === day ? "selected" : ""}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <p className="section-title">Select Time Slot:</p>
                <div className="slots-grid">
                  {selectedDoctor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`slot-btn ${selectedTime === slot ? "selected" : ""}`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              {selectedDoctor && selectedDate && selectedTime && (
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(3)}>
                  Review Appointment →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirm ───────────────────────────────────────────── */}
        {step === 3 && (
          <div className="card">
            <h3>Confirm Your Appointment</h3>

            <p className="section-title">Appointment Details:</p>
            <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
            <p><strong>Specialization:</strong> {selectedDoctor?.specialization}</p>
            <p><strong>Day:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Symptoms:</strong> {symptoms}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button className="btn btn-secondary" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleBook} disabled={loading}>
                {loading ? "Booking..." : "✅ Confirm Booking"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Success ───────────────────────────────────────────── */}
        {step === 4 && (
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>✅</div>
            <h3 style={{ color: "#16a34a" }}>Appointment Booked!</h3>
            <p style={{ marginTop: "10px", color: "#555" }}>{success}</p>
            <p style={{ marginTop: "8px", color: "#555", fontSize: "14px" }}>
              <strong>Doctor:</strong> {selectedDoctor?.name} | <strong>Day:</strong> {selectedDate} | <strong>Time:</strong> {selectedTime}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
              <button className="btn btn-primary" style={{ width: "180px" }} onClick={() => navigate("/history")}>
                View History
              </button>
              <button className="btn btn-secondary" onClick={() => {
                setStep(1);
                setSymptoms("");
                setSpecialist("");
                setDoctors([]);
                setSelectedDoctor(null);
                setSelectedDate("");
                setSelectedTime("");
                setSuccess("");
              }}>
                Book Another
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BookAppointment;

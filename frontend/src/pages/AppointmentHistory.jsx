import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../utils/api";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  // Load appointments when the page opens
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      await API.delete(`/appointments/${id}`);
      setDeleteMsg("Appointment cancelled successfully.");
      // Remove it from the list without re-fetching
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      setError("Failed to cancel appointment.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="page-title">Appointment History</h2>

        {error && <div className="error-msg">{error}</div>}
        {deleteMsg && <div className="success-msg">{deleteMsg}</div>}

        {loading ? (
          <p style={{ textAlign: "center", color: "#555" }}>Loading...</p>
        ) : appointments.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p style={{ color: "#555", marginBottom: "15px" }}>No appointments found.</p>
            <Link to="/book" className="btn btn-primary" style={{ width: "auto", display: "inline-block" }}>
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <h4>👨‍⚕️ {appt.doctor?.name || "Unknown Doctor"}</h4>
              <p>🏥 <strong>Specialization:</strong> {appt.doctor?.specialization}</p>
              <p>📅 <strong>Day:</strong> {appt.appointmentDate}</p>
              <p>🕐 <strong>Time:</strong> {appt.appointmentTime}</p>
              <p>🤒 <strong>Symptoms:</strong> {appt.symptoms}</p>
              <p style={{ color: "#9ca3af", fontSize: "12px", marginTop: "5px" }}>
                Booked on: {new Date(appt.createdAt).toLocaleDateString()}
              </p>
              <button
                className="btn btn-danger"
                style={{ marginTop: "10px", padding: "6px 14px" }}
                onClick={() => handleDelete(appt._id)}
              >
                Cancel Appointment
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default AppointmentHistory;

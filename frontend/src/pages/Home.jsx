import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  // Read the saved user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h2>Welcome, {user.name || "User"}! 👋</h2>
        <p>
          Your health is our priority. Book an appointment with the right specialist based on your symptoms.
        </p>

        <div className="card" style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto 30px" }}>
          <h3>Your Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="home-buttons">
          <Link to="/book" className="btn btn-green">
            📅 Book Appointment
          </Link>
          <Link to="/history" className="btn btn-secondary btn">
            📋 View History
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;

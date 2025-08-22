import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Uses same CSS as Dashboard/Travel/Food for consistency

export default function WorkoutPage() {
  return (
    <div className="page workout-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/dashboard" className="logo">
          HobbyHub
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/food">Food</Link>
          </li>
          <li>
            <Link to="/workout">Workout</Link>
          </li>
          <li>
            <Link to="/travel">Travel</Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <header className="header">
        <h1>🏋️ Workout Hub</h1>
        <p>Track your fitness routines, set goals, and stay active!</p>
      </header>

      <main className="content-grid">
        <div className="card">
          <h2>Daily Workout</h2>
          <p>Log today’s exercise and keep moving!</p>
        </div>
        <div className="card">
          <h2>Goals</h2>
          <p>Set your weekly and monthly fitness goals.</p>
        </div>
        <div className="card">
          <h2>Progress</h2>
          <p>Check your workout history and achievements.</p>
        </div>
      </main>
    </div>
  );
}

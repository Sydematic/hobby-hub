import React from "react";
import { Link } from "react-router-dom";
import './travel.css';

export default function TravelPage() {
  return (
    <div className="travel-page">
      {/* Header */}
      <header className="travel-header">
        <Link to="/dashboard" className="logo-link">
          <h1 className="logo">HobbyHub</h1>
        </Link>
        <nav className="travel-nav">
          <Link to="/travel" className="nav-link active">Travel</Link>
          <Link to="/workout" className="nav-link">Workout</Link>
          <Link to="/food" className="nav-link">Food</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="travel-content">
        <div className="travel-card">
          <h2>Destinations</h2>
          <p>Explore beautiful places around the world.</p>
          <Link to="/destinations" className="card-button">See More</Link>
        </div>
        <div className="travel-card">
          <h2>Tips & Tricks</h2>
          <p>Plan your trips better with useful travel tips.</p>
          <Link to="/tips" className="card-button">See More</Link>
        </div>
        <div className="travel-card">
          <h2>Travel Deals</h2>
          <p>Find the best deals for flights and hotels.</p>
          <Link to="/deals" className="card-button">See More</Link>
        </div>
      </main>
    </div>
  );
}

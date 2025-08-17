import './signup.css';
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup-page">
      {/* HobbyHub at top-left */}
      <header className="signup-header">
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="hh-icon gradient-text">HH</div>
          <span className="font-alumniSans text-[23px] font-normal gradient-text">
            HobbyHub
          </span>
        </Link>
      </header>

      {/* Signup form in center */}
      <main className="signup-main">
        <div className="signup-card">
          <h2>Signup</h2>
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

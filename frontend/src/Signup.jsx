import './signup.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "./client"; 

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // store username in user metadata
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email to confirm your account.");
    }
  };

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
          <h2 className="gradient-text">Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Gradient button */}
            <button type="submit" className="gradient-btn">
              Sign Up
            </button>
          </form>
          {message && <p className="signup-message">{message}</p>}
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

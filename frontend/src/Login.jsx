import './login.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./client"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      navigate("/dashboard"); // Redirect after login
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

      {/* Login form in center */}
      <main className="signup-main">
        <div className="signup-card">
          <h2 className="gradient-text">Login</h2>
          <form onSubmit={handleLogin}>
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
              Login
            </button>
          </form>
          {message && <p className="signup-message">{message}</p>}
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

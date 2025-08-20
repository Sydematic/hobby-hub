import './login.css';
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "./client"; 
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  // Where the user tried to go (from Add Recipe button or others)
  const from = location.state?.from || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.user) {
        setMessage("Login failed. Please try again.");
        return;
      }

      const currentUser = { id: data.user.id, email: data.user.email };
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));

      // Redirect to the original page they tried to visit
      navigate(from, { replace: true });
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="hh-icon gradient-text">HH</div>
          <span className="font-alumniSans text-[23px] font-normal gradient-text">HobbyHub</span>
        </Link>
      </header>

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
            <button type="submit" className="gradient-btn">Login</button>
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

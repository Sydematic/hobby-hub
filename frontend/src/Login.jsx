import './login.css';
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "./client"; 
import { useAuth } from "./AuthContext";
import emailjs from "@emailjs/browser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  // Where the user tried to go
  const from = location.state?.from || "/DashboardPage";

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

      if (!data.user || !data.session) {
        setMessage("Login failed. Please try again.");
        return;
      }

      const currentUser = {
        id: data.user.id,
        email: data.user.email,
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      };

      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));

      // ✅ EmailJS integration: send update/apology email if not received yet
      if (!data.user.user_metadata?.receivedEmailJS) {
        try {
          await emailjs.send(
            "service_2zq83bj",
            "template_r3apxh7",
            {
              name: data.user.user_metadata?.username || "User",
              email: email,
              dashboard_url: "https://hobby-hub-4nsj.onrender.com/",
              message_body:
                "We apologize for any inconvenience. This is an update from HobbyHub!"
            },
            "lEeb1cSgpktREtds6"
          );

          // Mark that user received the EmailJS message
          await supabase.auth.updateUser({
            data: { receivedEmailJS: true }
          });
        } catch (err) {
          console.error("Error sending EmailJS message:", err);
        }
      }

      // Redirect after login
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
          <span className="font-alumniSans text-[23px] font-normal gradient-text">
            HobbyHub
          </span>
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
            Don’t have an account?{" "}
            <Link to="/signup" state={{ from }}>
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

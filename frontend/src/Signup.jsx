// src/Signup.jsx
import "./signup.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import supabase from "./client";
import emailjs from "@emailjs/browser";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  // Where the user originally tried to go
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // ✅ Check if email already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users") // or your users table if you have one; for Supabase auth use `auth.users`
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        setMessage(
          "An account with this email already exists. Please login instead."
        );
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(
            from
          )}`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Signup successful! Check your email to confirm your account.");

        // ✅ Send EmailJS confirmation email
        try {
          await emailjs.send(
            "service_2zq83bj", // your EmailJS service ID
            "template_r3apxh7", // your EmailJS template
            {
              name: username,
              email: email,
              dashboard_url: "https://hobby-hub-4nsj.onrender.com/",
            },
            "lEeb1cSgpktREtds6" // your EmailJS public key
          );
        } catch (err) {
          console.error("Error sending EmailJS confirmation:", err);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred. Please try again.");
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
            <button type="submit" className="gradient-btn">
              Sign Up
            </button>
          </form>
          {message && <p className="signup-message">{message}</p>}
          <p>
            Have an account?{" "}
            <Link to="/login" state={{ from }}>
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

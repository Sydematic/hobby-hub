import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      <header className="navbar">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="hh-icon gradient-text">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">
              HobbyHub
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-[380px] bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
            Signup
          </h2>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            Have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

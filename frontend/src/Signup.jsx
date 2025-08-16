import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[380px] bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Signup
        </h2>

        <form className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200"
          >
            Sign Up 
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

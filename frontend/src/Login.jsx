import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="w-full py-4 px-6 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="hh-icon gradient-text">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">
              HobbyHub
            </span>
          </Link>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex-1 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>

          <p className="text-sm text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

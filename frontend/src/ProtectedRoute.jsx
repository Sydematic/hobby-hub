// src/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center p-6">Checking authentication...</div>;
  }

  if (!user) {
    // redirect to login and store attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While checking auth state, you can show a loading message or spinner
  if (loading) {
    return <div className="text-center p-6">Checking authentication...</div>;
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render children (the protected page)
  return children;
}

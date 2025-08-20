import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // not logged in → go to login/signup
    return <Navigate to="/login" replace />;
  }

  return children;
}

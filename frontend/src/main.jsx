import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute"; // ✅ import
import DashboardPage from './DashboardPage';
import TravelPage from './TravelPage';
import WorkoutPage from './WorkoutPage';
import FoodPage from './FoodPage';
import AddRecipe from "./addrecipe";
import SignupPage from './Signup';
import Login from './Login';
import AboutUs from './AboutUs';
import './style.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>  {/* ✅ Wrap app in AuthProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/food" element={<FoodPage />} />
            
            {/* ✅ Protected route */}
            <Route 
              path="/addrecipe" 
              element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              } 
            />

            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);


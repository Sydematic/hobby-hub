import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from './DashboardPage';
import TravelPage from './TravelPage';
import WorkoutPage from './WorkoutPage';
import FoodPage from './FoodPage';
import TestColors from './TestColors';
import './style.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/test-colors" element={<TestColors />} />
        {/* Optional: Catch-all route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


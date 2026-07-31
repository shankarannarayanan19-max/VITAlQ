import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PatientSearchPage from './pages/PatientSearchPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import PatientPortalPage from './pages/PatientPortalPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private Patient Portal Routes */}
        <Route 
          path="/portal" 
          element={
            <ProtectedRoute>
              <PatientPortalPage />
            </ProtectedRoute>
          } 
        />

        {/* Private Clinical Workspace Routes */}
        <Route 
          path="/patients" 
          element={
            <ProtectedRoute>
              <PatientSearchPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient/:id" 
          element={
            <ProtectedRoute>
              <PatientDashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* Catch-All 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

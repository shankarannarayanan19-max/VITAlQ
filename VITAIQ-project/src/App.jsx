import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HealthRecordProvider } from './context/HealthRecordContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DoctorRegisterPage from './pages/DoctorRegisterPage';
import PatientRegisterPage from './pages/PatientRegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PatientSearchPage from './pages/PatientSearchPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import PatientPortalPage from './pages/PatientPortalPage';
import AppointmentsPage from './pages/AppointmentsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HealthRecordProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register/doctor" element={<DoctorRegisterPage />} />
              <Route path="/register/patient" element={<PatientRegisterPage />} />

              {/* Hospital Administrator Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />

              {/* Appointment Hub Routes */}
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'patient']}>
                    <AppointmentsPage />
                  </ProtectedRoute>
                } 
              />

              {/* Patient Portal Routes */}
              <Route 
                path="/portal" 
                element={
                  <ProtectedRoute allowedRoles={['patient', 'admin', 'doctor']}>
                    <PatientPortalPage />
                  </ProtectedRoute>
                } 
              />

              {/* Clinical Workspace Routes */}
              <Route 
                path="/patients" 
                element={
                  <ProtectedRoute allowedRoles={['doctor', 'admin']}>
                    <PatientSearchPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/:id" 
                element={
                  <ProtectedRoute allowedRoles={['doctor', 'admin', 'patient']}>
                    <PatientDashboardPage />
                  </ProtectedRoute>
                } 
              />

              {/* Catch-All 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </HealthRecordProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

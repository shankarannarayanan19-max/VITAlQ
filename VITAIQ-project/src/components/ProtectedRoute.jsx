import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = null }) {
  const { currentUser, role } = useAuth();
  const isAuth = localStorage.getItem("vitaiq_auth") === "true";
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser?.role || role || localStorage.getItem("vitaiq_role") || "doctor";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect if role is not authorized
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'patient') return <Navigate to="/portal" replace />;
    return <Navigate to="/patients" replace />;
  }

  return children;
}

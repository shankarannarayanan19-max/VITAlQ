import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Guard component that redirects users to the login screen
 * if they are not authenticated via the local storage state.
 */
export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("vitaiq_auth") === "true";
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

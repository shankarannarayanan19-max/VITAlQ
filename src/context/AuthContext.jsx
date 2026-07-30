import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { sendOTP, verifyOTP, invalidateOTP } from '../services/otpService';
import { useSessionSync } from '../hooks/useSessionSync';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getCurrentSession());
  const [users, setUsers] = useState(() => authService.getRegisteredUsers());

  // Re-sync session state when window storage updates across tabs
  const handleSessionSync = useCallback((newSession) => {
    setSession(newSession);
    setUsers(authService.getRegisteredUsers());
  }, []);

  useSessionSync(handleSessionSync);

  // Sync users list whenever local storage updates
  useEffect(() => {
    setUsers(authService.getRegisteredUsers());
  }, [session]);

  const currentUser = session?.user || null;
  const role = session?.role || "visitor";

  const loginUser = (usernameOrEmail, password) => {
    const res = authService.login(usernameOrEmail, password);
    if (res.success) {
      setSession(res.session);
    }
    return res;
  };

  const logoutUser = () => {
    authService.logout();
    setSession(null);
  };

  const registerDoctor = (doctorDetails) => {
    const res = authService.registerDoctor(doctorDetails);
    if (res.success) {
      setSession(res.session);
    }
    return res;
  };

  const registerPatient = (patientDetails) => {
    const res = authService.registerPatient(patientDetails);
    if (res.success) {
      setSession(res.session);
    }
    return res;
  };

  const sendEmailOtp = async (email) => {
    return await sendOTP(email);
  };

  const verifyEmailOtp = (email, otpCode) => {
    return verifyOTP(email, otpCode);
  };

  const invalidateEmailOtp = (email) => {
    invalidateOTP(email);
  };

  const approveDoctor = (doctorId) => {
    const allUsers = authService.getRegisteredUsers();
    const updated = allUsers.map(u => {
      if (u.id === doctorId) {
        return { ...u, verificationStatus: "Approved", verified: true };
      }
      return u;
    });
    localStorage.setItem("vitaiq_registered_users", JSON.stringify(updated));
    setUsers(updated);
  };

  const suspendUser = (userId) => {
    const allUsers = authService.getRegisteredUsers();
    const updated = allUsers.map(u => {
      if (u.id === userId) {
        return { ...u, status: "Suspended" };
      }
      return u;
    });
    localStorage.setItem("vitaiq_registered_users", JSON.stringify(updated));
    setUsers(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        currentUser,
        role,
        users,
        loginUser,
        logoutUser,
        registerDoctor,
        registerPatient,
        sendEmailOtp,
        verifyEmailOtp,
        invalidateEmailOtp,
        approveDoctor,
        suspendUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

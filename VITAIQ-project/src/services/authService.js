// Reusable Enterprise Authentication & Multi-Session Service

import { INITIAL_USERS } from '../data/enterpriseData';
import { logAuditEvent } from '../utils/auditLogger';

export const authService = {
  // Retrieve Active Multi-Tab Session
  getCurrentSession: () => {
    try {
      const stored = localStorage.getItem("vitaiq_current_session");
      if (!stored) return null;
      const session = JSON.parse(stored);
      // Check token expiration (24 hours default)
      if (session.expiresAt && Date.now() > session.expiresAt) {
        localStorage.removeItem("vitaiq_current_session");
        return null;
      }
      return session;
    } catch (err) {
      console.error("Error reading active session token:", err);
      return null;
    }
  },

  // Retrieve All Registered System Users
  getRegisteredUsers: () => {
    try {
      const stored = localStorage.getItem("vitaiq_registered_users");
      if (!stored) {
        localStorage.setItem("vitaiq_registered_users", JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error reading user registry:", err);
      return INITIAL_USERS;
    }
  },

  // Returning Sign-In (Username + Password)
  login: (usernameOrEmail, password) => {
    const users = authService.getRegisteredUsers();
    const query = usernameOrEmail.trim().toLowerCase();

    const user = users.find(u => 
      u.username.toLowerCase() === query || 
      u.email.toLowerCase() === query
    );

    if (!user) {
      return { success: false, message: "User account not found. Please check your credentials or register." };
    }

    if (user.status === "Suspended") {
      return { success: false, message: "This account has been suspended by the Hospital Administrator." };
    }

    // Create session token with 24h expiration
    const sessionToken = {
      token: `sess_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      userId: user.id,
      user: user,
      role: user.role,
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };

    localStorage.setItem("vitaiq_current_session", JSON.stringify(sessionToken));

    logAuditEvent({
      action: "User Authentication",
      category: "Security",
      details: `Successful single-step login for user @${user.username} (${user.role})`,
      user: user
    });

    return { success: true, session: sessionToken, user: user };
  },

  // Logout (Synchronizes across all open browser tabs)
  logout: () => {
    const session = authService.getCurrentSession();
    if (session) {
      logAuditEvent({
        action: "User Sign-Out",
        category: "Security",
        details: `User @${session.username} signed out of system session`,
        user: session.user
      });
    }
    localStorage.removeItem("vitaiq_current_session");
    return { success: true };
  },

  // Register New Doctor Account
  registerDoctor: (doctorDetails) => {
    const users = authService.getRegisteredUsers();
    const emailLower = doctorDetails.email.trim().toLowerCase();
    const usernameLower = doctorDetails.username.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      return { success: false, message: "A doctor profile with this email address already exists." };
    }
    if (users.some(u => u.username.toLowerCase() === usernameLower)) {
      return { success: false, message: "Username is already taken. Please choose another username." };
    }

    const newDoctor = {
      id: `USER_DOC_${Date.now()}`,
      role: "doctor",
      username: doctorDetails.username.trim(),
      email: doctorDetails.email.trim(),
      password: doctorDetails.password,
      name: doctorDetails.name.trim(),
      avatar: doctorDetails.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
      gender: doctorDetails.gender,
      dob: doctorDetails.dob,
      phone: doctorDetails.phone,
      nmcNumber: doctorDetails.nmcNumber.trim(),
      specialty: doctorDetails.specialty,
      qualification: doctorDetails.qualification,
      experience: parseInt(doctorDetails.experience, 10) || 1,
      hospitalName: doctorDetails.hospitalName,
      department: doctorDetails.department,
      designation: doctorDetails.designation || "Consultant Specialist",
      hospitalAddress: doctorDetails.hospitalAddress,
      city: doctorDetails.city,
      state: doctorDetails.state,
      languages: doctorDetails.languages || ["English"],
      bio: doctorDetails.bio || "",
      consultationHours: doctorDetails.consultationHours || "Mon-Fri: 09:00 AM - 05:00 PM",
      consultationType: doctorDetails.consultationType || "Both Physical & Video",
      verificationStatus: "Approved", // Approved for clinical operations
      verified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [newDoctor, ...users];
    localStorage.setItem("vitaiq_registered_users", JSON.stringify(updatedUsers));

    logAuditEvent({
      action: "Doctor Onboarding",
      category: "User Registration",
      details: `New Doctor registered: ${newDoctor.name} (${newDoctor.nmcNumber})`,
      user: newDoctor
    });

    return authService.login(newDoctor.username, newDoctor.password);
  },

  // Register New Independent Patient Account
  registerPatient: (patientDetails) => {
    const users = authService.getRegisteredUsers();
    const emailLower = patientDetails.email.trim().toLowerCase();
    const usernameLower = patientDetails.username.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      return { success: false, message: "A patient profile with this email address already exists." };
    }
    if (users.some(u => u.username.toLowerCase() === usernameLower)) {
      return { success: false, message: "Username is already taken. Please choose another username." };
    }

    const patientId = `VIT${Math.floor(100 + Math.random() * 900)}`;

    const newPatient = {
      id: `USER_PAT_${Date.now()}`,
      role: "patient",
      patientId: patientId,
      username: patientDetails.username.trim(),
      email: patientDetails.email.trim(),
      password: patientDetails.password,
      name: patientDetails.name.trim(),
      avatar: patientDetails.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      dob: patientDetails.dob,
      gender: patientDetails.gender,
      bloodGroup: patientDetails.bloodGroup,
      phone: patientDetails.phone,
      emergencyContact: patientDetails.emergencyContact,
      address: patientDetails.address,
      insuranceProvider: patientDetails.insuranceProvider || "Self-Pay / Private Insurance",
      verified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [newPatient, ...users];
    localStorage.setItem("vitaiq_registered_users", JSON.stringify(updatedUsers));

    logAuditEvent({
      action: "Patient PHR Account Created",
      category: "User Registration",
      details: `New Patient registered: ${newPatient.name} (Patient ID: ${patientId})`,
      user: newPatient
    });

    return authService.login(newPatient.username, newPatient.password);
  }
};

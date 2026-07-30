// Unified Enterprise Data Interface (Aggregating Domain Models)

import { INITIAL_DOCTORS, BUILTIN_AVATARS } from './doctors/doctorsData';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS } from './hospitals/hospitalsData';
import { INITIAL_APPOINTMENTS } from './appointments/appointmentsData';
import { INITIAL_NOTIFICATIONS } from './notifications/notificationsData';

export {
  INITIAL_DOCTORS,
  BUILTIN_AVATARS,
  INITIAL_HOSPITALS,
  INITIAL_DEPARTMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_NOTIFICATIONS
};

export const INITIAL_USERS = [
  {
    id: "USER_ADMIN",
    username: "admin.vitaiq",
    email: "admin@vitaiq.health",
    role: "admin",
    name: "System Administrator",
    avatar: BUILTIN_AVATARS[0].url,
    verified: true,
    createdAt: "2025-01-01"
  },
  ...INITIAL_DOCTORS,
  {
    id: "USER_PAT_1",
    username: "arunkumar",
    email: "arun.kumar@healthmail.com",
    role: "patient",
    name: "Arun Kumar",
    patientId: "VIT001",
    avatar: BUILTIN_AVATARS[5]?.url || BUILTIN_AVATARS[0].url,
    dob: "1973-05-14",
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    emergencyContact: "Priya Kumar (Wife) - +91 98765 43211",
    address: "Flat 4B, Emerald Heights, T. Nagar, Chennai",
    insuranceProvider: "Star Health Insurance (Policy #SH-882910)",
    verified: true,
    createdAt: "2025-01-15"
  },
  {
    id: "USER_PAT_2",
    username: "ananyasen",
    email: "ananya.sen@healthmail.com",
    role: "patient",
    name: "Ananya Sen",
    patientId: "VIT007",
    avatar: BUILTIN_AVATARS[4]?.url || BUILTIN_AVATARS[0].url,
    dob: "1998-09-22",
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 97112 33445",
    emergencyContact: "Kunal Sen (Husband) - +91 97112 33446",
    address: "Plot 12, Jubilee Hills, Hyderabad",
    insuranceProvider: "ICICI Lombard Health (Policy #IL-99210)",
    verified: true,
    createdAt: "2026-03-01"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG_1001",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    userId: "USER_ADMIN",
    userName: "System Administrator",
    userRole: "admin",
    action: "Doctor Account Approved",
    category: "User Management",
    details: "Approved NMC Registration NMC/2015/04/82910 for Dr. Aditi Sharma",
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG_1002",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    userId: "USER_DOC_1",
    userName: "Dr. Aditi Sharma",
    userRole: "doctor",
    action: "Patient Record Accessed",
    category: "Clinical Data Access",
    details: "Viewed longitudinal health twin record for Patient ID: VIT001 (Arun Kumar)",
    ipAddress: "192.168.1.88"
  },
  {
    id: "LOG_1003",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    userId: "USER_PAT_1",
    userName: "Arun Kumar",
    userRole: "patient",
    action: "PHR Document Uploaded",
    category: "Personal Health Record",
    details: "Uploaded Comprehensive Metabolic & Lipid Panel (Apollo Hospitals)",
    ipAddress: "182.74.12.9"
  }
];

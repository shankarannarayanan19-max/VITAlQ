// Production Backend Service Abstraction Layer
// Seamlessly delegates to OTP service and authentication engine

import { sendOTP, verifyOTP, generateOTP, invalidateOTP } from './otpService';
import { logAuditEvent, getAuditLogs } from '../utils/auditLogger';

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiService = {
  // Reusable Authentication & OTP Endpoints
  auth: {
    generateOtp: () => generateOTP(),

    sendOtp: async (email) => {
      if (useMockApi) {
        return sendOTP(email);
      }
      try {
        const res = await fetch(`${baseUrl}/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        return await res.json();
      } catch (err) {
        return { success: false, message: 'API failure: Unable to reach authentication server.' };
      }
    },

    verifyOtp: async (email, otpCode) => {
      if (useMockApi) {
        return verifyOTP(email, otpCode);
      }
      try {
        const res = await fetch(`${baseUrl}/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpCode })
        });
        return await res.json();
      } catch (err) {
        return { success: false, message: 'API failure: Unable to reach authentication server.' };
      }
    },

    invalidateOtp: (email) => {
      invalidateOTP(email);
    }
  },

  // Patient Records Endpoint
  patients: {
    getAll: async () => {
      if (useMockApi) {
        const saved = localStorage.getItem("vitaiq_patients_records");
        return saved ? JSON.parse(saved) : {};
      }
      const res = await fetch(`${baseUrl}/patients`);
      return res.json();
    },

    getById: async (id) => {
      if (useMockApi) {
        const saved = localStorage.getItem("vitaiq_patients_records");
        const store = saved ? JSON.parse(saved) : {};
        return store[id] || null;
      }
      const res = await fetch(`${baseUrl}/patients/${id}`);
      return res.json();
    }
  },

  // Audit Logs Endpoint
  audits: {
    getLogs: async () => {
      if (useMockApi) {
        return getAuditLogs();
      }
      const res = await fetch(`${baseUrl}/audits`);
      return res.json();
    },

    log: (eventData) => {
      return logAuditEvent(eventData);
    }
  }
};

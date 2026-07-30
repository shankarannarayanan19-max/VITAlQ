// Production Backend Service Abstraction Layer
import { sendOTP, verifyOTP, generateOTP, invalidateOTP } from './otpService';
import { logAuditEvent, getAuditLogs } from '../utils/auditLogger';

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const session = JSON.parse(localStorage.getItem('vitaiq_current_session') || '{}');
  const headers = { 'Content-Type': 'application/json' };
  if (session.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }
  return headers;
};

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
          headers: getAuthHeaders(),
          body: JSON.stringify({ email })
        });
        return await res.json();
      } catch (err) {
        return sendOTP(email);
      }
    },

    verifyOtp: async (email, otpCode) => {
      if (useMockApi) {
        return verifyOTP(email, otpCode);
      }
      try {
        const res = await fetch(`${baseUrl}/auth/verify-otp`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ email, otp: otpCode })
        });
        return await res.json();
      } catch (err) {
        return verifyOTP(email, otpCode);
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
      try {
        const res = await fetch(`${baseUrl}/patients`, { headers: getAuthHeaders() });
        const json = await res.json();
        return json.patients || json;
      } catch (err) {
        console.warn("API offline, falling back to local store");
        const saved = localStorage.getItem("vitaiq_patients_records");
        return saved ? JSON.parse(saved) : {};
      }
    },

    getById: async (id) => {
      if (useMockApi) {
        const saved = localStorage.getItem("vitaiq_patients_records");
        const store = saved ? JSON.parse(saved) : {};
        return store[id] || null;
      }
      try {
        const res = await fetch(`${baseUrl}/patients/${id}`, { headers: getAuthHeaders() });
        const json = await res.json();
        return json.patient || json;
      } catch (err) {
        const saved = localStorage.getItem("vitaiq_patients_records");
        const store = saved ? JSON.parse(saved) : {};
        return store[id] || null;
      }
    },

    generateClinicalSummary: async (patientId) => {
      if (useMockApi) return null;
      try {
        const res = await fetch(`${baseUrl}/ai/clinical-summary`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ patientId })
        });
        return await res.json();
      } catch (err) {
        return { success: false, message: 'AI service unavailable' };
      }
    }
  },

  // Appointments Endpoint
  appointments: {
    getAll: async () => {
      if (useMockApi) {
        const saved = localStorage.getItem("vitaiq_appointments");
        return saved ? JSON.parse(saved) : [];
      }
      try {
        const res = await fetch(`${baseUrl}/appointments`, { headers: getAuthHeaders() });
        const json = await res.json();
        return json.appointments || [];
      } catch (err) {
        const saved = localStorage.getItem("vitaiq_appointments");
        return saved ? JSON.parse(saved) : [];
      }
    },

    create: async (appointmentData) => {
      if (useMockApi) return null;
      try {
        const res = await fetch(`${baseUrl}/appointments`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(appointmentData)
        });
        return await res.json();
      } catch (err) {
        return { success: false, message: 'Server unreachable' };
      }
    }
  },

  // Hospitals Endpoint
  hospitals: {
    getAll: async () => {
      if (useMockApi) {
        const saved = localStorage.getItem("vitaiq_hospitals");
        return saved ? JSON.parse(saved) : [];
      }
      try {
        const res = await fetch(`${baseUrl}/hospitals`, { headers: getAuthHeaders() });
        const json = await res.json();
        return json.hospitals || [];
      } catch (err) {
        const saved = localStorage.getItem("vitaiq_hospitals");
        return saved ? JSON.parse(saved) : [];
      }
    }
  },

  // Audit Logs Endpoint
  audits: {
    getLogs: async () => {
      if (useMockApi) {
        return getAuditLogs();
      }
      try {
        const res = await fetch(`${baseUrl}/audits`, { headers: getAuthHeaders() });
        const json = await res.json();
        return json.logs || json;
      } catch (err) {
        return getAuditLogs();
      }
    },

    log: async (eventData) => {
      logAuditEvent(eventData);
      if (!useMockApi) {
        try {
          await fetch(`${baseUrl}/audits`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(eventData)
          });
        } catch (e) {}
      }
    }
  }
};

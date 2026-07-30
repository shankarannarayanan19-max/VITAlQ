// System-Wide Enterprise Audit Logger Utility
import { INITIAL_AUDIT_LOGS } from '../data/enterpriseData';

export const logAuditEvent = ({ action, category, details, user }) => {
  try {
    const existingLogs = JSON.parse(localStorage.getItem("vitaiq_audit_logs") || "[]");
    
    const newLog = {
      id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: user?.id || localStorage.getItem("vitaiq_user_id") || "ANONYMOUS",
      userName: user?.name || localStorage.getItem("vitaiq_user_name") || "Guest / Unauthenticated",
      userRole: user?.role || localStorage.getItem("vitaiq_role") || "visitor",
      action: action || "System Event",
      category: category || "General Audit",
      details: details || "No additional event metadata provided",
      ipAddress: "127.0.0.1 (Local Session)"
    };

    const updatedLogs = [newLog, ...existingLogs].slice(0, 200); // Maintain last 200 logs
    localStorage.setItem("vitaiq_audit_logs", JSON.stringify(updatedLogs));
    return newLog;
  } catch (err) {
    console.error("Failed to log audit event:", err);
    return null;
  }
};

export const getAuditLogs = () => {
  try {
    const stored = localStorage.getItem("vitaiq_audit_logs");
    if (!stored) {
      localStorage.setItem("vitaiq_audit_logs", JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error("Error reading audit logs:", err);
    return [];
  }
};

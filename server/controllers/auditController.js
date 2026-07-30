import { db } from '../db/db.js';

export const getAuditLogs = async (req, res) => {
  try {
    const logs = db.getAuditLogs();
    return res.json({ success: true, logs });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve audit log history.' });
  }
};

export const logEvent = async (req, res) => {
  try {
    const { action, category, details, user } = req.body;
    const logEntry = {
      id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: user?.id || (req.user ? req.user.id : 'ANONYMOUS'),
      userName: user?.name || (req.user ? req.user.name : 'System User'),
      userRole: user?.role || (req.user ? req.user.role : 'visitor'),
      action: action || 'System Event',
      category: category || 'General Audit',
      details: details || 'No additional event metadata provided',
      ipAddress: req.ip || '127.0.0.1'
    };

    const saved = db.addAuditLog(logEntry);
    return res.status(201).json({ success: true, log: saved });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to record audit event.' });
  }
};

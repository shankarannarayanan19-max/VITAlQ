import { db } from '../db/db.js';

export const getUsers = async (req, res) => {
  try {
    const users = db.getUsers().map(u => {
      const { passwordHash, ...safeUser } = u;
      return safeUser;
    });
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving user accounts.' });
  }
};

export const approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const updated = db.updateUser(doctorId, {
      verificationStatus: 'Approved',
      verified: true
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Doctor account not found.' });
    }

    db.addAuditLog({
      id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: req.user?.id || 'USER_ADMIN',
      userName: req.user?.name || 'System Administrator',
      userRole: 'admin',
      action: 'Doctor Account Approved',
      category: 'User Management',
      details: `Approved doctor registration for ${updated.name} (NMC: ${updated.nmcNumber || 'N/A'})`,
      ipAddress: req.ip || '127.0.0.1'
    });

    return res.json({ success: true, message: 'Doctor approved successfully.', user: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error approving doctor account.' });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = db.updateUser(userId, { status: 'Suspended' });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    db.addAuditLog({
      id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: req.user?.id || 'USER_ADMIN',
      userName: req.user?.name || 'System Administrator',
      userRole: 'admin',
      action: 'User Account Suspended',
      category: 'User Management',
      details: `Suspended access privileges for @${updated.username} (${updated.role})`,
      ipAddress: req.ip || '127.0.0.1'
    });

    return res.json({ success: true, message: 'User account suspended.', user: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error suspending user account.' });
  }
};

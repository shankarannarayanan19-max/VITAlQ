import { db } from '../db/db.js';

export const getNotifications = async (req, res) => {
  try {
    const userId = req.query.userId || (req.user ? req.user.id : null);
    const notifications = db.getNotifications(userId);
    return res.json({ success: true, notifications });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve notifications.' });
  }
};

export const markRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.markNotificationAsRead(id);
    return res.json({ success: true, notification: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update notification status.' });
  }
};

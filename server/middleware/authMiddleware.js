import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { db } from '../db/db.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied: No authentication token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = db.getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token: User no longer exists.' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ success: false, message: 'Account is suspended by administrator.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired authentication session token.' });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = db.getUserById(decoded.userId);
      if (user && user.status !== 'Suspended') {
        req.user = user;
      }
    } catch (e) {
      // Ignore token failure for optional auth
    }
  }
  next();
};

export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Session context missing.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Forbidden: Requires one of [${allowedRoles.join(', ')}] roles.` });
    }

    next();
  };
};

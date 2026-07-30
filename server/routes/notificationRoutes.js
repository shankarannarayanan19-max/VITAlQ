import express from 'express';
import { getNotifications, markRead } from '../controllers/notificationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getNotifications);
router.put('/:id/read', markRead);

export default router;

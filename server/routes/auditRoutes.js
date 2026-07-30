import express from 'express';
import { getAuditLogs, logEvent } from '../controllers/auditController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAuditLogs);
router.post('/', optionalAuth, logEvent);

export default router;

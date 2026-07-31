import express from 'express';
import { getUsers, approveDoctor, suspendUser } from '../controllers/userController.js';
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, requireRole(['admin', 'doctor']), getUsers);
router.put('/:doctorId/approve', authenticateToken, requireRole(['admin']), approveDoctor);
router.put('/:userId/suspend', authenticateToken, requireRole(['admin']), suspendUser);

export default router;

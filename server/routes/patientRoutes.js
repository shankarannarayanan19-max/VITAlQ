import express from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, addTimelineEvent } from '../controllers/patientController.js';
import { authenticateToken, optionalAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// All patient endpoints require authentication
router.get('/', authenticateToken, requireRole(['admin', 'doctor']), getAllPatients);
router.get('/:id', authenticateToken, getPatientById);
router.post('/', authenticateToken, requireRole(['admin', 'doctor']), createPatient);
router.put('/:id', authenticateToken, requireRole(['admin', 'doctor']), updatePatient);
router.post('/:id/timeline', authenticateToken, addTimelineEvent);

export default router;

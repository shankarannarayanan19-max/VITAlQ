import express from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, addTimelineEvent } from '../controllers/patientController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPatients);
router.get('/:id', optionalAuth, getPatientById);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.post('/:id/timeline', optionalAuth, addTimelineEvent);

export default router;

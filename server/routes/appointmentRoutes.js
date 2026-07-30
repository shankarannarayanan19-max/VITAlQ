import express from 'express';
import { getAppointments, createAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAppointments);
router.post('/', optionalAuth, createAppointment);
router.put('/:id/status', updateAppointmentStatus);

export default router;

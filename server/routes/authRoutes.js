import express from 'express';
import { login, registerDoctor, registerPatient, sendOtp, verifyOtp, getMe } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register-doctor', registerDoctor);
router.post('/register-patient', registerPatient);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', authenticateToken, getMe);

export default router;

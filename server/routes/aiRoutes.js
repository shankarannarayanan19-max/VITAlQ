import express from 'express';
import { generateClinicalSummary } from '../controllers/aiController.js';

const router = express.Router();

router.post('/clinical-summary', generateClinicalSummary);

export default router;

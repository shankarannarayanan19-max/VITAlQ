import express from 'express';
import { getHospitals, getDepartments } from '../controllers/hospitalController.js';

const router = express.Router();

router.get('/hospitals', getHospitals);
router.get('/departments', getDepartments);

export default router;

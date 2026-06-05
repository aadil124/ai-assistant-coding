import express from 'express';
import * as doctorController from '../controllers/doctor.controller.js';
import { authenticate, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { searchDoctorsSchema } from '../validation/consultation.validation.js';
import { registerDoctorSchema as regSchema } from '../validation/auth.validation.js';

const router = express.Router();

// Public Doctor Search
router.get('/', validate(searchDoctorsSchema, 'query'), doctorController.searchDoctors);

// Public Doctor Registration signup
router.post('/register', validate(regSchema), doctorController.registerDoctor);

// Admin-only Doctor License Verification
router.post('/:doctorId/verify', authenticate, checkRole(['admin']), doctorController.verifyDoctor);

export default router;

import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { registerPatientSchema, loginSchema } from '../validation/auth.validation.js';

const router = express.Router();

// Patient registration endpoint
router.post('/register', validate(registerPatientSchema), authController.registerPatient);

// Unified login endpoint (patients, doctors, admins)
router.post('/login', validate(loginSchema), authController.login);

export default router;

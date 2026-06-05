import express from 'express';
import * as prescriptionController from '../controllers/prescription.controller.js';
import { authenticate, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createPrescriptionSchema, signPrescriptionSchema } from '../validation/consultation.validation.js';

const router = express.Router();

// Doctor-only routes to create draft prescriptions
router.post('/', authenticate, checkRole(['doctor']), validate(createPrescriptionSchema), prescriptionController.createPrescriptionDraft);

// Doctor-only routes to finalize prescription via MFA e-signature
router.post('/:id/sign', authenticate, checkRole(['doctor']), validate(signPrescriptionSchema), prescriptionController.signPrescription);

export default router;

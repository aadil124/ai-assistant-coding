import express from 'express';
import * as appointmentController from '../controllers/appointment.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  lockSlotSchema,
  confirmAppointmentSchema,
  updateStatusSchema,
} from '../validation/appointment.validation.js';

const router = express.Router();

// Get authenticated user's appointments
router.get('/', authenticate, appointmentController.getMyAppointments);

// Lock a slot for 10 minutes
router.post('/lock', authenticate, validate(lockSlotSchema), appointmentController.lockSlot);

// Confirm locked booking
router.post('/confirm', authenticate, validate(confirmAppointmentSchema), appointmentController.confirmBooking);

// Update status of a specific appointment
router.patch('/:id/status', authenticate, validate(updateStatusSchema), appointmentController.updateStatus);

export default router;

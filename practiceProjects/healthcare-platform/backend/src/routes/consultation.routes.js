import express from 'express';
import * as consultationController from '../controllers/consultation.controller.js';
import { authenticate, checkRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { joinRoomSchema, saveNotesSchema } from '../validation/consultation.validation.js';

const router = express.Router();

// Authenticated users (patient/doctor) joining a WebRTC Room
router.post('/join', authenticate, validate(joinRoomSchema), consultationController.joinRoom);

// Doctor-only routes to save/finalise consultation clinical observations
router.post('/:id/notes', authenticate, checkRole(['doctor']), validate(saveNotesSchema), consultationController.saveNotes);

// Authenticated users retrieving notes summaries
router.get('/:id/notes', authenticate, consultationController.getNotes);

export default router;

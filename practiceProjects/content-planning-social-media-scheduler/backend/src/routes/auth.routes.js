import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { registerRules, loginRules } from '../validations/auth.validation.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerRules, register);
router.post('/login', loginRules, login);
router.get('/me', protect, getMe);

export default router;

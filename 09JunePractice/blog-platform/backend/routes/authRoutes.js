import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Define route for guest registration
router.post('/register', register);

// Define route for author login
router.post('/login', login);

export default router;


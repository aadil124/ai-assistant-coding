import * as authService from '../services/auth.service.js';
import redis from '../utils/redis.js';

export const registerPatient = async (req, res) => {
  try {
    const result = await authService.registerPatient(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.token;
    if (token) {
      // Blacklist token in Redis for 24h (86400 seconds)
      await redis.setex(`blacklist:${token}`, 86400, 'true');
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

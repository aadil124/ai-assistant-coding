import User from '../models/User.js';
import { generateToken } from '../services/authService.js';

/**
 * Handles guest registration
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Basic verification of required parameters
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Please provide username, email and password',
      });
    }

    // Save user to database (runs Mongoose pre-save hashing & validation)
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate stateless authentication token
    const token = generateToken(user._id);

    // Format response matching Section 4 API requirements
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles author login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Prevent NoSQL Injection: ensure values are strings
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Invalid input format',
      });
    }

    // Query database for user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Verify credentials
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Format response matching Section 4 API requirements
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};


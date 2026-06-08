import jwt from 'jsonwebtoken';
import redis from '../utils/redis.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-telehealth-key-development';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Check if token is blacklisted in Redis cache
    const isBlacklisted = await redis.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been invalidated (logged out)' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    req.token = token; // Hold token for revocation endpoint
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token signature verification failed or token expired' });
  }
};

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

import jwt from 'jsonwebtoken';

/**
 * Generates a stateless JSON Web Token (JWT) for the authenticated user
 * @param {string} userId - The database ID of the user
 * @returns {string} - The signed JWT
 */
export const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '7d',
  });
};

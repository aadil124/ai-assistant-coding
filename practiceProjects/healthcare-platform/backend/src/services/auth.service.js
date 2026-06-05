import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-telehealth-key-development';

export const registerPatient = async (patientData) => {
  const existingUser = await User.findOne({ email: patientData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(patientData.password, salt);

  const user = new User({
    email: patientData.email,
    passwordHash,
    role: 'patient',
    phoneNumber: patientData.phone_number,
  });

  await user.save();
  return { userId: user._id, role: user.role, status: 'success' };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

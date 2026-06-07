import User from '../models/User.js';
import Workspace from '../models/Workspace.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'creatorsuite_jwt_dev_secret_key_12345!', {
    expiresIn: '30d'
  });
};

export const register = async (req, res, next) => {
  const { email, password, displayName } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ email, password, displayName });

    // Auto-create a default workspace for the user
    const workspace = await Workspace.create({
      name: `${displayName}'s Workspace`,
      members: [{
        userId: user._id,
        role: 'ADMIN',
        status: 'ACTIVE'
      }]
    });

    user.activeWorkspace = workspace._id;
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        activeWorkspace: user.activeWorkspace
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        activeWorkspace: user.activeWorkspace
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('activeWorkspace');
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

import Workspace from '../models/Workspace.js';
import User from '../models/User.js';
import { encrypt } from '../services/crypto.service.js';

export const createWorkspace = async (req, res, next) => {
  const { name } = req.body;

  try {
    const workspace = await Workspace.create({
      name,
      members: [{
        userId: req.user._id,
        role: 'ADMIN',
        status: 'ACTIVE'
      }]
    });

    // Update active workspace
    req.user.activeWorkspace = workspace._id;
    await req.user.save();

    res.status(201).json({ success: true, data: workspace });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaces = async (req, res, next) => {
  try {
    const workspaces = await Workspace.find({
      'members.userId': req.user._id
    });
    res.status(200).json({ success: true, data: workspaces });
  } catch (error) {
    next(error);
  }
};

export const switchWorkspace = async (req, res, next) => {
  const { workspaceId } = req.params;

  try {
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      'members.userId': req.user._id
    });

    if (!workspace) {
      return res.status(403).json({ success: false, message: 'Access denied or workspace not found.' });
    }

    req.user.activeWorkspace = workspace._id;
    await req.user.save();

    res.status(200).json({ success: true, activeWorkspace: workspace._id });
  } catch (error) {
    next(error);
  }
};

export const inviteMember = async (req, res, next) => {
  const { email, role } = req.body;

  try {
    // Find invited user by email
    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      return res.status(404).json({ success: false, message: 'User with this email does not exist.' });
    }

    // Check if user is already a member
    const alreadyMember = req.workspace.members.some(
      m => m.userId.toString() === invitedUser._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({ success: false, message: 'User is already a member of this workspace.' });
    }

    req.workspace.members.push({
      userId: invitedUser._id,
      role,
      status: 'PENDING'
    });

    await req.workspace.save();

    res.status(200).json({ success: true, message: 'User invited successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceMembers = async (req, res, next) => {
  try {
    const workspace = await Workspace.findById(req.workspace._id).populate('members.userId', 'displayName email avatar');
    res.status(200).json({ success: true, data: workspace.members });
  } catch (error) {
    next(error);
  }
};

export const connectSocialChannel = async (req, res, next) => {
  const { platform, platformUserId, platformUsername, accessToken, refreshToken, expiresSeconds } = req.body;

  try {
    const encryptedToken = encrypt(accessToken);
    const encryptedRefresh = encrypt(refreshToken);
    const expiresAt = expiresSeconds ? new Date(Date.now() + expiresSeconds * 1000) : null;

    // Remove old credentials for same platform if they exist
    req.workspace.channels = req.workspace.channels.filter(c => c.platform !== platform);

    req.workspace.channels.push({
      platform,
      platformUserId,
      platformUsername,
      encryptedAccessToken: encryptedToken,
      encryptedRefreshToken: encryptedRefresh,
      tokenExpiresAt: expiresAt
    });

    await req.workspace.save();

    res.status(200).json({ success: true, message: `${platform} connected successfully.` });
  } catch (error) {
    next(error);
  }
};

export const getSocialChannels = async (req, res, next) => {
  try {
    // Return connection logs sans encrypted credentials
    const cleanChannels = req.workspace.channels.map(c => ({
      platform: c.platform,
      platformUserId: c.platformUserId,
      platformUsername: c.platformUsername,
      tokenExpiresAt: c.tokenExpiresAt
    }));

    res.status(200).json({ success: true, data: cleanChannels });
  } catch (error) {
    next(error);
  }
};

import express from 'express';
import { 
  createWorkspace, 
  getWorkspaces, 
  switchWorkspace, 
  inviteMember, 
  getWorkspaceMembers,
  connectSocialChannel,
  getSocialChannels
} from '../controllers/workspace.controller.js';
import { createWorkspaceRules, inviteMemberRules } from '../validations/workspace.validation.js';
import { protect } from '../middleware/auth.middleware.js';
import { verifyWorkspaceAccess } from '../middleware/workspace.middleware.js';

const router = express.Router();

// Protected root routes
router.post('/', protect, createWorkspaceRules, createWorkspace);
router.get('/', protect, getWorkspaces);
router.put('/switch/:workspaceId', protect, switchWorkspace);

// Workspace specific routes (requiring workspace context check)
router.post('/invite', protect, verifyWorkspaceAccess(['ADMIN']), inviteMemberRules, inviteMember);
router.get('/members', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']), getWorkspaceMembers);
router.post('/channels', protect, verifyWorkspaceAccess(['ADMIN']), connectSocialChannel);
router.get('/channels', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']), getSocialChannels);

export default router;

import express from 'express';
import { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  reschedulePost, 
  submitForReview, 
  approvePost, 
  rejectPost, 
  addComment, 
  deletePost 
} from '../controllers/post.controller.js';
import { postRules } from '../validations/post.validation.js';
import { protect } from '../middleware/auth.middleware.js';
import { verifyWorkspaceAccess } from '../middleware/workspace.middleware.js';

const router = express.Router();

// All post routes require authentication and workspace verification
router.post('/', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), postRules, createPost);
router.get('/', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']), getPosts);
router.get('/:id', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']), getPostById);
router.put('/:id', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), updatePost);
router.put('/:id/reschedule', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER']), reschedulePost);
router.put('/:id/submit', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), submitForReview);
router.put('/:id/approve', protect, verifyWorkspaceAccess(['ADMIN', 'APPROVER']), approvePost);
router.put('/:id/reject', protect, verifyWorkspaceAccess(['ADMIN', 'APPROVER']), rejectPost);
router.post('/:id/comment', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']), addComment);
router.delete('/:id', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), deletePost);

export default router;

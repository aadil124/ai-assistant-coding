import express from 'express';
import { generateCaption, generateHashtags } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { verifyWorkspaceAccess } from '../middleware/workspace.middleware.js';

const router = express.Router();

router.post('/generate-caption', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), generateCaption);
router.post('/generate-hashtags', protect, verifyWorkspaceAccess(['ADMIN', 'EDITOR']), generateHashtags);

export default router;

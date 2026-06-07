import express from 'express';
import authRoutes from './auth.routes.js';
import workspaceRoutes from './workspace.routes.js';
import postRoutes from './post.routes.js';
import aiRoutes from './ai.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/workspaces', workspaceRoutes);
router.use('/posts', postRoutes);
router.use('/ai', aiRoutes);

export default router;

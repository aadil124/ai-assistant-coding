import express from 'express';
import { getComments, createComment } from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', createComment);

export default router;

import express from 'express';
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Define route for fetching public posts feed
router.get('/', getPosts);

// Define route for creating posts (authenticated)
router.post('/', protect, createPost);

// Define route for editing posts (authenticated)
router.put('/:id', protect, updatePost);

// Define route for deleting posts (authenticated)
router.delete('/:id', protect, deletePost);

// Define route for fetching single post by slug
router.get('/:slug', getPostBySlug);

export default router;


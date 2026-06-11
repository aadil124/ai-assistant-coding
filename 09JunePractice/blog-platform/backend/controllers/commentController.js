import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

/**
 * Escape HTML special characters to prevent XSS attacks
 */
const escapeHTML = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Fetch all comments associated with a post in chronological order
 * GET /api/posts/:postId/comments
 */
export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    // Verify post exists and is published
    const post = await Post.findOne({ _id: postId, status: 'Published' });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

/**
 * Submit a comment to a specific post
 * POST /api/posts/:postId/comments
 */
export const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { name, content } = req.body;

    // Prevent NoSQL Injection: ensure name and content are strings
    if (typeof name !== 'string' || typeof content !== 'string') {
      return res.status(400).json({ error: 'Name and content must be strings' });
    }

    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    // Prevent empty or whitespace-only comments
    if (!trimmedName || !trimmedContent) {
      return res.status(400).json({ error: 'Name and content cannot be empty' });
    }

    // Verify post exists and is published
    const post = await Post.findOne({ _id: postId, status: 'Published' });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Escape strings to prevent XSS
    const sanitizedName = escapeHTML(trimmedName);
    const sanitizedContent = escapeHTML(trimmedContent);

    const comment = await Comment.create({
      post: postId,
      name: sanitizedName,
      content: sanitizedContent,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

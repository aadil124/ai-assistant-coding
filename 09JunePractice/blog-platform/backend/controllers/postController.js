import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { generateUniqueSlug } from '../services/postService.js';
import { sanitizeHTML } from '../utils/sanitize.js';

/**
 * Get all published posts with filtering and pagination
 * GET /api/posts
 */
export const getPosts = async (req, res, next) => {
  try {
    // Extract query parameters
    let { page, limit, category, tag, search } = req.query;

    // Default parameters and input guarding
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 6;

    const query = { status: 'Published' };

    // Apply category filter
    if (category) {
      query.category = category;
    }

    // Apply tag filter
    if (tag) {
      query.tags = tag;
    }

    // Apply search query (partial title/description regex match)
    // Trim and sanitize to prevent regex injection attacks and handle whitespace-only queries
    const trimmedSearch = typeof search === 'string' ? search.trim() : '';
    if (trimmedSearch) {
      const escapedSearch = trimmedSearch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      query.$or = [
        { title: { $regex: escapedSearch, $options: 'i' } },
        { description: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    // Execute query in parallel
    const [posts, totalPosts] = await Promise.all([
      Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'username')
        .lean(),
      Post.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalPosts / limit) || 1;

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get unique categories and their post counts
 * GET /api/categories
 */
export const getCategories = async (req, res, next) => {
  try {
    // Aggregation pipeline to get category names and counts from published posts
    const categories = await Post.aggregate([
      { $match: { status: 'Published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, name: '$_id', count: '$count' } },
      { $sort: { name: 1 } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

/**
 * Get unique tags list
 * GET /api/tags
 */
export const getTags = async (req, res, next) => {
  try {
    // Aggregation pipeline to unwind, group, and sort tags from published posts
    const tags = await Post.aggregate([
      { $match: { status: 'Published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags' } },
      { $sort: { _id: 1 } },
    ]);

    // Flatten to string array
    const tagsList = tags.map((t) => t._id);

    res.status(200).json(tagsList);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single published post by slug
 * GET /api/posts/:slug
 */
export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: 'Published',
    })
      .populate('author', 'username')
      .lean();

    if (!post) {
      return res.status(404).json({
        error: 'Article not found',
      });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new blog post
 * POST /api/posts
 */
export const createPost = async (req, res, next) => {
  try {
    const { title, description, content, category, tags, status } = req.body;

    // Validate presence of required fields
    if (!title || !title.trim() || !content || !content.trim() || !category || !category.trim()) {
      return res.status(400).json({
        error: 'Title, category, and content are required fields.',
      });
    }

    // Prevent NoSQL Injection by guarding types
    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof category !== 'string' ||
      (description && typeof description !== 'string') ||
      (status && typeof status !== 'string')
    ) {
      return res.status(400).json({ error: 'Invalid input types' });
    }

    // Sanitize the content (XSS protection)
    const sanitizedContent = sanitizeHTML(content);

    // Generate unique slug
    const slug = await generateUniqueSlug(title);

    // Ensure status is valid
    const postStatus = status || 'Draft';

    // Create the post document with the current user as author
    const post = await Post.create({
      title: title.trim(),
      slug,
      description: (description || '').trim(),
      content: sanitizedContent,
      category: category.trim(),
      tags: Array.isArray(tags) ? tags.map((t) => t.toString().trim()) : [],
      status: postStatus,
      author: req.user._id,
    });

    // Format response matching Section 4 API requirements
    res.status(201).json({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      category: post.category,
      tags: post.tags,
      status: post.status,
      author: post.author,
      createdAt: post.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing blog post
 * PUT /api/posts/:id
 */
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, content, category, tags, status } = req.body;

    // Retrieve post from database
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Verify ownership (Author Isolation)
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Access Denied: You do not own this post.',
      });
    }

    // Validate presence of required fields
    if (!title || !title.trim() || !content || !content.trim() || !category || !category.trim()) {
      return res.status(400).json({
        error: 'Title, category, and content are required fields.',
      });
    }

    // Prevent NoSQL Injection by guarding types
    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof category !== 'string' ||
      (description && typeof description !== 'string') ||
      (status && typeof status !== 'string')
    ) {
      return res.status(400).json({ error: 'Invalid input types' });
    }

    // Regenerate slug (with collision check) if title changes or unconditionally resolve
    const slug = await generateUniqueSlug(title, post._id);

    // Sanitize the content (XSS protection)
    const sanitizedContent = sanitizeHTML(content);

    // Apply updates
    post.title = title.trim();
    post.slug = slug;
    post.description = (description || '').trim();
    post.content = sanitizedContent;
    post.category = category.trim();
    post.tags = Array.isArray(tags) ? tags.map((t) => t.toString().trim()) : [];
    if (status) {
      post.status = status;
    }

    await post.save();

    // Format response matching Section 4 API requirements
    res.status(200).json({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      category: post.category,
      tags: post.tags,
      status: post.status,
      author: post.author,
      updatedAt: post.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a blog post and cascade delete all comments associated with it
 * DELETE /api/posts/:id
 */
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve post from database
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Verify ownership (Author Isolation)
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Access Denied: You do not own this post.',
      });
    }

    // Cascading delete: Remove all comments associated with the post
    await Comment.deleteMany({ post: id });

    // Delete the post
    await post.deleteOne();

    res.status(200).json({
      message: 'Post successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
};


import Post from '../models/Post.js';

export const createPost = async (req, res, next) => {
  const { caption, scheduledTime, platforms, media } = req.body;

  try {
    const post = await Post.create({
      workspaceId: req.workspace._id,
      caption,
      scheduledTime,
      platforms,
      media: media || [],
      author: req.user.displayName,
      authorAvatar: req.user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      authorId: req.user._id,
      status: 'DRAFT'
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ workspaceId: req.workspace._id }).sort({ scheduledTime: 1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { caption, scheduledTime, platforms, media } = req.body;

  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    // FR-501: A post in status Approved CANNOT be edited unless reverted to Draft/Pending
    if (post.status === 'APPROVED') {
      return res.status(400).json({ success: false, message: 'Approved posts cannot be edited directly. Please revert to Draft first.' });
    }

    if (caption) post.caption = caption;
    if (scheduledTime) post.scheduledTime = scheduledTime;
    if (platforms) post.platforms = platforms;
    if (media) post.media = media;

    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const reschedulePost = async (req, res, next) => {
  const { scheduledTime } = req.body;

  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    // Lockout check: posts scheduled within 5 minutes of publication cannot be rescheduled (FR-204/Edge Case)
    const lockoutTime = new Date(post.scheduledTime).getTime() - 5 * 60 * 1000;
    if (Date.now() > lockoutTime) {
      return res.status(400).json({ success: false, message: 'Cannot reschedule posts scheduled within 5 minutes of publication.' });
    }

    post.scheduledTime = scheduledTime;
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const submitForReview = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    post.status = 'PENDING_REVIEW';
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const approvePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    post.status = 'APPROVED';
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const rejectPost = async (req, res, next) => {
  const { reason } = req.body;

  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    // Append rejection comment
    const rejectComment = {
      author: `${req.user.displayName} (Approver)`,
      body: `❌ Rejected: ${reason || 'No reason specified'}`,
      time: new Date()
    };

    post.comments.push(rejectComment);
    post.status = 'DRAFT';
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  const { body } = req.body;

  try {
    const post = await Post.findOne({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    const newComment = {
      author: req.user.displayName,
      body,
      time: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ success: true, data: post.comments[post.comments.length - 1] });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, workspaceId: req.workspace._id });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

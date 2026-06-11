import Post from '../models/Post.js';
import { slugify } from '../utils/slugify.js';

/**
 * Generates a unique slug by appending a numeric index if a collision is found in the database.
 * @param {string} title - The title of the post
 * @param {string} [excludePostId] - Optional post ID to exclude from query (useful for editing)
 * @returns {Promise<string>} - The unique slug
 */
export const generateUniqueSlug = async (title, excludePostId = null) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludePostId) {
      query._id = { $ne: excludePostId };
    }

    const existingPost = await Post.findOne(query).lean();
    if (!existingPost) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

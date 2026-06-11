import { API_ROUTES } from '../config/api';

export const getPosts = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.category) query.append('category', params.category);
  if (params.tag) query.append('tag', params.tag);
  if (params.search) query.append('search', params.search);

  const queryString = query.toString();
  const url = `${API_ROUTES.posts.base}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch posts');
  }

  return json;
};

export const getPostBySlug = async (slug) => {
  const response = await fetch(`${API_ROUTES.posts.base}/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch post');
  }

  return json;
};

export const getCategories = async () => {
  const response = await fetch(API_ROUTES.categories, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch categories');
  }

  return json;
};

export const getTags = async () => {
  const response = await fetch(API_ROUTES.tags, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch tags');
  }

  return json;
};

export const getAuthorPosts = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_ROUTES.posts.author, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch author posts');
  }

  return json;
};

export const deletePost = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_ROUTES.posts.base}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 204) {
    return { message: 'Post successfully deleted.' };
  }

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to delete post');
  }

  return json;
};

export const getComments = async (postId) => {
  const response = await fetch(`${API_ROUTES.posts.base}/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to fetch comments');
  }

  return json;
};

export const createComment = async (postId, name, content) => {
  const response = await fetch(`${API_ROUTES.posts.base}/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, content }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to submit comment');
  }

  return json;
};

export const createPost = async (postData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_ROUTES.posts.base, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to create post');
  }

  return json;
};

export const updatePost = async (postId, postData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_ROUTES.posts.base}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Failed to update post');
  }

  return json;
};


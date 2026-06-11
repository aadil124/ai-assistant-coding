// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_ROUTES = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
  },
  posts: {
    base: `${API_BASE_URL}/posts`,
    author: `${API_BASE_URL}/author/posts`,
  },
  categories: `${API_BASE_URL}/categories`,
  tags: `${API_BASE_URL}/tags`,
};

export default API_BASE_URL;

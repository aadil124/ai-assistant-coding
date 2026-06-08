import { useState, useCallback } from 'react';
import api from '../utils/api';

export default function usePosts(workspaceId) {
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await api.get('/posts');
      if (res.success && res.data) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error('Failed to load posts:', err.message);
    }
  }, [workspaceId]);

  const addPost = async (postData) => {
    try {
      const res = await api.post('/posts', postData);
      if (res.success && res.data) {
        setPosts(prev => [...prev, res.data]);
        return res.data;
      }
    } catch (err) {
      console.error('Failed to add post:', err.message);
      throw err;
    }
  };

  const updatePost = async (id, updatedData) => {
    try {
      const res = await api.put(`/posts/${id}`, updatedData);
      if (res.success && res.data) {
        setPosts(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to update post:', err.message);
      throw err;
    }
  };

  const reschedulePost = async (id, newScheduledTime) => {
    try {
      const res = await api.put(`/posts/${id}/reschedule`, { scheduledTime: newScheduledTime });
      if (res.success && res.data) {
        setPosts(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to reschedule post:', err.message);
      throw err;
    }
  };

  const submitForReview = async (id) => {
    try {
      const res = await api.put(`/posts/${id}/submit`);
      if (res.success && res.data) {
        setPosts(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to submit post for review:', err.message);
      throw err;
    }
  };

  const approvePost = async (id) => {
    try {
      const res = await api.put(`/posts/${id}/approve`);
      if (res.success && res.data) {
        setPosts(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to approve post:', err.message);
      throw err;
    }
  };

  const rejectPost = async (id, reason) => {
    try {
      const res = await api.put(`/posts/${id}/reject`, { reason });
      if (res.success && res.data) {
        setPosts(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to reject post:', err.message);
      throw err;
    }
  };

  const addComment = async (postId, body) => {
    try {
      const res = await api.post(`/posts/${postId}/comment`, { body });
      if (res.success && res.data) {
        // Comments feed uses real-time array updates
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...p.comments, res.data]
            };
          }
          return p;
        }));
        return res.data;
      }
    } catch (err) {
      console.error('Failed to add comment:', err.message);
      throw err;
    }
  };

  return {
    posts,
    addPost,
    updatePost,
    reschedulePost,
    submitForReview,
    approvePost,
    rejectPost,
    addComment,
    loadPosts
  };
}

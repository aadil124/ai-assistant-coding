import { useState } from 'react';

const initialPosts = [
  {
    id: '1',
    caption: 'Launching our new developer API tools today!',
    status: 'PUBLISHED',
    scheduledTime: new Date(2026, 5, 2, 10, 30).toISOString(),
    publishedTime: new Date(2026, 5, 2, 10, 30).toISOString(),
    platforms: ['instagram', 'linkedin'],
    media: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80'],
    author: 'Mark T.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    comments: [
      { id: '101', author: 'Sarah L.', body: 'Looks great! Approved from my side.', time: '2026-06-02T09:00:00.000Z' }
    ]
  },
  {
    id: '2',
    caption: 'Behind the scenes at the Acme Creative Office...',
    status: 'APPROVED',
    scheduledTime: new Date(2026, 5, 3, 14, 0).toISOString(),
    platforms: ['instagram'],
    media: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80'],
    author: 'Alex Rivera',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    comments: []
  },
  {
    id: '3',
    caption: 'Drafting new SaaS calendar updates. Feedback welcome.',
    status: 'DRAFT',
    scheduledTime: new Date(2026, 5, 3, 17, 30).toISOString(),
    platforms: ['twitter'],
    media: [],
    author: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    comments: [
      { id: '102', author: 'Alex Rivera', body: 'Add some hashtags at the end before submitting.', time: '2026-06-03T15:00:00.000Z' }
    ]
  },
  {
    id: '4',
    caption: 'Weekly analytics recap for the product team.',
    status: 'PENDING_REVIEW',
    scheduledTime: new Date(2026, 5, 6, 9, 15).toISOString(),
    platforms: ['linkedin', 'twitter'],
    media: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'],
    author: 'Sarah L.',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    comments: []
  }
];

export default function usePosts() {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (postData) => {
    const newPost = {
      id: String(posts.length + 1),
      status: 'DRAFT',
      comments: [],
      author: 'Alex Rivera',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      ...postData
    };
    setPosts([...posts, newPost]);
    return newPost;
  };

  const updatePost = (id, updatedData) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        if (p.status === 'APPROVED') {
          // Lock checks
          const lockoutTime = new Date(p.scheduledTime).getTime() - 10 * 60 * 1000;
          if (Date.now() > lockoutTime) {
            throw new Error('This post is locked for publishing and cannot be modified.');
          }
        }
        return { ...p, ...updatedData };
      }
      return p;
    }));
  };

  const reschedulePost = (id, newScheduledTime) => {
    // Check if new time is past
    if (new Date(newScheduledTime).getTime() < Date.now()) {
      throw new Error('Scheduled time must be in the future.');
    }
    setPosts(posts.map(p => {
      if (p.id === id) {
        // Enforce lockout window check (e.g. 5 minutes before scheduled release)
        const lockoutTime = new Date(p.scheduledTime).getTime() - 5 * 60 * 1000;
        if (Date.now() > lockoutTime) {
          throw new Error('Cannot reschedule posts scheduled within 5 minutes of publication.');
        }
        return { ...p, scheduledTime: newScheduledTime };
      }
      return p;
    }));
  };

  const submitForReview = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: 'PENDING_REVIEW' } : p));
  };

  const approvePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
  };

  const rejectPost = (id, reason) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const newComment = {
          id: Math.random().toString(),
          author: 'Sarah L. (Approver)',
          body: `❌ Rejected: ${reason}`,
          time: new Date().toISOString()
        };
        return {
          ...p,
          status: 'DRAFT',
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
  };

  const addComment = (postId, body) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: Math.random().toString(),
          author: 'Alex Rivera',
          body,
          time: new Date().toISOString()
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };

  return {
    posts,
    addPost,
    updatePost,
    reschedulePost,
    submitForReview,
    approvePost,
    rejectPost,
    addComment
  };
}

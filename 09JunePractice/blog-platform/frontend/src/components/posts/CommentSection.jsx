import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { getComments, createComment } from '../../services/postService';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({
    name: '',
    content: '',
  });

  // Flow states
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getComments(postId);
        // Render comments in chronological order
        setComments(data || []);
      } catch (err) {
        setError(err.message || 'Error loading comments.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Field validations
  const validateField = (fieldName, value) => {
    let msg = '';
    if (fieldName === 'name') {
      if (!value || !value.trim()) {
        msg = 'Name is required.';
      }
    }
    if (fieldName === 'content') {
      if (!value || !value.trim()) {
        msg = 'Comment body is required.';
      }
    }
    setErrors((prev) => ({ ...prev, [fieldName]: msg }));
    return !msg;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    const isNameValid = validateField('name', name);
    const isContentValid = validateField('content', content);

    if (!isNameValid || !isContentValid) {
      return;
    }

    setSubmitLoading(true);
    try {
      const json = await createComment(postId, name.trim(), content.trim());

      // Append new comment to comments list state to instantly render it
      setComments((prev) => [...prev, json]);
      
      // Clear form inputs
      setName('');
      setContent('');
      setSuccess(true);
      
      // Clear success banner after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to post comment.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="comments-widget mt-5">
      <h3 className="h5 fw-bold text-dark mb-4">
        Responses ({comments.length})
      </h3>

      {/* Error alert banner */}
      {error && (
        <div className="alert alert-danger p-2 small mb-3" role="alert">
          {error}
        </div>
      )}

      {/* Success banner */}
      {success && (
        <div className="alert alert-success p-2 small mb-3" role="alert">
          Comment posted successfully!
        </div>
      )}

      {/* Loading state spinner */}
      {loading ? (
        <Spinner />
      ) : comments.length === 0 ? (
        <p className="text-secondary small mb-4">No comments posted yet. Be the first to share your thoughts!</p>
      ) : (
        <div className="comments-list mb-5 d-flex flex-column gap-3">
          {comments.map((comment) => {
            const dateStr = new Date(comment.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div className="d-flex gap-3 border-bottom pb-3" key={comment._id}>
                {/* Initial Avatar */}
                <div 
                  className="bg-light text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold small" 
                  style={{ width: '40px', height: '40px', flexShrink: 0 }}
                >
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow-1 text-start">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h4 className="h6 fw-semibold text-dark mb-0">{comment.name}</h4>
                    <span className="text-secondary small" style={{ fontSize: '12px' }}>{dateStr}</span>
                  </div>
                  <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Comment Form */}
      <div className="bg-light p-4 rounded-3 border border-light-subtle text-start">
        <h4 className="h6 fw-bold text-dark mb-3">Add a Comment</h4>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            error={errors.name}
            required
            className="mb-3"
          />

          <div className="mb-3">
            <label htmlFor="content" className="form-label text-secondary fw-semibold small mb-1">
              Comment
            </label>
            <textarea
              id="content"
              rows="4"
              className={`form-control px-3 py-2 bg-white border focus-ring ${
                errors.content ? 'is-invalid border-danger' : 'border-light-subtle'
              }`}
              placeholder="Join the discussion..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              required
              style={{ resize: 'none' }}
            />
            {errors.content && (
              <div className="invalid-feedback d-block mt-1 text-danger small">{errors.content}</div>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <Button type="submit" loading={submitLoading} className="w-auto px-4">
              Post Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;

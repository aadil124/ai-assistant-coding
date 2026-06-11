import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import { getPostBySlug, updatePost } from '../services/postService';

const EditPost = () => {
  const { slug } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Post ID from database
  const [postId, setPostId] = useState('');

  // Input states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState('Draft');
  
  // Validation states
  const [errors, setErrors] = useState({
    title: '',
    category: '',
    content: '',
  });

  // Flow states
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch article details on load
  useEffect(() => {
    const fetchPostDetails = async () => {
      setFetchLoading(true);
      setApiError('');
      try {
        const data = await getPostBySlug(slug);
        
        // Assert ownership
        if (data.author && user && data.author.username !== user.username) {
          setApiError('Access Denied: You do not own this post.');
          return;
        }

        setPostId(data._id);
        setTitle(data.title || '');
        setDescription(data.description || '');
        setContent(data.content || '');
        setCategory(data.category || '');
        setTagsInput(data.tags ? data.tags.join(', ') : '');
        setStatus(data.status || 'Draft');
      } catch (err) {
        setApiError(err.message || 'Failed to fetch article details.');
      } finally {
        setFetchLoading(false);
      }
    };

    if (slug) {
      fetchPostDetails();
    }
  }, [slug, user]);

  // Field validations
  const validateField = (fieldName, value) => {
    let msg = '';
    if (fieldName === 'title') {
      if (!value || !value.trim()) {
        msg = 'Post Title is required.';
      }
    }
    if (fieldName === 'category') {
      if (!value || value === 'Select Category') {
        msg = 'Category selection is required.';
      }
    }
    if (fieldName === 'content') {
      if (!value || !value.trim()) {
        msg = 'Post Content is required.';
      }
    }
    setErrors((prev) => ({ ...prev, [fieldName]: msg }));
    return !msg;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const handleSave = async (newStatus) => {
    setApiError('');

    const isTitleValid = validateField('title', title);
    const isCategoryValid = validateField('category', category);
    const isContentValid = validateField('content', content);

    if (!isTitleValid || !isCategoryValid || !isContentValid) {
      return;
    }

    setSaveLoading(true);
    try {
      const tagsArray = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await updatePost(postId, {
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        category: category,
        tags: tagsArray,
        status: newStatus || status, // Update status if passed
      });

      // Redirect back to dashboard upon success
      navigate('/admin/dashboard');
    } catch (err) {
      setApiError(err.message || 'Error updating post.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (fetchLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="d-flex min-h-screen bg-white text-dark">
      {/* Left Sidebar */}
      <aside 
        className="bg-light border-end d-flex flex-column p-4 z-3 position-fixed start-0 top-0 bottom-0 transition-all"
        style={{ width: '256px', transform: isSidebarOpen ? 'none' : 'translateX(-256px)', transitionDuration: '0.3s' }}
      >
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="bg-primary text-white rounded p-1.5 d-flex align-items-center justify-content-center">
            <span className="material-symbols-outlined fs-5">auto_stories</span>
          </div>
          <span className="fs-5 fw-bold text-dark tracking-tight">{user?.username || 'Author'}</span>
        </div>

        <nav className="nav flex-column flex-grow-1 gap-1">
          <Link className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" to="/admin/dashboard">
            <span className="material-symbols-outlined fs-5">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" to="/admin/create-post">
            <span className="material-symbols-outlined fs-5">description</span>
            <span>New Post</span>
          </Link>
          <a className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" href="#" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined fs-5">insights</span>
            <span>Analytics</span>
          </a>
          <a className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" href="#" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined fs-5">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto pt-3 border-top d-flex flex-column gap-1">
          <a className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" href="#" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined fs-5">help</span>
            <span>Help Center</span>
          </a>
          <button onClick={handleLogout} className="btn nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary border-0 text-start w-100">
            <span className="material-symbols-outlined fs-5">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main 
        className="flex-grow-1 min-h-screen d-flex flex-column transition-all"
        style={{ 
          marginLeft: isSidebarOpen ? '256px' : '0', 
          marginRight: '320px', 
          transitionDuration: '0.3s' 
        }}
      >
        {/* Top Header Bar */}
        <header className="navbar navbar-light bg-white border-bottom px-4 sticky-top z-2" style={{ height: '64px' }}>
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-light border-0 p-1 d-flex align-items-center justify-content-center rounded-2" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-symbols-outlined">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <div className="vr text-secondary opacity-25"></div>
            <span className="text-secondary small">Editing in Posts</span>
          </div>
        </header>

        {/* Editor Area */}
        <div className="p-5 flex-grow-1 d-flex flex-column mx-auto w-100" style={{ maxWidth: '720px' }}>
          {apiError && (
            <div className="alert alert-danger p-2 small mb-4" role="alert">
              {apiError}
            </div>
          )}

          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              id="title"
              className={`form-control border-0 ps-0 fs-1 fw-bold placeholder-light-subtle ${
                errors.title ? 'is-invalid border-bottom border-danger' : ''
              }`}
              placeholder="Post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
              style={{ boxShadow: 'none' }}
              disabled={!!apiError}
              required
            />
            {errors.title && (
              <div className="invalid-feedback d-block mt-1 text-danger small">{errors.title}</div>
            )}
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <input
              type="text"
              id="description"
              className="form-control border-0 ps-0 fs-5 text-secondary placeholder-light-subtle"
              placeholder="Describe what this post is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ boxShadow: 'none' }}
              disabled={!!apiError}
            />
          </div>

          {/* Content TextArea */}
          <div className="mb-4 flex-grow-1 d-flex flex-column">
            <textarea
              id="content"
              className={`form-control border-0 ps-0 flex-grow-1 fs-5 text-dark placeholder-light-subtle ${
                errors.content ? 'is-invalid border-bottom border-danger' : ''
              }`}
              placeholder="Start writing your story here... (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              style={{ boxShadow: 'none', minHeight: '320px', resize: 'none' }}
              disabled={!!apiError}
              required
            />
            {errors.content && (
              <div className="invalid-feedback d-block mt-1 text-danger small">{errors.content}</div>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar Inspector (Publishing Panel) */}
      <aside 
        className="w-80 border-start position-fixed end-0 top-0 bottom-0 bg-white p-4 z-3 d-flex flex-column"
        style={{ width: '320px' }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="h5 fw-bold text-dark mb-0">Publishing</h3>
        </div>

        <div className="d-flex flex-column gap-3 overflow-y-auto flex-grow-1">
          {/* Action Buttons */}
          <div className="d-flex flex-column gap-2 mb-2">
            <Button 
              onClick={() => handleSave('Published')} 
              loading={saveLoading}
              disabled={!!apiError}
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <span className="material-symbols-outlined fs-5">publish</span>
              <span>Save Changes</span>
            </Button>
            
            <button 
              onClick={() => handleSave('Draft')} 
              disabled={saveLoading || !!apiError}
              className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2 bg-white"
            >
              <span className="material-symbols-outlined fs-5">save</span>
              <span>Revert to Draft</span>
            </button>
          </div>

          {/* Current Status Badge */}
          <div className="mb-3">
            <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block mb-1">
              Current Status
            </label>
            <span className={`badge ${status === 'Published' ? 'bg-success' : 'bg-secondary'}`}>
              {status}
            </span>
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label text-secondary small fw-bold text-uppercase tracking-wider">
              Category
            </label>
            <select
              id="category"
              className={`form-select bg-white border focus-ring ${
                errors.category ? 'is-invalid border-danger' : 'border-light-subtle'
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={handleBlur}
              disabled={!!apiError}
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Culture">Culture</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
            {errors.category && (
              <div className="invalid-feedback d-block mt-1 text-danger small">{errors.category}</div>
            )}
          </div>

          {/* Tags Input */}
          <div className="mb-3">
            <label htmlFor="tags" className="form-label text-secondary small fw-bold text-uppercase tracking-wider">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              className="form-control bg-white border border-light-subtle focus-ring"
              placeholder="e.g. writing, design, technology"
              value={tagsInput}
              disabled={!!apiError}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-auto pt-3 border-top text-center">
          <Link to="/admin/dashboard" className="text-secondary small text-decoration-none hover-primary fw-semibold">
            Cancel and Return
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default EditPost;

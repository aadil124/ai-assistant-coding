import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthorPosts, deletePost } from '../services/postService';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Posts data states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Success / Error banner states
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Delete modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch author posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAuthorPosts();
        setPosts(data || []);
      } catch (err) {
        setError(err.message || 'Failed to retrieve your articles.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Open confirmation modal for deleting a post
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowConfirmModal(true);
    setApiError('');
    setSuccessMessage('');
  };

  // Confirm delete handler
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    setDeleteLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      await deletePost(postToDelete._id);
      
      // Update local state: remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postToDelete._id));
      
      // Show feedback
      setSuccessMessage('Post successfully deleted.');
      
      // Close modal
      setShowConfirmModal(false);
      setPostToDelete(null);
    } catch (err) {
      setApiError(err.message || 'Failed to delete article.');
      setShowConfirmModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Search & Filters change resets page to 1
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter]);

  // Statistics calculation
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'Published').length;
  const draftPosts = posts.filter((p) => p.status === 'Draft').length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  // Client-side filtering
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
    const matchesStatus = statusFilter === '' || post.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Client-side pagination calculations
  const postsPerPage = 5;
  const totalFiltered = filteredPosts.length;
  const totalPages = Math.ceil(totalFiltered / postsPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);
  
  const startIndex = (activePage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, totalFiltered);
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="d-flex min-h-screen bg-light text-dark">
      {/* Left Sidebar */}
      <aside 
        className="bg-light border-end d-flex flex-column p-4 z-3 position-fixed start-0 top-0 bottom-0 transition-all"
        style={{ 
          width: '256px', 
          transform: isSidebarOpen ? 'none' : 'translateX(-256px)', 
          transitionDuration: '0.3s' 
        }}
      >
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="bg-primary text-white rounded p-1.5 d-flex align-items-center justify-content-center">
            <span className="material-symbols-outlined fs-5">auto_stories</span>
          </div>
          <span className="fs-5 fw-bold text-dark tracking-tight">Lumina Editorial</span>
        </div>

        <nav className="nav flex-column flex-grow-1 gap-1">
          <Link 
            className="nav-link bg-primary-subtle text-primary fw-bold d-flex align-items-center gap-2 px-3 py-2 rounded-2" 
            to="/admin/dashboard"
          >
            <span className="material-symbols-outlined fs-5">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link 
            className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" 
            to="/admin/create-post"
          >
            <span className="material-symbols-outlined fs-5">description</span>
            <span>New Post</span>
          </Link>
          <a 
            className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" 
            href="#" 
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined fs-5">insights</span>
            <span>Analytics</span>
          </a>
          <a 
            className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" 
            href="#" 
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined fs-5">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto pt-3 border-top d-flex flex-column gap-1">
          <a 
            className="nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary" 
            href="#" 
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined fs-5">help</span>
            <span>Help Center</span>
          </a>
          <button 
            onClick={handleLogout} 
            className="btn nav-link text-secondary fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-2 hover-primary border-0 text-start w-100"
          >
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
          transitionDuration: '0.3s' 
        }}
      >
        {/* Top Header Bar */}
        <header className="navbar navbar-light bg-white border-bottom px-4 sticky-top z-2" style={{ height: '64px' }}>
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-light border-0 p-1 d-flex align-items-center justify-content-center rounded-2" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              <span className="material-symbols-outlined">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <div className="vr text-secondary opacity-25"></div>
            <div className="d-flex align-items-center gap-1 text-secondary small">
              <span>Author Dashboard</span>
              <span>/</span>
              <span className="text-dark fw-semibold">Overview</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div className="fw-semibold text-dark leading-none">{user?.username || 'Author'}</div>
              <div className="text-muted small" style={{ fontSize: '11px' }}>Senior Editor</div>
            </div>
            <div 
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
              style={{ width: '36px', height: '36px', fontSize: '16px' }}
            >
              {(user?.username || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 flex-grow-1 container-fluid" style={{ maxWidth: '1400px' }}>
          {/* Welcome Message */}
          <div className="mb-4">
            <h1 className="h3 fw-bold text-dark tracking-tight">Good morning, {user?.username || 'Author'}.</h1>
            <p className="text-secondary mb-0">Here's what's happening with your editorial portfolio today.</p>
          </div>

          {/* Banner Feedback Messages */}
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 p-3 mb-4 rounded-3 shadow-sm border-0 border-start border-4 border-success bg-white" role="alert">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <div className="flex-grow-1 text-success fw-medium">{successMessage}</div>
              <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close"></button>
            </div>
          )}

          {apiError && (
            <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 p-3 mb-4 rounded-3 shadow-sm border-0 border-start border-4 border-danger bg-white" role="alert">
              <span className="material-symbols-outlined text-danger">error</span>
              <div className="flex-grow-1 text-danger fw-medium">{apiError}</div>
              <button type="button" className="btn-close" onClick={() => setApiError('')} aria-label="Close"></button>
            </div>
          )}

          {/* Stats Cards Row */}
          <div className="row g-3 mb-4">
            {/* Total Posts Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border border-light-subtle rounded-3 p-3 bg-white shadow-sm hover-shadow transition-shadow">
                <div className="d-flex justify-between justify-content-between align-items-start mb-2">
                  <span className="text-secondary small fw-bold text-uppercase tracking-wider">Total Posts</span>
                  <span className="material-symbols-outlined text-primary">article</span>
                </div>
                <h3 className="h2 fw-bold text-dark mb-0">{totalPosts}</h3>
                <p className="text-muted small mb-0 mt-1">Articles created</p>
              </div>
            </div>

            {/* Published Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border border-light-subtle rounded-3 p-3 bg-white shadow-sm hover-shadow transition-shadow">
                <div className="d-flex justify-between justify-content-between align-items-start mb-2">
                  <span className="text-secondary small fw-bold text-uppercase tracking-wider">Published</span>
                  <span className="material-symbols-outlined text-success">check_circle</span>
                </div>
                <h3 className="h2 fw-bold text-dark mb-0">{publishedPosts}</h3>
                <p className="text-success small mb-0 mt-1 fw-semibold">Live on platform</p>
              </div>
            </div>

            {/* Drafts Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border border-light-subtle rounded-3 p-3 bg-white shadow-sm hover-shadow transition-shadow">
                <div className="d-flex justify-between justify-content-between align-items-start mb-2">
                  <span className="text-secondary small fw-bold text-uppercase tracking-wider">Drafts</span>
                  <span className="material-symbols-outlined text-secondary">edit_note</span>
                </div>
                <h3 className="h2 fw-bold text-dark mb-0">{draftPosts}</h3>
                <p className="text-muted small mb-0 mt-1">Ready for editing</p>
              </div>
            </div>

            {/* Total Views Card */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border border-light-subtle rounded-3 p-3 bg-white shadow-sm hover-shadow transition-shadow">
                <div className="d-flex justify-between justify-content-between align-items-start mb-2">
                  <span className="text-secondary small fw-bold text-uppercase tracking-wider">Total Views</span>
                  <span className="material-symbols-outlined text-info">visibility</span>
                </div>
                <h3 className="h2 fw-bold text-dark mb-0">{totalViews}</h3>
                <p className="text-info small mb-0 mt-1 fw-semibold">Engagement impact</p>
              </div>
            </div>
          </div>

          {/* Table Controls (Search, Filters) */}
          <div className="card border border-light-subtle rounded-3 bg-white shadow-sm mb-4">
            <div className="p-3 border-bottom d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
              <h2 className="h5 fw-bold text-dark mb-0">My Articles</h2>
              
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {/* Search Bar */}
                <div className="position-relative" style={{ minWidth: '240px' }}>
                  <span 
                    className="material-symbols-outlined position-absolute text-secondary" 
                    style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}
                  >
                    search
                  </span>
                  <input
                    type="text"
                    className="form-control ps-5 border-light-subtle focus-ring"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontSize: '14px' }}
                  />
                </div>

                {/* Status Filter */}
                <select
                  className="form-select border-light-subtle focus-ring"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: '130px', fontSize: '14px' }}
                >
                  <option value="">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>

                {/* Category Filter */}
                <select
                  className="form-select border-light-subtle focus-ring"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ width: '150px', fontSize: '14px' }}
                >
                  <option value="">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Culture">Culture</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className="table-responsive">
              {loading ? (
                <div className="p-5 text-center">
                  <Spinner />
                </div>
              ) : error ? (
                <div className="p-5 text-center">
                  <span className="material-symbols-outlined text-danger display-4 mb-3">cloud_off</span>
                  <h4 className="h5 text-dark fw-bold">{error}</h4>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-5 text-center">
                  <span className="material-symbols-outlined text-secondary opacity-50 display-4 mb-3">drafts</span>
                  <h4 className="h5 text-secondary fw-medium">No articles found</h4>
                  <p className="text-muted small">Try adjusting your filters or search query, or write a new post.</p>
                  <Link to="/admin/create-post" className="btn btn-lumina-primary btn-sm rounded-2 mt-2 px-3 py-2">
                    Create New Post
                  </Link>
                </div>
              ) : (
                <table className="table align-middle mb-0 table-hover">
                  <thead className="bg-light-subtle text-uppercase text-secondary" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>
                    <tr>
                      <th className="px-4 py-3 border-bottom">Title</th>
                      <th className="px-3 py-3 border-bottom">Category</th>
                      <th className="px-3 py-3 border-bottom">Status</th>
                      <th className="px-3 py-3 border-bottom text-end">Views</th>
                      <th className="px-3 py-3 border-bottom">Date</th>
                      <th className="px-4 py-3 border-bottom text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-dark" style={{ fontSize: '14px' }}>
                    {paginatedPosts.map((post) => (
                      <tr key={post._id} className="transition-colors">
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="rounded flex-shrink-0 d-flex align-items-center justify-content-center text-primary" 
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundImage: 'linear-gradient(135deg, #e5eeff 0%, #cbdbf5 100%)' 
                              }}
                            >
                              <span className="material-symbols-outlined text-primary fs-5">article</span>
                            </div>
                            <div>
                              <Link 
                                to={`/admin/edit-post/${post.slug}`} 
                                className="fw-bold text-dark text-decoration-none hover-primary-link"
                              >
                                {post.title}
                              </Link>
                              {post.description && (
                                <div className="text-secondary small text-truncate" style={{ maxWidth: '280px' }}>
                                  {post.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-secondary">{post.category}</td>
                        <td className="px-3 py-3">
                          {post.status === 'Published' ? (
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1 uppercase font-bold" style={{ fontSize: '10px' }}>
                              Published
                            </span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-2.5 py-1 uppercase font-bold" style={{ fontSize: '10px' }}>
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-end fw-medium text-secondary">{post.views || 0}</td>
                        <td className="px-3 py-3 text-secondary">
                          {new Date(post.createdAt || Date.now()).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3 text-end">
                          <div className="d-flex align-items-center justify-content-end gap-1">
                            <Link 
                              to={`/admin/edit-post/${post.slug}`} 
                              className="btn btn-link link-secondary p-1.5 rounded hover-bg-light border-0 d-inline-flex align-items-center justify-content-center"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined fs-5">edit</span>
                            </Link>
                            <Link 
                              to={`/posts/${post.slug}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-link link-secondary p-1.5 rounded hover-bg-light border-0 d-inline-flex align-items-center justify-content-center"
                              title="Preview"
                            >
                              <span className="material-symbols-outlined fs-5">visibility</span>
                            </Link>
                            <button 
                              onClick={() => handleDeleteClick(post)}
                              className="btn btn-danger btn-sm px-2.5 py-1 d-inline-flex align-items-center gap-1 ms-1 rounded-2 shadow-xs"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Client-side Pagination Control Bar */}
            {totalPages > 1 && (
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center px-4 py-3 bg-light border-top gap-3">
                <div className="text-secondary small">
                  Showing <span className="fw-bold text-dark">{totalFiltered > 0 ? startIndex + 1 : 0}</span> to <span className="fw-bold text-dark">{endIndex}</span> of <span className="fw-bold text-dark">{totalFiltered}</span> results
                </div>
                <nav aria-label="Table navigation">
                  <ul className="pagination pagination-sm gap-1 mb-0 border-0">
                    <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link border rounded-2 px-2.5 py-1.5 text-dark bg-white"
                        onClick={() => setCurrentPage(activePage - 1)}
                        disabled={activePage === 1}
                      >
                        <span className="material-symbols-outlined fs-6 align-middle">chevron_left</span>
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li className={`page-item ${activePage === i + 1 ? 'active' : ''}`} key={i}>
                        <button
                          className={`page-link border rounded-2 px-3 py-1.5 fw-semibold ${
                            activePage === i + 1
                              ? 'bg-primary text-white border-primary'
                              : 'text-dark bg-white'
                          }`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link border rounded-2 px-2.5 py-1.5 text-dark bg-white"
                        onClick={() => setCurrentPage(activePage + 1)}
                        disabled={activePage === totalPages}
                      >
                        <span className="material-symbols-outlined fs-6 align-middle">chevron_right</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal (Bootstrap styled, React controlled) */}
      {showConfirmModal && postToDelete && (
        <>
          <div 
            className="modal show fade d-block" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="deleteModalTitle" 
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg rounded-3">
                <div className="modal-header border-bottom-0 pb-0 pt-4 px-4 d-flex align-items-center justify-content-between">
                  <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="deleteModalTitle">
                    <span className="material-symbols-outlined text-danger">warning</span>
                    <span>Confirm Deletion</span>
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close shadow-none focus-ring" 
                    onClick={() => setShowConfirmModal(false)} 
                    aria-label="Close"
                    disabled={deleteLoading}
                  ></button>
                </div>
                <div className="modal-body p-4 text-secondary">
                  <p className="mb-0 fs-5 text-dark">
                    Are you sure you want to permanently delete this article?
                  </p>
                  <p className="mt-2 text-danger small bg-danger-subtle p-2.5 rounded-2 border border-danger-subtle fw-semibold d-flex align-items-start gap-1">
                    <span className="material-symbols-outlined fs-6 mt-0.5">info</span>
                    <span>This action cannot be undone. "<strong>{postToDelete.title}</strong>" will be permanently removed.</span>
                  </p>
                </div>
                <div className="modal-footer border-top-0 pt-0 pb-4 px-4 d-flex justify-content-end gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-3 py-2 rounded-2 fw-semibold bg-white" 
                    onClick={() => setShowConfirmModal(false)}
                    disabled={deleteLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger px-4 py-2 rounded-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-2" 
                    onClick={handleDeleteConfirm}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined fs-5">delete_forever</span>
                        <span>Delete Permanently</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Backdrop */}
          <div className="modal-backdrop show" style={{ zIndex: 1040 }}></div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

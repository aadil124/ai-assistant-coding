import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PostCard from '../components/posts/PostCard';
import Spinner from '../components/common/Spinner';
import { getPosts, getCategories, getTags } from '../services/postService';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract query filters from URL search parameters
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const categoryParam = searchParams.get('category') || '';
  const tagParam = searchParams.get('tag') || '';
  const searchParam = searchParams.get('search') || '';

  // Data states
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  
  // Loading & Error states
  const [postsLoading, setPostsLoading] = useState(true);
  const [metaLoading, setMetaLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination metadata
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Fetch Categories & Tags on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catsData, tagsData] = await Promise.all([getCategories(), getTags()]);
        setCategories(catsData);
        setTags(tagsData);
      } catch (err) {
        console.error('Error fetching categories/tags:', err);
        // Do not crash the page, just fall back to empty lists
        setCategories([]);
        setTags([]);
      } finally {
        setMetaLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch Posts when filters change
  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      setError('');
      try {
        const result = await getPosts({
          page: pageParam,
          limit: 6,
          category: categoryParam,
          tag: tagParam,
          search: searchParam,
        });
        setPosts(result.posts || []);
        setTotalPages(result.totalPages || 1);
        setTotalPosts(result.totalPosts || 0);
      } catch (err) {
        setError(err.message || 'Failed to retrieve posts. Please check connection.');
        setPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, [pageParam, categoryParam, tagParam, searchParam]);

  // Handler to update search params
  const updateFilter = (filters) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Default page reset on filter update
    newParams.set('page', '1');

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="d-flex flex-column min-h-screen">
      <Header />

      <main className="container pt-5 mt-5 pb-5">
        {/* Welcome Hero / Featured Section (rendered only on default landing page) */}
        {!categoryParam && !tagParam && !searchParam && pageParam === 1 && (
          <section className="py-4 mb-5 border-bottom">
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-7">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge bg-primary-subtle text-primary text-uppercase px-2.5 py-1.5 small fw-semibold">
                    Featured Article
                  </span>
                  <span className="text-secondary small">• 12 min read</span>
                </div>
                <h2 className="display-5 fw-bold mb-3 tracking-tight text-dark">
                  The Architecture of Silence: Why Modern Design is Quieting Down
                </h2>
                <p className="lead text-secondary mb-4">
                  Exploring how global tech leaders are trading chaotic Maximalism for a new era of sensory-first, intentional minimalism in both hardware and UX.
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
                    J
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Julian Thorne</div>
                    <div className="text-muted small">Senior Editor, Lumina</div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div 
                  className="rounded-3 shadow-sm border border-light-subtle d-flex align-items-center justify-content-center text-secondary"
                  style={{ height: '320px', backgroundImage: 'linear-gradient(135deg, #e5eeff 0%, #cbdbf5 100%)' }}
                >
                  <span className="material-symbols-outlined fs-1 opacity-25">auto_stories</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filters Active Alert */}
        {(categoryParam || tagParam || searchParam) && (
          <div className="alert alert-light border d-flex align-items-center justify-content-between p-3 mb-4 rounded-3 shadow-sm">
            <div className="d-flex align-items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_list</span>
              <span className="fw-semibold text-dark">
                Showing results
                {searchParam && <span> for "{searchParam}"</span>}
                {categoryParam && <span> in category "{categoryParam}"</span>}
                {tagParam && <span> tagged with "#{tagParam}"</span>}
              </span>
            </div>
            <button className="btn btn-outline-secondary btn-sm rounded-2 small" onClick={clearAllFilters}>
              Reset Filters
            </button>
          </div>
        )}

        {/* Content Layout */}
        <div className="row g-4">
          {/* Post Grid (Left) */}
          <div className="col-12 col-lg-8">
            {postsLoading ? (
              <Spinner className="py-5" />
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Connection Error</h4>
                <p>{error}</p>
                <hr />
                <button className="btn btn-outline-danger btn-sm" onClick={() => navigate(0)}>
                  Retry Connection
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-5 border rounded-3 bg-white p-5 shadow-sm">
                <span className="material-symbols-outlined text-secondary opacity-50 display-1 mb-3">
                  feed
                </span>
                <h4 className="fw-bold text-dark">No posts found</h4>
                <p className="text-muted mb-4">
                  {categoryParam 
                    ? 'No posts found in this category. Try checking another category.' 
                    : 'We could not find any published articles matching your criteria.'}
                </p>
                <button className="btn btn-lumina-primary rounded-2 px-4" onClick={clearAllFilters}>
                  Go Back to Feed
                </button>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {posts.map((post) => (
                    <div className="col-12 col-md-6" key={post._id}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
                    <ul className="pagination gap-2 border-0">
                      <li className={`page-item ${pageParam === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link border rounded-2 px-3 py-2 text-dark bg-white"
                          onClick={() => handlePageChange(pageParam - 1)}
                          disabled={pageParam === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li className={`page-item ${pageParam === i + 1 ? 'active' : ''}`} key={i}>
                          <button
                            className={`page-link border rounded-2 px-3.5 py-2 ${
                              pageParam === i + 1
                                ? 'bg-primary text-white border-primary'
                                : 'text-dark bg-white'
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${pageParam === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link border rounded-2 px-3 py-2 text-dark bg-white"
                          onClick={() => handlePageChange(pageParam + 1)}
                          disabled={pageParam === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>

          {/* Sticky Widgets (Right) */}
          <div className="col-12 col-lg-4">
            <div className="position-sticky" style={{ top: '96px', zIndex: 2 }}>
              {/* Category Widget */}
              <div className="card shadow-sm border border-light-subtle rounded-3 p-4 mb-4 bg-white">
                <h4 className="h6 fw-bold text-dark text-uppercase tracking-wider mb-3">
                  Categories
                </h4>
                {metaLoading ? (
                  <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                ) : categories.length === 0 ? (
                  <p className="text-muted small mb-0">No categories active.</p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm text-start py-2 px-2.5 rounded-2 d-flex justify-content-between align-items-center ${
                          categoryParam === cat.name
                            ? 'bg-primary text-white'
                            : 'hover-primary text-secondary'
                        }`}
                        style={{ border: 'none' }}
                        onClick={() => updateFilter({ category: categoryParam === cat.name ? '' : cat.name, tag: '' })}
                      >
                        <span className="fw-medium">{cat.name}</span>
                        <span className={`badge ${categoryParam === cat.name ? 'bg-white text-primary' : 'bg-secondary-subtle text-secondary'}`}>
                          {cat.count || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tag Cloud Widget */}
              <div className="card shadow-sm border border-light-subtle rounded-3 p-4 bg-white">
                <h4 className="h6 fw-bold text-dark text-uppercase tracking-wider mb-3">
                  Tags Cloud
                </h4>
                {metaLoading ? (
                  <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                ) : tags.length === 0 ? (
                  <p className="text-muted small mb-0">No tags active.</p>
                ) : (
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm rounded-pill px-3 py-1.5 border ${
                          tagParam === tag
                            ? 'bg-primary text-white border-primary'
                            : 'bg-light border-light-subtle text-secondary'
                        }`}
                        onClick={() => updateFilter({ tag: tagParam === tag ? '' : tag, category: '' })}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

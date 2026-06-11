import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Spinner from '../components/common/Spinner';
import CommentSection from '../components/posts/CommentSection';
import { getPostBySlug } from '../services/postService';

const Article = () => {
  const { slug } = useParams();
  
  // Data states
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null); // e.g. 404, 500
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setErrorStatus(null);
      setErrorMessage('');
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        if (err.message.includes('404') || err.message.includes('not found') || err.message.includes('NotFound')) {
          setErrorStatus(404);
        } else {
          setErrorStatus(500);
        }
        setErrorMessage(err.message || 'Failed to retrieve article details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // Handle Loading State
  if (loading) {
    return (
      <div className="d-flex flex-column min-h-screen">
        <Header />
        <main className="container pt-5 mt-5 pb-5 d-flex align-items-center justify-content-center flex-grow-1">
          <Spinner />
        </main>
        <Footer />
      </div>
    );
  }

  // Handle 404 Error State
  if (errorStatus === 404) {
    return (
      <div className="d-flex flex-column min-h-screen">
        <Header />
        <main className="container pt-5 mt-5 pb-5 d-flex align-items-center justify-content-center flex-grow-1">
          <div className="text-center py-5 max-w-[440px] px-3">
            <span className="material-symbols-outlined text-danger display-1 mb-3">error</span>
            <h1 className="fw-bold text-dark h2 mb-2">404 - Page Not Found</h1>
            <p className="text-secondary mb-4">
              We couldn't find the article you are looking for. It may have been deleted or the link might be broken.
            </p>
            <Link to="/" className="btn btn-lumina-primary rounded-2 px-4">
              Back to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle 500 or Other Connection Errors
  if (errorStatus) {
    return (
      <div className="d-flex flex-column min-h-screen">
        <Header />
        <main className="container pt-5 mt-5 pb-5 d-flex align-items-center justify-content-center flex-grow-1">
          <div className="text-center py-5 px-3">
            <span className="material-symbols-outlined text-warning display-1 mb-3">warning</span>
            <h1 className="fw-bold text-dark h2 mb-2">System Error</h1>
            <p className="text-secondary mb-4">{errorMessage}</p>
            <button onClick={() => window.location.reload()} className="btn btn-outline-secondary rounded-2 px-4 me-2">
              Refresh Page
            </button>
            <Link to="/" className="btn btn-lumina-primary rounded-2 px-4">
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format Publication Date
  const dateString = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="d-flex flex-column min-h-screen">
      <Header />

      <main className="container pt-5 mt-5 pb-5 flex-grow-1 px-3">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="col-12 col-lg-8 mx-auto mb-3">
          <ol className="breadcrumb small text-secondary mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-secondary hover-primary">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <span className="text-decoration-none text-secondary text-capitalize">
                {post.category}
              </span>
            </li>
            <li className="breadcrumb-item active text-dark" aria-current="page">
              Article
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <div className="col-12 col-lg-8 mx-auto mb-4 text-start">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-light text-primary border border-light-subtle text-uppercase px-2.5 py-1.5 small fw-semibold">
              {post.category}
            </span>
          </div>

          <h1 className="display-5 fw-bold text-dark mb-3 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="lead text-secondary mb-4">
            {post.description}
          </p>

          <div className="d-flex align-items-center gap-3 border-bottom pb-4">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
              {post.author?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <div className="fw-semibold text-dark">{post.author?.username || 'Author'}</div>
              <div className="text-secondary small">
                Published on {dateString}
              </div>
            </div>
          </div>
        </div>

        {/* Mock Hero Image */}
        <div className="col-12 col-lg-8 mx-auto mb-5">
          <div 
            className="rounded-3 shadow-sm border border-light-subtle d-flex align-items-center justify-content-center text-secondary"
            style={{ height: '360px', backgroundImage: 'linear-gradient(135deg, #e5eeff 0%, #cbdbf5 100%)' }}
          >
            <span className="material-symbols-outlined fs-1 opacity-25">image</span>
          </div>
        </div>

        {/* Article Content Body */}
        <article className="col-12 col-lg-8 mx-auto mb-5 text-start prose-content" style={{ fontSize: '18px', lineHeight: '1.6' }}>
          {/* Output safely raw HTML content for post bodies, complying with typography guidelines */}
          <div 
            className="text-secondary" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            style={{ wordBreak: 'break-word' }}
          />
          
          {/* Tags List */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 pt-3 border-top d-flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="badge bg-light border border-light-subtle text-secondary rounded-pill px-3 py-2 fw-normal">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Divider */}
        <div className="col-12 col-lg-8 mx-auto my-5 border-top"></div>

        {/* Comments Section */}
        <section className="col-12 col-lg-8 mx-auto text-start">
          <CommentSection postId={post._id} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Article;

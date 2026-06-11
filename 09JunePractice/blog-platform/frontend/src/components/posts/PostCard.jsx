import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const { title, slug, description, category, tags, createdAt, author } = post;
  
  // Format Date
  const dateString = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="card h-100 shadow-sm border border-light-subtle rounded-3 overflow-hidden transition-all duration-300 lift-and-glow">
      {/* Mock Image placeholder since we do not store images directly */}
      <div 
        className="bg-light d-flex align-items-center justify-content-center text-secondary" 
        style={{ height: '180px', backgroundImage: 'linear-gradient(135deg, #e5eeff 0%, #cbdbf5 100%)' }}
      >
        <span className="material-symbols-outlined fs-1 opacity-25">image</span>
      </div>
      <div className="card-body p-4 d-flex flex-column">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <span className="badge bg-light text-primary border border-light-subtle text-uppercase tracking-wider py-1.5 px-2.5 small fw-semibold">
            {category}
          </span>
          <span className="text-secondary small">
            {dateString}
          </span>
        </div>
        
        <h3 className="card-title h5 fw-bold mb-2">
          <Link to={`/posts/${slug}`} className="text-decoration-none text-dark text-glow-hover">
            {title}
          </Link>
        </h3>
        
        <p className="card-text text-secondary small line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="mt-auto d-flex align-items-center justify-content-between border-top pt-3">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-semibold small" style={{ width: '32px', height: '32px' }}>
              {author?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="lh-1">
              <div className="fw-semibold text-dark small">{author?.username || 'Author'}</div>
            </div>
          </div>
          
          <button className="btn btn-link text-primary p-0" title="Bookmark article" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined fs-5">bookmark_add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

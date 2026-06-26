import React from 'react';

export default function ReviewCard({ review }) {
  return (
    <div className="neo-glass-card p-4 border bg-white shadow-sm mb-3">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-light border text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px' }}>
            {review.authorName ? review.authorName.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <div>
            <h6 className="fw-bold text-dark mb-0.5 small">{review.authorName || 'Anonymous'}</h6>
            <small className="text-secondary" style={{ fontSize: '0.75rem' }}>{review.date}</small>
          </div>
        </div>
        <div className="d-flex text-warning gap-0.5 small">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
          ))}
        </div>
      </div>
      <p className="text-secondary small mb-0 font-italic leading-relaxed">
        "{review.comment}"
      </p>
    </div>
  );
}

import React from 'react';

/**
 * Full Page loading spinner overlay (reusable).
 */
export function FullPageLoader({ message = "Loading Workspace..." }) {
  return (
    <div 
      className="w-100 d-flex flex-column align-items-center justify-content-center bg-body"
      style={{ minHeight: '80vh' }}
    >
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h6 className="fw-bold text-dark mb-1">{message}</h6>
        <p className="text-secondary small mb-0">Setting up secure telehealth console.</p>
      </div>
    </div>
  );
}

/**
 * Reusable Section Loader (inline spinner).
 */
export function PageLoader({ message = "Retrieving records..." }) {
  return (
    <div className="w-100 py-5 d-flex align-items-center justify-content-center text-center">
      <div className="d-flex flex-column align-items-center gap-2">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="text-secondary small">{message}</span>
      </div>
    </div>
  );
}

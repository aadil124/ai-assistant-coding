import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-container py-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
      {/* React 19 Document Metadata */}
      <title>404 — Page Not Found | Neo-Health</title>
      <meta name="description" content="The requested page could not be located on the Neo-Health portal. Please check the URL or return to homepage." />

      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="neo-glass-card p-5">
              <div className="mb-4">
                <span className="display-1 fw-extrabold text-primary neo-gradient-text">404</span>
              </div>
              <h3 className="fw-bold mb-3 text-dark">Page Not Found</h3>
              <p className="text-secondary mb-4">
                We're sorry, but the page you are looking for does not exist, has been archived, or was relocated.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link to="/" className="btn btn-primary-neo py-3 px-4 d-flex align-items-center justify-content-center gap-2" id="notfound-btn-home">
                  <i className="bi bi-house-door-fill"></i>
                  <span>Return to Home</span>
                </Link>
                <Link to="/contact" className="btn btn-secondary-neo py-3 px-4 d-flex align-items-center justify-content-center gap-2" id="notfound-btn-contact">
                  <i className="bi bi-chat-dots-fill"></i>
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

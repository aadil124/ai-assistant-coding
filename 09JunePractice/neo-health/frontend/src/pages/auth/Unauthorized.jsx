import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="container py-5 d-flex align-items-center justify-content-center bg-body" style={{ minHeight: '80vh' }}>
      <title>Unauthorized Access | Neo-Health</title>
      
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-7 col-lg-5 text-center">
          <div className="neo-glass-card p-5 border bg-white shadow-sm">
            <div 
              className="rounded-circle bg-warning bg-opacity-10 text-warning-emphasis mx-auto mb-4 d-flex align-items-center justify-content-center border border-warning border-opacity-15"
              style={{ width: '80px', height: '80px' }}
            >
              <i className="bi bi-shield-exclamation fs-1"></i>
            </div>
            
            <h3 className="fw-bold text-dark mb-2">Access Unauthorized</h3>
            <p className="text-secondary small mb-4">
              You must authenticate before accessing this area of the application. Please sign in to verify your identity.
            </p>
            
            <div className="d-flex flex-column gap-2">
              <Link to="/login" className="btn btn-primary-neo py-2.5 rounded-3 fw-semibold">
                Sign In to Account
              </Link>
              <Link to="/" className="btn btn-light border py-2.5 rounded-3 fw-semibold text-secondary small">
                Back to Public Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

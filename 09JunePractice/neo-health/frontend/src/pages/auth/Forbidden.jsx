import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Forbidden() {
  const { logout } = useAuth();

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center bg-body" style={{ minHeight: '80vh' }}>
      <title>Access Forbidden | Neo-Health</title>
      
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-7 col-lg-5 text-center">
          <div className="neo-glass-card p-5 border bg-white shadow-sm">
            <div 
              className="rounded-circle bg-danger bg-opacity-10 text-danger mx-auto mb-4 d-flex align-items-center justify-content-center border border-danger border-opacity-15"
              style={{ width: '80px', height: '80px' }}
            >
              <i className="bi bi-shield-slash-fill fs-1"></i>
            </div>
            
            <h3 className="fw-bold text-dark mb-2">Access Forbidden</h3>
            <p className="text-secondary small mb-4">
              Your current authentication group lacks permission privileges to access this URL. Please verify your role settings or switch accounts.
            </p>
            
            <div className="d-flex flex-column gap-2">
              <button 
                type="button" 
                className="btn btn-primary-neo py-2.5 rounded-3 fw-semibold"
                onClick={logout}
              >
                Sign In with Different Account
              </button>
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

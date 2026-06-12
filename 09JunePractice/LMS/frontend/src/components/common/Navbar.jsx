import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav-premium-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link 
          to={isAuthenticated ? (user?.role === 'Instructor' ? '/instructor' : '/dashboard') : '/'} 
          className="nav-brand-premium text-decoration-none"
        >
          <span className="material-symbols-outlined text-primary fs-3">local_library</span>
          <span>EduFlow</span>
        </Link>
        
        <nav className="d-flex align-items-center gap-3">
          {(!isAuthenticated || user?.role === 'Learner') ? (
            <Link to="/courses" className="text-secondary fw-medium px-2 py-1 hover-primary transition-fast">
              Browse Courses
            </Link>
          ) : (
            <Link to="/instructor/courses" className="text-secondary fw-medium px-2 py-1 hover-primary transition-fast">
              Course Manager
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              <Link 
                to={user?.role === 'Instructor' ? '/instructor' : '/dashboard'} 
                className="text-secondary fw-medium px-2 py-1 hover-primary transition-fast"
              >
                Dashboard
              </Link>
              
              {user?.role === 'Learner' && (
                <Link to="/profile" className="text-secondary fw-medium px-2 py-1 hover-primary transition-fast">
                  Profile
                </Link>
              )}

              <div className="d-flex align-items-center gap-3 ms-2">
                <span className="badge-premium badge-premium-primary d-none d-sm-inline-flex">
                  {user?.role === 'Instructor' ? 'Instructor' : user?.name}
                </span>
                <button 
                  onClick={handleLogoutClick}
                  className="btn-premium-secondary py-1.5 px-3"
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center gap-2 ms-2">
              <Link to="/login" className="btn-premium-secondary py-1.5 px-3" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn-premium-primary py-1.5 px-3" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>

      <style>{`
        .hover-primary:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </header>
  );
}

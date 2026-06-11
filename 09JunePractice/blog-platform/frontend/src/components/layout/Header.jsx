import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Search input state
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');

  // Sync input value with URL changes (e.g., when clearing filters externally)
  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
  }, [searchParams]);

  // Debounce search input changes by 300ms
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const currentSearch = searchParams.get('search') || '';
      const trimmedVal = searchVal.trim();
      
      if (trimmedVal !== currentSearch) {
        const newParams = new URLSearchParams(searchParams);
        if (trimmedVal) {
          newParams.set('search', trimmedVal);
        } else {
          newParams.delete('search');
        }
        newParams.set('page', '1'); // Reset pagination on search
        setSearchParams(newParams);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchVal, searchParams, setSearchParams]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const clearSearch = () => {
    setSearchVal('');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom fixed-top py-3 shadow-sm z-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-4 tracking-tight" to="/">
          Lumina Editorial
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar Input Group (Debounced) */}
          <div className="ms-md-3 me-auto my-2 my-md-0" style={{ maxWidth: '300px', width: '100%' }}>
            <div className="input-group input-group-sm border border-light-subtle rounded-2 overflow-hidden">
              <span className="input-group-text bg-white border-0 text-secondary pe-1">
                <span className="material-symbols-outlined fs-5">search</span>
              </span>
              <input
                type="text"
                className="form-control border-0 focus-ring shadow-none bg-white py-1.5"
                placeholder="Search articles..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{ fontSize: '13px' }}
              />
              {searchVal && (
                <button
                  type="button"
                  className="btn bg-white border-0 text-secondary p-1 d-flex align-items-center justify-content-center"
                  onClick={clearSearch}
                >
                  <span className="material-symbols-outlined fs-5">close</span>
                </button>
              )}
            </div>
          </div>

          <ul className="navbar-nav mb-2 mb-md-0 ms-md-3">
            <li className="nav-item">
              <Link className="nav-link fw-semibold active text-primary" to="/">
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary fw-semibold" href="#" onClick={(e) => e.preventDefault()}>
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary fw-semibold" href="#" onClick={(e) => e.preventDefault()}>
                Membership
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary fw-semibold" href="#" onClick={(e) => e.preventDefault()}>
                About
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 ms-md-3">
            {isAuthenticated ? (
              <>
                <Link to="/admin/dashboard" className="btn btn-outline-primary btn-sm rounded-2">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-lumina-primary btn-sm rounded-2 px-3 py-1.5">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary fw-semibold text-decoration-none small">
                  Login
                </Link>
                <Link to="/register" className="btn btn-lumina-primary btn-sm rounded-2 px-3 py-1.5">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

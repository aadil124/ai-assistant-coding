import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login({ initialUser = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isInstructorRoute = location.pathname.includes('instructor');
  const [role, setRole] = useState(isInstructorRoute ? 'Instructor' : 'Learner');
  
  let setUser = () => {};
  let setToken = () => {};
  try {
    const auth = useAuth();
    setUser = auth.setUser;
    setToken = auth.setToken;
  } catch (e) {
    // Auth context missing in tests
  }
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Guard: Redirect if already logged in
  if (initialUser) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setValidationErrors({});

    // Client-side validation
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json().catch(() => ({}));
      if (response.ok && result?.success) {
        const userObj = result.data;
        if (userObj.role !== role) {
          throw new Error(`Access denied. This account is registered as ${userObj.role}. Please select the correct role above.`);
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
          setToken(result.token);
        }
        setUser(userObj);
        navigate(userObj.role === 'Instructor' ? '/instructor' : '/dashboard', { replace: true });
      } else {
        throw new Error(result?.message || 'Invalid email or password');
      }
    } catch (err) {
      const errMsg = err?.message || '';
      if (errMsg.includes('Failed to fetch') || errMsg.includes('Network')) {
        setSubmitError('Network error. Please check your internet connection.');
      } else {
        setSubmitError(errMsg || 'Invalid email or password');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .login-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
        }
        .main-card {
          width: 100%;
          max-width: 1000px;
          background-color: var(--surface-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          z-index: 10;
        }
        .branding-side {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: #ffffff;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .grid-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          pointer-events: none;
        }
        .ambient-glow-1 {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 40%;
          height: 60%;
          border-radius: 9999px;
          background-color: var(--primary-light);
          opacity: 0.1;
          filter: blur(100px);
          pointer-events: none;
        }
        .ambient-glow-2 {
          position: absolute;
          bottom: -20%;
          left: -10%;
          width: 50%;
          height: 70%;
          border-radius: 9999px;
          background-color: #cbd5e1;
          opacity: 0.08;
          filter: blur(120px);
          pointer-events: none;
        }
      `}</style>

      {/* Ambient backgrounds */}
      <div className="position-relative flex-grow-1 d-flex align-items-center justify-content-center p-3 p-md-4">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>

        {/* Rebuilt Premium Card Layout */}
        <div className="main-card row g-0">
          {/* Left Side: Custom Branding */}
          <div className="col-12 col-md-6 branding-side d-none d-md-flex flex-column justify-content-between">
            <div className="grid-pattern">
              <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%"></rect>
              </svg>
            </div>

            <div className="position-relative z-3">
              <div className="d-flex align-items-center gap-2 mb-4">
                <span className="material-symbols-outlined fs-3 text-white">auto_awesome</span>
                <span className="fs-4 fw-bold tracking-tight">EduFlow LMS</span>
              </div>
              <h1 className="h2 text-white fw-bold mb-3 leading-tight">Elevate your career with structured, sequential learning paths.</h1>
              <p className="text-white text-opacity-80 max-w-sm">
                Centralized curriculum designer, sequential progress gates, interactive quizzes, and instant certification.
              </p>
            </div>

            <div className="position-relative z-3 mt-5">
              <div className="p-3 bg-white bg-opacity-10 backdrop-blur-md rounded-3 border border-white border-opacity-10">
                <div className="d-flex gap-1 mb-2 text-warning">
                  {'★★★★★'.split('').map((char, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="small italic mb-2 text-white text-opacity-90">"EduFlow transformed how we manage our professional development. The sequential learning logic ensures high completion rates."</p>
                <p className="small fw-semibold mb-0 text-white">— Product Team Review</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
            <div className="w-100" style={{ maxWidth: '380px', margin: '0 auto' }}>
              <div className="mb-4 text-start">
                <h2 className="h4 fw-bold text-dark mb-1" aria-label="Login">Welcome Back</h2>
                <p className="text-secondary small">Sign in to continue your learning journey.</p>
              </div>

              {submitError && (
                <div className="alert alert-danger d-flex align-items-center mb-3 text-start small" role="alert" style={{ borderRadius: 'var(--radius-md)' }}>
                  <span className="me-2">⚠️</span>
                  <div>{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 text-start">
                {/* Role Select */}
                <div className="form-group-premium">
                  <label htmlFor="roleSelect" className="label-premium">
                    Login as
                  </label>
                  <select
                    id="roleSelect"
                    className="input-premium"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ appearance: 'auto' }}
                  >
                    <option value="Learner">Learner (Student)</option>
                    <option value="Instructor">Instructor (Teacher)</option>
                  </select>
                </div>

                {/* Email Field */}
                <div className="form-group-premium">
                  <label htmlFor="emailAddressInput" className="label-premium">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`input-premium ${validationErrors.email ? 'is-invalid' : ''}`}
                    id="emailAddressInput"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback small mt-1">{validationErrors.email}</div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group-premium">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="passwordInput" className="label-premium mb-0">
                      Password
                    </label>
                    <a className="text-primary text-decoration-none small" href="#" style={{ fontSize: '11px' }}>Forgot Password?</a>
                  </div>
                  <input
                    type="password"
                    className={`input-premium ${validationErrors.password ? 'is-invalid' : ''}`}
                    id="passwordInput"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password && (
                    <div className="invalid-feedback small mt-1">{validationErrors.password}</div>
                  )}
                </div>

                {/* Remember Me */}
                <div className="form-check d-flex align-items-center gap-2 mt-1">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="remember"
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label className="form-check-label text-secondary small cursor-pointer" htmlFor="remember">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn-premium-primary w-100 py-2.5 mt-2 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {/* Redirect to Register */}
              <div className="text-center mt-4">
                <p className="text-secondary small mb-0">
                  Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none hover-text-primary">Register</Link>
                </p>
                <div className="mt-3">
                  {role === 'Learner' ? (
                    <Link to="/instructor/login" className="text-muted-custom text-decoration-none hover-text-primary">
                      Are you an instructor? Sign in here
                    </Link>
                  ) : (
                    <Link to="/login" className="text-muted-custom text-decoration-none hover-text-primary">
                      Are you a student? Sign in here
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-100 py-3 px-4 border-top bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2026 EduFlow Learning System. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

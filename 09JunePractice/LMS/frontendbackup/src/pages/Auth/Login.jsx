import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login({ initialUser = null }) {
  const navigate = useNavigate();
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

    // Client-side required validation
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
        if (result.token) {
          localStorage.setItem('token', result.token);
          setToken(result.token);
        }
        const userObj = result.data;
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
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .main-card {
          width: 100%;
          max-width: 1100px;
          background-color: #ffffff;
          border: 1px solid var(--outline-variant);
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          z-index: 10;
        }
        .branding-side {
          background-color: var(--primary-container, #6063ee);
          color: #ffffff;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .grid-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          pointer-events: none;
        }
        .input-glow:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
          outline: none;
        }
        .ambient-glow-1 {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 40%;
          height: 60%;
          border-radius: 9999px;
          background-color: var(--primary-fixed, #e1e0ff);
          opacity: 0.2;
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
          background-color: var(--secondary-fixed, #dae2fd);
          opacity: 0.15;
          filter: blur(120px);
          pointer-events: none;
        }
      `}</style>

      {/* Ambient backgrounds */}
      <div className="position-relative flex-grow-1 d-flex align-items-center justify-content-center p-3">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>

        {/* The Card */}
        <div className="main-card row g-0">
          {/* Left Side: Branding */}
          <div className="col-12 col-md-6 branding-side d-none d-md-flex flex-column justify-content-between">
            {/* Grid Pattern */}
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
                <span className="material-symbols-outlined fs-3">auto_awesome</span>
                <span className="fs-4 fw-extrabold tracking-tight">Lumina LMS</span>
              </div>
              <h1 className="h2 fw-bold mb-3 leading-tight">Elevate your career with precision learning.</h1>
              <p className="text-white text-opacity-80 max-w-sm">
                Access your personalized learning path, connect with mentors, and track your professional evolution.
              </p>
            </div>

            <div className="position-relative z-3 mt-5">
              <div className="p-3 bg-white bg-opacity-10 backdrop-blur-md rounded-3 border border-white border-opacity-20">
                <div className="d-flex gap-1 mb-2 text-warning">
                  {'★★★★★'.split('').map((char, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="small italic mb-2">"Lumina transformed how I manage my professional development. The interface is intuitive and focused."</p>
                <p className="small fw-semibold mb-0">— Sarah Chen, Senior Product Designer</p>
              </div>
            </div>

            {/* Background Image for depth */}
            <div className="position-absolute bottom-0 right-0 w-100 h-100 opacity-20" style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}>
              <img
                alt="Team collaborating"
                className="w-100 h-100 object-fit-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmbxht2X_fT4s0luhQKr1NLonkHN_-THMoK7I9GhhPL2pxXGyOWS1mLPuPBfek9147_kkbwO1uwG_eI6x51A_s_syZDeOElXNvAyqp7UMql9koLz_wx7wOuGSUmDwNvJNX6o9qiVvGOH_maUyqBHtnbkDv6VGA45lJU2K1JZ8LxI_KAmWL0aAJ9Bds3kO26EwH8KmMOwVaD9bz0GnhgvzUkwl3eEINhWX96IGeBSg-UUIGoDPSPRqHRPdfAZHfJP_Act4usAebrH3D"
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="col-12 col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
            <div className="w-100" style={{ maxWidth: '380px', margin: '0 auto' }}>
              <div className="mb-4">
                <h2 className="h4 fw-bold text-dark mb-1" aria-label="Login">Welcome Back</h2>
                <p className="text-secondary small">Sign in to continue your journey.</p>
              </div>

              {submitError && (
                <div className="alert alert-danger d-flex align-items-center mb-3 text-start small" role="alert" style={{ borderRadius: '8px' }}>
                  <span className="me-2">⚠️</span>
                  <div>{submitError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                {/* Email Field */}
                <div className="d-flex flex-column gap-1">
                  <label htmlFor="emailAddressInput" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control py-2.5 px-3 rounded-3 input-glow ${validationErrors.email ? 'is-invalid' : ''}`}
                    id="emailAddressInput"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ border: '1px solid var(--outline-variant)', fontSize: '14px' }}
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback small">{validationErrors.email}</div>
                  )}
                </div>

                {/* Password Field */}
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="passwordInput" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                      Password
                    </label>
                    <a className="text-primary text-decoration-none small" href="#" style={{ fontSize: '11px' }}>Forgot Password?</a>
                  </div>
                  <input
                    type="password"
                    className={`form-control py-2.5 px-3 rounded-3 input-glow ${validationErrors.password ? 'is-invalid' : ''}`}
                    id="passwordInput"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: '1px solid var(--outline-variant)', fontSize: '14px' }}
                  />
                  {validationErrors.password && (
                    <div className="invalid-feedback small">{validationErrors.password}</div>
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
                  className="btn btn-nexus-primary w-100 py-3 mt-2 rounded-3 text-white transition-all"
                  disabled={isSubmitting}
                  style={{ fontSize: '15px' }}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {/* Redirect to Register */}
              <div className="text-center mt-4">
                <p className="text-secondary small mb-0">
                  Don't have an account? <Link to="/register" className="text-primary font-bold text-decoration-none hover:underline">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-100 py-3 px-4 border-t bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">System Status</a>
        </div>
      </footer>
    </div>
  );
}

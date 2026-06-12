import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
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
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Learner');
  const [terms, setTerms] = useState(false);

  // Stateful flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Local validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('Learner');
    setTerms(false);
    setValidationErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setValidationErrors({});

    // Client-side validations
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Invalid email format';
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
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Since backend register does not return a token, perform programmatic login
        const loginRes = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const loginResult = await loginRes.json().catch(() => ({}));
        if (loginRes.ok && loginResult.success) {
          const userToken = loginResult.token || (loginResult.data && loginResult.data.token);
          if (userToken) {
            localStorage.setItem('token', userToken);
            setToken(userToken);
          }
          const userObj = loginResult.data.user || loginResult.data;
          setUser(userObj);
          navigate(userObj.role === 'Instructor' ? '/instructor' : '/dashboard', { replace: true });
        } else {
          throw new Error(loginResult.message || 'Registered successfully, but failed to log in.');
        }
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (err) {
      setSubmitError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-shell d-flex align-items-center justify-content-center min-vh-100 p-3 position-relative">
      <style>{`
        .register-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow: hidden;
        }
        .glow-left {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 40%;
          height: 40%;
          border-radius: 9999px;
          background-color: rgba(70, 72, 212, 0.05);
          filter: blur(120px);
          pointer-events: none;
        }
        .glow-right {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 40%;
          height: 40%;
          border-radius: 9999px;
          background-color: rgba(86, 94, 116, 0.05);
          filter: blur(120px);
          pointer-events: none;
        }
        .registration-card {
          width: 100%;
          max-width: 480px;
          background-color: #ffffff;
          border: 1px solid var(--outline-variant);
          border-radius: 1rem;
          padding: 40px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          z-index: 10;
        }
        .decorative-img-left {
          position: absolute;
          bottom: 40px;
          left: 40px;
          width: 256px;
          height: 256px;
          opacity: 0.2;
          transform: rotate(3deg);
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid var(--outline-variant);
          pointer-events: none;
        }
        .decorative-img-right {
          position: absolute;
          top: 40px;
          right: 40px;
          width: 192px;
          height: 192px;
          opacity: 0.2;
          transform: rotate(-3deg);
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid var(--outline-variant);
          pointer-events: none;
        }
        .input-glow:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
          outline: none;
        }
      `}</style>

      {/* Background decorations */}
      <div className="glow-left"></div>
      <div className="glow-right"></div>

      <div className="decorative-img-left d-none d-lg-block">
        <img
          className="w-100 h-100 object-fit-cover"
          alt="Minimalist workspace"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3o5wlNZZnrqRanj7dg_m7lP2fI7CnUXqmV-23-wyGX3NvWC8zzuRt_KYbi7Bm502cS6jVkCPTRtsYB31RY-FsPGo-BBZmo4ac-N6s8uPTLoxyFfgv3zZaEiH4vLmXVbU7mzp-A_jVwvPvCNAl-AjDAxsc_K6V64JkamnIyqXMMbZF6F73haCj1kU1giDE7VasLUxMgeNtuLxaUeTXyiTyBwsUVEIcpL28UCc8eKlub--Bu00T9T60kIMKY-Su7NUsxueX3YEEPe2U"
        />
      </div>

      <div className="decorative-img-right d-none d-lg-block">
        <img
          className="w-100 h-100 object-fit-cover"
          alt="Tablet progress board"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA851iBG06TJMCi69UMUNszVQc-KUo7X-F5OnCpgI8Xi2IiK8jNOkh7oORli-NS_GZzI2o0ZA6ftlBX3CXtgNmXmW2bTNXdHjWFxDytdRTsbvs0jlHZ8aCddXUoPy6RWnIWgEJpYs1G5PMMGpaeOdurVLyphFjKSfiRAAfUBXEuUdar30Zb58olwwrRl5zmy1G0fG3iYUwRozS-AB6XvhALck-_xDxpAfyT9XrRNQwPUWg7LTBFQ8gVeP2yzy-HXciH5Ekvbpo956-u"
        />
      </div>

      <main className="w-full max-w-[480px] z-3 flex flex-column gap-4">
        {/* Header Text */}
        <div className="text-center">
          <h1 className="h3 fw-extrabold text-primary mb-1">Lumina LMS</h1>
          <p className="text-secondary small mb-0">Begin your professional learning journey today.</p>
        </div>

        {/* Card */}
        <div className="registration-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold text-dark mb-0" aria-label="Register">
              Create Account
            </h2>
            <button
              type="button"
              className="btn btn-nexus-secondary py-1 px-3"
              onClick={handleReset}
              aria-label="Reset"
              style={{ fontSize: '0.8rem' }}
            >
              Reset
            </button>
          </div>

          {submitError && (
            <div className="alert alert-danger d-flex align-items-center mb-3 text-start small" role="alert" style={{ borderRadius: '8px' }}>
              <span className="me-2">⚠️</span>
              <div>{submitError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Role select */}
            <div className="d-flex flex-column gap-1">
              <label htmlFor="role" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                Role
              </label>
              <select
                id="role"
                className="form-select py-2.5 px-3 rounded-3 input-glow"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ border: '1px solid var(--outline-variant)', fontSize: '14px' }}
              >
                <option value="Learner">Learner</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            {/* Name Field */}
            <div className="d-flex flex-column gap-1">
              <label htmlFor="fullName" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                Full Name
              </label>
              <input
                type="text"
                className={`form-control py-2.5 px-3 rounded-3 input-glow ${validationErrors.name ? 'is-invalid' : ''}`}
                id="fullName"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ border: '1px solid var(--outline-variant)', fontSize: '14px' }}
              />
              {validationErrors.name && (
                <div className="invalid-feedback small">{validationErrors.name}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="d-flex flex-column gap-1">
              <label htmlFor="emailAddress" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                Email address
              </label>
              <input
                type="text"
                className={`form-control py-2.5 px-3 rounded-3 input-glow ${validationErrors.email ? 'is-invalid' : ''}`}
                id="emailAddress"
                placeholder="alex@lumina.edu"
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
              <label htmlFor="password" className="fw-semibold text-secondary small uppercase tracking-wider" style={{ fontSize: '11px' }}>
                Password
              </label>
              <input
                type="password"
                className={`form-control py-2.5 px-3 rounded-3 input-glow ${validationErrors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: '1px solid var(--outline-variant)', fontSize: '14px' }}
              />
              {validationErrors.password && (
                <div className="invalid-feedback small">{validationErrors.password}</div>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="form-check d-flex align-items-start gap-2 mt-1">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                required
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label className="form-check-label text-secondary small cursor-pointer" htmlFor="terms" style={{ lineHeight: '1.4' }}>
                I agree to the <a className="text-primary fw-semibold text-decoration-none hover:underline" href="#">Terms of Service</a> and <a className="text-primary fw-semibold text-decoration-none hover:underline" href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="btn btn-nexus-primary w-100 py-3 mt-2 rounded-3 text-white transition-all d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
              style={{ fontSize: '15px' }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>

            {/* Terms subtext */}
            <p className="text-center text-secondary small mt-2 mb-0 px-2 leading-relaxed" style={{ fontSize: '11px' }}>
              By creating an account, you agree to our <a className="text-primary text-decoration-none hover:underline" href="#">Terms of Service</a> and <a className="text-primary text-decoration-none hover:underline" href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Redirect link */}
        <div className="text-center">
          <p className="text-secondary small mb-0">
            Already have an account? <Link to="/login" className="text-primary font-semibold text-decoration-none hover:underline">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

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
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }
        .glow-left {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 40%;
          height: 40%;
          border-radius: 9999px;
          background-color: rgba(37, 99, 235, 0.04);
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
          background-color: rgba(71, 85, 105, 0.04);
          filter: blur(120px);
          pointer-events: none;
        }
        .registration-card {
          width: 100%;
          max-width: 460px;
          background-color: var(--surface-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 40px;
          box-shadow: var(--shadow-lg);
          z-index: 10;
        }
        .decorative-img-left {
          position: absolute;
          bottom: 40px;
          left: 40px;
          width: 200px;
          height: 200px;
          opacity: 0.15;
          transform: rotate(3deg);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-color);
          pointer-events: none;
        }
        .decorative-img-right {
          position: absolute;
          top: 40px;
          right: 40px;
          width: 160px;
          height: 160px;
          opacity: 0.15;
          transform: rotate(-3deg);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-color);
          pointer-events: none;
        }
      `}</style>

      <div className="glow-left"></div>
      <div className="glow-right"></div>

      {/* Decorative premium elements */}
      <div className="decorative-img-left d-none d-lg-block">
        <img
          className="w-100 h-100 object-fit-cover"
          alt="Workspace"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3o5wlNZZnrqRanj7dg_m7lP2fI7CnUXqmV-23-wyGX3NvWC8zzuRt_KYbi7Bm502cS6jVkCPTRtsYB31RY-FsPGo-BBZmo4ac-N6s8uPTLoxyFfgv3zZaEiH4vLmXVbU7mzp-A_jVwvPvCNAl-AjDAxsc_K6V64JkamnIyqXMMbZF6F73haCj1kU1giDE7VasLUxMgeNtuLxaUeTXyiTyBwsUVEIcpL28UCc8eKlub--Bu00T9T60kIMKY-Su7NUsxueX3YEEPe2U"
        />
      </div>

      <div className="decorative-img-right d-none d-lg-block">
        <img
          className="w-100 h-100 object-fit-cover"
          alt="Dashboard"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA851iBG06TJMCi69UMUNszVQc-KUo7X-F5OnCpgI8Xi2IiK8jNOkh7oORli-NS_GZzI2o0ZA6ftlBX3CXtgNmXmW2bTNXdHjWFxDytdRTsbvs0jlHZ8aCddXUoPy6RWnIWgEJpYs1G5PMMGpaeOdurVLyphFjKSfiRAAfUBXEuUdar30Zb58olwwrRl5zmy1G0fG3iYUwRozS-AB6XvhALck-_xDxpAfyT9XrRNQwPUWg7LTBFQ8gVeP2yzy-HXciH5Ekvbpo956-u"
        />
      </div>

      <main className="w-100 d-flex flex-column gap-3 align-items-center z-3">
        {/* Brand Header */}
        <div className="text-center">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary fs-3">local_library</span>
            <span className="fw-bold fs-4 text-primary">EduFlow LMS</span>
          </div>
          <p className="text-secondary small mb-0">Join the premium, structured learning environment.</p>
        </div>

        {/* Form Card */}
        <div className="registration-card text-start">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h5 fw-bold text-dark mb-0" aria-label="Register">
              Create Account
            </h2>
            <button
              type="button"
              className="btn-premium-secondary py-1 px-3"
              onClick={handleReset}
              aria-label="Reset"
              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
            >
              Reset
            </button>
          </div>

          {submitError && (
            <div className="alert alert-danger d-flex align-items-center mb-3 small" role="alert" style={{ borderRadius: 'var(--radius-md)' }}>
              <span className="me-2">⚠️</span>
              <div>{submitError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Role Select */}
            <div className="form-group-premium">
              <label htmlFor="role" className="label-premium">
                Register as
              </label>
              <select
                id="role"
                className="input-premium"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ appearance: 'auto' }}
              >
                <option value="Learner">Learner (Student)</option>
                <option value="Instructor">Instructor (Teacher)</option>
              </select>
            </div>

            {/* Name Field */}
            <div className="form-group-premium">
              <label htmlFor="fullName" className="label-premium">
                Full Name
              </label>
              <input
                type="text"
                className={`input-premium ${validationErrors.name ? 'is-invalid' : ''}`}
                id="fullName"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {validationErrors.name && (
                <div className="invalid-feedback small mt-1">{validationErrors.name}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group-premium">
              <label htmlFor="emailAddress" className="label-premium">
                Email address
              </label>
              <input
                type="text"
                className={`input-premium ${validationErrors.email ? 'is-invalid' : ''}`}
                id="emailAddress"
                placeholder="alex@lumina.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validationErrors.email && (
                <div className="invalid-feedback small mt-1">{validationErrors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group-premium">
              <label htmlFor="password" className="label-premium">
                Password
              </label>
              <input
                type="password"
                className={`input-premium ${validationErrors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {validationErrors.password && (
                <div className="invalid-feedback small mt-1">{validationErrors.password}</div>
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
                I agree to the <a className="text-primary fw-semibold text-decoration-none" href="#">Terms of Service</a> and <a className="text-primary fw-semibold text-decoration-none" href="#">Privacy Policy</a>.
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="btn-premium-primary w-100 py-2.5 mt-2 transition-all d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
              <span className="material-symbols-outlined fs-6">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Redirect link */}
        <div className="text-center mt-2">
          <p className="text-secondary small mb-0">
            Already have an account? <Link to="/login" className="text-primary fw-semibold text-decoration-none hover-text-primary">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorMsg = 'Email is required.';
      } else if (!emailRegex.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (name === 'password') {
      if (!value) {
        errorMsg = 'Password is required.';
      } else if (value.length < 8) {
        errorMsg = 'Password must be at least 8 characters.';
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    return !errorMsg;
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email.trim(), password);
      // Log the user in with token and details
      login(result.user, result.token);
      // Redirect to admin dashboard page
      navigate('/admin/dashboard');
    } catch (err) {
      setApiError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen d-flex flex-column align-items-center justify-content-center py-5 relative z-1">
      {/* Brand Header */}
      <div className="text-center mb-4">
        <div className="text-primary mb-2">
          <span className="material-symbols-outlined fill-icon" style={{ fontSize: '48px' }}>
            auto_stories
          </span>
        </div>
        <h1 className="h3 fw-bold text-primary mb-1">Lumina Editorial</h1>
      </div>

      {/* Form Container */}
      <div className="w-100 col-12 col-md-6 col-lg-4" style={{ maxWidth: '440px' }}>
        <Card className="card shadow p-4">
          <header className="mb-4">
            <h2 className="h4 fw-bold text-dark mb-1">Welcome back</h2>
            <p className="text-muted small">Log in to manage your editorial workflow.</p>
          </header>

          {apiError && (
            <div className="alert alert-danger p-2 small mb-3" role="alert">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Email address"
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              error={errors.email}
              required
            />

            <div className="mb-3 position-relative">
              <div className="d-flex items-center justify-content-between mb-1">
                <label className="form-label text-secondary fw-semibold small mb-0" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-primary text-decoration-none small hover-underline fw-semibold" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-control pe-5 py-2 bg-white border focus-ring ${
                    errors.password ? 'is-invalid border-danger' : 'border-light-subtle'
                  }`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur}
                  required
                />
                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y border-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 10 }}
                >
                  <span className="material-symbols-outlined align-middle" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback d-block mt-1 text-danger small">{errors.password}</div>
              )}
            </div>

            {/* Remember Me */}
            <div className="mb-3 form-check d-flex align-items-center gap-2 ps-0">
              <input
                type="checkbox"
                className="form-check-input ms-0 mt-0"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '1em', height: '1em' }}
              />
              <label className="form-check-label text-muted small user-select-none" htmlFor="remember">
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" loading={loading}>
              Log In
            </Button>
          </form>

          {/* Social Logins Divider */}
          <div className="position-relative my-4 text-center">
            <hr className="text-secondary opacity-25 m-0" />
            <span
              className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-secondary uppercase fw-semibold"
              style={{ fontSize: '10px', letterSpacing: '0.05em' }}
            >
              Or continue with
            </span>
          </div>

          {/* Social Buttons */}
          <div className="row g-2">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-social d-flex align-items-center justify-content-center gap-2 w-full py-2 rounded-3 border"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2ayjo9ALIKdQdngBWMYWt0UTyBckFFJyWJgpYhqMjqTaywFGvtRYPnQDhGjHl5N-lZuXX_MUWcI9xRdWKdk4iwTOZE5SRSjrvNC_779d6cOJHEh606Hy48TUE6Mi9crrwexQ7aBUdvHXM9r2BworcrQm6PQXay8Gs-RiSMv_hROdiYP2Mtm9f_hkeVc0B4FUSNwdWQWyQYgMz1LpYzUp-Rq9W1kt-eJuxhl8yzr0X1AaM3NNHzJ0H5xxRD3d3sCMaSxnrgK-0K6u4"
                  style={{ width: '20px', height: '20px' }}
                />
                <span className="small">Google</span>
              </button>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="btn btn-social d-flex align-items-center justify-content-center gap-2 w-full py-2 rounded-3 border"
                onClick={(e) => e.preventDefault()}
              >
                <span className="material-symbols-outlined align-middle" style={{ fontSize: '20px' }}>
                  terminal
                </span>
                <span className="small">GitHub</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Footer Navigation Link */}
        <p className="text-center mt-4 text-muted small">
          Don't have an account?{' '}
          <Link to="/register" className="decoration-link">
            Create an account
          </Link>
        </p>

        {/* Brand Footer */}
        <footer className="mt-5 text-center">
          <div className="d-flex align-items-center justify-content-center gap-3 small text-secondary opacity-75">
            <a href="#" className="text-decoration-none text-reset hover-primary">Privacy Policy</a>
            <span className="bullet-divider"></span>
            <a href="#" className="text-decoration-none text-reset hover-primary">Terms of Service</a>
            <span className="bullet-divider"></span>
            <a href="#" className="text-decoration-none text-reset hover-primary">Cookie Policy</a>
          </div>
          <p className="mt-3 small text-muted opacity-50">
            © 2026 Lumina Editorial. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { registerUser } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Field validation rules
  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (name === 'username') {
      if (!value) {
        errorMsg = 'Username is required.';
      } else if (value.trim().length < 3) {
        errorMsg = 'Username must be at least 3 characters.';
      }
    }

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

    // Final validation checks
    const isUsernameValid = validateField('username', username);
    const isEmailValid = validateField('email', email);
    const isPasswordValid = validateField('password', password);

    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(username.trim(), email.trim(), password);
      // Log the user in with token and details
      login(result.user, result.token);
      // Redirect to admin dashboard page
      navigate('/admin/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
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
            <h2 className="h4 fw-bold text-dark mb-1">Create your account</h2>
            <p className="text-muted small">Register as an author to manage your editorial workflow.</p>
          </header>

          {apiError && (
            <div className="alert alert-danger p-2 small mb-3" role="alert">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <Input
              label="Username"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleBlur}
              error={errors.username}
              required
            />

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

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur}
              error={errors.password}
              required
            />

            <Button type="submit" loading={loading} className="mt-3">
              Create Account
            </Button>
          </form>
        </Card>

        {/* Footer Navigation Link */}
        <p className="text-center mt-4 text-muted small">
          Already have an account?{' '}
          <Link to="/login" className="decoration-link">
            Log In
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

export default Register;

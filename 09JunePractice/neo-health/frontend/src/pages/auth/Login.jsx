import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState('patient'); // patient, doctor, admin
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic Validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password, role);
      setSuccess(true);
      setTimeout(() => {
        if (role === 'patient') {
          navigate('/patient/dashboard');
        } else if (role === 'doctor') {
          navigate('/doctor/dashboard');
        } else if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 1200);
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container py-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
      {/* React 19 Document Metadata */}
      <title>Login | Neo-Health Patient Portal</title>
      <meta name="description" content="Sign in to your Neo-Health account. Access your medical consults, talk to doctors online, and view pharmacy history." />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="neo-glass-card p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none">
                  <i className="bi bi-heart-pulse-fill text-primary fs-3"></i>
                  <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
                </Link>
                <h4 className="fw-bold text-dark">Welcome Back</h4>
                <p className="text-secondary small">Access your telehealth dashboard and digital charts.</p>
              </div>

              {/* Role Tabs */}
              <div className="nav nav-pills nav-justified mb-4 p-1 bg-light rounded-pill border" id="login-role-tabs">
                <button
                  type="button"
                  className={`nav-link py-2 rounded-pill small ${role === 'patient' ? 'active btn-primary-neo' : 'text-secondary bg-transparent border-0'}`}
                  onClick={() => setRole('patient')}
                  id="login-tab-patient"
                >
                  <i className="bi bi-person me-1"></i>Patient
                </button>
                <button
                  type="button"
                  className={`nav-link py-2 rounded-pill small ${role === 'doctor' ? 'active btn-primary-neo' : 'text-secondary bg-transparent border-0'}`}
                  onClick={() => setRole('doctor')}
                  id="login-tab-doctor"
                >
                  <i className="bi bi-person-badge me-1"></i>Doctor
                </button>
                <button
                  type="button"
                  className={`nav-link py-2 rounded-pill small ${role === 'admin' ? 'active btn-primary-neo' : 'text-secondary bg-transparent border-0'}`}
                  onClick={() => setRole('admin')}
                  id="login-tab-admin"
                >
                  <i className="bi bi-shield-lock me-1"></i>Admin
                </button>
              </div>

              {error && (
                <div className="alert alert-danger small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="login-error-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="login-success-alert">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Authentication successful! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} id="login-form">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label small fw-semibold text-dark">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-neo"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="password" className="form-label small fw-semibold text-dark mb-0">Password</label>
                    <Link to="/forgot-password" id="login-link-forgot" className="small text-primary text-decoration-none">Forgot Password?</Link>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-neo"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-neo w-100 py-3 mt-2 d-flex align-items-center justify-content-center gap-2"
                  id="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <i className="bi bi-box-arrow-in-right"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4 border-top pt-3">
                <p className="text-secondary small mb-0">
                  New to Neo-Health? <Link to="/register" id="login-link-register" className="text-primary text-decoration-none fw-semibold">Create an Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

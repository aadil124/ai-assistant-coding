import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    // Simulate API request to reset credentials
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after showing success alert
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="reset-password-container py-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
      {/* React 19 Document Metadata */}
      <title>Reset Password | Neo-Health Account</title>
      <meta name="description" content="Update your Neo-Health account password. Make sure to choose a secure and unique password." />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="neo-glass-card p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none">
                  <i className="bi bi-heart-pulse-fill text-primary fs-3"></i>
                  <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
                </Link>
                <h4 className="fw-bold text-dark">Define New Password</h4>
                <p className="text-secondary small">Set a new, secure password to access your dashboard.</p>
              </div>

              {error && (
                <div className="alert alert-danger small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="reset-error-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="reset-success-alert">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Password updated successfully! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} id="reset-password-form">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label small fw-semibold text-dark">New Password</label>
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
                  <div className="form-text small text-secondary">Minimum 6 characters.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label small fw-semibold text-dark">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control form-control-neo"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  id="reset-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Updating password...</span>
                    </>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <i className="bi bi-shield-check"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

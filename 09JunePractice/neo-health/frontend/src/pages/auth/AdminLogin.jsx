import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please provide email and password.');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password, 'admin');
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1200);
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light" style={{ py: '6rem' }}>
      <title>Admin Portal Access | Neo-Health</title>
      <meta name="description" content="Secure administrative login for Neo-Health managers and support staff." />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            
            {/* Back to main button */}
            <div className="mb-4">
              <Link to="/login" className="btn btn-sm btn-light border text-secondary d-inline-flex align-items-center gap-2">
                <i className="bi bi-arrow-left"></i>
                <span>Back to Standard Login</span>
              </Link>
            </div>

            <div className="neo-glass-card p-4 p-md-5 bg-white border shadow-sm">
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                  <i className="bi bi-shield-lock-fill text-primary fs-3"></i>
                  <span className="fw-bold fs-4 neo-gradient-text">Neo-Health Admin</span>
                </div>
                <h5 className="fw-bold text-dark">Portal Administration</h5>
                <p className="text-secondary small">Authenticate to access platform manager controls.</p>
              </div>

              {error && (
                <div className="alert alert-danger small py-2.5 d-flex align-items-center gap-2 mb-3" role="alert" id="admin-login-error">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success small py-2.5 d-flex align-items-center gap-2 mb-3" role="alert" id="admin-login-success">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Access Granted! Loading Admin Workspace...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} id="admin-login-form">
                <div className="mb-3">
                  <label htmlFor="admin-email" className="form-label small fw-semibold text-dark">Administrative Email</label>
                  <input
                    type="email"
                    className="form-control form-control-neo"
                    id="admin-email"
                    name="email"
                    placeholder="admin@neohealth.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="admin-password" className="form-label small fw-semibold text-dark mb-0">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Admin password reset request sent to systems administrator."); }} className="small text-primary text-decoration-none">Reset?</a>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-neo"
                    id="admin-password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="admin-remember-me"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small text-secondary cursor-pointer" htmlFor="admin-remember-me">
                    Remember my terminal authorization
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  id="admin-login-submit"
                  disabled={loading || success}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Authorizing Terminal...</span>
                    </>
                  ) : (
                    <>
                      <span>Secure Authorize</span>
                      <i className="bi bi-shield-check"></i>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4 border-top pt-3 text-secondary small">
                <i className="bi bi-info-circle me-1"></i>
                Credentials: <code>admin@neohealth.com</code> / <code>admin123</code>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

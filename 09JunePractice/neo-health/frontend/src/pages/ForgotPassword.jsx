import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    // Simulate API password recovery request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="forgot-password-container py-5 d-flex align-items-center" style={{ minHeight: '80vh' }}>
      {/* React 19 Document Metadata */}
      <title>Forgot Password | Neo-Health Recovery</title>
      <meta name="description" content="Recover your Neo-Health patient portal account password. Enter your email to receive a secure password reset link." />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="neo-glass-card p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none">
                  <i className="bi bi-heart-pulse-fill text-primary fs-3"></i>
                  <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
                </Link>
                <h4 className="fw-bold text-dark">Recover Password</h4>
                <p className="text-secondary small">Enter your email and we'll dispatch a link to reset your credentials.</p>
              </div>

              {submitted ? (
                <div className="text-center py-3" id="forgot-success-state">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 mb-4 d-inline-flex">
                    <i className="bi bi-envelope-check-fill fs-3"></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Check Your Email</h5>
                  <p className="text-secondary small mb-4">
                    If an account is registered under <strong className="text-dark">{email}</strong>, you will receive a secure token recovery link shortly.
                  </p>
                  <Link to="/login" className="btn btn-primary-neo w-100 py-3" id="forgot-btn-return-login">Return to Sign In</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="forgot-password-form">
                  {error && (
                    <div className="alert alert-danger small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="forgot-error-alert">
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label small fw-semibold text-dark">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-neo"
                      id="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                    id="forgot-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Sending reset link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Password Reset Link</span>
                        <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                  
                  <div className="text-center mt-4 border-top pt-3">
                    <Link to="/login" id="forgot-link-login" className="text-secondary small text-decoration-none hover-link">
                      <i className="bi bi-chevron-left me-1"></i>Back to Sign In
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

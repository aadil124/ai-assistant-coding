import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient'); // patient, doctor
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    specialty: '',
    bio: '',
    licenseNumber: '',
    fees: '',
    termsAccepted: false
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic Validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields.');
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.termsAccepted) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    // Role-specific validations
    if (role === 'patient' && !formData.birthdate) {
      setError('Birthdate is required for Patient registration.');
      return;
    }

    if (role === 'doctor') {
      if (!formData.specialty || !formData.bio.trim() || !formData.licenseNumber.trim() || !formData.fees) {
        setError('All specialty details, biography, credentials, and fees are required for Doctors.');
        return;
      }
      if (isNaN(formData.fees) || Number(formData.fees) <= 0) {
        setError('Please enter a valid consultation fee amount.');
        return;
      }
    }

    setLoading(true);

    // Simulate API registration request
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
    <div className="register-container py-5" style={{ minHeight: '85vh' }}>
      {/* React 19 Document Metadata */}
      <title>Register | Create Neo-Health Account</title>
      <meta name="description" content="Sign up as a patient or doctor on the Neo-Health portal. Access state-of-the-art digital medical tools today." />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="neo-glass-card p-4 p-md-5">
              <div className="text-center mb-4">
                <Link to="/" className="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none">
                  <i className="bi bi-heart-pulse-fill text-primary fs-3"></i>
                  <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
                </Link>
                <h4 className="fw-bold text-dark">Create Your Account</h4>
                <p className="text-secondary small">Join our secure telehealth network to connect instantly.</p>
              </div>

              {/* Registration Role Selection */}
              <div className="nav nav-pills nav-justified mb-4 p-1 bg-light rounded-pill border" id="register-role-tabs">
                <button
                  type="button"
                  className={`nav-link py-2 rounded-pill small ${role === 'patient' ? 'active btn-primary-neo' : 'text-secondary bg-transparent border-0'}`}
                  onClick={() => setRole('patient')}
                  id="register-tab-patient"
                >
                  <i className="bi bi-person me-1"></i>Register as Patient
                </button>
                <button
                  type="button"
                  className={`nav-link py-2 rounded-pill small ${role === 'doctor' ? 'active btn-primary-neo' : 'text-secondary bg-transparent border-0'}`}
                  onClick={() => setRole('doctor')}
                  id="register-tab-doctor"
                >
                  <i className="bi bi-person-badge me-1"></i>Register as Doctor
                </button>
              </div>

              {error && (
                <div className="alert alert-danger small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="register-error-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="register-success-alert">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Account registered successfully! Redirecting to login...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} id="register-form">
                <div className="row g-3">
                  {/* Name field */}
                  <div className="col-12">
                    <label htmlFor="fullName" className="form-label small fw-semibold text-dark">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="fullName"
                      name="fullName"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="col-12">
                    <label htmlFor="email" className="form-label small fw-semibold text-dark">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-neo"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password fields */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="password text-dark" className="form-label small fw-semibold">Password</label>
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
                  <div className="col-12 col-sm-6">
                    <label htmlFor="confirmPassword" className="form-label small fw-semibold text-dark">Confirm Password</label>
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

                  {/* Role Specific Fields */}
                  {role === 'patient' ? (
                    <div className="col-12" id="patient-only-fields">
                      <label htmlFor="birthdate" className="form-label small fw-semibold text-dark">Birthdate</label>
                      <input
                        type="date"
                        className="form-control form-control-neo"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ) : (
                    <div className="col-12 row g-3 m-0 p-0" id="doctor-only-fields">
                      <div className="col-12 col-sm-6 ps-0">
                        <label htmlFor="specialty" className="form-label small fw-semibold text-dark">Medical Specialty</label>
                        <select
                          className="form-select form-control-neo text-secondary"
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Specialty</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="General Practitioner">General Practitioner</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Neurology">Neurology</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-6 pe-0">
                        <label htmlFor="fees" className="form-label small fw-semibold text-dark">Consultation Fee ($)</label>
                        <input
                          type="number"
                          className="form-control form-control-neo"
                          id="fees"
                          name="fees"
                          placeholder="e.g. 50"
                          min="1"
                          value={formData.fees}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12 px-0">
                        <label htmlFor="licenseNumber" className="form-label small fw-semibold text-dark">Medical License / Credentials ID</label>
                        <input
                          type="text"
                          className="form-control form-control-neo"
                          id="licenseNumber"
                          name="licenseNumber"
                          placeholder="e.g. MD-998877"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12 px-0">
                        <label htmlFor="bio" className="form-label small fw-semibold text-dark">Professional Biography</label>
                        <textarea
                          className="form-control form-control-neo"
                          id="bio"
                          name="bio"
                          rows="3"
                          placeholder="Summarize your clinic background, hospital associations..."
                          value={formData.bio}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Accept terms checkbox */}
                  <div className="col-12">
                    <div className="form-check text-start">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label small text-secondary" htmlFor="termsAccepted">
                        I agree to the <a href="#" className="text-primary text-decoration-none">Terms of Service</a> & <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <div className="col-12 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                      id="register-submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Registration</span>
                          <i className="bi bi-person-plus-fill"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <div className="text-center mt-4 border-top pt-3">
                <p className="text-secondary small mb-0">
                  Already have an account? <Link to="/login" id="register-link-login" className="text-primary text-decoration-none fw-semibold">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

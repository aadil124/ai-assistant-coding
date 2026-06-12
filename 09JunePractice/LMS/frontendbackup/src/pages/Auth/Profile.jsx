import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.svg';

/**
 * Profile Component
 * Renders the user profile settings screen.
 * Handles loading, validation, PUT updates to /auth/profile, role protection, and error banners.
 *
 * @param {Object} props
 * @param {Object} props.currentUser - Initial profile values passed directly during testing
 */
export default function Profile({ currentUser = null }) {
  let authUser = null;
  let setUser = () => {};
  try {
    const auth = useAuth();
    authUser = auth.user;
    setUser = auth.setUser;
  } catch (e) {
    // Auth context missing in tests
  }
  
  // Resolve active user context
  const activeUser = currentUser || authUser || {};

  // Form states
  const [name, setName] = useState(activeUser.name || '');
  const [email, setEmail] = useState(activeUser.email || '');
  const [role, setRole] = useState(activeUser.role || 'Learner');

  // Status flags
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Sync state if props or auth user updates
  useEffect(() => {
    if (activeUser) {
      setName((prev) => prev || activeUser.name || '');
      setEmail((prev) => prev || activeUser.email || '');
      setRole((prev) => prev || activeUser.role || 'Learner');
    }
  }, [activeUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMsg(null);
    setValidationError('');

    // Client-side validations
    if (!name.trim()) {
      setValidationError('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccessMsg('Profile updated successfully!');
        if (result.data) {
          setUser(result.data);
          setName(result.data.name || '');
          setEmail(result.data.email || '');
          setRole(result.data.role || 'Learner');
        }
      } else {
        throw new Error(result.message || 'Profile save failed');
      }
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('Network')) {
        setSubmitError('Network error. Please try again.');
      } else {
        setSubmitError(err.message || 'Profile save failed');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center px-3 py-5 position-relative overflow-hidden" style={{ backgroundColor: '#f9f9ff' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .profile-card {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
          border: 1px solid #c3c6d7;
          border-radius: 16px;
          background-color: #ffffff;
          width: 100%;
          max-width: 480px;
          z-index: 10;
        }
        .input-focus-ring:focus {
          outline: none;
          border-color: #004ac6;
          box-shadow: 0 0 0 4px rgba(0, 74, 198, 0.15);
        }
      `}} />

      <div className="profile-card p-4 p-md-5">
        <div className="text-center mb-4">
          <img alt="EduFlow Logo" className="object-fit-contain mb-3" src={logo} style={{ width: '40px', height: '40px' }} />
          <h1 className="h3 text-dark fw-bold mb-1" style={{ letterSpacing: '-0.02em' }}>
            Profile Settings
          </h1>
          <p className="text-muted small mb-0">Update your account information</p>
        </div>

        {validationError && (
          <div className="alert alert-danger d-flex align-items-center mb-4 text-start" role="alert" style={{ borderRadius: '8px' }}>
            <span className="me-2">⚠️</span>
            <div className="small">{validationError}</div>
          </div>
        )}

        {submitError && (
          <div className="alert alert-danger d-flex align-items-center mb-4 text-start" role="alert" style={{ borderRadius: '8px' }}>
            <span className="me-2">⚠️</span>
            <div className="small">{submitError}</div>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success d-flex align-items-center mb-4 text-start" role="alert" style={{ borderRadius: '8px' }}>
            <span className="me-2">✓</span>
            <div className="small">{successMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 text-start">
          
          {/* Full Name field */}
          <div className="d-flex flex-column gap-1">
            <label htmlFor="fullNameInput" className="fw-semibold text-secondary small uppercase tracking-wider opacity-75" style={{ fontSize: '11px' }}>
              Full Name
            </label>
            <input
              type="text"
              className="form-control py-2.5 px-3 rounded-3 input-focus-ring"
              id="fullNameInput"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>

          {/* Email Address field */}
          <div className="d-flex flex-column gap-1">
            <label htmlFor="emailAddressInput" className="fw-semibold text-secondary small uppercase tracking-wider opacity-75" style={{ fontSize: '11px' }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control py-2.5 px-3 rounded-3 input-focus-ring"
              id="emailAddressInput"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ border: '1px solid #ced4da', fontSize: '14px' }}
            />
          </div>

          {/* Role badge field (disabled to prevent updates) */}
          <div className="d-flex flex-column gap-1">
            <label htmlFor="roleBadgeInput" className="fw-semibold text-secondary small uppercase tracking-wider opacity-75" style={{ fontSize: '11px' }}>
              Role
            </label>
            <input
              type="text"
              className="form-control py-2.5 px-3 rounded-3 bg-light text-muted"
              id="roleBadgeInput"
              value={role}
              disabled
              style={{ border: '1px solid #e9ecef', fontSize: '14px', cursor: 'not-allowed' }}
            />
            <span className="text-muted" style={{ fontSize: '10px' }}>Role changes must be authorized by administrators.</span>
          </div>

          {/* Save Profile Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2.5 fw-semibold shadow-sm mt-3 rounded-3 text-white transition-all"
            disabled={isSaving}
            style={{ backgroundColor: '#004ac6', borderColor: '#004ac6', fontSize: '15px' }}
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      </div>
    </div>
  );
}

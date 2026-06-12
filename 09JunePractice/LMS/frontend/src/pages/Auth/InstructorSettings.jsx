import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function InstructorSettings() {
  let authUser = null;
  let setUser = () => {};
  try {
    const auth = useAuth();
    authUser = auth.user;
    setUser = auth.setUser;
  } catch (e) {
    // Auth context missing in tests
  }
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('profile');

  // Personal Info form state
  const [name, setName] = useState(authUser?.name || '');
  const [email, setEmail] = useState(authUser?.email || '');
  const [bio, setBio] = useState('Expert educator with over 12 years of experience in Software Design and Digital Transformation strategy.');

  // Branding state
  const [academyName, setAcademyName] = useState('Lumina LMS Academy');
  const [brandColor, setBrandColor] = useState('#2563EB');

  // Notifications state
  const [enrollmentAlerts, setEnrollmentAlerts] = useState(true);
  const [quizAlerts, setQuizAlerts] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  // Status flags
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || '');
      setEmail(authUser.email || '');
    }
  }, [authUser]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

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
        }
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        throw new Error(result.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.message || 'Error updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBranding = (e) => {
    e.preventDefault();
    setSuccessMsg('Academy branding saved successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="settings-shell min-vh-100 d-flex text-start">
      <style>{`
        .settings-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          width: 100%;
        }
        .main-canvas {
          flex: 1;
          margin-left: 260px; /* Offset for sidebar */
          background-color: var(--bg-neutral);
          min-height: 100vh;
        }
        .avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }
        .tab-btn {
          background: none;
          border: none;
          padding-bottom: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }
        .tab-btn:hover {
          color: var(--primary);
        }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          font-weight: 600;
        }
        .toggle-switch-custom {
          width: 44px;
          height: 24px;
          background-color: var(--border-color);
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .toggle-switch-custom.active {
          background-color: var(--primary);
        }
        .toggle-knob {
          width: 18px;
          height: 18px;
          background-color: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .toggle-switch-custom.active .toggle-knob {
          transform: translateX(20px);
        }
        .logo-placeholder {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          background-color: var(--border-light);
          transition: var(--transition-fast);
        }
        .logo-placeholder:hover {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }
      `}</style>

      {/* Reusable Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="main-canvas p-4 p-md-5 overflow-auto">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">Instructor Settings</h2>
            <p className="text-secondary small mb-0">Manage your professional profile and academy preferences.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/dashboard" className="btn-premium-secondary py-1.5 px-3" style={{ fontSize: '0.85rem' }}>
              <span className="material-symbols-outlined fs-6 me-1">swap_horiz</span>
              Student View
            </Link>
            <div className="avatar-box">
              <img
                className="w-100 h-100 object-fit-cover"
                alt="Instructor Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r6EtbG-OyOIw39kn1fIpqAbWhs3NT42EGPFC-BiOv86N2-IM0YFbCyBPH54LKNgpjTkgGZgsFAeTrpN2McM7TOYYGhC1bnI84m2SQXTvCYI-w3ta30ITWoljRZgYRrkF61RpKGFJBN93LYWOv1uKwMCPP3ORIqRlX9GmmooRLgXer-beVwRQtZIqknyK8pmFI50-yUYc9HA84MJZtBG4BlnfhE8LbzJZH5TVmZNr4oUDn0nd6ATWn16xHrb77uAL_3TMMKBkksqH"
              />
            </div>
          </div>
        </header>

        <div className="container-fluid px-0" style={{ maxWidth: '800px' }}>
          {/* Alert notifications */}
          {error && (
            <div className="alert alert-danger border-0 rounded-3 mb-4 small" role="alert">
              ⚠️ {error}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success border-0 rounded-3 mb-4 small" role="alert">
              ✓ {successMsg}
            </div>
          )}

          {/* Horizontal Navigation Tabs */}
          <div className="d-flex gap-4 border-bottom mb-4 overflow-x-auto no-scrollbar" style={{ borderBottomColor: 'var(--border-color) !important' }}>
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`tab-btn ${activeTab === 'branding' ? 'active' : ''}`}
              onClick={() => setActiveTab('branding')}
            >
              Academy Branding
            </button>
            <button
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button
              className={`tab-btn ${activeTab === 'payouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('payouts')}
            >
              Payouts
            </button>
          </div>

          {/* TAB CONTENT: PROFILE */}
          {activeTab === 'profile' && (
            <div className="card-premium-static">
              <form onSubmit={handleSaveProfile} className="d-flex flex-column gap-4">
                <div className="row g-4 align-items-center">
                  <div className="col-12 col-md-2 text-center text-md-start">
                    <img
                      className="rounded-circle object-fit-cover shadow-sm"
                      style={{ width: '80px', height: '80px' }}
                      alt="Instructor Profile Large"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r6EtbG-OyOIw39kn1fIpqAbWhs3NT42EGPFC-BiOv86N2-IM0YFbCyBPH54LKNgpjTkgGZgsFAeTrpN2McM7TOYYGhC1bnI84m2SQXTvCYI-w3ta30ITWoljRZgYRrkF61RpKGFJBN93LYWOv1uKwMCPP3ORIqRlX9GmmooRLgXer-beVwRQtZIqknyK8pmFI50-yUYc9HA84MJZtBG4BlnfhE8LbzJZH5TVmZNr4oUDn0nd6ATWn16xHrb77uAL_3TMMKBkksqH"
                    />
                  </div>
                  <div className="col-12 col-md-10 d-flex justify-content-center justify-content-md-start gap-2">
                    <button type="button" className="btn-premium-primary py-2 px-3 text-xs" style={{ fontSize: '0.85rem' }}>Change Photo</button>
                    <button type="button" className="btn-premium-secondary py-2 px-3 text-xs" style={{ fontSize: '0.85rem' }}>Remove</button>
                  </div>
                </div>

                <div className="row g-3 text-start">
                  <div className="col-12 col-sm-6 form-group-premium">
                    <label htmlFor="instructorNameInput" className="label-premium">Full Name</label>
                    <input
                      type="text"
                      className="input-premium"
                      id="instructorNameInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6 form-group-premium">
                    <label htmlFor="instructorEmailInput" className="label-premium">Email Address</label>
                    <input
                      type="email"
                      className="input-premium"
                      id="instructorEmailInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-premium text-start">
                  <label htmlFor="instructorBioInput" className="label-premium">Bio</label>
                  <textarea
                    className="input-premium"
                    id="instructorBioInput"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="submit" className="btn-premium-primary px-4 py-2" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: BRANDING */}
          {activeTab === 'branding' && (
            <div className="card-premium-static">
              <form onSubmit={handleSaveBranding} className="d-flex flex-column gap-4">
                <div className="form-group-premium text-start">
                  <label htmlFor="academyNameInput" className="label-premium">Academy Name</label>
                  <input
                    type="text"
                    className="input-premium"
                    id="academyNameInput"
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-premium text-start">
                  <label className="label-premium">Academy Logo</label>
                  <div className="logo-placeholder p-5 text-center cursor-pointer">
                    <span className="material-symbols-outlined text-secondary fs-1 mb-2">upload_file</span>
                    <p className="mb-0 fw-bold text-dark small">Click to upload or drag and drop</p>
                    <p className="mb-0 text-secondary small" style={{ fontSize: '11px' }}>SVG, PNG, or JPG (max 800x400px)</p>
                  </div>
                </div>

                <div className="form-group-premium text-start">
                  <label htmlFor="brandColorInput" className="label-premium">Brand Accent Color</label>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="color"
                      className="form-control form-control-color border-0 p-0"
                      id="brandColorInput"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      title="Choose your brand color"
                      style={{ width: '44px', height: '38px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      className="input-premium uppercase font-monospace"
                      style={{ width: '120px' }}
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="submit" className="btn-premium-primary px-4 py-2">
                    Save Branding
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="card-premium-static p-0 overflow-hidden">
              <div className="d-flex flex-column text-start">
                <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">Enrollment Alerts</h5>
                    <p className="text-secondary mb-0 small">Get notified immediately when a new student joins your course.</p>
                  </div>
                  <div
                    className={`toggle-switch-custom ${enrollmentAlerts ? 'active' : ''}`}
                    onClick={() => setEnrollmentAlerts(prev => !prev)}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">Quiz Completion Alerts</h5>
                    <p className="text-secondary mb-0 small">Receive reports when students complete assessments.</p>
                  </div>
                  <div
                    className={`toggle-switch-custom ${quizAlerts ? 'active' : ''}`}
                    onClick={() => setQuizAlerts(prev => !prev)}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div className="p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="h6 fw-bold text-dark mb-1">System Updates</h5>
                    <p className="text-secondary mb-0 small">Stay informed about new features and scheduled maintenance.</p>
                  </div>
                  <div
                    className={`toggle-switch-custom ${systemUpdates ? 'active' : ''}`}
                    onClick={() => setSystemUpdates(prev => !prev)}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="card-premium-static d-flex flex-column gap-4 text-start">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-light p-4 rounded-4 border">
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Available Balance</span>
                  <h3 className="h3 fw-bold text-dark mt-1 mb-0">$4,280.50</h3>
                </div>
                <button
                  type="button"
                  className="btn-premium-primary px-4 py-2.5"
                  onClick={() => alert('Withdrawal request submitted successfully!')}
                >
                  Withdraw Funds
                </button>
              </div>

              <div className="d-flex flex-column">
                <span className="label-premium">Payout Method</span>
                <div className="p-4 rounded-3 border border-primary bg-primary bg-opacity-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mt-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-white p-2 rounded-3 shadow-sm text-primary d-flex align-items-center justify-content-center">
                      <span className="material-symbols-outlined fs-3">account_balance</span>
                    </div>
                    <div>
                      <p className="mb-0 fw-bold text-dark small">Bank Transfer (Ending in 4210)</p>
                      <p className="mb-0 text-secondary small" style={{ fontSize: '11px' }}>Verified on Oct 12, 2023</p>
                    </div>
                  </div>
                  <button type="button" className="btn btn-link text-primary p-0 fw-semibold text-decoration-none small">Edit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

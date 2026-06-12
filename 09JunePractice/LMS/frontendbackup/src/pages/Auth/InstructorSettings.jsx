import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function InstructorSettings() {
  const { user: authUser, setUser } = useAuth();
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('profile');

  // Personal Info form state
  const [name, setName] = useState(authUser?.name || '');
  const [email, setEmail] = useState(authUser?.email || '');
  const [bio, setBio] = useState('Expert educator with over 12 years of experience in Software Design and Digital Transformation strategy.');

  // Branding state
  const [academyName, setAcademyName] = useState('Lumina LMS Academy');
  const [brandColor, setBrandColor] = useState('#4648D4');

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
    <div className="settings-shell min-vh-100 d-flex">
      <style>{`
        .settings-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          width: 100%;
        }
        .aside-nav {
          width: 280px;
          border-right: 1px solid #c7c4d7;
          background-color: #ffffff;
        }
        .main-canvas {
          flex: 1;
          background-color: #f8f9ff;
        }
        .avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #c7c4d7;
        }
        .settings-card {
          background-color: #ffffff;
          border: 1px solid #c7c4d7;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .tab-btn {
          background: none;
          border: none;
          padding-bottom: 12px;
          font-weight: 500;
          color: #767586;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          color: #4648d4;
        }
        .tab-btn.active {
          color: #4648d4;
          border-bottom-color: #4648d4;
          font-weight: 600;
        }
        .form-label-custom {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #767586;
          margin-bottom: 8px;
        }
        .toggle-switch-custom {
          width: 44px;
          height: 24px;
          background-color: #c7c4d7;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .toggle-switch-custom.active {
          background-color: #4648d4;
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
          border: 2px dashed #c7c4d7;
          border-radius: 12px;
          background-color: #eff4ff;
          transition: all 0.2s;
        }
        .logo-placeholder:hover {
          border-color: #4648d4;
          background-color: #e5eeff;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="aside-nav d-none d-md-flex flex-column h-screen sticky-top p-4 gap-3">
        <div className="px-2 py-3 mb-3 d-flex align-items-center gap-2">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
            <span className="material-symbols-outlined font-fill-1">school</span>
          </div>
          <div>
            <h1 className="h6 fw-bold text-primary mb-0">Enterprise Academy</h1>
            <p className="text-secondary small mb-0">Instructor Portal</p>
          </div>
        </div>

        <nav className="flex-grow-1 d-flex flex-column gap-1">
          <Link to="/instructor" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/instructor/courses" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Courses</span>
          </Link>
          <Link to="/instructor/settings" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg bg-light fw-bold text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="pt-3 border-top d-flex flex-column gap-1">
          <Link to="/dashboard" className="nav-link d-flex align-items-center gap-3 px-3 py-2 text-secondary hover-text-primary small">
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>Learner Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="main-canvas flex-grow-1 p-4 md:p-5 overflow-auto">
        {/* Top bar */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">Instructor Settings</h2>
          <div className="d-flex align-items-center gap-3">
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
          {/* Header Description */}
          <div className="mb-4">
            <p className="text-secondary mb-0">Manage your professional profile and academy preferences.</p>
          </div>

          {/* Alert messages */}
          {error && (
            <div className="alert alert-danger border-0 rounded-3 mb-4" role="alert">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success border-0 rounded-3 mb-4" role="alert">
              {successMsg}
            </div>
          )}

          {/* Horizontal Navigation Tabs */}
          <div className="d-flex gap-4 border-b border-light-subtle mb-4 overflow-x-auto no-scrollbar" style={{ borderBottom: '1px solid #c7c4d7' }}>
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
            <div className="settings-card">
              <form onSubmit={handleSaveProfile} className="d-flex flex-column gap-4">
                <div className="row g-4 align-items-center">
                  <div className="col-12 col-md-3">
                    <img
                      className="rounded-circle object-fit-cover shadow-sm"
                      style={{ width: '80px', height: '80px' }}
                      alt="Instructor Profile Large"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r6EtbG-OyOIw39kn1fIpqAbWhs3NT42EGPFC-BiOv86N2-IM0YFbCyBPH54LKNgpjTkgGZgsFAeTrpN2McM7TOYYGhC1bnI84m2SQXTvCYI-w3ta30ITWoljRZgYRrkF61RpKGFJBN93LYWOv1uKwMCPP3ORIqRlX9GmmooRLgXer-beVwRQtZIqknyK8pmFI50-yUYc9HA84MJZtBG4BlnfhE8LbzJZH5TVmZNr4oUDn0nd6ATWn16xHrb77uAL_3TMMKBkksqH"
                    />
                  </div>
                  <div className="col-12 col-md-9 d-flex gap-2">
                    <button type="button" className="btn btn-nexus-primary px-3 py-2 fw-semibold small">Change Photo</button>
                    <button type="button" className="btn btn-outline-secondary px-3 py-2 fw-semibold small">Remove</button>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-sm-6 d-flex flex-column">
                    <label htmlFor="instructorNameInput" className="form-label-custom">Full Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2.5"
                      id="instructorNameInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-6 d-flex flex-column">
                    <label htmlFor="instructorEmailInput" className="form-label-custom">Email Address</label>
                    <input
                      type="email"
                      className="form-control rounded-3 py-2.5"
                      id="instructorEmailInput"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <label htmlFor="instructorBioInput" className="form-label-custom">Bio</label>
                  <textarea
                    className="form-control rounded-3 py-2.5"
                    id="instructorBioInput"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="submit" className="btn btn-nexus-primary px-4 py-2 rounded-3 fw-semibold small" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: BRANDING */}
          {activeTab === 'branding' && (
            <div className="settings-card">
              <form onSubmit={handleSaveBranding} className="d-flex flex-column gap-4">
                <div className="d-flex flex-column">
                  <label htmlFor="academyNameInput" className="form-label-custom">Academy Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3 py-2.5"
                    id="academyNameInput"
                    value={academyName}
                    onChange={(e) => setAcademyName(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex flex-column">
                  <label className="form-label-custom">Academy Logo</label>
                  <div className="logo-placeholder p-5 text-center cursor-pointer">
                    <span className="material-symbols-outlined text-secondary fs-1 mb-2">upload_file</span>
                    <p className="mb-0 fw-bold text-dark small">Click to upload or drag and drop</p>
                    <p className="mb-0 text-secondary small" style={{ fontSize: '11px' }}>SVG, PNG, or JPG (max 800x400px)</p>
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <label htmlFor="brandColorInput" className="form-label-custom">Brand Primary Color</label>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="color"
                      className="form-control form-control-color border-0 p-0"
                      id="brandColorInput"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      title="Choose your brand color"
                    />
                    <input
                      type="text"
                      className="form-control rounded-3 py-2 uppercase font-monospace text-center"
                      style={{ width: '120px' }}
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-2">
                  <button type="submit" className="btn btn-nexus-primary px-4 py-2 rounded-3 fw-semibold small">
                    Save Branding
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="settings-card p-0 overflow-hidden">
              <div className="divide-y d-flex flex-column">
                <div className="p-4 border-bottom border-light-subtle d-flex align-items-center justify-content-between">
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

                <div className="p-4 border-bottom border-light-subtle d-flex align-items-center justify-content-between">
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
            <div className="settings-card d-flex flex-column gap-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-light p-4 rounded-4 border">
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Available Balance</span>
                  <h3 className="h2 fw-bold text-dark mt-1 mb-0">$4,280.50</h3>
                </div>
                <button
                  type="button"
                  className="btn btn-nexus-primary px-4 py-2.5 rounded-3 fw-semibold small"
                  onClick={() => alert('Withdrawal request submitted successfully!')}
                >
                  Withdraw Funds
                </button>
              </div>

              <div className="d-flex flex-column">
                <span className="form-label-custom">Payout Method</span>
                <div className="p-4 rounded-4 border border-primary bg-primary bg-opacity-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mt-2">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-white p-2.5 rounded-3 shadow-sm text-primary d-flex align-items-center justify-content-center">
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

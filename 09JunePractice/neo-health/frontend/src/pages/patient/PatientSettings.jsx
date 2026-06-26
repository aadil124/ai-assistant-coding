import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import ErrorBanner from '../../components/shared/ErrorBanner.jsx';

export default function PatientSettings() {
  const navigate = useNavigate();

  // Tab control
  const [activeSettingsTab, setActiveSettingsTab] = useState('personal');

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@neohealth.com',
    phone: '+1 (555) 019-2831',
    birthdate: '1992-08-14'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPrescriptions: true,
    smsReminders: true,
    pushCalls: true
  });

  const [privacy, setPrivacy] = useState({
    gdprLogs: true,
    encryptedAcl: true,
    sessionTracking: false
  });

  const [devices, setDevices] = useState({
    camera: 'Facetime HD Camera (Built-in)',
    mic: 'MacBook Pro Microphone (Built-in)',
    speaker: 'MacBook Pro Speakers (Built-in)'
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!personalInfo.fullName.trim() || !personalInfo.email.trim()) {
      setErrorMsg('Full name and email are required fields.');
      return;
    }

    setTimeout(() => {
      setSuccessMsg('Personal information settings saved successfully.');
      localStorage.setItem('userEmail', personalInfo.email);
    }, 500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setErrorMsg('All password fields are required.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMsg('Confirmation password does not match new password.');
      return;
    }

    setTimeout(() => {
      setSuccessMsg('Your security password has been changed.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 500);
  };

  const handleNotificationsSave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Notification preferences updated.');
    }, 400);
  };

  const handlePrivacySave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Privacy configurations saved.');
    }, 400);
  };

  const handleDevicesSave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Hardware device bindings refreshed.');
    }, 400);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      navigate('/login');
    }
  };

  return (
    <DashboardLayout>
      {/* React 19 Document Metadata */}
      <title>Account Settings | Neo-Health Portal</title>
      <meta name="description" content="Manage personal profile info, notifications, privacy credentials, and WebRTC hardware devices." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Account Settings"
          subtitle="Configure profile parameters, system alerts, and telehealth hardware."
          breadcrumbs={[
            { label: 'Dashboard', path: '/patient/dashboard' },
            { label: 'Settings', path: '/patient/settings' }
          ]}
        />

        {successMsg && (
          <div className="alert alert-success border-success border-opacity-20 d-flex align-items-center gap-2 p-3 mb-4 rounded-3" role="alert" id="settings-success-alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <span className="small">{successMsg}</span>
          </div>
        )}

        <ErrorBanner message={errorMsg} onClose={() => setErrorMsg('')} />

        <div className="row g-4">
          {/* Left Column: Settings Category tabs */}
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-3 border bg-white shadow-sm d-flex flex-column gap-1">
              <button
                type="button"
                onClick={() => { setActiveSettingsTab('personal'); setSuccessMsg(''); setErrorMsg(''); }}
                className={`btn text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                  activeSettingsTab === 'personal' ? 'btn-primary-neo text-white' : 'btn-light text-secondary bg-transparent border-0 hover-link'
                }`}
              >
                <i className="bi bi-person-circle fs-5"></i>
                <span className="small fw-semibold">Personal Information</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveSettingsTab('security'); setSuccessMsg(''); setErrorMsg(''); }}
                className={`btn text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                  activeSettingsTab === 'security' ? 'btn-primary-neo text-white' : 'btn-light text-secondary bg-transparent border-0 hover-link'
                }`}
              >
                <i className="bi bi-shield-lock-fill fs-5"></i>
                <span className="small fw-semibold">Password & Security</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveSettingsTab('notifications'); setSuccessMsg(''); setErrorMsg(''); }}
                className={`btn text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                  activeSettingsTab === 'notifications' ? 'btn-primary-neo text-white' : 'btn-light text-secondary bg-transparent border-0 hover-link'
                }`}
              >
                <i className="bi bi-bell-fill fs-5"></i>
                <span className="small fw-semibold">Notification Preferences</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveSettingsTab('devices'); setSuccessMsg(''); setErrorMsg(''); }}
                className={`btn text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                  activeSettingsTab === 'devices' ? 'btn-primary-neo text-white' : 'btn-light text-secondary bg-transparent border-0 hover-link'
                }`}
              >
                <i className="bi bi-webcam-fill fs-5"></i>
                <span className="small fw-semibold">Connected Devices</span>
              </button>

              <hr className="my-2 opacity-25" />

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-danger text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 bg-transparent border-0 hover-bg-danger-subtle"
                id="settings-btn-logout"
              >
                <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
                <span className="small fw-bold text-danger">Logout Session</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tab View content panel */}
          <div className="col-12 col-md-8">
            <div className="h-100">
              
              {/* Personal Information Tab */}
              {activeSettingsTab === 'personal' && (
                <SectionCard title="Personal Information">
                  <form onSubmit={handlePersonalSubmit} id="personal-settings-form">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="settings-name" className="form-label small fw-semibold text-secondary">Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-neo"
                          id="settings-name"
                          value={personalInfo.fullName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="settings-birthdate" className="form-label small fw-semibold text-secondary">Birthdate</label>
                        <input
                          type="date"
                          className="form-control form-control-neo"
                          id="settings-birthdate"
                          value={personalInfo.birthdate}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, birthdate: e.target.value })}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="settings-email" className="form-label small fw-semibold text-secondary">Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control-neo"
                          id="settings-email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="settings-phone" className="form-label small fw-semibold text-secondary">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control form-control-neo"
                          id="settings-phone"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        />
                      </div>
                      <div className="col-12 mt-4 text-end">
                        <button type="submit" className="btn btn-primary-neo py-2.5 px-4" id="settings-btn-save-personal">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </SectionCard>
              )}

              {/* Password & Security Tab */}
              {activeSettingsTab === 'security' && (
                <div className="d-flex flex-column gap-4">
                  <SectionCard title="Change Password">
                    <form onSubmit={handlePasswordSubmit} id="security-password-form">
                      <div className="mb-3">
                        <label htmlFor="current-pw" className="form-label small fw-semibold text-secondary">Current Password</label>
                        <input
                          type="password"
                          className="form-control form-control-neo"
                          id="current-pw"
                          placeholder="••••••••"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="new-pw" className="form-label small fw-semibold text-secondary">New Password</label>
                        <input
                          type="password"
                          className="form-control form-control-neo"
                          id="new-pw"
                          placeholder="••••••••"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirm-pw" className="form-label small fw-semibold text-secondary">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control form-control-neo"
                          id="confirm-pw"
                          placeholder="••••••••"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        />
                      </div>
                      <div className="text-end mt-4">
                        <button type="submit" className="btn btn-primary-neo py-2.5 px-4" id="settings-btn-save-pw">
                          Change Password
                        </button>
                      </div>
                    </form>
                  </SectionCard>

                  <SectionCard title="Privacy Configurations">
                    <div className="d-flex flex-column gap-3 py-1">
                      <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                        <div>
                          <label className="form-check-label fw-bold text-dark small" htmlFor="switch-gdpr">GDPR Record Logging</label>
                          <small className="text-secondary d-block">Log clinical record downloads and accesses automatically.</small>
                        </div>
                        <input
                          className="form-check-input ms-0 border cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="switch-gdpr"
                          checked={privacy.gdprLogs}
                          onChange={(e) => {
                            setPrivacy({ ...privacy, gdprLogs: e.target.checked });
                            handlePrivacySave();
                          }}
                          style={{ width: '48px', height: '24px' }}
                        />
                      </div>

                      <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                        <div>
                          <label className="form-check-label fw-bold text-dark small" htmlFor="switch-acl">Encrypted ACL Lock</label>
                          <small className="text-secondary d-block">Require doctor authentication signature to unlock charts.</small>
                        </div>
                        <input
                          className="form-check-input ms-0 border cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="switch-acl"
                          checked={privacy.encryptedAcl}
                          onChange={(e) => {
                            setPrivacy({ ...privacy, encryptedAcl: e.target.checked });
                            handlePrivacySave();
                          }}
                          style={{ width: '48px', height: '24px' }}
                        />
                      </div>

                      <div className="form-check form-switch d-flex justify-content-between align-items-center ps-0">
                        <div>
                          <label className="form-check-label fw-bold text-dark small" htmlFor="switch-session">Active Session Tracker</label>
                          <small className="text-secondary d-block">Monitor IP and location details for authentication security audits.</small>
                        </div>
                        <input
                          className="form-check-input ms-0 border cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="switch-session"
                          checked={privacy.sessionTracking}
                          onChange={(e) => {
                            setPrivacy({ ...privacy, sessionTracking: e.target.checked });
                            handlePrivacySave();
                          }}
                          style={{ width: '48px', height: '24px' }}
                        />
                      </div>
                    </div>
                  </SectionCard>
                </div>
              )}

              {/* Notification Preferences Tab */}
              {activeSettingsTab === 'notifications' && (
                <SectionCard title="Notification Configurations">
                  <div className="d-flex flex-column gap-3 py-1">
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">Email Booking Receipts</strong>
                        <span className="text-secondary small d-block">Send PDF receipts for consult billing to your inbox.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.emailBookings}
                          onChange={(e) => {
                            setNotifications({ ...notifications, emailBookings: e.target.checked });
                            handleNotificationsSave();
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">Email Prescription PDF</strong>
                        <span className="text-secondary small d-block">Send a copy of signed prescriptions after session ends.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.emailPrescriptions}
                          onChange={(e) => {
                            setNotifications({ ...notifications, emailPrescriptions: e.target.checked });
                            handleNotificationsSave();
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">SMS Appointment Reminders</strong>
                        <span className="text-secondary small d-block">Send SMS warnings 15 minutes before the session starts.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.smsReminders}
                          onChange={(e) => {
                            setNotifications({ ...notifications, smsReminders: e.target.checked });
                            handleNotificationsSave();
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">WebRTC Push Invitations</strong>
                        <span className="text-secondary small d-block">Receive push notification rings when doctor launches lobby.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.pushCalls}
                          onChange={(e) => {
                            setNotifications({ ...notifications, pushCalls: e.target.checked });
                            handleNotificationsSave();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* Connected Devices Tab */}
              {activeSettingsTab === 'devices' && (
                <SectionCard title="Connected Devices Configuration">
                  <div className="d-flex flex-column gap-3.5">
                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Camera Source</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={devices.camera}
                        onChange={(e) => {
                          setDevices({ ...devices, camera: e.target.value });
                          handleDevicesSave();
                        }}
                      >
                        <option>Facetime HD Camera (Built-in)</option>
                        <option>External USB Camera Source (Obsidian Video)</option>
                      </select>
                      <small className="text-secondary d-block mt-1">Select the capture camera for WebRTC video feeds.</small>
                    </div>

                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Microphone Input</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={devices.mic}
                        onChange={(e) => {
                          setDevices({ ...devices, mic: e.target.value });
                          handleDevicesSave();
                        }}
                      >
                        <option>MacBook Pro Microphone (Built-in)</option>
                        <option>Yeti Stereo Microphone (USB Input)</option>
                      </select>
                      <small className="text-secondary d-block mt-1">Select input audio devices for sound stream capture.</small>
                    </div>

                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Speakers Output</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={devices.speaker}
                        onChange={(e) => {
                          setDevices({ ...devices, speaker: e.target.value });
                          handleDevicesSave();
                        }}
                      >
                        <option>MacBook Pro Speakers (Built-in)</option>
                        <option>External Headphones (Stereo Jack Output)</option>
                      </select>
                      <small className="text-secondary d-block mt-1">Choose output channels for doctor voice audio feeds.</small>
                    </div>
                  </div>
                </SectionCard>
              )}

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import ErrorBanner from '../../components/shared/ErrorBanner.jsx';

export default function DoctorSettings() {
  const navigate = useNavigate();

  // Tab controller
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  // Form states
  const [profile, setProfile] = useState({
    fullName: 'Dr. Marcus Thorne',
    specialty: 'Cardiology',
    title: 'Senior Cardiologist & Surgeon'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    reviewsNotification: true,
    smsReminders: true
  });

  const [availPrefs, setAvailPrefs] = useState({
    defaultBlockSize: '30 Minutes',
    maxDailyAppointments: '10',
    timezone: 'EST (GMT -5)'
  });

  const [bank, setBank] = useState({
    bankName: 'Chase Bank Checking',
    accNumber: '•••• •••• 9283',
    routingNumber: '021000021'
  });

  const [devices, setDevices] = useState({
    camera: 'Facetime HD Camera (Built-in)',
    mic: 'MacBook Pro Microphone (Built-in)',
    speaker: 'MacBook Pro Speakers (Built-in)'
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    if (!profile.fullName || !profile.title) {
      setErrorMsg('Full name and professional title are required fields.');
      return;
    }
    setTimeout(() => {
      setSuccessMsg('Settings profile parameters updated.');
    }, 400);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setErrorMsg('All password change fields are required.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMsg('New password and confirmation password do not match.');
      return;
    }
    setTimeout(() => {
      setSuccessMsg('Security password updated.');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 400);
  };

  const handleNotificationSave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Notifications preferences saved.');
    }, 400);
  };

  const handlePrefsSave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Availability scheduling preferences saved.');
    }, 400);
  };

  const handleBankSave = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Checking bank account routing details updated.');
    }, 400);
  };

  const handleDevicesSave = () => {
    setSuccessMsg('');
    setTimeout(() => {
      setSuccessMsg('Connected media capture devices refreshed.');
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
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Doctor Settings Desk | Neo-Health</title>
      <meta name="description" content="Configure consult reminders, edit banking checking profiles, and manage WebRTC cameras/microphones." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Account Configurations"
          subtitle="Manage checkings details, security passwords, schedule blocks, and connected hardware."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Settings', path: '/doctor/settings' }
          ]}
        />

        {successMsg && (
          <div className="alert alert-success border-success border-opacity-20 d-flex align-items-center gap-2 p-3 mb-4 rounded-3" role="alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <span className="small">{successMsg}</span>
          </div>
        )}

        <ErrorBanner message={errorMsg} onClose={() => setErrorMsg('')} />

        <div className="row g-4">
          {/* Left Column: Settings tabs selector */}
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-3 border bg-white shadow-sm d-flex flex-column gap-1">
              {[
                { key: 'profile', label: 'Profile Settings', icon: 'bi-person-circle' },
                { key: 'security', label: 'Password & Security', icon: 'bi-shield-lock-fill' },
                { key: 'notifications', label: 'Alert Preferences', icon: 'bi-bell-fill' },
                { key: 'prefs', label: 'Scheduler Prefs', icon: 'bi-calendar-range' },
                { key: 'bank', label: 'Checking Payouts', icon: 'bi-bank' },
                { key: 'devices', label: 'Connected Hardware', icon: 'bi-webcam-fill' }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => { setActiveSettingsTab(tab.key); setSuccessMsg(''); setErrorMsg(''); }}
                  className={`btn text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 transition-all ${
                    activeSettingsTab === tab.key ? 'btn-primary-neo text-white' : 'btn-light text-secondary bg-transparent border-0 hover-link'
                  }`}
                >
                  <i className={`bi ${tab.icon} fs-5`}></i>
                  <span className="small fw-semibold">{tab.label}</span>
                </button>
              ))}

              <hr className="my-2 opacity-25" />

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-danger text-start py-2.5 px-3 rounded-3 d-flex align-items-center gap-3 bg-transparent border-0 hover-bg-danger-subtle"
                id="doc-settings-logout-btn"
              >
                <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
                <span className="small fw-bold text-danger">Logout Session</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tab detail form */}
          <div className="col-12 col-md-8">
            <div className="h-100">
              
              {/* Profile settings tab */}
              {activeSettingsTab === 'profile' && (
                <SectionCard title="Practice Profile Summary">
                  <form onSubmit={handleProfileSave} id="form-settings-profile">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="set-pname" className="form-label small fw-semibold text-secondary">Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-neo"
                          id="set-pname"
                          value={profile.fullName}
                          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="set-pspec" className="form-label small fw-semibold text-secondary">Specialty</label>
                        <input
                          type="text"
                          className="form-control form-control-neo bg-light"
                          id="set-pspec"
                          value={profile.specialty}
                          disabled
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="set-ptitle" className="form-label small fw-semibold text-secondary">Professional Title</label>
                        <input
                          type="text"
                          className="form-control form-control-neo"
                          id="set-ptitle"
                          value={profile.title}
                          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        />
                      </div>
                      <div className="col-12 mt-4 text-end">
                        <button type="submit" className="btn btn-primary-neo py-2.5 px-4" id="btn-save-profile">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </SectionCard>
              )}

              {/* Password tab */}
              {activeSettingsTab === 'security' && (
                <SectionCard title="Change Security Password">
                  <form onSubmit={handlePasswordSave} id="form-settings-pw">
                    <div className="mb-3">
                      <label htmlFor="set-pwcur" className="form-label small fw-semibold text-secondary">Current Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="set-pwcur"
                        placeholder="••••••••"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="set-pwnew" className="form-label small fw-semibold text-secondary">New Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="set-pwnew"
                        placeholder="••••••••"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="set-pwconf" className="form-label small fw-semibold text-secondary">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="set-pwconf"
                        placeholder="••••••••"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      />
                    </div>
                    <div className="text-end mt-4">
                      <button type="submit" className="btn btn-primary-neo py-2.5 px-4" id="btn-save-pw">
                        Change Password
                      </button>
                    </div>
                  </form>
                </SectionCard>
              )}

              {/* Notification Toggles tab */}
              {activeSettingsTab === 'notifications' && (
                <SectionCard title="Notification Preferences">
                  <div className="d-flex flex-column gap-3 py-1">
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">New Booking Email Warnings</strong>
                        <span className="text-secondary small d-block">Alert me automatically when a patient books a new slot.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.emailAlerts}
                          onChange={(e) => {
                            setNotifications({ ...notifications, emailAlerts: e.target.checked });
                            handleNotificationSave();
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">Weekly Patient Review Summary</strong>
                        <span className="text-secondary small d-block">Digest of ratings feedback and text reviews left by patients.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.reviewsNotification}
                          onChange={(e) => {
                            setNotifications({ ...notifications, reviewsNotification: e.target.checked });
                            handleNotificationSave();
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle last-border-none">
                      <div>
                        <strong className="text-dark small d-block mb-1">Consultation SMS Reminders</strong>
                        <span className="text-secondary small d-block">Send reminder SMS alerts 10 minutes prior to room launch.</span>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input p-2.5 cursor-pointer border"
                          type="checkbox"
                          checked={notifications.smsReminders}
                          onChange={(e) => {
                            setNotifications({ ...notifications, smsReminders: e.target.checked });
                            handleNotificationSave();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* Scheduler preferences tab */}
              {activeSettingsTab === 'prefs' && (
                <SectionCard title="Availability Grid Preferences">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold text-dark small mb-1">Default Slot duration</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={availPrefs.defaultBlockSize}
                        onChange={(e) => {
                          setAvailPrefs({ ...availPrefs, defaultBlockSize: e.target.value });
                          handlePrefsSave();
                        }}
                      >
                        <option>30 Minutes</option>
                        <option>45 Minutes</option>
                        <option>60 Minutes</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold text-dark small mb-1">Max Daily Consultations limit</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={availPrefs.maxDailyAppointments}
                        onChange={(e) => {
                          setAvailPrefs({ ...availPrefs, maxDailyAppointments: e.target.value });
                          handlePrefsSave();
                        }}
                      >
                        <option>6</option>
                        <option>8</option>
                        <option>10</option>
                        <option>12</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-bold text-dark small mb-1">Consultation timezone</label>
                      <select
                        className="form-select form-control-neo py-2"
                        value={availPrefs.timezone}
                        onChange={(e) => {
                          setAvailPrefs({ ...availPrefs, timezone: e.target.value });
                          handlePrefsSave();
                        }}
                      >
                        <option>EST (GMT -5)</option>
                        <option>PST (GMT -8)</option>
                        <option>GMT (GMT +0)</option>
                      </select>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* Bank accounts checking tab */}
              {activeSettingsTab === 'bank' && (
                <SectionCard title="Checking Payouts Routing">
                  <form onSubmit={handleBankSave} id="bank-checking-form">
                    <div className="mb-3">
                      <label htmlFor="set-bankname" className="form-label small fw-semibold text-secondary">Checking Bank Name</label>
                      <input
                        type="text"
                        className="form-control form-control-neo"
                        id="set-bankname"
                        value={bank.bankName}
                        onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <label htmlFor="set-bankacc" className="form-label small fw-semibold text-secondary">Account Number</label>
                        <input
                          type="text"
                          className="form-control form-control-neo bg-light"
                          id="set-bankacc"
                          value={bank.accNumber}
                          disabled
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label htmlFor="set-bankroute" className="form-label small fw-semibold text-secondary">Routing Number</label>
                        <input
                          type="text"
                          className="form-control form-control-neo"
                          id="set-bankroute"
                          value={bank.routingNumber}
                          onChange={(e) => setBank({ ...bank, routingNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="text-end mt-4">
                      <button type="submit" className="btn btn-primary-neo py-2.5 px-4" id="btn-save-bank">
                        Save Payout Details
                      </button>
                    </div>
                  </form>
                </SectionCard>
              )}

              {/* Hardware devices tab */}
              {activeSettingsTab === 'devices' && (
                <SectionCard title="Connected Devices Configuration">
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Camera capture Source</label>
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
                    </div>

                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Microphone Input Sound Device</label>
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
                    </div>

                    <div>
                      <label className="form-label fw-bold text-dark small mb-1">Speakers Audio Output Device</label>
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
                    </div>
                  </div>
                </SectionCard>
              )}

            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

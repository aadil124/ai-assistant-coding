import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('system'); // system, email, roles, security
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [systemConfig, setSystemConfig] = useState({
    commission: 15,
    baseFee: 120,
    stripeLive: false,
    enableReviewsAutoPublish: false
  });

  const [securityConfig, setSecurityConfig] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enable2FA: true
  });

  const handleSystemSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("System configuration variables updated successfully!");
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    if (securityConfig.newPassword !== securityConfig.confirmPassword) {
      alert("New password mismatch. Please verify confirmation field.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Administrator credentials updated successfully!");
      setSecurityConfig(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  return (
    <AdminLayout>
      <title>Platform Settings | Neo-Health Admin</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Platform Settings</h3>
            <p className="text-secondary small mb-0">Manage global commission scales, security parameters, and notification templates.</p>
          </div>
        </div>

        {/* Success Notice */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="settings-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        <div className="row g-4">
          
          {/* Navigation Tab Menu */}
          <div className="col-12 col-md-3">
            <div className="neo-glass-card p-2.5 border bg-white shadow-sm d-flex flex-column gap-1" id="settings-tabs-list">
              <button
                className={`btn btn-sm text-start py-2.5 px-3 rounded-3 fw-medium transition-all ${
                  activeTab === 'system' 
                    ? 'btn-primary-neo' 
                    : 'btn-light text-secondary border-0 bg-transparent hover-bg-light'
                }`}
                onClick={() => setActiveTab('system')}
                id="settings-tab-system"
              >
                <i className="bi bi-gear-fill me-2.5"></i> System Parameters
              </button>

              <button
                className={`btn btn-sm text-start py-2.5 px-3 rounded-3 fw-medium transition-all ${
                  activeTab === 'email' 
                    ? 'btn-primary-neo' 
                    : 'btn-light text-secondary border-0 bg-transparent hover-bg-light'
                }`}
                onClick={() => setActiveTab('email')}
                id="settings-tab-email"
              >
                <i className="bi bi-envelope-paper-fill me-2.5"></i> Email Templates
              </button>

              <button
                className={`btn btn-sm text-start py-2.5 px-3 rounded-3 fw-medium transition-all ${
                  activeTab === 'roles' 
                    ? 'btn-primary-neo' 
                    : 'btn-light text-secondary border-0 bg-transparent hover-bg-light'
                }`}
                onClick={() => setActiveTab('roles')}
                id="settings-tab-roles"
              >
                <i className="bi bi-shield-lock-fill me-2.5"></i> Role Permissions
              </button>

              <button
                className={`btn btn-sm text-start py-2.5 px-3 rounded-3 fw-medium transition-all ${
                  activeTab === 'security' 
                    ? 'btn-primary-neo' 
                    : 'btn-light text-secondary border-0 bg-transparent hover-bg-light'
                }`}
                onClick={() => setActiveTab('security')}
                id="settings-tab-security"
              >
                <i className="bi bi-key-fill me-2.5"></i> Password & Security
              </button>
            </div>
          </div>

          {/* Configuration Form Workspaces */}
          <div className="col-12 col-md-9">
            <div className="neo-glass-card p-4 p-md-5 border bg-white shadow-sm text-dark small" id="settings-details-panel">
              
              {/* Tab 1: System Config */}
              {activeTab === 'system' && (
                <form onSubmit={handleSystemSave} id="system-config-form">
                  <h5 className="fw-bold mb-1 text-dark">Platform Parameter Configuration</h5>
                  <p className="text-secondary small mb-4">Set commission percentages, baseline consult costs, and API mode switches.</p>
                  
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="commission-rate" className="form-label fw-semibold text-dark">Commission Rate (%)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control form-control-neo"
                          id="commission-rate"
                          value={systemConfig.commission}
                          onChange={(e) => setSystemConfig(prev => ({ ...prev, commission: Number(e.target.value) }))}
                          min="0"
                          max="100"
                          required
                        />
                        <span className="input-group-text bg-light">% per booking</span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label htmlFor="baseline-fee" className="form-label fw-semibold text-dark">Standard Baseline Consultation Fee</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">$</span>
                        <input
                          type="number"
                          className="form-control form-control-neo"
                          id="baseline-fee"
                          value={systemConfig.baseFee}
                          onChange={(e) => setSystemConfig(prev => ({ ...prev, baseFee: Number(e.target.value) }))}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 mt-4 pt-3 border-top">
                      <h6 className="fw-bold text-dark mb-3">Gateway & Security Toggles</h6>
                      
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="stripe-mode-toggle"
                          checked={systemConfig.stripeLive}
                          onChange={(e) => setSystemConfig(prev => ({ ...prev, stripeLive: e.target.checked }))}
                        />
                        <label className="form-check-label cursor-pointer text-secondary fw-semibold" htmlFor="stripe-mode-toggle">
                          Enable Stripe API Live Transactions Mode
                        </label>
                        <small className="text-secondary d-block mt-0.5">When checked, transaction intents route via live Stripe endpoints instead of simulation mock keys.</small>
                      </div>

                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="reviews-auto-publish-toggle"
                          checked={systemConfig.enableReviewsAutoPublish}
                          onChange={(e) => setSystemConfig(prev => ({ ...prev, enableReviewsAutoPublish: e.target.checked }))}
                        />
                        <label className="form-check-label cursor-pointer text-secondary fw-semibold" htmlFor="reviews-auto-publish-toggle">
                          Bypass Review Moderation Queue (Auto-Publish)
                        </label>
                        <small className="text-secondary d-block mt-0.5">Instantly publishes all patient feedback to doctor profiles without placing logs in the review queue.</small>
                      </div>
                    </div>

                    <div className="col-12 mt-4 text-end">
                      <button type="submit" className="btn btn-primary-neo py-2.5 px-4 rounded-3 fw-semibold" disabled={loading}>
                        {loading ? 'Saving Parameters...' : 'Save Configuration'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Tab 2: Email Templates */}
              {activeTab === 'email' && (
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Automated Email System Templates</h5>
                  <p className="text-secondary small mb-4 font-normal">Edit automated platform verification emails, invoice templates, and support notifications.</p>
                  
                  <div className="d-flex flex-column gap-3">
                    <div className="border rounded-3 p-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-dark">Welcome & Verify Email (Patients)</span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">Trigger: Register</span>
                      </div>
                      <p className="text-secondary mb-3">HTML template notifying new user registrations of account confirmation codes.</p>
                      <button className="btn btn-sm btn-outline-primary py-1.5 px-3 rounded-3" onClick={() => alert("Loading template editor for Register code verification.")}>
                        Edit HTML Content <i className="bi bi-pencil-square ms-1"></i>
                      </button>
                    </div>

                    <div className="border rounded-3 p-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-dark">Provider Credential Approved Notify</span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">Trigger: Verification Status Approved</span>
                      </div>
                      <p className="text-secondary mb-3">Informs pending medical specialists that credential audits completed and profile is live.</p>
                      <button className="btn btn-sm btn-outline-primary py-1.5 px-3 rounded-3" onClick={() => alert("Loading template editor for Approval verification notice.")}>
                        Edit HTML Content <i className="bi bi-pencil-square ms-1"></i>
                      </button>
                    </div>

                    <div className="border rounded-3 p-3 bg-light">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold text-dark">Consultation Refund Invoiced</span>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">Trigger: Billing Refunded</span>
                      </div>
                      <p className="text-secondary mb-3">Receipt copy for patients detailing amount, booking ID, and payout confirmation times.</p>
                      <button className="btn btn-sm btn-outline-primary py-1.5 px-3 rounded-3" onClick={() => alert("Loading template editor for refund invoice receipts.")}>
                        Edit HTML Content <i className="bi bi-pencil-square ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Role Permissions */}
              {activeTab === 'roles' && (
                <div>
                  <h5 className="fw-bold mb-1 text-dark">Role Access & Permissions Control</h5>
                  <p className="text-secondary small mb-4">Set user privileges and security groups for administrative accounts.</p>
                  
                  <div className="table-responsive">
                    <table className="table align-middle border">
                      <thead className="table-light">
                        <tr className="small text-secondary">
                          <th>Administrative Role Group</th>
                          <th className="text-center">Verify Doctors</th>
                          <th className="text-center">Process Refunds</th>
                          <th className="text-center">Delete Reviews</th>
                          <th className="text-center">Modify Settings</th>
                        </tr>
                      </thead>
                      <tbody className="text-dark">
                        <tr>
                          <td className="fw-semibold">Super Administrator</td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Financial Support Auditor</td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">Content Moderator</td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-check-circle-fill text-success fs-5"></i></td>
                          <td className="text-center"><i className="bi bi-dash-circle-fill text-secondary opacity-50 fs-5"></i></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end mt-4">
                    <button className="btn btn-outline-secondary py-2 px-3.5 rounded-3 fw-semibold btn-sm" onClick={() => alert("Creating customized role group is a backend function.")}>
                      <i className="bi bi-plus-circle me-1"></i> Add Custom Role Group
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Passwords & Security */}
              {activeTab === 'security' && (
                <form onSubmit={handleSecuritySave} id="admin-security-form">
                  <h5 className="fw-bold mb-1 text-dark">Password & Security Parameters</h5>
                  <p className="text-secondary small mb-4">Modify password variables and secure admin terminal access.</p>
                  
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="curr-pwd" className="form-label fw-semibold text-dark">Current Administrative Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="curr-pwd"
                        value={securityConfig.currentPassword}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, currentPassword: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label htmlFor="new-pwd" className="form-label fw-semibold text-dark">New Secure Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="new-pwd"
                        value={securityConfig.newPassword}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Min. 8 characters"
                        required
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <label htmlFor="confirm-pwd" className="form-label fw-semibold text-dark">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control form-control-neo"
                        id="confirm-pwd"
                        value={securityConfig.confirmPassword}
                        onChange={(e) => setSecurityConfig(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Re-enter password"
                        required
                      />
                    </div>

                    <div className="col-12 mt-4 pt-3 border-top">
                      <h6 className="fw-bold text-dark mb-2.5">Multi-Factor Authentications</h6>
                      
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          role="switch"
                          id="two-factor-toggle"
                          checked={securityConfig.enable2FA}
                          onChange={(e) => setSecurityConfig(prev => ({ ...prev, enable2FA: e.target.checked }))}
                        />
                        <label className="form-check-label cursor-pointer text-secondary fw-semibold" htmlFor="two-factor-toggle">
                          Require 2FA verification code on Login
                        </label>
                        <small className="text-secondary d-block mt-0.5">Forces admin terminal logins to request a secondary verification code generated via email registry.</small>
                      </div>
                    </div>

                    <div className="col-12 mt-4 text-end">
                      <button type="submit" className="btn btn-primary-neo py-2.5 px-4 rounded-3 fw-semibold" disabled={loading}>
                        {loading ? 'Saving security updates...' : 'Save Password Update'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

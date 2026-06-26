import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal.jsx';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 'USR-201',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'patient',
      status: 'active',
      lastLogin: 'Today, 10:45 AM',
      phone: '+1 (555) 019-2834',
      joinedDate: 'Jan 12, 2026'
    },
    {
      id: 'USR-202',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'patient',
      status: 'active',
      lastLogin: 'Yesterday, 03:20 PM',
      phone: '+1 (555) 043-9821',
      joinedDate: 'Feb 05, 2026'
    },
    {
      id: 'USR-203',
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      role: 'patient',
      status: 'suspended',
      lastLogin: 'June 20, 2026',
      phone: '+1 (555) 087-1123',
      joinedDate: 'Mar 19, 2026'
    },
    {
      id: 'DOC-001',
      name: 'Dr. Elizabeth Blackwell',
      email: 'e.blackwell@neohealth.com',
      role: 'doctor',
      status: 'active',
      lastLogin: 'Today, 12:05 PM',
      phone: '+1 (555) 098-7654',
      joinedDate: 'Apr 24, 2026'
    },
    {
      id: 'DOC-002',
      name: 'Dr. Charles Drew',
      email: 'charles.drew@neohealth.com',
      role: 'doctor',
      status: 'active',
      lastLogin: 'Today, 08:30 AM',
      phone: '+1 (555) 012-3456',
      joinedDate: 'May 10, 2026'
    },
    {
      id: 'DOC-003',
      name: 'Dr. Virginia Apgar',
      email: 'v.apgar@neohealth.com',
      role: 'doctor',
      status: 'suspended',
      lastLogin: 'June 15, 2026',
      phone: '+1 (555) 045-6789',
      joinedDate: 'June 01, 2026'
    },
    {
      id: 'ADM-001',
      name: 'Admin User',
      email: 'admin@neohealth.com',
      role: 'admin',
      status: 'active',
      lastLogin: 'Today, 12:59 PM',
      phone: '+1 (555) 000-0000',
      joinedDate: 'Jan 01, 2026'
    }
  ]);

  const [activeTab, setActiveTab] = useState('patient'); // patient, doctor, admin
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'primary',
    title: '',
    message: '',
    action: null
  });

  const handleOpenDrawer = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Action: Suspend User
  const triggerSuspend = (userId) => {
    const user = users.find(u => u.id === userId);
    setModalConfig({
      show: true,
      type: 'danger',
      title: 'Suspend Account access',
      message: `Are you sure you want to suspend account access for ${user.name}? They will immediately be logged out and blocked from logging back into the platform.`,
      action: () => processStatusChange(userId, 'suspended')
    });
  };

  // Action: Activate User
  const triggerActivate = (userId) => {
    const user = users.find(u => u.id === userId);
    setModalConfig({
      show: true,
      type: 'success',
      title: 'Activate Account Access',
      message: `Are you sure you want to restore platform access for ${user.name}? This activates their credential token logs.`,
      action: () => processStatusChange(userId, 'active')
    });
  };

  const processStatusChange = (userId, newStatus) => {
    setActionLoading(true);
    setTimeout(() => {
      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, status: newStatus } : u)
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(prev => ({ ...prev, status: newStatus }));
      }
      setSuccessMsg(`Account status updated to ${newStatus} successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Action: Reset Password Email trigger
  const handleResetPassword = (email) => {
    alert(`Administrative password reset notification sent to: ${email}`);
  };

  // Filtering
  const filteredUsers = users.filter(u => {
    const matchesTab = u.role === activeTab;
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <title>User Directory | Neo-Health Admin</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">User Directory Manager</h3>
            <p className="text-secondary small mb-0">Platform-wide overview of patient profiles, consulting doctors, and admin access roles.</p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="users-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        {/* Directory Search & Toggle Tabs */}
        <div className="neo-glass-card p-3 border bg-white shadow-sm mb-4">
          <div className="row g-3 align-items-center">
            {/* Role Select tabs */}
            <div className="col-12 col-md-6">
              <div className="btn-group p-1 bg-light rounded-pill border" role="group" id="users-directory-tabs">
                <button
                  type="button"
                  className={`btn btn-sm py-2 px-3.5 rounded-pill fw-medium border-0 transition-all ${
                    activeTab === 'patient' ? 'btn-primary-neo' : 'text-secondary bg-transparent'
                  }`}
                  onClick={() => setActiveTab('patient')}
                  id="users-tab-patient"
                >
                  <i className="bi bi-person me-1"></i> Patients
                </button>
                <button
                  type="button"
                  className={`btn btn-sm py-2 px-3.5 rounded-pill fw-medium border-0 transition-all ${
                    activeTab === 'doctor' ? 'btn-primary-neo' : 'text-secondary bg-transparent'
                  }`}
                  onClick={() => setActiveTab('doctor')}
                  id="users-tab-doctor"
                >
                  <i className="bi bi-person-badge me-1"></i> Doctors
                </button>
                <button
                  type="button"
                  className={`btn btn-sm py-2 px-3.5 rounded-pill fw-medium border-0 transition-all ${
                    activeTab === 'admin' ? 'btn-primary-neo' : 'text-secondary bg-transparent'
                  }`}
                  onClick={() => setActiveTab('admin')}
                  id="users-tab-admin"
                >
                  <i className="bi bi-shield-lock me-1"></i> Admins
                </button>
              </div>
            </div>

            {/* Search filter */}
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center bg-light px-3 py-1.5 rounded-3 border">
                <i className="bi bi-search text-secondary me-2"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0 shadow-none small"
                  placeholder={`Search in ${activeTab} directory...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="users-search-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="neo-glass-card border bg-white shadow-sm overflow-hidden mb-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-people-fill fs-1 text-secondary mb-3 d-block"></i>
              <h6 className="fw-bold text-dark text-capitalize">No {activeTab} users found</h6>
              <p className="text-secondary small mb-0">No records found matching your directory query.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" id="users-directory-table">
                <thead className="table-light text-secondary small fw-bold">
                  <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Last Active Login</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-dark small">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="transition-all">
                      <td className="fw-semibold text-secondary">{user.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold"
                            style={{ width: '32px', height: '32px', fontSize: '12px' }}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <span className="fw-semibold text-dark">{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <span className={`badge px-2 py-1 rounded-pill small fw-semibold text-uppercase ${
                          user.status === 'active' 
                            ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20' 
                            : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn btn-sm btn-light border py-1.5 px-2.5 text-secondary rounded-3"
                            onClick={() => handleOpenDrawer(user)}
                            title="Audit Profile Details"
                          >
                            <i className="bi bi-file-earmark-person"></i> Profile
                          </button>

                          <button
                            className="btn btn-sm btn-outline-secondary py-1.5 px-2 rounded-3 text-secondary"
                            onClick={() => handleResetPassword(user.email)}
                            title="Reset Password Trigger"
                          >
                            <i className="bi bi-key"></i>
                          </button>
                          
                          {user.role !== 'admin' && (
                            user.status === 'active' ? (
                              <button
                                className="btn btn-sm btn-outline-danger py-1.5 px-2 rounded-3"
                                onClick={() => triggerSuspend(user.id)}
                                title="Suspend Account"
                              >
                                <i className="bi bi-slash-circle"></i>
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-success py-1.5 px-2 rounded-3"
                                onClick={() => triggerActivate(user.id)}
                                title="Activate Account"
                              >
                                <i className="bi bi-play-circle"></i>
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Profile details Drawer */}
        {drawerOpen && selectedUser && (
          <div 
            className="position-fixed top-0 end-0 bottom-0 bg-white border-start shadow-lg z-3 transition-all animate-slide-in"
            style={{ width: '100%', maxWidth: '440px', height: '100vh', display: 'flex', flexDirection: 'column' }}
            id="user-profile-drawer"
          >
            <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark mb-0.5">Directory Auditor</h5>
                <small className="text-secondary">Detail file: {selectedUser.id}</small>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseDrawer} 
                aria-label="Close"
              ></button>
            </div>

            <div className="p-4 flex-grow-1 overflow-y-auto small" style={{ maxHeight: 'calc(100vh - 170px)' }}>
              
              {/* Profile card */}
              <div className="text-center p-4 bg-light rounded-3 border mb-4 text-dark">
                <div 
                  className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold fs-3 border"
                  style={{ width: '80px', height: '80px' }}
                >
                  {selectedUser.name.charAt(0)}
                </div>
                <h6 className="fw-bold text-dark mb-0.5">{selectedUser.name}</h6>
                <p className="text-secondary mb-2 text-capitalize">{selectedUser.role} • Profile</p>
                <span className={`badge px-2.5 py-1 rounded-pill small fw-semibold text-uppercase ${
                  selectedUser.status === 'active' 
                    ? 'bg-success bg-opacity-10 text-success' 
                    : 'bg-danger bg-opacity-10 text-danger'
                }`}>
                  {selectedUser.status}
                </span>
              </div>

              {/* Profile specifics */}
              <h6 className="fw-bold text-dark mb-2.5">User Specifications</h6>
              <div className="p-3 bg-light rounded-3 border mb-4 text-dark">
                <div className="mb-2">
                  <span className="text-secondary d-block">E-Mail Address</span>
                  <span className="fw-semibold">{selectedUser.email}</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary d-block">Contact Phone</span>
                  <span className="fw-semibold">{selectedUser.phone}</span>
                </div>
                <div className="mb-2">
                  <span className="text-secondary d-block">Joined Platform</span>
                  <span className="fw-semibold">{selectedUser.joinedDate}</span>
                </div>
                <div>
                  <span className="text-secondary d-block">Audit Session Last Active</span>
                  <span className="fw-semibold">{selectedUser.lastLogin}</span>
                </div>
              </div>

            </div>

            <div className="p-4 border-top bg-light d-flex gap-2">
              {selectedUser.role !== 'admin' && (
                selectedUser.status === 'active' ? (
                  <button 
                    className="btn btn-danger flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                      handleCloseDrawer();
                      triggerSuspend(selectedUser.id);
                    }}
                  >
                    <i className="bi bi-slash-circle"></i> Suspend Access
                  </button>
                ) : (
                  <button 
                    className="btn btn-success flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                      handleCloseDrawer();
                      triggerActivate(selectedUser.id);
                    }}
                  >
                    <i className="bi bi-play-circle"></i> Activate Access
                  </button>
                )
              )}
              <button 
                className="btn btn-outline-secondary py-2 px-3 fw-semibold small"
                onClick={() => handleResetPassword(selectedUser.email)}
              >
                Reset Key
              </button>
            </div>
          </div>
        )}

        {/* Backdrop for drawer */}
        {drawerOpen && (
          <div 
            className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2"
            onClick={handleCloseDrawer}
          ></div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          show={modalConfig.show}
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          onConfirm={modalConfig.action}
          onCancel={() => setModalConfig(prev => ({ ...prev, show: false }))}
          loading={actionLoading}
        />

      </div>

      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </AdminLayout>
  );
}

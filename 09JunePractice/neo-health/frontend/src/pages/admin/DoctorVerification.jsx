import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal.jsx';

export default function DoctorVerification() {
  const [doctors, setDoctors] = useState([
    {
      id: 'doc-001',
      name: 'Dr. Elizabeth Blackwell',
      email: 'e.blackwell@neohealth.com',
      specialty: 'Cardiology',
      experience: '12 Years',
      school: 'Geneva Medical College',
      registeredDate: 'June 24, 2026',
      licenseNo: 'MD-948271',
      licenseFile: 'medical_license_blackwell.pdf',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=80'
    },
    {
      id: 'doc-002',
      name: 'Dr. Charles Drew',
      email: 'charles.drew@neohealth.com',
      specialty: 'Hematology',
      experience: '8 Years',
      school: 'Columbia University VP&S',
      registeredDate: 'June 25, 2026',
      licenseNo: 'MD-203948',
      licenseFile: 'board_cert_drew.pdf',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=80'
    },
    {
      id: 'doc-003',
      name: 'Dr. Virginia Apgar',
      email: 'v.apgar@neohealth.com',
      specialty: 'Anesthesiology',
      experience: '15 Years',
      school: 'Columbia University VP&S',
      registeredDate: 'June 25, 2026',
      licenseNo: 'MD-304958',
      licenseFile: 'medical_license_apgar.pdf',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=80'
    }
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor selected for detail drawer
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'primary',
    title: '',
    message: '',
    action: null
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Detail Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (doc) => {
    setSelectedDoctor(doc);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Open Approval Confirmation
  const confirmApprove = (docId) => {
    const doc = doctors.find(d => d.id === docId);
    setModalConfig({
      show: true,
      type: 'success',
      title: 'Approve Provider Credentials',
      message: `Are you sure you want to verify and approve ${doc.name}? This will publish their profile on the platform for patient searches and booking requests.`,
      action: () => processVerification(docId, 'approved')
    });
  };

  // Open Rejection Confirmation
  const confirmReject = (docId) => {
    const doc = doctors.find(d => d.id === docId);
    setModalConfig({
      show: true,
      type: 'danger',
      title: 'Reject Registration Application',
      message: `Are you sure you want to reject ${doc.name}'s registration? They will receive an email notice requesting updated credential file submissions.`,
      action: () => processVerification(docId, 'rejected')
    });
  };

  // Execute Action
  const processVerification = (docId, newStatus) => {
    setActionLoading(true);
    setTimeout(() => {
      setDoctors(prev =>
        prev.map(doc => doc.id === docId ? { ...doc, status: newStatus } : doc)
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      if (selectedDoctor && selectedDoctor.id === docId) {
        setSelectedDoctor(prev => ({ ...prev, status: newStatus }));
      }
      setSuccessMsg(`Successfully marked registration as ${newStatus}!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Filter lists for pending, approved, rejected tabs
  const [activeTab, setActiveTab] = useState('pending');
  const filteredDoctors = doctors.filter(doc => doc.status === activeTab);

  return (
    <AdminLayout>
      <title>Verify Doctor Credentials | Neo-Health Admin</title>

      <div className="container-fluid px-0 position-relative">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Doctor Verification Queue</h3>
            <p className="text-secondary small mb-0">Audit medical board licenses, diplomas, and activate provider profiles.</p>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="verification-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        {/* Verification Status Tabs */}
        <div className="nav nav-tabs border-bottom mb-4 gap-2">
          <button
            className={`nav-link border-0 px-3 py-2 fw-medium position-relative transition-all ${
              activeTab === 'pending' ? 'text-primary border-bottom border-primary border-3' : 'text-secondary bg-transparent'
            }`}
            onClick={() => setActiveTab('pending')}
            id="verification-tab-pending"
          >
            Pending Audits
            {doctors.filter(d => d.status === 'pending').length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle-x badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                {doctors.filter(d => d.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            className={`nav-link border-0 px-3 py-2 fw-medium transition-all ${
              activeTab === 'approved' ? 'text-primary border-bottom border-primary border-3' : 'text-secondary bg-transparent'
            }`}
            onClick={() => setActiveTab('approved')}
            id="verification-tab-approved"
          >
            Approved Providers
          </button>
          <button
            className={`nav-link border-0 px-3 py-2 fw-medium transition-all ${
              activeTab === 'rejected' ? 'text-primary border-bottom border-primary border-3' : 'text-secondary bg-transparent'
            }`}
            onClick={() => setActiveTab('rejected')}
            id="verification-tab-rejected"
          >
            Rejected Applications
          </button>
        </div>

        {/* Doctor Grid/Table Layout */}
        <div className="neo-glass-card border bg-white shadow-sm overflow-hidden mb-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-patch-check fs-1 text-secondary mb-3 d-block"></i>
              <h6 className="fw-bold text-dark text-capitalize">No {activeTab} providers found</h6>
              <p className="text-secondary small mb-0">The verification workspace has no listings currently.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" id="doctor-verification-list-table">
                <thead className="table-light text-secondary small fw-bold">
                  <tr>
                    <th>Doctor Profile</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Registered Date</th>
                    <th>Medical School</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-dark small">
                  {filteredDoctors.map((doc) => (
                    <tr key={doc.id} className="transition-all">
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            className="rounded-circle border"
                            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                          />
                          <div>
                            <span className="fw-semibold text-dark d-block">{doc.name}</span>
                            <small className="text-secondary">{doc.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-medium text-dark">{doc.specialty}</span>
                      </td>
                      <td>{doc.experience}</td>
                      <td>{doc.registeredDate}</td>
                      <td>{doc.school}</td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn btn-sm btn-light border py-1.5 px-2.5 text-secondary rounded-3"
                            onClick={() => handleOpenDrawer(doc)}
                            title="Audit Documents & Details"
                          >
                            <i className="bi bi-file-earmark-text"></i> Audit Details
                          </button>
                          
                          {doc.status === 'pending' && (
                            <>
                              <button
                                className="btn btn-sm btn-success py-1.5 px-2.5 rounded-3 d-flex align-items-center gap-1"
                                onClick={() => confirmApprove(doc.id)}
                                title="Verify Credentials"
                              >
                                <i className="bi bi-check-lg"></i> Verify
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger py-1.5 px-2.5 rounded-3"
                                onClick={() => confirmReject(doc.id)}
                                title="Reject Application"
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </>
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

        {/* Credentials Side Drawer Details Panel */}
        {drawerOpen && selectedDoctor && (
          <div 
            className="position-fixed top-0 end-0 bottom-0 bg-white border-start shadow-lg z-3 transition-all animate-slide-in"
            style={{ width: '100%', maxWidth: '480px', height: '100vh', display: 'flex', flexDirection: 'column' }}
            id="doctor-audit-drawer"
          >
            {/* Drawer Header */}
            <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark mb-0.5">Verification Auditor</h5>
                <small className="text-secondary">Document Review Console</small>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseDrawer} 
                aria-label="Close"
              ></button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="p-4 flex-grow-1 overflow-y-auto small" style={{ maxHeight: 'calc(100vh - 170px)' }}>
              
              {/* Doctor Avatar Profile Card */}
              <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-light rounded-3 border">
                <img 
                  src={selectedDoctor.avatar} 
                  alt={selectedDoctor.name} 
                  className="rounded-circle border border-2 border-primary" 
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold text-dark mb-0.5">{selectedDoctor.name}</h6>
                  <p className="text-secondary mb-1">{selectedDoctor.specialty} • {selectedDoctor.experience} Exp</p>
                  <span className={`badge px-2 py-1 rounded-pill small fw-semibold text-uppercase ${
                    selectedDoctor.status === 'approved' 
                      ? 'bg-success bg-opacity-10 text-success' 
                      : selectedDoctor.status === 'rejected'
                      ? 'bg-danger bg-opacity-10 text-danger'
                      : 'bg-warning bg-opacity-10 text-warning-emphasis'
                  }`}>
                    {selectedDoctor.status}
                  </span>
                </div>
              </div>

              {/* Doctor Professional Bio Fields */}
              <h6 className="fw-bold text-dark mb-2.5">Academic & Registration Data</h6>
              <div className="row g-2 mb-4 border-bottom pb-3 text-dark">
                <div className="col-6">
                  <span className="text-secondary d-block">Medical Board License No</span>
                  <span className="fw-semibold">{selectedDoctor.licenseNo}</span>
                </div>
                <div className="col-6">
                  <span className="text-secondary d-block">Institution School</span>
                  <span className="fw-semibold">{selectedDoctor.school}</span>
                </div>
                <div className="col-6 mt-2">
                  <span className="text-secondary d-block">Platform E-Mail</span>
                  <span className="fw-semibold">{selectedDoctor.email}</span>
                </div>
                <div className="col-6 mt-2">
                  <span className="text-secondary d-block">Registration Submitted</span>
                  <span className="fw-semibold">{selectedDoctor.registeredDate}</span>
                </div>
              </div>

              {/* Uploaded Certificate Audit Files */}
              <h6 className="fw-bold text-dark mb-2.5">Uploaded Credentials Credentials</h6>
              <div className="d-flex flex-column gap-2 mb-4">
                <div className="border rounded-3 p-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-pdf-fill text-danger fs-4"></i>
                    <div>
                      <span className="fw-semibold text-dark d-block">{selectedDoctor.licenseFile}</span>
                      <small className="text-secondary">Official MD License Registry Proof (PDF, 2.4 MB)</small>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Simulating file download: "${selectedDoctor.licenseFile}"`)} 
                    className="btn btn-sm btn-outline-secondary px-2.5 py-1.5 rounded-3"
                    title="Download Proof File"
                  >
                    <i className="bi bi-download"></i>
                  </button>
                </div>

                <div className="border rounded-3 p-3 bg-light d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-pdf-fill text-danger fs-4"></i>
                    <div>
                      <span className="fw-semibold text-dark d-block">board_certifications_2026.pdf</span>
                      <small className="text-secondary">Specialty Board Accreditations (PDF, 4.1 MB)</small>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Simulating file download: board_certifications_2026.pdf")} 
                    className="btn btn-sm btn-outline-secondary px-2.5 py-1.5 rounded-3"
                    title="Download Proof File"
                  >
                    <i className="bi bi-download"></i>
                  </button>
                </div>
              </div>

            </div>

            {/* Drawer Actions */}
            {selectedDoctor.status === 'pending' && (
              <div className="p-4 border-top bg-light d-flex gap-2">
                <button 
                  className="btn btn-success flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    handleCloseDrawer();
                    confirmApprove(selectedDoctor.id);
                  }}
                >
                  <i className="bi bi-check-lg"></i> Approve Verification
                </button>
                <button 
                  className="btn btn-outline-danger py-2 px-3 fw-semibold"
                  onClick={() => {
                    handleCloseDrawer();
                    confirmReject(selectedDoctor.id);
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}

        {/* Global Backdrop overlay for drawer */}
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

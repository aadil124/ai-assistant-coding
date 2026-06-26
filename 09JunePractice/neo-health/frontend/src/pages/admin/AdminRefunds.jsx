import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal.jsx';

export default function AdminRefunds() {
  const [refunds, setRefunds] = useState([
    {
      id: 'REF-201',
      bookingId: 'APT-10430',
      patientName: 'Robert Johnson',
      amount: '$200.00',
      reason: 'Patient requested cancellation due to personal scheduling conflict.',
      date: 'June 24, 2026',
      status: 'pending',
      timeline: [
        { title: 'Appointment Cancelled', time: 'June 24, 2026 • 04:20 PM' },
        { title: 'Refund Claim Logged', time: 'June 24, 2026 • 04:30 PM' }
      ]
    },
    {
      id: 'REF-202',
      bookingId: 'APT-10429',
      patientName: 'Emily Davis',
      amount: '$120.00',
      reason: 'Doctor canceled consultation due to emergency call-out.',
      date: 'June 24, 2026',
      status: 'approved',
      timeline: [
        { title: 'Appointment Cancelled', time: 'June 24, 2026 • 11:05 AM' },
        { title: 'Refund Automatically Initiated', time: 'June 24, 2026 • 11:10 AM' },
        { title: 'Disbursed via Stripe API', time: 'June 24, 2026 • 11:30 PM' }
      ]
    },
    {
      id: 'REF-203',
      bookingId: 'APT-10428',
      patientName: 'Sarah Connor',
      amount: '$150.00',
      reason: 'Technical network issues during WebRTC video consultation. Video session failed to start.',
      date: 'June 23, 2026',
      status: 'pending',
      timeline: [
        { title: 'Dispute Filed by Patient', time: 'June 23, 2026 • 06:15 PM' },
        { title: 'Refund Claim Awaiting Review', time: 'June 23, 2026 • 07:00 PM' }
      ]
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all'); // all, pending, approved, rejected
  const [selectedRefund, setSelectedRefund] = useState(null);
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

  const handleOpenDrawer = (ref) => {
    setSelectedRefund(ref);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Approve Trigger
  const triggerApprove = (refId) => {
    const ref = refunds.find(r => r.id === refId);
    setModalConfig({
      show: true,
      type: 'success',
      title: 'Approve & Release Refund',
      message: `Are you sure you want to approve the refund of ${ref.amount} to ${ref.patientName}? This will trigger Stripe payout API callbacks.`,
      action: () => processRefundAction(refId, 'approved')
    });
  };

  // Reject Trigger
  const triggerReject = (refId) => {
    const ref = refunds.find(r => r.id === refId);
    setModalConfig({
      show: true,
      type: 'danger',
      title: 'Decline Refund Request',
      message: `Are you sure you want to decline the refund request for ${ref.patientName}? The charged amount will remain captured by the doctor.`,
      action: () => processRefundAction(refId, 'rejected')
    });
  };

  const processRefundAction = (refId, newStatus) => {
    setActionLoading(true);
    setTimeout(() => {
      const nowString = new Date().toLocaleString();
      setRefunds(prev =>
        prev.map(r => {
          if (r.id === refId) {
            const updatedTimeline = [...r.timeline, {
              title: newStatus === 'approved' ? 'Stripe Refund Disbursed' : 'Refund Claim Declined',
              time: nowString
            }];
            return { ...r, status: newStatus, timeline: updatedTimeline };
          }
          return r;
        })
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      if (selectedRefund && selectedRefund.id === refId) {
        setSelectedRefund(prev => ({
          ...prev,
          status: newStatus,
          timeline: [...prev.timeline, {
            title: newStatus === 'approved' ? 'Stripe Refund Disbursed' : 'Refund Claim Declined',
            time: nowString
          }]
        }));
      }
      setSuccessMsg(`Refund request has been successfully ${newStatus}!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Filter lists
  const filteredRefunds = refunds.filter(ref => activeFilter === 'all' || ref.status === activeFilter);

  return (
    <AdminLayout>
      <title>Refund Queue Management | Neo-Health Admin</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Billing Refund Requests</h3>
            <p className="text-secondary small mb-0">Audit consultation cancellation logs, billing disputes, and release Stripe refunds.</p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="refunds-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-4" id="refund-queue-filters">
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'all' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Claims ({refunds.length})
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 position-relative ${
              activeFilter === 'pending' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('pending')}
            id="refunds-filter-pending"
          >
            Pending Review
            {refunds.filter(r => r.status === 'pending').length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '9px' }}>
                {refunds.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'approved' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('approved')}
          >
            Approved Claims
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'rejected' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('rejected')}
          >
            Declined Claims
          </button>
        </div>

        {/* Refund Table Grid */}
        <div className="neo-glass-card border bg-white shadow-sm overflow-hidden mb-4">
          {filteredRefunds.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-arrow-left-right fs-1 text-secondary mb-3 d-block"></i>
              <h6 className="fw-bold text-dark text-capitalize">No {activeTab} claims found</h6>
              <p className="text-secondary small mb-0">The refund ledger contains no active listings currently.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" id="refund-requests-table">
                <thead className="table-light text-secondary small fw-bold">
                  <tr>
                    <th>Refund ID</th>
                    <th>Booking ID</th>
                    <th>Patient Name</th>
                    <th>Refund Amount</th>
                    <th>Logged Date</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-dark small">
                  {filteredRefunds.map((ref) => (
                    <tr key={ref.id} className="transition-all">
                      <td className="fw-semibold text-primary">{ref.id}</td>
                      <td className="fw-semibold text-secondary">{ref.bookingId}</td>
                      <td>
                        <span className="fw-semibold text-dark">{ref.patientName}</span>
                      </td>
                      <td className="fw-bold">{ref.amount}</td>
                      <td>{ref.date}</td>
                      <td>
                        <span className={`badge px-2.5 py-1 rounded-pill small fw-semibold text-uppercase ${
                          ref.status === 'approved'
                            ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20'
                            : ref.status === 'pending'
                            ? 'bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-20'
                            : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20'
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn btn-sm btn-light border py-1.5 px-2.5 text-secondary rounded-3"
                            onClick={() => handleOpenDrawer(ref)}
                            title="Audit Dispute details"
                          >
                            <i className="bi bi-file-earmark-text"></i> Audit Claim
                          </button>
                          
                          {ref.status === 'pending' && (
                            <>
                              <button
                                className="btn btn-sm btn-success py-1.5 px-2.5 rounded-3 d-flex align-items-center gap-1"
                                onClick={() => triggerApprove(ref.id)}
                                title="Approve Refund"
                              >
                                <i className="bi bi-check-lg"></i> Approve
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger py-1.5 px-2.5 rounded-3"
                                onClick={() => triggerReject(ref.id)}
                                title="Decline Refund"
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

        {/* Refund Side Drawer Details and Timeline */}
        {drawerOpen && selectedRefund && (
          <div 
            className="position-fixed top-0 end-0 bottom-0 bg-white border-start shadow-lg z-3 transition-all animate-slide-in"
            style={{ width: '100%', maxWidth: '460px', height: '100vh', display: 'flex', flexDirection: 'column' }}
            id="refund-audit-drawer"
          >
            {/* Drawer Header */}
            <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark mb-0.5">Dispute Auditor</h5>
                <small className="text-secondary">Claim record: {selectedRefund.id}</small>
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
              
              {/* Summary Card */}
              <div className="p-3 bg-light rounded-3 border mb-4 text-dark">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary text-uppercase tracking-wider fw-semibold" style={{ fontSize: '10px' }}>Current Status</span>
                  <span className={`badge px-2.5 py-1 rounded-pill small fw-semibold text-uppercase ${
                    selectedRefund.status === 'approved' 
                      ? 'bg-success bg-opacity-10 text-success' 
                      : selectedRefund.status === 'pending'
                      ? 'bg-warning bg-opacity-10 text-warning-emphasis'
                      : 'bg-danger bg-opacity-10 text-danger'
                  }`}>
                    {selectedRefund.status}
                  </span>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <span className="text-secondary d-block">Refund Amount</span>
                    <span className="fw-bold fs-6 text-dark">{selectedRefund.amount}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary d-block">Booking Reference</span>
                    <span className="fw-semibold text-primary">{selectedRefund.bookingId}</span>
                  </div>
                  <div className="col-12 mt-2 pt-2 border-top">
                    <span className="text-secondary d-block">Patient claimant</span>
                    <span className="fw-semibold">{selectedRefund.patientName}</span>
                  </div>
                </div>
              </div>

              {/* Dispute details */}
              <h6 className="fw-bold text-dark mb-2.5">Cancellation Reason & Details</h6>
              <div className="p-3 rounded-3 bg-light border mb-4 text-dark">
                <p className="mb-0 text-secondary" style={{ lineHeight: '1.4' }}>{selectedRefund.reason}</p>
              </div>

              {/* Timeline status track */}
              <h6 className="fw-bold text-dark mb-2.5">Dispute audit log timeline</h6>
              <div className="position-relative ps-4 border-start border-light-subtle text-dark ms-2.5 mb-4">
                {selectedRefund.timeline.map((step, index) => (
                  <div key={index} className="position-relative mb-4">
                    {/* Circle Node */}
                    <div 
                      className={`position-absolute rounded-circle border border-white`}
                      style={{ 
                        left: '-31px', 
                        top: '2px', 
                        width: '14px', 
                        height: '14px',
                        backgroundColor: index === selectedRefund.timeline.length - 1 ? 'var(--primary-color)' : '#b4b7c5'
                      }}
                    ></div>
                    
                    <div className="small">
                      <span className="fw-semibold text-dark d-block">{step.title}</span>
                      <small className="text-secondary">{step.time}</small>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Drawer Actions */}
            <div className="p-4 border-top bg-light d-flex gap-2">
              {selectedRefund.status === 'pending' && (
                <>
                  <button 
                    className="btn btn-success flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => {
                      handleCloseDrawer();
                      triggerApprove(selectedRefund.id);
                    }}
                  >
                    <i className="bi bi-check-lg"></i> Approve Refund
                  </button>
                  <button 
                    className="btn btn-outline-danger py-2 px-3 fw-semibold"
                    onClick={() => {
                      handleCloseDrawer();
                      triggerReject(selectedRefund.id);
                    }}
                  >
                    Decline
                  </button>
                </>
              )}
              {selectedRefund.status !== 'pending' && (
                <button className="btn btn-light border flex-grow-1 py-2 text-secondary fw-semibold" onClick={handleCloseDrawer}>
                  Close Console
                </button>
              )}
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

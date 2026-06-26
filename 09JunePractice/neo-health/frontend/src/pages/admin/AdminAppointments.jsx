import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal.jsx';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 'APT-10432',
      patientName: 'John Doe',
      patientEmail: 'john.doe@example.com',
      doctorName: 'Dr. Sarah Jenkins',
      doctorSpecialty: 'Pediatrics',
      dateTime: 'June 26, 2026 • 02:00 PM',
      fee: '$120.00',
      status: 'booked',
      type: 'Video Consultation',
      paymentStatus: 'Paid (Stripe)',
      transactionId: 'ch_3Mv8x9L2k10Zpqw9',
      notes: 'Routine checkup for persistent dry cough and allergy symptoms.'
    },
    {
      id: 'APT-10431',
      patientName: 'Jane Smith',
      patientEmail: 'jane.smith@example.com',
      doctorName: 'Dr. Charles Drew',
      doctorSpecialty: 'Hematology',
      dateTime: 'June 25, 2026 • 10:30 AM',
      fee: '$150.00',
      status: 'completed',
      type: 'Video Consultation',
      paymentStatus: 'Paid (Stripe)',
      transactionId: 'ch_3Mv8x8R7y54Wopq1',
      notes: 'Discuss blood panel results regarding iron deficiency anemia.'
    },
    {
      id: 'APT-10430',
      patientName: 'Robert Johnson',
      patientEmail: 'robert.j@example.com',
      doctorName: 'Dr. Elizabeth Blackwell',
      doctorSpecialty: 'Cardiology',
      dateTime: 'June 24, 2026 • 04:15 PM',
      fee: '$200.00',
      status: 'cancelled',
      type: 'Video Consultation',
      paymentStatus: 'Refund Pending',
      transactionId: 'ch_3Mv8x7T1w98Xzpy4',
      notes: 'Chest tightness evaluation. Patient requested cancellation.'
    },
    {
      id: 'APT-10429',
      patientName: 'Emily Davis',
      patientEmail: 'emily.davis@example.com',
      doctorName: 'Dr. Sarah Jenkins',
      doctorSpecialty: 'Pediatrics',
      dateTime: 'June 24, 2026 • 11:00 AM',
      fee: '$120.00',
      status: 'refunded',
      type: 'Video Consultation',
      paymentStatus: 'Refunded',
      transactionId: 'ch_3Mv8x6H3q52Bopx9',
      notes: 'Consultation canceled due to doctor availability conflict. Full refund issued.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: 'primary',
    title: '',
    message: '',
    action: null
  });

  const handleOpenDrawer = (apt) => {
    setSelectedAppointment(apt);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Cancel Trigger
  const triggerCancel = (aptId) => {
    const apt = appointments.find(a => a.id === aptId);
    setModalConfig({
      show: true,
      type: 'warning',
      title: 'Cancel Platform Appointment',
      message: `Are you sure you want to cancel appointment ${apt.id} with ${apt.doctorName}? The patient will be notified of the cancellation.`,
      action: () => processCancel(aptId)
    });
  };

  const processCancel = (aptId) => {
    setActionLoading(true);
    setTimeout(() => {
      setAppointments(prev =>
        prev.map(apt => apt.id === aptId ? { ...apt, status: 'cancelled', paymentStatus: 'Refund Pending' } : apt)
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      if (selectedAppointment && selectedAppointment.id === aptId) {
        setSelectedAppointment(prev => ({ ...prev, status: 'cancelled', paymentStatus: 'Refund Pending' }));
      }
      setSuccessMsg('Successfully cancelled the appointment! Refund request automatically added to queue.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Refund Trigger
  const triggerRefund = (aptId) => {
    const apt = appointments.find(a => a.id === aptId);
    setModalConfig({
      show: true,
      type: 'danger',
      title: 'Issue Stripe Refund',
      message: `Are you sure you want to refund ${apt.fee} for appointment ${apt.id} back to the patient card? This action is irreversible on Stripe.`,
      action: () => processRefund(aptId)
    });
  };

  const processRefund = (aptId) => {
    setActionLoading(true);
    setTimeout(() => {
      setAppointments(prev =>
        prev.map(apt => apt.id === aptId ? { ...apt, status: 'refunded', paymentStatus: 'Refunded' } : apt)
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      if (selectedAppointment && selectedAppointment.id === aptId) {
        setSelectedAppointment(prev => ({ ...prev, status: 'refunded', paymentStatus: 'Refunded' }));
      }
      setSuccessMsg('Stripe transaction refund completed successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Filtering
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <title>Manage Bookings | Neo-Health Admin</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Consultation Bookings</h3>
            <p className="text-secondary small mb-0">Supervisor view of all tele-health appointments booked, completed, or refunded.</p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="appointments-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        {/* Search & Filters Panel */}
        <div className="neo-glass-card p-3 border bg-white shadow-sm mb-4">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center bg-light px-3 py-2 rounded-3 border">
                <i className="bi bi-search text-secondary me-2"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0 shadow-none small"
                  placeholder="Search by ID, patient name, doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="appointment-search-input"
                />
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="col-12 col-md-6">
              <div className="d-flex flex-wrap justify-content-md-end gap-1.5" id="appointment-status-filters">
                {['all', 'booked', 'completed', 'cancelled', 'refunded'].map((status) => (
                  <button
                    key={status}
                    className={`btn btn-sm px-3 py-2 rounded-pill fw-medium capitalize border-0 ${
                      statusFilter === status 
                        ? 'btn-primary-neo' 
                        : 'btn-light text-secondary border'
                    }`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="neo-glass-card border bg-white shadow-sm overflow-hidden mb-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-secondary mb-3 d-block"></i>
              <h6 className="fw-bold text-dark">No appointments found</h6>
              <p className="text-secondary small mb-0">No booking logs matched your search or status query.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0" id="admin-appointments-table">
                <thead className="table-light text-secondary small fw-bold">
                  <tr>
                    <th>Booking ID</th>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Date & Time</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-dark small">
                  {filteredAppointments.map((apt) => {
                    const getStatusColor = (st) => {
                      switch (st) {
                        case 'booked':
                          return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20';
                        case 'completed':
                          return 'bg-success bg-opacity-10 text-success border border-success border-opacity-20';
                        case 'cancelled':
                          return 'bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-20';
                        case 'refunded':
                          return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20';
                        default:
                          return 'bg-secondary bg-opacity-10 text-secondary';
                      }
                    };

                    return (
                      <tr key={apt.id} className="transition-all">
                        <td className="fw-semibold text-primary">{apt.id}</td>
                        <td className="fw-semibold text-dark">{apt.patientName}</td>
                        <td>
                          <span className="fw-semibold text-dark d-block">{apt.doctorName}</span>
                          <small className="text-secondary">{apt.doctorSpecialty}</small>
                        </td>
                        <td>{apt.dateTime}</td>
                        <td className="fw-bold">{apt.fee}</td>
                        <td>
                          <span className={`badge px-2 py-1 rounded-pill small fw-semibold text-uppercase ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-2">
                            <button
                              className="btn btn-sm btn-light border py-1.5 px-2.5 text-secondary rounded-3"
                              onClick={() => handleOpenDrawer(apt)}
                              title="Audit Booking Details"
                            >
                              <i className="bi bi-file-earmark-text"></i> Audit
                            </button>
                            
                            {apt.status === 'booked' && (
                              <button
                                className="btn btn-sm btn-outline-warning py-1.5 px-2 rounded-3"
                                onClick={() => triggerCancel(apt.id)}
                                title="Cancel Consultation"
                              >
                                <i className="bi bi-x-circle"></i>
                              </button>
                            )}

                            {apt.status === 'cancelled' && apt.paymentStatus === 'Refund Pending' && (
                              <button
                                className="btn btn-sm btn-outline-danger py-1.5 px-2 rounded-3 d-flex align-items-center gap-1 small"
                                onClick={() => triggerRefund(apt.id)}
                                title="Issue Refund"
                              >
                                <i className="bi bi-arrow-left-right"></i> Refund
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Appointment Side Drawer Detail Panel */}
        {drawerOpen && selectedAppointment && (
          <div 
            className="position-fixed top-0 end-0 bottom-0 bg-white border-start shadow-lg z-3 transition-all animate-slide-in"
            style={{ width: '100%', maxWidth: '480px', height: '100vh', display: 'flex', flexDirection: 'column' }}
            id="appointment-detail-drawer"
          >
            {/* Drawer Header */}
            <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold text-dark mb-0.5">Booking Auditor</h5>
                <small className="text-secondary">Consultation: {selectedAppointment.id}</small>
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
              
              {/* Main Info Card */}
              <div className="p-3 bg-light rounded-3 border mb-4 text-dark">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-secondary text-uppercase tracking-wider fw-semibold" style={{ fontSize: '10px' }}>Current Status</span>
                  <span className={`badge px-2.5 py-1 rounded-pill small fw-semibold text-uppercase ${
                    selectedAppointment.status === 'booked' 
                      ? 'bg-primary bg-opacity-10 text-primary' 
                      : selectedAppointment.status === 'completed'
                      ? 'bg-success bg-opacity-10 text-success'
                      : selectedAppointment.status === 'cancelled'
                      ? 'bg-warning bg-opacity-10 text-warning-emphasis'
                      : 'bg-danger bg-opacity-10 text-danger'
                  }`}>
                    {selectedAppointment.status}
                  </span>
                </div>

                <div className="row g-2">
                  <div className="col-12 border-bottom pb-2">
                    <span className="text-secondary d-block">Scheduled Slot</span>
                    <span className="fw-semibold fs-6">{selectedAppointment.dateTime}</span>
                  </div>
                  <div className="col-6 mt-2">
                    <span className="text-secondary d-block">Platform Patient</span>
                    <span className="fw-semibold">{selectedAppointment.patientName}</span>
                    <small className="text-secondary d-block">{selectedAppointment.patientEmail}</small>
                  </div>
                  <div className="col-6 mt-2 border-start ps-3">
                    <span className="text-secondary d-block">Consultation Provider</span>
                    <span className="fw-semibold">{selectedAppointment.doctorName}</span>
                    <small className="text-secondary d-block">{selectedAppointment.doctorSpecialty}</small>
                  </div>
                </div>
              </div>

              {/* Consultation Details */}
              <h6 className="fw-bold text-dark mb-2.5">Consultation & Symptoms Notes</h6>
              <div className="p-3 rounded-3 bg-light border mb-4 text-dark">
                <div className="mb-2">
                  <span className="text-secondary d-block">Consultation Format</span>
                  <span className="fw-semibold"><i className="bi bi-camera-video text-primary me-2"></i>{selectedAppointment.type}</span>
                </div>
                <div>
                  <span className="text-secondary d-block">Symptom Note / Patient Intake Description</span>
                  <p className="mb-0 text-secondary" style={{ lineHeight: '1.4' }}>{selectedAppointment.notes}</p>
                </div>
              </div>

              {/* Stripe Billing & Transaction details */}
              <h6 className="fw-bold text-dark mb-2.5">Payment Ledger (Stripe API)</h6>
              <div className="p-3 rounded-3 bg-light border mb-2 text-dark">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Consultation Fee Charged:</span>
                  <span className="fw-bold text-dark">{selectedAppointment.fee}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Stripe Payout Status:</span>
                  <span className="fw-semibold text-uppercase small text-success">{selectedAppointment.paymentStatus}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Stripe Transaction ID:</span>
                  <code className="small text-secondary fw-mono bg-white px-1 border rounded">{selectedAppointment.transactionId}</code>
                </div>
              </div>

            </div>

            {/* Drawer Actions */}
            <div className="p-4 border-top bg-light d-flex gap-2">
              {selectedAppointment.status === 'booked' && (
                <button 
                  className="btn btn-warning flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    handleCloseDrawer();
                    triggerCancel(selectedAppointment.id);
                  }}
                >
                  <i className="bi bi-x-circle"></i> Cancel Appointment
                </button>
              )}
              {selectedAppointment.status === 'cancelled' && selectedAppointment.paymentStatus === 'Refund Pending' && (
                <button 
                  className="btn btn-danger flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    handleCloseDrawer();
                    triggerRefund(selectedAppointment.id);
                  }}
                >
                  <i className="bi bi-arrow-left-right"></i> Process Stripe Refund
                </button>
              )}
              <button className="btn btn-outline-secondary py-2 px-3 fw-semibold small" onClick={handleCloseDrawer}>
                Close
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

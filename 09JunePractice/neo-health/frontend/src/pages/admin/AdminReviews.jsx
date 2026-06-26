import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import ConfirmationModal from '../../components/shared/ConfirmationModal.jsx';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 'REV-101',
      patientName: 'Alice Johnson',
      doctorName: 'Dr. Elizabeth Blackwell',
      doctorSpecialty: 'Cardiology',
      rating: 5,
      comment: 'Amazing cardiologist! Dr. Blackwell was extremely thorough, explained my chest pain causes, and calmed my anxiety. The digital visit was incredibly convenient.',
      date: 'June 25, 2026',
      status: 'published'
    },
    {
      id: 'REV-102',
      patientName: 'Mark Spencer',
      doctorName: 'Dr. Sarah Jenkins',
      doctorSpecialty: 'Pediatrics',
      rating: 2,
      comment: 'Waiting lobby took forever (nearly 35 minutes) and the video consultation was completed in under 5 minutes. Felt rushed and not listened to.',
      date: 'June 24, 2026',
      status: 'flagged'
    },
    {
      id: 'REV-103',
      patientName: 'Robert Miller',
      doctorName: 'Dr. Charles Drew',
      doctorSpecialty: 'Hematology',
      rating: 1,
      comment: 'This doctor is a total fraud! Selling fake pills online! Avoid at all costs, Neo-Health should block this guy immediately! SCAM!',
      date: 'June 23, 2026',
      status: 'flagged'
    },
    {
      id: 'REV-104',
      patientName: 'Elena Rostova',
      doctorName: 'Dr. Virginia Apgar',
      doctorSpecialty: 'Anesthesiology',
      rating: 4,
      comment: 'Excellent consulting on pre-op anesthesia protocols. Clear guidance and very polite.',
      date: 'June 22, 2026',
      status: 'published'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all'); // all, flagged, published, deleted
  const [successMsg, setSuccessMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: '',
    message: '',
    type: 'primary',
    action: null
  });

  // Action: Publish/Approve
  const handlePublish = (revId) => {
    setActionLoading(true);
    setTimeout(() => {
      setReviews(prev =>
        prev.map(rev => rev.id === revId ? { ...rev, status: 'published' } : rev)
      );
      setActionLoading(false);
      setSuccessMsg('Review has been approved and published to doctor profile feed.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 600);
  };

  // Action: Flag
  const handleFlag = (revId) => {
    setActionLoading(true);
    setTimeout(() => {
      setReviews(prev =>
        prev.map(rev => rev.id === revId ? { ...rev, status: 'flagged' } : rev)
      );
      setActionLoading(false);
      setSuccessMsg('Review has been flagged for administrative content audit.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 600);
  };

  // Action: Delete (Confirm Modal)
  const triggerDelete = (revId) => {
    const rev = reviews.find(r => r.id === revId);
    setModalConfig({
      show: true,
      type: 'danger',
      title: 'Delete Patient Review',
      message: `Are you sure you want to permanently delete review ${rev.id} submitted by ${rev.patientName}? The comment violates platform guidelines.`,
      action: () => processDelete(revId)
    });
  };

  const processDelete = (revId) => {
    setActionLoading(true);
    setTimeout(() => {
      setReviews(prev =>
        prev.map(rev => rev.id === revId ? { ...rev, status: 'deleted' } : rev)
      );
      setActionLoading(false);
      setModalConfig(prev => ({ ...prev, show: false }));
      setSuccessMsg('Review deleted from public portals successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 800);
  };

  // Filters
  const filteredReviews = reviews.filter(rev => activeFilter === 'all' || rev.status === activeFilter);

  return (
    <AdminLayout>
      <title>Feed Review Moderation | Neo-Health Admin</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Review Moderation Panel</h3>
            <p className="text-secondary small mb-0">Audit patient-submitted feedback. Flag spam, verify negative ratings, or delete inappropriate terms.</p>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="alert alert-success border-success border-opacity-25 bg-success bg-opacity-10 py-2.5 px-3 mb-4 rounded-3 d-flex align-items-center gap-2" id="reviews-success-alert">
            <i className="bi bi-check-circle-fill text-success"></i>
            <span className="small fw-semibold">{successMsg}</span>
          </div>
        )}

        {/* Filters */}
        <div className="d-flex flex-wrap gap-2 mb-4" id="review-moderation-filters">
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'all' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Feedback ({reviews.length})
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 position-relative ${
              activeFilter === 'flagged' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('flagged')}
            id="reviews-filter-flagged"
          >
            Flagged Queue
            {reviews.filter(r => r.status === 'flagged').length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '9px' }}>
                {reviews.filter(r => r.status === 'flagged').length}
              </span>
            )}
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'published' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('published')}
          >
            Published
          </button>
          <button
            className={`btn btn-sm px-3.5 py-2 rounded-pill fw-medium border-0 ${
              activeFilter === 'deleted' ? 'btn-primary-neo' : 'btn-light border text-secondary'
            }`}
            onClick={() => setActiveFilter('deleted')}
          >
            Deleted
          </button>
        </div>

        {/* Review list */}
        <div className="d-flex flex-column gap-3 mb-4" id="reviews-moderation-list">
          {filteredReviews.length === 0 ? (
            <div className="neo-glass-card border bg-white shadow-sm p-5 text-center">
              <i className="bi bi-chat-square-quote fs-1 text-secondary mb-3 d-block"></i>
              <h6 className="fw-bold text-dark">No feedback reviews found</h6>
              <p className="text-secondary small mb-0">The feedback stream is currently empty under this filter.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id} 
                className={`neo-glass-card border bg-white shadow-sm p-4 transition-all position-relative overflow-hidden ${
                  rev.status === 'flagged' 
                    ? 'border-warning border-opacity-50' 
                    : rev.status === 'deleted'
                    ? 'border-danger border-opacity-20 opacity-75'
                    : 'hover-border-primary'
                }`}
              >
                {/* Accent highlights */}
                {rev.status === 'flagged' && (
                  <div className="position-absolute top-0 start-0 bottom-0 bg-warning" style={{ width: '4px' }}></div>
                )}
                {rev.status === 'deleted' && (
                  <div className="position-absolute top-0 start-0 bottom-0 bg-danger" style={{ width: '4px' }}></div>
                )}

                {/* Rating details & Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="fw-bold text-dark">{rev.patientName}</span>
                      <span className="text-secondary small">reviewed</span>
                      <span className="fw-semibold text-primary">{rev.doctorName}</span>
                      <span className="text-secondary small">({rev.doctorSpecialty})</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex gap-0.5 text-warning small">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i key={star} className={`bi ${star <= rev.rating ? 'bi-star-fill' : 'bi-star'} fs-6`}></i>
                        ))}
                      </div>
                      <small className="text-secondary">• {rev.date} • ID: {rev.id}</small>
                    </div>
                  </div>

                  <div>
                    <span className={`badge px-2.5 py-1 rounded-pill small fw-semibold text-uppercase ${
                      rev.status === 'published'
                        ? 'bg-success bg-opacity-10 text-success'
                        : rev.status === 'flagged'
                        ? 'bg-warning bg-opacity-10 text-warning-emphasis'
                        : 'bg-danger bg-opacity-10 text-danger'
                    }`}>
                      {rev.status}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                  <p className="text-dark small mb-0 bg-light p-3 rounded-3 border" style={{ fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{rev.comment}"
                  </p>
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  {rev.status === 'flagged' && (
                    <button
                      className="btn btn-sm btn-success px-3 py-1.5 rounded-3 d-flex align-items-center gap-1 fw-medium"
                      onClick={() => handlePublish(rev.id)}
                      disabled={actionLoading}
                    >
                      <i className="bi bi-check-circle"></i> Approve & Publish
                    </button>
                  )}
                  {rev.status === 'published' && (
                    <button
                      className="btn btn-sm btn-outline-warning px-3 py-1.5 rounded-3 d-flex align-items-center gap-1 fw-medium"
                      onClick={() => handleFlag(rev.id)}
                      disabled={actionLoading}
                    >
                      <i className="bi bi-flag-fill"></i> Flag Review
                    </button>
                  )}
                  {rev.status !== 'deleted' && (
                    <button
                      className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-3 d-flex align-items-center gap-1 fw-medium"
                      onClick={() => triggerDelete(rev.id)}
                      disabled={actionLoading}
                    >
                      <i className="bi bi-trash-fill"></i> Delete
                    </button>
                  )}
                  {rev.status === 'deleted' && (
                    <button
                      className="btn btn-sm btn-light border px-3 py-1.5 rounded-3 text-secondary"
                      onClick={() => handlePublish(rev.id)}
                      disabled={actionLoading}
                    >
                      Restore Review
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Confirmation Dialog */}
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
    </AdminLayout>
  );
}

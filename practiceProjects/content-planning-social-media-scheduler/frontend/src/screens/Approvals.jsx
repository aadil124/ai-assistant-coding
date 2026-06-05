import React, { useState } from 'react';

export default function Approvals({ posts, approvePost, rejectPost }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const pendingPosts = posts.filter(p => p.status === 'PENDING_REVIEW');

  const handleApprove = (id) => {
    approvePost(id);
    setSelectedPost(null);
    alert('Post approved and queued for publication!');
  };

  const handleReject = () => {
    if (!rejectionReason || !selectedPost) return;
    rejectPost(selectedPost.id, rejectionReason);
    setRejectionReason('');
    setShowRejectModal(false);
    setSelectedPost(null);
    alert('Post rejected and returned to Drafts.');
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Left Pane: List */}
      <section className="w-50 border-end p-4 overflow-auto custom-scrollbar bg-light">
        <h5 className="font-weight-bold text-dark mb-3">Pending Content Approvals</h5>
        <div className="d-flex flex-column gap-3">
          {pendingPosts.map(post => (
            <div 
              key={post.id} 
              className={`p-3 border rounded-3 bg-white d-flex gap-3 align-items-start cursor-pointer transition-all ${selectedPost?.id === post.id ? 'border-primary shadow' : 'shadow-sm'}`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex-grow-1">
                <p className="m-0 text-dark font-weight-bold truncate-2" style={{ fontSize: '13px', lineHeight: '1.4' }}>{post.caption}</p>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span className="badge bg-warning-subtle text-warning text-xs-caps" style={{ fontSize: '9px' }}>Pending Review</span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    Scheduled: {new Date(post.scheduledTime).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              {post.media.length > 0 && (
                <img src={post.media[0]} alt="thumb" className="rounded object-fit-cover" style={{ width: '54px', height: '54px' }} />
              )}
            </div>
          ))}
          {pendingPosts.length === 0 && (
            <div className="text-center py-5 text-muted bg-white rounded-3 border">
              <span className="material-symbols-outlined mb-2" style={{ fontSize: '36px' }}>verified</span>
              <p className="m-0" style={{ fontSize: '13px' }}>All caught up! No posts waiting for approvals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Right Pane: Review Drawer Detail */}
      <section className="flex-fill bg-surface-container-low p-4 overflow-auto d-flex flex-column align-items-center custom-scrollbar">
        {selectedPost ? (
          <div className="d-flex flex-column align-items-center w-100 gap-4" style={{ maxWidth: '420px' }}>
            {/* Action buttons */}
            <div className="d-flex w-100 gap-2">
              <button 
                className="btn btn-outline-danger flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                onClick={() => setShowRejectModal(true)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
                Reject / Revert
              </button>
              <button 
                className="btn btn-success flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                onClick={() => handleApprove(selectedPost.id)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                Approve & Schedule
              </button>
            </div>

            {/* Mobile feed mockup simulator */}
            <div className="device-simulator overflow-hidden d-flex flex-column position-relative shadow border" style={{ width: '310px', height: '520px' }}>
              {/* Profile Header */}
              <div className="p-2 border-bottom d-flex align-items-center gap-2">
                <img src={selectedPost.authorAvatar} alt="avatar" className="rounded-circle" style={{ width: '24px', height: '24px' }} />
                <span className="font-weight-bold" style={{ fontSize: '11px' }}>{selectedPost.author}</span>
              </div>
              {/* Media image canvas */}
              <div className="bg-light flex-grow-1 d-flex align-items-center justify-content-center overflow-hidden position-relative">
                {selectedPost.media.length > 0 ? (
                  <img src={selectedPost.media[0]} alt="preview" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <span className="text-muted text-xs-caps">No Media Attached</span>
                )}
              </div>
              {/* Actions */}
              <div className="p-2 d-flex justify-content-between border-top border-bottom text-muted">
                <span className="material-symbols-outlined text-sm">favorite</span>
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
              </div>
              {/* Text area */}
              <div className="p-2 overflow-auto" style={{ maxHeight: '110px' }}>
                <p className="m-0 text-dark" style={{ fontSize: '11px', lineHeight: '1.4' }}>
                  <span className="font-weight-bold me-1">{selectedPost.author}</span>
                  {selectedPost.caption}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-5 my-auto text-muted">
            <span className="material-symbols-outlined mb-2" style={{ fontSize: '48px' }}>rate_review</span>
            <p className="m-0" style={{ fontSize: '14px' }}>Select a post from the pending list to review.</p>
          </div>
        )}
      </section>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Provide Rejection Reason</h5>
                <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea 
                  className="form-control rounded-3" 
                  rows="4" 
                  placeholder="e.g. Correct typing error in caption..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRejectModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" disabled={!rejectionReason} onClick={handleReject}>Reject Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';

export default function Queue({ posts, reschedulePost, submitForReview }) {
  const [filter, setFilter] = useState('ALL'); // ALL, APPROVED, PENDING_REVIEW, DRAFT

  const handleReschedule = (id) => {
    const hours = prompt('Reschedule delay count (hours):', '24');
    if (hours) {
      const parsed = parseInt(hours);
      if (!isNaN(parsed)) {
        const post = posts.find(p => p.id === id);
        const newTime = new Date(new Date(post.scheduledTime).getTime() + parsed * 60 * 60 * 1000);
        try {
          reschedulePost(id, newTime.toISOString());
          alert('Post rescheduled successfully!');
        } catch (err) {
          alert(err.message);
        }
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DRAFT': return <span className="badge bg-secondary-subtle text-secondary uppercase font-bold" style={{ fontSize: '8px' }}>Draft</span>;
      case 'PENDING_REVIEW': return <span className="badge bg-warning-subtle text-warning uppercase font-bold" style={{ fontSize: '8px' }}>Pending</span>;
      case 'APPROVED': return <span className="badge bg-success-subtle text-success uppercase font-bold" style={{ fontSize: '8px' }}>Approved</span>;
      case 'PUBLISHED': return <span className="badge bg-primary-subtle text-primary uppercase font-bold" style={{ fontSize: '8px' }}>Published</span>;
      default: return null;
    }
  };

  const filteredPosts = posts
    .filter(p => filter === 'ALL' || p.status === filter)
    .sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());

  return (
    <div className="p-4 overflow-auto custom-scrollbar bg-light" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Filters Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
        <div className="d-flex bg-white rounded-3 p-1 border shadow-sm">
          {['ALL', 'DRAFT', 'PENDING_REVIEW', 'APPROVED'].map(status => (
            <button
              key={status}
              className={`btn btn-sm px-3 border-0 text-xs-caps ${filter === status ? 'bg-primary text-white font-weight-bold' : 'text-muted'}`}
              onClick={() => setFilter(status)}
              style={{ borderRadius: '6px' }}
            >
              {status === 'PENDING_REVIEW' ? 'Pending' : status === 'ALL' ? 'All Queue' : status.toLowerCase()}
            </button>
          ))}
        </div>
        <span className="text-muted" style={{ fontSize: '12px' }}>Total matching: {filteredPosts.length} posts</span>
      </div>

      {/* Queue timeline list */}
      <div className="d-flex flex-column gap-3" style={{ maxWidth: '780px' }}>
        {filteredPosts.map(post => (
          <div key={post.id} className="card border rounded-3 bg-white p-3 shadow-sm position-relative">
            <div 
              className="position-absolute top-0 bottom-0 start-0 rounded-start" 
              style={{ 
                width: '5px', 
                backgroundColor: post.status === 'APPROVED' ? '#16a34a' : post.status === 'PENDING_REVIEW' ? '#ffc107' : '#6b7280' 
              }}
            ></div>
            <div className="d-flex justify-content-between align-items-start gap-3 pl-2">
              <div className="flex-grow-1">
                {/* Header row */}
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-secondary-subtle text-secondary-emphasis" style={{ fontSize: '9px' }}>
                    {new Date(post.scheduledTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {getStatusBadge(post.status)}
                  <div className="d-flex gap-1.5 ms-2">
                    {post.platforms.map(plat => (
                      <i key={plat} className={`bi bi-${plat === 'twitter' ? 'twitter-x' : plat} text-muted`} style={{ fontSize: '11px' }}></i>
                    ))}
                  </div>
                </div>

                <p className="m-0 text-dark font-weight-bold" style={{ fontSize: '13px', lineHeight: '1.4' }}>{post.caption}</p>

                {/* Sub details/actions */}
                <div className="d-flex align-items-center gap-3 mt-3">
                  <span className="text-muted" style={{ fontSize: '10px' }}>Created by {post.author}</span>
                  <div className="vr bg-secondary opacity-25" style={{ height: '10px' }}></div>
                  <button className="btn btn-link p-0 text-primary text-decoration-none" style={{ fontSize: '11px', fontWeight: '600' }} onClick={() => handleReschedule(post.id)}>
                    Reschedule
                  </button>
                  {post.status === 'DRAFT' && (
                    <>
                      <div className="vr bg-secondary opacity-25" style={{ height: '10px' }}></div>
                      <button className="btn btn-link p-0 text-success text-decoration-none" style={{ fontSize: '11px', fontWeight: '600' }} onClick={() => submitForReview(post.id)}>
                        Submit for Review
                      </button>
                    </>
                  )}
                  {post.comments.length > 0 && (
                    <>
                      <div className="vr bg-secondary opacity-25" style={{ height: '10px' }}></div>
                      <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '11px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chat_bubble</span>
                        {post.comments.length}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {post.media.length > 0 && (
                <img src={post.media[0]} alt="attached thumbnail" className="rounded border object-fit-cover" style={{ width: '64px', height: '64px' }} />
              )}
            </div>
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center py-5 text-muted bg-white rounded-3 border">
            <span className="material-symbols-outlined mb-2" style={{ fontSize: '36px' }}>view_week</span>
            <p className="m-0" style={{ fontSize: '13px' }}>Timeline is empty. Try selecting another filter or create posts.</p>
          </div>
        )}
      </div>
    </div>
  );
}

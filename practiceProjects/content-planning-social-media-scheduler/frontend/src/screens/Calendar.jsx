import React, { useState } from 'react';

export default function Calendar({ setActiveTab, posts, reschedulePost }) {
  const [currentMonth, setCurrentMonth] = useState('June 2026');
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  // September/June mock days mapping (offset: starts on Monday (1st), offset Sun is empty)
  // Let's create an array representing the calendar days for June 2026
  // June 2026 starts on a Monday. 30 Days.
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const leadingEmptyDays = [31]; // May 31 offset cell for Sunday

  const getPostForDay = (day) => {
    // Return posts scheduled on June [day]
    return posts.filter(post => {
      const postDate = new Date(post.scheduledTime);
      return postDate.getFullYear() === 2026 && postDate.getMonth() === 5 && postDate.getDate() === day;
    });
  };

  const handleDragStart = (e, postId) => {
    e.dataTransfer.setData('text/plain', postId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetDay) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain');
    if (postId) {
      // Calculate new target ISO String for June [targetDay]
      const targetTime = new Date(2026, 5, targetDay, 12, 0); // target 12:00
      try {
        reschedulePost(postId, targetTime.toISOString());
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'DRAFT': return 'border-start border-5 border-secondary';
      case 'PENDING_REVIEW': return 'border-start border-5 border-warning';
      case 'APPROVED': return 'border-start border-5 border-success';
      case 'PUBLISHED': return 'border-start border-5 border-primary';
      case 'FAILED': return 'border-start border-5 border-danger';
      default: return 'border-start border-5 border-secondary';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DRAFT': return <span className="badge bg-secondary-subtle text-secondary" style={{ fontSize: '8px' }}>Draft</span>;
      case 'PENDING_REVIEW': return <span className="badge bg-warning-subtle text-warning" style={{ fontSize: '8px' }}>Pending</span>;
      case 'APPROVED': return <span className="badge bg-success-subtle text-success" style={{ fontSize: '8px' }}>Approved</span>;
      case 'PUBLISHED': return <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '8px' }}>Published</span>;
      default: return null;
    }
  };

  return (
    <div className="d-flex flex-column h-100" style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Calendar Toolbar */}
      <section className="px-4 py-3 bg-white border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <h4 className="m-0 font-weight-bold text-dark" style={{ fontSize: '18px' }}>{currentMonth}</h4>
          <div className="d-flex bg-light rounded p-1">
            <button className="btn btn-sm btn-light bg-white shadow-sm border-0 font-weight-bold" style={{ fontSize: '11px' }}>Today</button>
            <div className="d-flex align-items-center gap-1 ms-2">
              <button className="btn btn-sm p-1 hover-bg-light border-0"><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_left</span></button>
              <button className="btn btn-sm p-1 hover-bg-light border-0"><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span></button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex bg-light rounded p-1">
            <button 
              className={`btn btn-sm px-3 border-0 ${viewMode === 'day' ? 'bg-white shadow-sm text-primary font-weight-bold' : 'text-muted'}`}
              onClick={() => setViewMode('day')}
              style={{ fontSize: '11px' }}
            >
              Day
            </button>
            <button 
              className={`btn btn-sm px-3 border-0 ${viewMode === 'week' ? 'bg-white shadow-sm text-primary font-weight-bold' : 'text-muted'}`}
              onClick={() => setViewMode('week')}
              style={{ fontSize: '11px' }}
            >
              Week
            </button>
            <button 
              className={`btn btn-sm px-3 border-0 ${viewMode === 'month' ? 'bg-white shadow-sm text-primary font-weight-bold' : 'text-muted'}`}
              onClick={() => setViewMode('month')}
              style={{ fontSize: '11px' }}
            >
              Month
            </button>
          </div>
          <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>filter_list</span>
            Filters
          </button>
        </div>
      </section>

      {/* Calendar Grid Body */}
      <section className="flex-grow-1 overflow-auto bg-light custom-scrollbar">
        <div className="calendar-grid bg-secondary-subtle gap-1" style={{ minWidth: '980px' }}>
          {/* Header Row: Days */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
            <div key={dayName} className="bg-white text-center py-2 text-muted text-xs-caps sticky-top z-1" style={{ borderBottom: '1px solid #dee2e6' }}>
              {dayName}
            </div>
          ))}

          {/* Empty May cell offset for Sunday */}
          {leadingEmptyDays.map(dayNum => (
            <div key={`empty-${dayNum}`} className="calendar-cell bg-light opacity-50 p-2 text-muted" style={{ fontSize: '11px' }}>
              {dayNum}
            </div>
          ))}

          {/* Month Days */}
          {daysInMonth.map(day => {
            const dayPosts = getPostForDay(day);
            const isToday = day === 5; // Today is June 5, 2026

            return (
              <div
                key={day}
                className={`calendar-cell p-1 d-flex flex-column ${isToday ? 'bg-primary-subtle' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
              >
                {/* Cell Header */}
                <div className="d-flex justify-content-between align-items-center px-1 mb-1">
                  <span className={`font-weight-bold ${isToday ? 'text-primary' : 'text-dark'}`} style={{ fontSize: '12px' }}>
                    {day}
                  </span>
                  <span className="material-symbols-outlined text-muted opacity-0 hover-opacity-100" style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => setActiveTab('composer')}>
                    add_circle
                  </span>
                </div>

                {/* Cards Inside Cell */}
                <div className="d-flex flex-column gap-1 overflow-auto flex-grow-1">
                  {dayPosts.map(post => (
                    <div
                      key={post.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, post.id)}
                      className={`calendar-card bg-white border rounded p-1 shadow-sm cursor-grab ${getStatusColorClass(post.status)}`}
                      style={{ fontSize: '10px' }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        {post.platforms.map(plat => (
                          <i key={plat} className={`bi bi-${plat === 'twitter' ? 'twitter-x' : plat} text-muted`}></i>
                        ))}
                        {getStatusBadge(post.status)}
                      </div>
                      <p className="m-0 text-dark truncate-2 font-weight-normal leading-tight" style={{ fontSize: '10px' }}>
                        {post.caption}
                      </p>
                      {post.media.length > 0 && (
                        <img 
                          alt="post thumbnail" 
                          className="w-100 rounded mt-1" 
                          style={{ height: '40px', objectFit: 'cover' }}
                          src={post.media[0]} 
                        />
                      )}
                    </div>
                  ))}
                  {/* AI Suggestion block for day 14 */}
                  {day === 14 && (
                    <div className="border border-dashed border-primary rounded p-1 bg-primary-subtle text-center" style={{ fontSize: '9px' }}>
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '12px' }}>auto_awesome</span>
                      <p className="m-0 text-primary font-weight-bold">AI Slot</p>
                      <button className="btn btn-link p-0 text-primary font-weight-bold text-decoration-none" style={{ fontSize: '8px' }} onClick={() => setActiveTab('composer')}>Create</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

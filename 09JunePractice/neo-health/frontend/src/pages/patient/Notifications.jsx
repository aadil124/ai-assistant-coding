import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function Notifications() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [markedAllRead, setMarkedAllRead] = useState(false);

  // Dynamic state for notification list
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'records',
      title: 'Health Alert: Lab Results Ready',
      desc: "Your comprehensive metabolic panel (CMP) results from Central Diagnostics Lab are now available for review.",
      dateGroup: 'Today',
      time: '10:45 AM',
      unread: true,
      actionText: 'View Results',
      actionRoute: '/patient/records/view/cmp-panel'
    },
    {
      id: 2,
      type: 'appointments',
      title: 'Appointment Reminder',
      desc: "Don't forget your scheduled follow-up with Dr. Aris Thorne tomorrow at 9:00 AM.",
      dateGroup: 'Today',
      time: '8:15 AM',
      unread: true,
      doctor: {
        name: "Dr. Aris Thorne",
        dept: "Cardiology",
        room: "North Wing, Room 402",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfysIkH6It4e5cc74qbuKWgXxztr6H6gkbQxj0t5zAXo3PfQIcW35bTB8cJCLyVB0biqvey64px5TJ1v7BSedyVrHbw8dpqyor6x0RN5lWbB_ih0qc2Xjw0zL5OhJfB8b_u9hmCvXs1KtCNkCIfRO0xugOYE22D9Aem8zSQgA0s9zHw0kXkrVuA10CpPO1zhFViiHzc4_NPosSHpve1oWAD7fv8QeU3CFTnIDlPKUdwLKSDqGfy8E2try8ofDws5Bw5hWd3ktpK1c"
      },
      actionRoute: '/patient/appointments'
    },
    {
      id: 3,
      type: 'records',
      title: 'Record Update: Immunization',
      desc: "Your vaccination records have been updated following your visit on October 20th.",
      dateGroup: 'Yesterday',
      time: 'Oct 23, 4:20 PM',
      unread: false
    },
    {
      id: 4,
      type: 'records',
      title: 'Prescription Refill Successful',
      desc: "Lisinopril 10mg refill request has been approved and sent to Main St. Pharmacy.",
      dateGroup: 'Yesterday',
      time: 'Oct 23, 11:30 AM',
      unread: false
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
    setMarkedAllRead(true);
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleAction = (route) => {
    if (route) {
      navigate(route);
    }
  };

  // Filter logic
  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'appointments') return notif.type === 'appointments';
    if (activeFilter === 'records') return notif.type === 'records';
    if (activeFilter === 'urgent') return notif.unread; // Map urgent alerts to unread items
    return true;
  });

  // Calculate filter counts
  const allCount = notifications.length;
  const appointmentsCount = notifications.filter(n => n.type === 'appointments').length;
  const recordsCount = notifications.filter(n => n.type === 'records').length;
  const unreadCount = notifications.filter(n => n.unread).length;

  // Group by dateGroup (Today / Yesterday)
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    if (!acc[notif.dateGroup]) {
      acc[notif.dateGroup] = [];
    }
    acc[notif.dateGroup].push(notif);
    return acc;
  }, {});

  const dateGroups = Object.keys(groupedNotifications);

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Health Alerts & Updates | Neo-Health Lobby</title>
      <meta name="description" content="View clinical health alert notifications, appointment reminders, diagnostic results, and account messages." />

      <div className="container-fluid py-2">
        
        {/* Page Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Health Alerts & Updates</h2>
            <p className="text-secondary mb-0 small">Stay updated with your latest clinical activities and reminders.</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || markedAllRead}
            className={`btn d-flex align-items-center gap-2 px-3 py-2.5 rounded-3 fw-semibold small transition-all border ${
              unreadCount === 0 || markedAllRead
                ? 'btn-light border-light-subtle text-secondary'
                : 'btn-outline-primary bg-white hover-bg-primary hover-text-white border-primary border-opacity-10'
            }`}
          >
            <i className={`bi ${markedAllRead || unreadCount === 0 ? 'bi-check-circle-fill' : 'bi-check2-all'}`}></i>
            <span>{markedAllRead || unreadCount === 0 ? 'All Read' : 'Mark all as read'}</span>
          </button>
        </div>

        {/* Bento Filter Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveFilter('all')}
              className={`neo-glass-card p-3 border text-start cursor-pointer transition-all shadow-sm ${
                activeFilter === 'all' ? 'border-primary border-start border-3' : 'bg-white'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-bell-fill fs-5"></i>
                </div>
                <span className="badge bg-primary text-white rounded-pill px-2.5 py-1.5 small font-bold">
                  {allCount}
                </span>
              </div>
              <h4 className="fw-bold mb-0 text-dark small">All Notifications</h4>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveFilter('appointments')}
              className={`neo-glass-card p-3 border text-start cursor-pointer transition-all shadow-sm ${
                activeFilter === 'appointments' ? 'border-primary border-start border-3' : 'bg-white'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="p-2 bg-secondary bg-opacity-10 text-secondary rounded-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-calendar-event-fill fs-5"></i>
                </div>
                <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2.5 py-1.5 small font-bold">
                  {appointmentsCount}
                </span>
              </div>
              <h4 className="fw-bold mb-0 text-dark small">Appointments</h4>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveFilter('records')}
              className={`neo-glass-card p-3 border text-start cursor-pointer transition-all shadow-sm ${
                activeFilter === 'records' ? 'border-primary border-start border-3' : 'bg-white'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="p-2 bg-info bg-opacity-10 text-info rounded-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-file-earmark-medical-fill fs-5"></i>
                </div>
                <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-2.5 py-1.5 small font-bold">
                  {recordsCount}
                </span>
              </div>
              <h4 className="fw-bold mb-0 text-dark small">Record Updates</h4>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              onClick={() => setActiveFilter('urgent')}
              className={`neo-glass-card p-3 border text-start cursor-pointer transition-all shadow-sm ${
                activeFilter === 'urgent' ? 'border-primary border-start border-3' : 'bg-white'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="p-2 bg-danger bg-opacity-10 text-danger rounded-3 d-flex align-items-center justify-content-center">
                  <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                </div>
                {unreadCount > 0 ? (
                  <span className="badge bg-danger text-white rounded-pill px-2.5 py-1.5 small font-bold">
                    {unreadCount} New
                  </span>
                ) : (
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-2.5 py-1.5 small font-bold">
                    None
                  </span>
                )}
              </div>
              <h4 className="fw-bold mb-0 text-dark small">Urgent Alerts</h4>
            </div>
          </div>
        </div>

        {/* Timeline & Alerts Container */}
        {filteredNotifications.length > 0 ? (
          <div className="position-relative ps-4" style={{ borderLeft: '2px solid #dee2e6' }}>
            {dateGroups.map((dateGroup) => (
              <div key={dateGroup} className="mb-4">
                
                {/* Date timeline node dot header */}
                <div className="position-absolute start-0 translate-middle-x bg-white d-flex align-items-center justify-content-center rounded-circle border border-primary text-primary" style={{ width: '32px', height: '32px', marginLeft: '-1px' }}>
                  <i className={dateGroup === 'Today' ? 'bi bi-clock-fill' : 'bi-calendar3'}></i>
                </div>
                <h3 className="h6 fw-bold text-secondary text-uppercase tracking-wider pt-1 mb-3">
                  {dateGroup === 'Today' ? 'Today — Oct 24, 2024' : 'Yesterday — Oct 23, 2024'}
                </h3>

                {/* Date Group List */}
                <div className="d-flex flex-column gap-3">
                  {groupedNotifications[dateGroup].map((notif) => (
                    <div
                      key={notif.id}
                      className={`neo-glass-card p-4 border bg-white shadow-sm position-relative overflow-hidden ${
                        notif.unread ? 'border-primary border-start border-3 border-top-0 border-bottom-0 border-end-0' : 'opacity-75'
                      }`}
                    >
                      <div className="d-flex gap-3 align-items-start">
                        
                        {/* Type Icon Badge */}
                        <div
                          className={`rounded-3 p-2.5 d-flex align-items-center justify-content-center shrink-0 ${
                            notif.type === 'appointments'
                              ? 'bg-secondary bg-opacity-10 text-secondary'
                              : 'bg-primary bg-opacity-10 text-primary'
                          }`}
                          style={{ width: '48px', height: '48px' }}
                        >
                          <i className={`bi ${notif.type === 'appointments' ? 'bi-calendar-check-fill' : 'bi-file-earmark-medical-fill'} fs-4`}></i>
                        </div>

                        {/* Alert Main Text */}
                        <div className="flex-grow-1">
                          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-1">
                            <div className="d-flex align-items-center gap-2">
                              <h4 className="fw-bold mb-0 text-dark fs-5">{notif.title}</h4>
                              {notif.unread && (
                                <span className="position-relative d-inline-flex" style={{ width: '8px', height: '8px' }}>
                                  <span className="animate-ping position-absolute h-100 w-100 rounded-circle bg-primary opacity-75"></span>
                                  <span className="position-relative rounded-circle h-100 w-100 bg-primary"></span>
                                </span>
                              )}
                            </div>
                            <span className="text-secondary small fw-medium whitespace-nowrap">{notif.time}</span>
                          </div>
                          
                          <p className="text-secondary small mb-3 mt-1.5">{notif.desc}</p>

                          {/* Nested Appointment Details Card */}
                          {notif.doctor && (
                            <div className="p-3 bg-light border rounded-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  className="rounded-circle border"
                                  alt={`Headshot of ${notif.doctor.name}`}
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                  src={notif.doctor.avatar}
                                />
                                <div>
                                  <strong className="d-block text-dark small">{notif.doctor.name}</strong>
                                  <span className="text-secondary small">{notif.doctor.dept} • {notif.doctor.room}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleAction(notif.actionRoute)}
                                className="btn btn-light btn-sm border hover-bg-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                              >
                                <i className="bi bi-chevron-right text-primary"></i>
                              </button>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="d-flex gap-2">
                            {notif.actionText && (
                              <button
                                onClick={() => handleAction(notif.actionRoute)}
                                className="btn btn-primary-neo btn-sm px-4 py-2"
                              >
                                {notif.actionText}
                              </button>
                            )}
                            <button
                              onClick={() => handleDismiss(notif.id)}
                              className="btn btn-light btn-sm border hover-bg-light px-3 py-2 text-dark font-medium"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
                
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Block when cleared */
          <div className="neo-glass-card border bg-white p-5 text-center shadow-sm max-w-lg mx-auto my-5">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-10 text-secondary mb-4" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-bell-slash-fill fs-2 text-secondary"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">You're all caught up!</h3>
            <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '280px' }}>
              No new alerts or reminders. We'll notify you here when critical activities require your attention.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline-primary py-2.5 px-4 rounded-3 fw-bold small bg-white text-primary border-primary border-opacity-20 hover-bg-primary hover-text-white transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}

      </div>
    </PatientLayout>
  );
}

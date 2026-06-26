import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import DashboardStatCard from '../../components/shared/DashboardStatCard.jsx';
import QuickActionCard from '../../components/shared/QuickActionCard.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Appointment Confirmed', message: 'Your booking with Dr. Sarah Jenkins is confirmed for tomorrow.', time: '5m ago', type: 'info' },
    { id: 2, title: 'New Prescription Uploaded', message: 'Dr. Marcus Thorne has uploaded a new prescription for your cardiac chart.', time: '2h ago', type: 'success' }
  ]);

  const [upcomingBooking, setUpcomingBooking] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem('success_doc_name') || "Dr. Sarah Jenkins";
    const savedDate = localStorage.getItem('temp_booking_date');
    const savedTime = localStorage.getItem('temp_booking_time');
    const savedAvatar = localStorage.getItem('success_doc_avatar');

    if (savedDate && savedTime) {
      setUpcomingBooking({
        dr: savedName,
        spec: 'Cardiology Specialist',
        date: savedDate,
        time: savedTime,
        avatar: savedAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I",
        id: 'marcus-thorne'
      });
    } else {
      // Default mock upcoming booking
      setUpcomingBooking({
        dr: 'Dr. Sarah Jenkins',
        spec: 'Cardiologist • Telehealth',
        date: 'Tomorrow, Oct 24, 2024',
        time: '10:30 AM - 11:00 AM',
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I",
        id: 'marcus-thorne'
      });
    }
  }, []);

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleJoinCall = () => {
    navigate(`/patient/consultation/waiting-room/${upcomingBooking?.id || 'marcus-thorne'}`);
  };

  return (
    <DashboardLayout>
      {/* React 19 Document Metadata */}
      <title>Patient Dashboard | Neo-Health Portal</title>
      <meta name="description" content="View clinical details, medical records list, upcoming appointments, and settings configurations." />

      <div className="container-fluid p-0">
        {/* Welcome Section */}
        <PageHeader
          title="Welcome back, Alex"
          subtitle="All your health statistics, medical charts, and consults are in order."
          action={
            <button
              onClick={() => navigate('/patient/doctors')}
              className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm"
              id="dashboard-cta-find-doc"
            >
              <i className="bi bi-plus-lg fw-bold"></i>
              <span>Book Appointment</span>
            </button>
          }
        />

        {/* Dismissible Notifications */}
        {notifications.length > 0 && (
          <div className="row g-3 mb-4">
            <div className="col-12">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`alert alert-${notif.type === 'success' ? 'success' : 'primary'} bg-${notif.type === 'success' ? 'success' : 'primary'} bg-opacity-10 border-0 p-3 rounded-3 d-flex justify-content-between align-items-center mb-2`}
                  role="alert"
                >
                  <div className="d-flex align-items-center gap-3">
                    <i className={`bi ${notif.type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-bell-fill text-primary'} fs-5`}></i>
                    <div>
                      <strong className="d-block text-dark small">{notif.title}</strong>
                      <span className="text-secondary small">{notif.message}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Dismiss Alert"
                    onClick={() => handleDismissNotification(notif.id)}
                    style={{ fontSize: '0.75rem' }}
                  ></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <DashboardStatCard
              title="Appointments Booked"
              value="4 Active"
              icon="bi-calendar-check-fill"
              trend="+1 This Month"
              trendType="success"
            />
          </div>
          <div className="col-12 col-md-4">
            <DashboardStatCard
              title="Active Prescriptions"
              value="3 Signed"
              icon="bi-file-earmark-medical-fill"
              trend="Up to Date"
              trendType="primary"
            />
          </div>
          <div className="col-12 col-md-4">
            <DashboardStatCard
              title="Diagnostic Charts"
              value="7 Reports"
              icon="bi-bar-chart-line-fill"
              trend="Securely Encrypted"
              trendType="success"
            />
          </div>
        </div>

        {/* Main Bento Grid layout */}
        <div className="row g-4 mb-4">
          {/* Left Main Column: Upcoming Consult & Recent Files */}
          <div className="col-12 col-xl-8 d-flex flex-column gap-4">
            {/* Upcoming Appointment Card */}
            {upcomingBooking && (
              <SectionCard title="Upcoming Appointment" bodyClassName="p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      alt={upcomingBooking.dr}
                      className="rounded-4 border object-fit-cover"
                      style={{ width: '80px', height: '80px' }}
                      src={upcomingBooking.avatar}
                    />
                    <div>
                      <h4 className="fw-bold text-dark mb-1 fs-5">{upcomingBooking.dr}</h4>
                      <p className="text-primary fw-medium small mb-2">{upcomingBooking.spec}</p>
                      <div className="d-flex flex-wrap gap-3 text-secondary small">
                        <span className="d-flex align-items-center gap-1">
                          <i className="bi bi-calendar-event"></i>
                          {upcomingBooking.date}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <i className="bi bi-clock"></i>
                          {upcomingBooking.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column w-100 w-md-auto gap-2">
                    <button
                      onClick={handleJoinCall}
                      className="btn btn-primary-neo d-flex align-items-center justify-content-center gap-2 px-4"
                      id="dashboard-btn-join-call"
                    >
                      <i className="bi bi-camera-video-fill"></i>
                      <span>Join Consultation Lobby</span>
                    </button>
                    <button
                      onClick={() => navigate(`/patient/appointments/${upcomingBooking.id}`)}
                      className="btn btn-secondary-neo py-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* Recent Prescriptions */}
            <SectionCard
              title="Recent Digital Prescriptions"
              action={
                <button
                  onClick={() => navigate('/patient/medical-records?type=prescriptions')}
                  className="btn btn-link text-primary text-decoration-none small fw-semibold p-0"
                >
                  View All Records
                </button>
              }
            >
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0 small">
                  <thead>
                    <tr className="border-bottom border-light-subtle text-secondary">
                      <th className="py-2">Medication / Diagnosis</th>
                      <th className="py-2">Prescribed By</th>
                      <th className="py-2">Issued Date</th>
                      <th className="py-2">Status</th>
                      <th className="py-2 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 fw-bold text-dark">Lisinopril 10mg (Daily)</td>
                      <td className="py-3 text-secondary">Dr. Marcus Thorne</td>
                      <td className="py-3 text-secondary">Oct 10, 2024</td>
                      <td className="py-3">
                        <StatusBadge status="Active" />
                      </td>
                      <td className="py-3 text-end">
                        <button
                          onClick={() => navigate('/patient/records/view/prescription-1')}
                          className="btn btn-sm btn-light border py-1.5 px-3 fw-medium text-dark hover-bg-light"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 fw-bold text-dark">Atorvastatin 20mg</td>
                      <td className="py-3 text-secondary">Dr. Sarah Jenkins</td>
                      <td className="py-3 text-secondary">Sep 28, 2024</td>
                      <td className="py-3">
                        <StatusBadge status="Completed" />
                      </td>
                      <td className="py-3 text-end">
                        <button
                          onClick={() => navigate('/patient/records/view/prescription-2')}
                          className="btn btn-sm btn-light border py-1.5 px-3 fw-medium text-dark hover-bg-light"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Recent Medical Records */}
            <SectionCard
              title="Recent Clinical Reports"
              action={
                <button
                  onClick={() => navigate('/patient/medical-records?type=reports')}
                  className="btn btn-link text-primary text-decoration-none small fw-semibold p-0"
                >
                  View All Charts
                </button>
              }
            >
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0 small">
                  <thead>
                    <tr className="border-bottom border-light-subtle text-secondary">
                      <th className="py-2">Document Name</th>
                      <th className="py-2">Provider</th>
                      <th className="py-2">Upload Date</th>
                      <th className="py-2">Type</th>
                      <th className="py-2 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 fw-bold text-dark">Cardiovascular MRI Report.pdf</td>
                      <td className="py-3 text-secondary">St. Jude Medical Center</td>
                      <td className="py-3 text-secondary">Oct 12, 2024</td>
                      <td className="py-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>MRI Scan</span>
                      </td>
                      <td className="py-3 text-end">
                        <button
                          onClick={() => navigate('/patient/records/view/record-mri')}
                          className="btn btn-sm btn-light border py-1.5 px-3 fw-medium text-dark hover-bg-light"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 fw-bold text-dark">Lipid Panel blood_scan.pdf</td>
                      <td className="py-3 text-secondary">Dr. Sarah Jenkins</td>
                      <td className="py-3 text-secondary">Sep 26, 2024</td>
                      <td className="py-3">
                        <span className="badge bg-secondary bg-opacity-10 text-secondary text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Lab Report</span>
                      </td>
                      <td className="py-3 text-end">
                        <button
                          onClick={() => navigate('/patient/records/view/record-lipid')}
                          className="btn btn-sm btn-light border py-1.5 px-3 fw-medium text-dark hover-bg-light"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>

          {/* Right Column: Quick Actions & Health Tips */}
          <div className="col-12 col-xl-4 d-flex flex-column gap-4">
            {/* Quick Actions Panel */}
            <SectionCard title="Quick Action Panel" bodyClassName="p-3 d-flex flex-column gap-3">
              <QuickActionCard
                title="Search Specialists"
                description="Find cardiologists, general practitioners, and pediatricians."
                icon="bi-search-heart"
                onClick={() => navigate('/patient/doctors')}
                actionColor="primary"
              />
              <QuickActionCard
                title="My Appointment Book"
                description="View, cancel, or reschedule upcoming medical appointments."
                icon="bi-calendar3"
                onClick={() => navigate('/patient/appointments')}
                actionColor="success"
              />
              <QuickActionCard
                title="Upload Clinical Data"
                description="Securely upload test reports and diagnostic records up to 10MB."
                icon="bi-cloud-arrow-up"
                onClick={() => navigate('/patient/medical-records')}
                actionColor="warning"
              />
              <QuickActionCard
                title="Portal Configurations"
                description="Change notifications, passwords, and connected microphone/camera devices."
                icon="bi-gear"
                onClick={() => navigate('/patient/settings')}
                actionColor="dark"
              />
            </SectionCard>

            {/* Health Tips Card */}
            <div className="neo-glass-card p-4 border shadow-sm bg-primary-subtle bg-opacity-20 border-primary border-opacity-20">
              <div className="d-flex align-items-center gap-2 text-primary mb-3">
                <i className="bi bi-heart-pulse-fill fs-5"></i>
                <h5 className="fw-bold mb-0 fs-6">Health Tip of the Day</h5>
              </div>
              <p className="text-secondary small leading-relaxed mb-3">
                Maintaining a consistent aerobic exercise routine of 30 minutes daily helps lower cardiovascular blood pressure and regulates cholesterol counts. Consult your doctor to set safe aerobic guidelines.
              </p>
              <div className="border-top pt-2 d-flex justify-content-between align-items-center text-secondary small">
                <span>Category: Cardiology</span>
                <i className="bi bi-arrow-right-short fs-4 text-primary cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

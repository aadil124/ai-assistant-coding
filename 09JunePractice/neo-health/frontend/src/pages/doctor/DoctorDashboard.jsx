import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import DashboardStatCard from '../../components/shared/DashboardStatCard.jsx';
import QuickActionCard from '../../components/shared/QuickActionCard.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const [notifications] = useState([
    { id: 1, title: 'Pending Approval', message: 'You have 3 patient consultation slots reserved.', time: '10m ago' },
    { id: 2, title: 'New Review Submitted', message: 'Patient Sarah M. left a 5-star review on your profile.', time: '1h ago' }
  ]);

  const todayAppointments = [
    {
      id: "apt-1",
      patientName: "John Doe",
      symptom: "Chest pain post-workout",
      time: "09:00 AM - 09:30 AM",
      status: "Confirmed",
      paymentStatus: "Paid",
      gender: "Male",
      age: 45
    },
    {
      id: "apt-2",
      patientName: "Sarah Smith",
      symptom: "Follow-up consultation",
      time: "10:30 AM - 11:00 AM",
      status: "Confirmed",
      paymentStatus: "Paid",
      gender: "Female",
      age: 38
    }
  ];

  const handleStartConsultation = (aptId) => {
    navigate(`/doctor/consultation/${aptId}`);
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Doctor Dashboard | Neo-Health Portal</title>
      <meta name="description" content="View clinic queues, total payout earnings, ratings summaries, and host telehealth calls." />

      <div className="container-fluid p-0">
        {/* Welcome Section */}
        <PageHeader
          title="Good morning, Dr. Thorne"
          subtitle="You have 2 scheduled consultations remaining for today."
          action={
            <button
              onClick={() => navigate('/doctor/availability')}
              className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm"
              id="doctor-dashboard-cta"
            >
              <i className="bi bi-calendar-plus fw-bold"></i>
              <span>Manage Availability</span>
            </button>
          }
        />

        {/* Practice Analytics Statistics Grid */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-3">
            <DashboardStatCard
              title="Net Earnings"
              value="$1,200.00"
              icon="bi-cash-stack"
              trend="Month to Date"
              trendType="success"
            />
          </div>
          <div className="col-12 col-md-3">
            <DashboardStatCard
              title="Active Bookings"
              value="8 Slots"
              icon="bi-calendar-check-fill"
              trend="Next 7 Days"
              trendType="primary"
            />
          </div>
          <div className="col-12 col-md-3">
            <DashboardStatCard
              title="Average Rating"
              value="4.9 / 5"
              icon="bi-star-fill"
              trend="1.2k Patients"
              trendType="success"
            />
          </div>
          <div className="col-12 col-md-3">
            <DashboardStatCard
              title="Total Reviews"
              value="94 Reviewers"
              icon="bi-chat-heart-fill"
              trend="Moderated Listings"
              trendType="primary"
            />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="row g-4 mb-4">
          {/* Left Column: Today's Queue & Calendar */}
          <div className="col-12 col-xl-8 d-flex flex-column gap-4">
            
            {/* Today's appointments */}
            <SectionCard title="Today's Consultation Queue">
              <div className="d-flex flex-column gap-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 border rounded-3 bg-light bg-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px' }}>
                        {apt.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 className="fw-bold text-dark mb-0.5 fs-6">{apt.patientName}</h5>
                        <p className="text-secondary small mb-1">Time: {apt.time} • Symptom: {apt.symptom}</p>
                        <div className="d-flex gap-2">
                          <StatusBadge status={apt.status} />
                          <StatusBadge status={apt.paymentStatus} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartConsultation(apt.id)}
                      className="btn btn-primary-neo py-2 px-3 small d-flex align-items-center gap-2"
                      id={`btn-start-${apt.id}`}
                    >
                      <i className="bi bi-camera-video-fill"></i>
                      <span>Start Call</span>
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Quick Practice Actions */}
            <SectionCard title="Practice Utilities" bodyClassName="p-3 d-flex flex-column flex-md-row gap-3">
              <QuickActionCard
                title="Availability Setup"
                description="Configure weekly time grids and slot bounds."
                icon="bi-calendar-plus"
                onClick={() => navigate('/doctor/availability')}
                actionColor="primary"
                className="flex-grow-1"
              />
              <QuickActionCard
                title="Prescription Desk"
                description="Draft and digitally sign active prescriptions."
                icon="bi-file-earmark-medical-fill"
                onClick={() => navigate('/doctor/prescriptions/new')}
                actionColor="success"
                className="flex-grow-1"
              />
              <QuickActionCard
                title="Upload Diagnostics"
                description="Attach diagnostic laboratory PDF files to charts."
                icon="bi-cloud-arrow-up-fill"
                onClick={() => navigate('/doctor/records/upload')}
                actionColor="warning"
                className="flex-grow-1"
              />
            </SectionCard>
          </div>

          {/* Right Column: Mini Calendar & Notifications */}
          <div className="col-12 col-xl-4 d-flex flex-column gap-4">
            
            {/* Calendar widget */}
            <SectionCard title="Calendar Overview">
              <div className="p-3 bg-light rounded-3 border mb-3 text-center">
                <h6 className="fw-bold mb-1">Wednesday</h6>
                <p className="text-primary fw-bold fs-3 mb-0">Oct 24, 2024</p>
              </div>
              <div className="row g-2 text-center text-secondary small">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="col fw-bold">{day}</div>
                ))}
                {[22, 23, 24, 25, 26, 27, 28].map((num) => (
                  <div key={num} className="col">
                    <div className={`p-2 rounded-circle fw-bold ${num === 24 ? 'bg-primary text-white' : 'hover-bg-light text-dark'}`}>
                      {num}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Recent Notifications */}
            <SectionCard title="Notifications Feed">
              <div className="d-flex flex-column gap-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="pb-3 border-bottom last-border-none small">
                    <div className="d-flex justify-content-between mb-1">
                      <strong className="text-dark">{notif.title}</strong>
                      <span className="text-secondary" style={{ fontSize: '0.7rem' }}>{notif.time}</span>
                    </div>
                    <p className="text-secondary mb-0">{notif.message}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

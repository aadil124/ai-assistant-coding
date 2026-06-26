import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import AppointmentCard from '../../components/shared/AppointmentCard.jsx';
import SearchBar from '../../components/shared/SearchBar.jsx';
import EmptyState from '../../components/shared/EmptyState.jsx';

export default function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock database of doctor appointments
  const [appointments, setAppointments] = useState([
    {
      id: "apt-1",
      patientName: "John Doe",
      symptom: "Chest pain post-workout",
      date: "Oct 24, 2024",
      time: "09:00 AM - 09:30 AM",
      status: "Confirmed",
      paymentStatus: "Paid",
      gender: "Male",
      age: 45,
      tab: "today"
    },
    {
      id: "apt-2",
      patientName: "Sarah Smith",
      symptom: "Follow-up consultation",
      date: "Oct 24, 2024",
      time: "10:30 AM - 11:00 AM",
      status: "Confirmed",
      paymentStatus: "Paid",
      gender: "Female",
      age: 38,
      tab: "today"
    },
    {
      id: "apt-3",
      patientName: "Robert Miller",
      symptom: "Cardiology review",
      date: "Oct 28, 2024",
      time: "11:15 AM - 11:45 AM",
      status: "Confirmed",
      paymentStatus: "Paid",
      gender: "Male",
      age: 52,
      tab: "upcoming"
    },
    {
      id: "apt-4",
      patientName: "Emily Chen",
      symptom: "ECG diagnostic scan",
      date: "Sep 15, 2024",
      time: "11:00 AM - 11:45 AM",
      status: "Completed",
      paymentStatus: "Paid",
      gender: "Female",
      age: 29,
      tab: "completed"
    },
    {
      id: "apt-5",
      patientName: "David Fox",
      symptom: "Hypertension advice",
      date: "Oct 01, 2024",
      time: "04:00 PM - 04:30 PM",
      status: "Cancelled",
      paymentStatus: "Refunded",
      gender: "Male",
      age: 61,
      tab: "cancelled"
    }
  ]);

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking? This will initiate an automated refund process via Stripe.")) {
      setAppointments(prev => prev.map(apt => {
        if (apt.id === id) {
          return { ...apt, status: 'Cancelled', paymentStatus: 'Refunded', tab: 'cancelled' };
        }
        return apt;
      }));
      alert("Consultation booking reference has been marked Cancelled, and the payment has been refunded.");
    }
  };

  // Filter computation
  const filteredAppointments = appointments.filter(apt => {
    const matchesTab = apt.tab === activeTab;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          apt.symptom.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Consultation Bookings | Neo-Health Doctors</title>
      <meta name="description" content="View active telehealth appointments list, search patient charts, and trigger video sessions." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Appointments Ledger"
          subtitle="Manage scheduled patient visits and review consultation files."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Appointments List', path: '/doctor/appointments' }
          ]}
        />

        {/* Search Bar section */}
        <div className="neo-glass-card p-4 border bg-white shadow-sm mb-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search patient name or symptom descriptions..."
            id="doctor-apt-search"
          />
        </div>

        {/* Status Category Tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs border-bottom border-light-subtle gap-2">
            {['today', 'upcoming', 'completed', 'cancelled'].map(tab => (
              <li className="nav-item" key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`nav-link border-0 pb-3 px-3 fw-semibold text-capitalize transition-all position-relative ${
                    activeTab === tab
                      ? 'text-primary border-bottom border-primary active'
                      : 'text-secondary bg-transparent hover-link'
                  }`}
                  style={{
                    borderBottomWidth: activeTab === tab ? '3px' : '0px',
                    borderBottomStyle: 'solid',
                    borderColor: 'var(--primary-color)'
                  }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Appointment Grid list */}
        {filteredAppointments.length === 0 ? (
          <EmptyState
            icon="bi-calendar-x"
            title={`No ${activeTab} appointments`}
            description="There are no consultations matching your search criteria in this tab."
            actionLabel="Reset Search Query"
            onActionClick={() => setSearchTerm('')}
          />
        ) : (
          <div className="row g-4">
            {filteredAppointments.map((apt) => (
              <div className="col-12 col-md-6" key={apt.id}>
                <AppointmentCard
                  appointment={apt}
                  onCancel={activeTab === 'today' || activeTab === 'upcoming' ? handleCancelAppointment : null}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}

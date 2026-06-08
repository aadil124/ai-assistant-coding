import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function DashboardOverview({ onNavigate, user, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tab State: 'overview', 'schedule', 'patients', 'analytics'
  const [dashboardTab, setDashboardTab] = useState('overview');

  // Sub-data states
  const [participants, setParticipants] = useState([]);
  const [stats, setStats] = useState(null);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);

  // Modals States
  const [showLabModal, setShowLabModal] = useState(false);
  const [activeLabReport, setActiveLabReport] = useState(null);
  
  const [showBookModal, setShowBookModal] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [bookingDocId, setBookingDocId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSymptoms, setBookingSymptoms] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');
  const [supportChat, setSupportChat] = useState([
    { sender: 'bot', text: 'Hello! How can we help you with your Telehealth Connect experience today?' }
  ]);

  // Fetch base appointments on mount
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await api.getAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Fetch unique participants when tab changes to 'patients'
  useEffect(() => {
    if (dashboardTab === 'patients') {
      const fetchParticipants = async () => {
        try {
          setParticipantsLoading(true);
          const data = await api.getPatients();
          setParticipants(data);
        } catch (err) {
          console.error('Failed to load participants:', err);
        } finally {
          setParticipantsLoading(false);
        }
      };
      fetchParticipants();
    }
  }, [dashboardTab]);

  // Fetch stats when tab changes to 'analytics'
  useEffect(() => {
    if (dashboardTab === 'analytics') {
      const fetchStats = async () => {
        try {
          setStatsLoading(true);
          const data = await api.getStats();
          setStats(data);
        } catch (err) {
          console.error('Failed to load stats:', err);
        } finally {
          setStatsLoading(false);
        }
      };
      fetchStats();
    }
  }, [dashboardTab]);

  // Fetch verified doctors list when booking modal opens (patient only)
  useEffect(() => {
    if (showBookModal && user?.role === 'patient') {
      const fetchDoctors = async () => {
        try {
          const response = await api.request('/doctors?limit=50');
          if (response && response.data) {
            setDoctorsList(response.data);
            if (response.data.length > 0) {
              setBookingDocId(response.data[0].userId);
            }
          }
        } catch (err) {
          console.error('Failed to fetch verified doctors:', err);
        }
      };
      fetchDoctors();
    }
  }, [showBookModal, user]);

  // Handle slot lock & confirm scheduling
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!bookingDocId || !bookingTime) {
      setBookingError('Please select a doctor and date/time.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');
      
      // Step 1: Request a 10-minute temporary lease lock
      const lockRes = await api.lockSlot(bookingDocId, new Date(bookingTime).toISOString(), bookingSymptoms);
      const appointmentId = lockRes.appointment._id;

      // Step 2: Confirm the locked slot (in production: this happens after Stripe payment verification)
      await api.confirmAppointment(appointmentId);

      alert('Appointment booked and confirmed successfully!');
      setShowBookModal(false);
      setBookingSymptoms('');
      setBookingTime('');
      // Reload schedules
      loadAppointments();
    } catch (err) {
      setBookingError(err.message || 'Failed to complete booking');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSendSupportMsg = (e) => {
    e.preventDefault();
    if (!supportMsg.trim()) return;

    const userMessage = supportMsg.trim();
    setSupportChat(prev => [...prev, { sender: 'user', text: userMessage }]);
    setSupportMsg('');

    // Mock chatbot auto responder delay
    setTimeout(() => {
      let botResponse = 'Thank you for your message. Support ticket #TC-' + Math.floor(1000 + Math.random() * 9000) + ' has been created. A representative will contact you shortly.';
      if (userMessage.toLowerCase().includes('payment') || userMessage.toLowerCase().includes('stripe')) {
        botResponse = 'For escrow issues or Stripe refund requests, our billing team will review the transaction logs within 2 hours.';
      } else if (userMessage.toLowerCase().includes('video') || userMessage.toLowerCase().includes('call')) {
        botResponse = 'If you are experiencing WebRTC lag, please ensure camera permissions are granted and try toggling the connection health meter.';
      }
      setSupportChat(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const formatFriendlyDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeStr = date.toLocaleTimeString([], timeOptions);

    if (isToday) {
      return `Today, ${timeStr}`;
    }

    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${date.toLocaleDateString([], dateOptions)}, ${timeStr}`;
  };

  // Separation of appointments
  const confirmedAppointments = appointments.filter(app => app.status === 'confirmed');
  const nextAppointment = confirmedAppointments.length > 0 ? confirmedAppointments[0] : null;

  const greetingName = user?.role === 'doctor' ? 'Dr. Aris' : (user?.email ? user.email.split('@')[0] : 'User');

  return (
    <div className="d-flex text-on-surface bg-background min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface flex flex-col p-4 gap-2 border-end border-outline-variant/20 hidden md:flex z-50">
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary d-flex align-items-center justify-center" style={{ background: '#6366f1' }}>
            <span className="material-symbols-outlined text-on-primary">medical_services</span>
          </div>
          <div>
            <h2 className="font-display text-label-md font-bold text-on-surface mb-0">City General</h2>
            <p className="text-label-sm text-outline mb-0">HIPAA Compliant</p>
          </div>
        </div>

        <nav className="flex-grow-1 space-y-1">
          <button 
            className={`w-full d-flex align-items-center gap-3 px-3 py-2 rounded-lg text-start border-0 ${
              dashboardTab === 'overview' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high bg-transparent'
            }`}
            onClick={() => setDashboardTab('overview')}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body text-label-md">Overview</span>
          </button>
          
          <button 
            className={`w-full d-flex align-items-center gap-3 px-3 py-2 rounded-lg text-start border-0 ${
              dashboardTab === 'schedule' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high bg-transparent'
            }`}
            onClick={() => setDashboardTab('schedule')}
          >
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-body text-label-md">Schedule</span>
          </button>
          
          <button 
            className={`w-full d-flex align-items-center gap-3 px-3 py-2 rounded-lg text-start border-0 ${
              dashboardTab === 'patients' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high bg-transparent'
            }`}
            onClick={() => setDashboardTab('patients')}
          >
            <span className="material-symbols-outlined">groups</span>
            <span className="font-body text-label-md">{user?.role === 'doctor' ? 'Patient List' : 'Doctor Directory'}</span>
          </button>
          
          <button 
            className={`w-full d-flex align-items-center gap-3 px-3 py-2 rounded-lg text-start border-0 ${
              dashboardTab === 'analytics' ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high bg-transparent'
            }`}
            onClick={() => setDashboardTab('analytics')}
          >
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-body text-label-md">Analytics</span>
          </button>
        </nav>

        <div className="mt-auto pt-3 space-y-1 border-top border-outline-variant/20">
          {user?.role === 'patient' && (
            <button 
              className="btn btn-primary w-full mb-3 py-2 rounded-xl font-semibold shadow-sm active:scale-95 transition-all"
              onClick={() => setShowBookModal(true)}
              style={{ background: '#6366f1', border: 'none' }}
            >
              Book Consultation
            </button>
          )}
          <button 
            className="w-full d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-start border-0 bg-transparent text-danger" 
            onClick={onLogout}
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body text-label-md">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <div className="flex-grow-1 md:ml-64 d-flex flex-column min-h-screen">
        {/* Top Header */}
        <header className="sticky-top z-40 bg-white border-bottom border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-4 h-16 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1 max-w-md position-relative">
              <span className="material-symbols-outlined position-absolute left-3 top-50 translate-middle-y text-outline">search</span>
              <input
                className="w-full pl-5 pr-3 py-2 bg-light border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary outline-none transition-all font-body text-label-md"
                placeholder="Search appointments, patients, or logs..."
                type="text"
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full position-relative border-0 bg-transparent">
                <span className="material-symbols-outlined">notifications</span>
                <span className="position-absolute top-2 end-2 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
              </button>
              <div className="vr bg-outline-variant/30 mx-2" style={{ width: '1px', height: '24px' }}></div>
              <div className="d-flex align-items-center gap-2 p-1 pe-2 rounded-full cursor-pointer hover:bg-surface-container-high">
                <div className="w-8 h-8 rounded-full bg-primary/10 d-flex items-center justify-center text-primary font-bold">
                  {user?.email[0].toUpperCase()}
                </div>
                <span className="font-body text-label-md font-semibold text-on-surface">{greetingName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas Container */}
        <div className="max-w-7xl mx-auto p-4 space-y-4 flex-grow-1 w-full">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {dashboardTab === 'overview' && (
            <>
              <section className="space-y-base">
                <h1 className="font-display text-h2 text-on-surface mb-1">Good morning, {greetingName}</h1>
                <p className="font-body text-body text-outline">
                  Role: <span className="badge bg-secondary text-capitalize">{user?.role}</span> | Connected to Secure Cluster0.
                </p>
              </section>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status"></div>
                </div>
              ) : error ? (
                <div className="alert alert-danger rounded-xl">{error}</div>
              ) : (
                <>
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Next Appointment Card */}
                    <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm d-flex flex-column justify-content-between min-h-[200px]">
                      {nextAppointment ? (
                        <>
                          <div>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <span className="p-2 bg-primary/10 text-primary rounded-lg">
                                <span className="material-symbols-outlined">videocam</span>
                              </span>
                              <span className="text-label-sm px-2 py-1 bg-success/10 text-success rounded-full font-semibold">
                                Confirmed Call
                              </span>
                            </div>
                            <h3 className="font-display text-label-md font-bold text-on-surface mb-1">
                              {user?.role === 'doctor' 
                                ? (nextAppointment.patientId?.email || 'Patient User')
                                : (nextAppointment.doctorId?.email || 'Practitioner')}
                            </h3>
                            <p className="text-label-sm text-outline mb-0">
                              {formatFriendlyDate(nextAppointment.scheduledTime)}
                            </p>
                            <p className="text-[12px] text-muted mb-0 italic mt-1 truncate">
                              "{nextAppointment.symptomsDescription || 'No symptoms provided'}"
                            </p>
                          </div>
                          <div className="mt-4 d-flex gap-2">
                            <button 
                              className="btn btn-primary flex-grow-1 py-2 text-label-md font-semibold active:scale-95 transition-all"
                              onClick={() => onNavigate('consultation', nextAppointment._id)}
                              style={{ background: '#6366f1', border: 'none' }}
                            >
                              Join Call
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="d-flex flex-column items-center justify-content-center flex-grow-1 text-center py-4">
                          <span className="material-symbols-outlined text-[36px] text-muted mb-2">calendar_today</span>
                          <h4 className="text-label-md font-bold mb-1">No Active Calls</h4>
                          <p className="text-label-sm text-outline mb-0">All slots clear for today.</p>
                        </div>
                      )}
                    </div>

                    {/* Lab Results Section */}
                    <div 
                      className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm hover:border-primary cursor-pointer transition-all"
                      onClick={() => {
                        setActiveLabReport({
                          title: 'Quest Diagnostics Sync',
                          date: 'June 4, 2026',
                          tests: [
                            { name: 'Total Cholesterol', value: '210 mg/dL', status: 'High', ref: '< 200 mg/dL' },
                            { name: 'HDL Cholesterol', value: '52 mg/dL', status: 'Normal', ref: '> 40 mg/dL' },
                            { name: 'LDL Cholesterol', value: '138 mg/dL', status: 'Borderline', ref: '< 100 mg/dL' },
                            { name: 'Triglycerides', value: '100 mg/dL', status: 'Normal', ref: '< 150 mg/dL' },
                            { name: 'Glucose (Fasting)', value: '94 mg/dL', status: 'Normal', ref: '70-99 mg/dL' }
                          ]
                        });
                        setShowLabModal(true);
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="font-display text-label-md font-bold text-on-surface mb-0">Lab Results</h3>
                        <span className="material-symbols-outlined text-outline">science</span>
                      </div>
                      <div className="space-y-3">
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                          <div>
                            <p className="text-label-md font-semibold mb-0">Quest Lipid Panel</p>
                            <p className="text-[11px] text-muted mb-0">Sync Complete · June 4</p>
                          </div>
                          <span className="badge bg-warning text-dark">Borderline</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <p className="text-label-md font-semibold mb-0">Fasting Glucose</p>
                            <p className="text-[11px] text-muted mb-0">Sync Complete · June 4</p>
                          </div>
                          <span className="badge bg-success">Normal</span>
                        </div>
                      </div>
                    </div>

                    {/* Facility Status Card */}
                    <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm position-relative overflow-hidden">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="font-display text-label-md font-bold text-on-surface mb-0">Security Metrics</h3>
                        <span className="material-symbols-outlined text-outline">shield_lock</span>
                      </div>
                      <div className="space-y-sm">
                        <div className="d-flex justify-content-between text-label-sm">
                          <span className="text-outline">HIPAA Logs Audit</span>
                          <span className="text-success font-bold">Compliant</span>
                        </div>
                        <p className="text-[11px] text-outline pt-2 mb-0">
                          Active tokens audited. Clinical notes AES-256 encrypted. Payout ledger split active.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Activity History & Quick Actions */}
                  <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-outline-variant/30 p-4 space-y-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="font-display text-h3 text-on-surface mb-0">Recent Consultation Activity</h2>
                        <button className="btn btn-link btn-sm text-primary text-decoration-none" onClick={() => setDashboardTab('schedule')}>View Schedule</button>
                      </div>
                      <div className="space-y-3">
                        {appointments.slice(0, 3).map((app, i) => (
                          <div key={i} className="d-flex align-items-center gap-3 p-3 bg-light rounded-xl border">
                            <span className="material-symbols-outlined text-primary text-[24px]">
                              {app.status === 'completed' ? 'check_circle' : 'pending_actions'}
                            </span>
                            <div className="flex-grow-1">
                              <h5 className="text-label-md font-bold mb-0">
                                {user?.role === 'doctor' ? (app.patientId?.email || 'Patient') : (app.doctorId?.email || 'Doctor')}
                              </h5>
                              <p className="text-[11px] text-muted mb-0">{formatFriendlyDate(app.scheduledTime)}</p>
                            </div>
                            <span className={`badge ${app.status === 'completed' ? 'bg-secondary' : 'bg-primary'}`}>
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white rounded-2xl border border-outline-variant/30 p-4">
                        <h3 className="font-display text-label-md font-bold text-on-surface mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-2">
                          <button 
                            className="w-full d-flex align-items-center gap-3 p-3 bg-white border border-outline-variant/30 rounded-xl hover:border-primary hover:bg-light transition-all text-start group border-0"
                            onClick={() => {
                              if (user?.role === 'doctor') {
                                alert('Practitioners cannot book appointments. Please log in as a Patient to book consultations.');
                              } else {
                                setShowBookModal(true);
                              }
                            }}
                          >
                            <div className="w-10 h-10 rounded-lg bg-light d-flex align-items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <span className="material-symbols-outlined text-primary">add_circle</span>
                            </div>
                            <span className="text-label-md font-bold text-on-surface">Book New Consultation</span>
                          </button>
                          
                          <button 
                            className="w-full d-flex align-items-center gap-3 p-3 bg-white border border-outline-variant/30 rounded-xl hover:border-primary hover:bg-light transition-all text-start group border-0"
                            onClick={() => setShowSupportModal(true)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-light d-flex align-items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <span className="material-symbols-outlined text-primary">contact_support</span>
                            </div>
                            <span className="text-label-md font-bold text-on-surface">Message Support</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </>
          )}

          {/* ================= TAB 2: SCHEDULE ================= */}
          {dashboardTab === 'schedule' && (
            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 space-y-4">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="font-display text-h3 font-bold mb-0">Consultation Schedules</h2>
                {user?.role === 'patient' && (
                  <button className="btn btn-primary btn-sm px-3" onClick={() => setShowBookModal(true)} style={{ background: '#6366f1', border: 'none' }}>
                    Book Appointment
                  </button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <span className="material-symbols-outlined text-[48px] mb-2">calendar_today</span>
                  <p>No appointments booked yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Date & Time</th>
                        <th>Participant</th>
                        <th>Symptoms Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((app, i) => (
                        <tr key={i}>
                          <td><strong>{formatFriendlyDate(app.scheduledTime)}</strong></td>
                          <td>
                            {user?.role === 'doctor' ? (app.patientId?.email || 'Patient') : (app.doctorId?.email || 'Doctor')}
                          </td>
                          <td><span className="text-muted text-label-sm">{app.symptomsDescription || 'Routine checkup'}</span></td>
                          <td>
                            <span className={`badge ${app.status === 'completed' ? 'bg-secondary' : app.status === 'confirmed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            {app.status === 'confirmed' && (
                              <button 
                                className="btn btn-sm btn-primary px-3 rounded-lg"
                                onClick={() => onNavigate('consultation', app._id)}
                                style={{ background: '#6366f1', border: 'none' }}
                              >
                                Join
                              </button>
                            )}
                            {app.status === 'locked' && (
                              <span className="text-[11px] text-danger font-bold">Lock lease active</span>
                            )}
                            {app.status === 'completed' && (
                              <span className="text-[11px] text-muted">Archived</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: PARTICIPANTS / DIRECTORY ================= */}
          {dashboardTab === 'patients' && (
            <div className="bg-white rounded-2xl border border-outline-variant/30 p-4 space-y-4">
              <h2 className="font-display text-h3 font-bold mb-0">
                {user?.role === 'doctor' ? 'Your Registered Patients' : 'Verified Medical Practitioners'}
              </h2>

              {participantsLoading ? (
                <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
              ) : participants.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  <span className="material-symbols-outlined text-[48px] mb-2">contacts</span>
                  <p>No contact profiles linked yet. Complete your first consultation call.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {participants.map((person, i) => (
                    <div key={i} className="bg-light p-3 rounded-xl border d-flex flex-column justify-content-between min-h-[140px]">
                      <div>
                        <div className="d-flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 d-flex items-center justify-center font-bold text-primary text-[14px]">
                            {person.email[0].toUpperCase()}
                          </div>
                          <div>
                            <h5 className="text-label-md font-bold mb-0">
                              {person.firstName ? `Dr. ${person.firstName} ${person.lastName}` : person.email.split('@')[0]}
                            </h5>
                            <span className="text-[10px] text-muted">{person.specialty || 'Patient'}</span>
                          </div>
                        </div>
                        <p className="text-[12px] mb-1"><strong>Email:</strong> {person.email}</p>
                        <p className="text-[12px] mb-1"><strong>Phone:</strong> {person.phoneNumber}</p>
                      </div>
                      <div className="text-end text-[10px] text-muted border-top pt-2 mt-2">
                        {person.joinedAt ? `Joined: ${new Date(person.joinedAt).toLocaleDateString()}` : `Secure Sync Active`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: ANALYTICS ================= */}
          {dashboardTab === 'analytics' && (
            <div className="space-y-4">
              <h2 className="font-display text-h3 font-bold mb-0">HIPAA Clinical Analytics & Earnings</h2>

              {statsLoading ? (
                <div className="text-center py-4"><div className="spinner-border text-primary"></div></div>
              ) : stats ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-xl border text-center shadow-sm">
                      <h5 className="text-outline text-label-sm uppercase mb-1">Total Bookings</h5>
                      <div className="text-display text-h1 font-bold text-dark">{stats.total}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center shadow-sm">
                      <h5 className="text-outline text-label-sm uppercase mb-1">Completed Calls</h5>
                      <div className="text-display text-h1 font-bold text-success">{stats.completed}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center shadow-sm">
                      <h5 className="text-outline text-label-sm uppercase mb-1">Canceled / Expirations</h5>
                      <div className="text-display text-h1 font-bold text-danger">{stats.canceled}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border text-center shadow-sm">
                      <h5 className="text-outline text-label-sm uppercase mb-1">Gross Revenue (Escrow)</h5>
                      <div className="text-display text-h1 font-bold text-primary">${stats.revenue}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                      <h4 className="font-bold mb-3">Escrow Split Distribution</h4>
                      <div className="space-y-2">
                        <div className="d-flex justify-content-between text-label-sm">
                          <span>Doctor Payout (80%)</span>
                          <strong>${stats.revenue * 0.8}</strong>
                        </div>
                        <div className="progress rounded-pill" style={{ height: '10px' }}>
                          <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                        </div>
                        <div className="d-flex justify-content-between text-label-sm pt-2">
                          <span>Platform Fee (20% Escrow)</span>
                          <strong>${stats.revenue * 0.2}</strong>
                        </div>
                        <div className="progress rounded-pill" style={{ height: '10px' }}>
                          <div className="progress-bar bg-secondary" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border shadow-sm text-center d-flex flex-column justify-content-center items-center">
                      <span className="material-symbols-outlined text-success text-[48px] fill-icon mb-2">verified</span>
                      <h4 className="font-bold">Community Rating Summary</h4>
                      <div className="text-h2 font-bold mb-1 text-warning">{stats.ratingAverage} / 5.0</div>
                      <p className="text-muted text-label-sm">Based on {stats.reviewCount} verified feedback forms.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="alert alert-warning">No analytics data found.</div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="w-full py-4 bg-surface-container-lowest border-top border-outline-variant/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 d-flex flex-col flex-md-row justify-content-between align-items-center gap-3">
            <p className="font-body text-label-sm text-on-surface-variant mb-0">© 2026 Telehealth Connect. HIPAA Compliant.</p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Privacy Policy</a>
              <a className="font-body text-label-sm text-on-surface-variant hover:text-primary underline underline-offset-4" href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= MODAL: LAB RESULTS DETAIL ================= */}
      {showLabModal && activeLabReport && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl bg-white text-dark">
              <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-display font-bold d-flex align-items-center gap-2 mb-0">
                  <span className="material-symbols-outlined text-primary">science</span>
                  Lab Diagnostics Report: {activeLabReport.title}
                </h5>
                <button type="button" className="btn-close border-0 bg-transparent text-lg font-bold" onClick={() => setShowLabModal(false)}>✕</button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted text-label-sm">Report Sync Date: {activeLabReport.date} | Source: Quest Diagnostics Integrated API</p>
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Biomarker Test</th>
                        <th>Observed Value</th>
                        <th>Reference Range</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeLabReport.tests.map((test, i) => (
                        <tr key={i}>
                          <td><strong>{test.name}</strong></td>
                          <td>{test.value}</td>
                          <td>{test.ref}</td>
                          <td>
                            <span className={`badge ${test.status === 'Normal' ? 'bg-success' : test.status === 'High' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                              {test.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer border-0 p-3 bg-light d-flex justify-content-end">
                <button className="btn btn-outline-secondary px-4 rounded-xl" onClick={() => setShowLabModal(false)}>Close Report</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: BOOK CONSULTATION ================= */}
      {showBookModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl bg-white text-dark">
              <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-display font-bold d-flex align-items-center gap-2 mb-0">
                  <span className="material-symbols-outlined text-primary">add_circle</span>
                  Schedule Appointment
                </h5>
                <button type="button" className="btn-close border-0 bg-transparent text-lg font-bold" onClick={() => {
                  setShowBookModal(false);
                  setBookingError('');
                }}>✕</button>
              </div>
              <form onSubmit={handleConfirmBooking}>
                <div className="modal-body p-4 space-y-3">
                  {bookingError && (
                    <div className="alert alert-danger rounded-xl py-2 px-3 text-label-sm">{bookingError}</div>
                  )}

                  <div className="d-flex flex-column gap-1 mb-3">
                    <label className="font-label-md text-on-surface-variant font-bold">Select Medical Specialist</label>
                    <select 
                      className="form-select bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                      value={bookingDocId}
                      onChange={(e) => setBookingDocId(e.target.value)}
                      required
                    >
                      {doctorsList.length > 0 ? (
                        doctorsList.map((doc, i) => (
                          <option key={i} value={doc.userId}>
                            Dr. {doc.firstName} {doc.lastName} ({doc.specialty}) — ${doc.consultationFee}
                          </option>
                        ))
                      ) : (
                        <option value="">No verified doctors found. Seeding required.</option>
                      )}
                    </select>
                  </div>

                  <div className="d-flex flex-column gap-1 mb-3">
                    <label className="font-label-md text-on-surface-variant font-bold">Choose Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <label className="font-label-md text-on-surface-variant font-bold">Brief Symptoms Description</label>
                    <textarea 
                      className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                      placeholder="Fever, cough, or general post-op checkup notes..."
                      value={bookingSymptoms}
                      onChange={(e) => setBookingSymptoms(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 p-3 bg-light d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary px-4 rounded-xl" onClick={() => setShowBookModal(false)}>Cancel</button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 rounded-xl text-white border-0" 
                    disabled={bookingLoading}
                    style={{ background: '#6366f1' }}
                  >
                    {bookingLoading ? 'Booking...' : 'Book & Confirm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MESSAGE SUPPORT ================= */}
      {showSupportModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl bg-white text-dark h-[500px] d-flex flex-column">
              <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-display font-bold d-flex align-items-center gap-2 mb-0">
                  <span className="material-symbols-outlined text-primary">contact_support</span>
                  HIPAA Customer Support
                </h5>
                <button type="button" className="btn-close border-0 bg-transparent text-lg font-bold" onClick={() => setShowSupportModal(false)}>✕</button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow-1 overflow-y-auto p-4 space-y-3 bg-light">
                {supportChat.map((chat, i) => (
                  <div key={i} className={`d-flex ${chat.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div 
                      className={`p-3 rounded-2xl max-w-[80%] text-label-sm ${
                        chat.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white text-dark rounded-tl-none border'
                      }`}
                      style={chat.sender === 'user' ? { background: '#6366f1' } : {}}
                    >
                      {chat.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendSupportMsg} className="p-3 border-top bg-white d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control rounded-xl border bg-light"
                  placeholder="Ask a technical or billing question..."
                  value={supportMsg}
                  onChange={(e) => setSupportMsg(e.target.value)}
                />
                <button type="submit" className="btn btn-primary px-3 rounded-xl border-0 text-white font-bold" style={{ background: '#6366f1' }}>Send</button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

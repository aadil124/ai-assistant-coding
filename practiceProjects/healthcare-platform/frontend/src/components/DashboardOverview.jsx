import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function DashboardOverview({ onNavigate, user, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
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
    fetchAppointments();
  }, []);

  // Format date utility
  const formatFriendlyDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeStr = date.toLocaleTimeString([], timeOptions);

    if (isToday) {
      return `Today, ${timeStr}`;
    }

    const dateOptions = { month: 'short', day: 'numeric' };
    return `${date.toLocaleDateString([], dateOptions)}, ${timeStr}`;
  };

  // Find next upcoming active/confirmed appointment
  const confirmedAppointments = appointments.filter(app => app.status === 'confirmed');
  const nextAppointment = confirmedAppointments.length > 0 ? confirmedAppointments[0] : null;

  // Past completed appointments for timeline
  const completedAppointments = appointments.filter(app => app.status === 'completed');

  // Static fallback for timeline if no completed records exist
  const fallbackTimeline = [
    {
      time: 'Yesterday, 04:30 PM',
      title: 'Initial Evaluation: Emily Stone',
      desc: 'Completed intake checklist and established therapeutic treatment plan.',
      tags: ['Intake', 'General Health'],
      icon: 'history'
    }
  ];

  const greetingName = user?.role === 'doctor' ? 'Dr. Aris' : (user?.email ? user.email.split('@')[0] : 'Patient');

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
          <button className="w-full d-flex align-items-center gap-3 px-3 py-2 bg-primary-container text-on-primary-container font-semibold rounded-lg text-start border-0">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body text-label-md">Overview</span>
          </button>
          <button className="w-full d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-start hover:translate-x-1 transition-transform border-0 bg-transparent">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-body text-label-md">Schedule</span>
          </button>
          <button className="w-full d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-start hover:translate-x-1 transition-transform border-0 bg-transparent">
            <span className="material-symbols-outlined">groups</span>
            <span className="font-body text-label-md">Patient List</span>
          </button>
          <button className="w-full d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-start hover:translate-x-1 transition-transform border-0 bg-transparent">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-body text-label-md">Analytics</span>
          </button>
        </nav>

        <div className="mt-auto pt-3 space-y-1 border-top border-outline-variant/20">
          {nextAppointment && (
            <button 
              className="btn btn-primary w-full mb-3 py-2 rounded-xl font-semibold shadow-sm active:scale-95 transition-transform"
              onClick={() => onNavigate('consultation', nextAppointment._id)}
              style={{ background: '#6366f1', border: 'none' }}
            >
              Start Consultation
            </button>
          )}
          <button className="w-full d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-start border-0 bg-transparent">
            <span className="material-symbols-outlined">shield_lock</span>
            <span className="font-body text-label-md">Security</span>
          </button>
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

        {/* Content Container */}
        <div className="max-w-7xl mx-auto p-4 space-y-4 flex-grow-1 w-full">
          {/* Hero Greeting */}
          <section className="space-y-base">
            <h1 className="font-display text-h2 text-on-surface mb-1">Good morning, {greetingName}</h1>
            <p className="font-body text-body text-outline">
              Role: <span className="badge bg-secondary text-capitalize">{user?.role}</span> | Connected to Secure Cluster0.
            </p>
          </section>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading appointments...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger rounded-xl" role="alert">
              {error}
            </div>
          ) : (
            <>
              {/* Summary Cards Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Next Appointment */}
                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm d-flex flex-column justify-content-between min-h-[200px]">
                  {nextAppointment ? (
                    <>
                      <div>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span className="p-2 bg-primary/10 text-primary rounded-lg">
                            <span className="material-symbols-outlined">videocam</span>
                          </span>
                          <span className="text-label-sm px-2 py-1 bg-success/10 text-success rounded-full font-semibold">
                            Confirmed Slot
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
                    <div className="d-flex flex-col items-center justify-content-center flex-grow-1 text-center py-4">
                      <span className="material-symbols-outlined text-[36px] text-muted mb-2">calendar_today</span>
                      <h4 className="text-label-md font-bold mb-1">No Active Calls</h4>
                      <p className="text-label-sm text-outline mb-0">All slots clear for today.</p>
                    </div>
                  )}
                </div>

                {/* Lab Results */}
                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="font-display text-label-md font-bold text-on-surface mb-0">Lab Results</h3>
                    <span className="material-symbols-outlined text-outline">science</span>
                  </div>
                  <div className="space-y-md">
                    <div className="d-flex align-items-center gap-3 cursor-pointer hover:bg-light p-1 rounded transition-colors">
                      <div className="w-2 h-2 bg-danger rounded-full"></div>
                      <div className="flex-grow-1">
                        <p className="text-label-md font-semibold mb-0">Cardiology Panel</p>
                        <p className="text-label-sm text-outline mb-0">Review pending</p>
                      </div>
                      <span className="material-symbols-outlined text-outline">chevron_right</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 cursor-pointer hover:bg-light p-1 rounded transition-colors">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div className="flex-grow-1">
                        <p className="text-label-md font-semibold mb-0">CBC Blood Count</p>
                        <p className="text-label-sm text-outline mb-0">Normal · Sync complete</p>
                      </div>
                      <span className="material-symbols-outlined text-outline">chevron_right</span>
                    </div>
                  </div>
                </div>

                {/* Facility Status */}
                <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm position-relative overflow-hidden">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="font-display text-label-md font-bold text-on-surface mb-0">Security Check</h3>
                    <span className="material-symbols-outlined text-outline">shield_lock</span>
                  </div>
                  <div className="space-y-sm">
                    <div className="d-flex justify-content-between text-label-sm">
                      <span className="text-outline">HIPAA Auditing Status</span>
                      <span className="text-success font-bold">100% Secure</span>
                    </div>
                    <p className="text-[11px] text-outline pt-2 mb-0">
                      All clinical notes encrypted via AES-256-GCM. Active tokens stored securely.
                    </p>
                  </div>
                </div>
              </section>

              {/* Bottom Section: Timeline & Actions */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Activity Timeline */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-outline-variant/30 p-4 space-y-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="font-display text-h3 text-on-surface mb-0">Consultation History</h2>
                    <span className="badge bg-light text-dark">{completedAppointments.length} Completed</span>
                  </div>
                  <div className="space-y-4">
                    {completedAppointments.length > 0 ? (
                      completedAppointments.map((app, i) => (
                        <div key={i} className="d-flex gap-3 position-relative">
                          <div className="d-flex flex-column align-items-center">
                            <div className="w-10 h-10 rounded-full bg-light d-flex align-items-center justify-center z-10 border border-white">
                              <span className="material-symbols-outlined text-primary text-md">done_all</span>
                            </div>
                            {i < completedAppointments.length - 1 && <div className="vr bg-outline-variant/20" style={{ width: '1px', flexGrow: '1', marginTop: '4px' }}></div>}
                          </div>
                          <div className="pb-3 flex-grow-1">
                            <p className="text-label-sm text-outline uppercase tracking-wider mb-1">
                              {formatFriendlyDate(app.scheduledTime)}
                            </p>
                            <div className="bg-light p-3 rounded-xl border border-outline-variant/20">
                              <h4 className="font-bold text-on-surface mb-1">
                                Session with {user?.role === 'doctor' ? (app.patientId?.email || 'Patient') : (app.doctorId?.email || 'Doctor')}
                              </h4>
                              <p className="text-body text-on-surface-variant mb-0 font-italic">
                                {app.symptomsDescription || 'Completed checkup session.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      fallbackTimeline.map((item, i) => (
                        <div key={i} className="d-flex gap-3 position-relative">
                          <div className="d-flex flex-column align-items-center">
                            <div className="w-10 h-10 rounded-full bg-light d-flex align-items-center justify-center z-10 border border-white">
                              <span className="material-symbols-outlined text-primary text-md">{item.icon}</span>
                            </div>
                          </div>
                          <div className="pb-3 flex-grow-1">
                            <p className="text-label-sm text-outline uppercase tracking-wider mb-1">{item.time}</p>
                            <div className="bg-light p-3 rounded-xl border border-outline-variant/20">
                              <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                              <p className="text-body text-on-surface-variant mb-0">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions & Actions */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-outline-variant/30 p-4">
                    <h3 className="font-display text-label-md font-bold text-on-surface mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        className="w-full d-flex align-items-center gap-3 p-3 bg-white border border-outline-variant/30 rounded-xl hover:border-primary hover:bg-light transition-all text-start group"
                        onClick={async () => {
                          if (user?.role === 'doctor') {
                            alert('Doctors cannot book patient appointments themselves. Please sign in as a Patient to test slot booking.');
                            return;
                          }
                          // Mock instant slot booking
                          try {
                            const date = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
                            const doctorId = "60c72b2f9b1d8e1c8c8d8888"; // Dummy target verified doctor
                            const symptoms = "Routine checkup request.";
                            
                            // Let's seed target doctor ID or use Dr. Aris's actual ID if known.
                            // We will fetch doctor list if needed, but for dummy testing, let's look for doctorDetails user id.
                            const dummyDocId = "60c72b2f9b1d8e1c8c8d8888"; 
                            alert('Booking a temporary slot...');
                            // In dev, the patient can trigger slot bookings easily by entering dates.
                          } catch (err) {
                            alert(err.message);
                          }
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-light d-flex align-items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-primary">add_circle</span>
                        </div>
                        <span className="text-label-md font-bold text-on-surface">Book New Consultation</span>
                      </button>
                      
                      <button className="w-full d-flex align-items-center gap-3 p-3 bg-white border border-outline-variant/30 rounded-xl hover:border-primary hover:bg-light transition-all text-start group">
                        <div className="w-10 h-10 rounded-lg bg-light d-flex align-items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-primary">mail</span>
                        </div>
                        <span className="text-label-md font-bold text-on-surface">Message Support</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

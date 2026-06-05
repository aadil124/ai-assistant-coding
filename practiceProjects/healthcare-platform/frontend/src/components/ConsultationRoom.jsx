import React, { useState, useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { useWebRTC } from '../hooks/useWebRTC';
import api from '../utils/api';

export default function ConsultationRoom({ onNavigate, user, onLogout, appointmentId }) {
  const [activeTab, setActiveTab] = useState('notes');
  
  // Clinical Notes state
  const [consultationId, setConsultationId] = useState(null);
  const [channelName, setChannelName] = useState('ch_con_default');
  const [webrtcToken, setWebrtcToken] = useState('');
  
  const [complaint, setComplaint] = useState('Persistent fatigue and sporadic headaches over the last 72 hours.');
  const [observations, setObservations] = useState([
    'Patient appears well-rested but reports mental fog.',
    'Blood pressure reading from wearable: 128/84.',
    'Normal speech patterns, no visible distress.'
  ]);
  const [newObservation, setNewObservation] = useState('');
  
  // Prescription states
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState([
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', durationDays: 90, refills: 1 }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('');
  const [newMedDuration, setNewMedDuration] = useState(30);
  const [otpToken, setOtpToken] = useState('');
  const [prescriptionSigned, setPrescriptionSigned] = useState(false);
  const [signatureHash, setSignatureHash] = useState('');

  // UI state feedback
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [prescriptionError, setPrescriptionError] = useState('');
  const [showSosModal, setShowSosModal] = useState(false);

  // Initialize timer hook (count up)
  const { formatTime } = useTimer(765, false, true);

  // Initialize WebRTC hook
  const {
    connectionQuality,
    audioMuted,
    videoStopped,
    isSharingScreen,
    toggleAudio,
    toggleVideo,
    toggleScreenShare
  } = useWebRTC(channelName);

  // Fetch consultation room details on mount
  useEffect(() => {
    if (!appointmentId) {
      setErrorMsg('No active appointment ID provided');
      setLoading(false);
      return;
    }

    const initConsultation = async () => {
      try {
        setLoading(true);
        // 1. Join room
        const session = await api.joinConsultation(appointmentId);
        setConsultationId(session.consultation_id);
        setChannelName(session.webrtc_channel);
        setWebrtcToken(session.webrtc_token);

        // 2. Fetch existing clinical notes if any
        try {
          const notesData = await api.getClinicalNotes(session.consultation_id);
          if (notesData.clinical_notes) {
            parseClinicalNotes(notesData.clinical_notes);
          }
        } catch (noteErr) {
          // If no notes exist yet, ignore
          console.log('No clinical notes found, starting fresh');
        }
      } catch (err) {
        setErrorMsg(err.message || 'Failed to initialize consultation room');
      } finally {
        setLoading(false);
      }
    };

    initConsultation();
  }, [appointmentId]);

  // Parse notes text helper
  const parseClinicalNotes = (notesText) => {
    try {
      if (!notesText.includes('CHIEF COMPLAINT:')) {
        setComplaint(notesText);
        return;
      }
      
      const sections = notesText.split('\n\nOBSERVATIONS:\n');
      if (sections[0]) {
        setComplaint(sections[0].replace('CHIEF COMPLAINT:\n', '').trim());
      }
      if (sections[1]) {
        const obsList = sections[1]
          .split('\n')
          .map(line => line.replace('- ', '').trim())
          .filter(line => line.length > 0);
        setObservations(obsList);
      }
    } catch (err) {
      console.error('Error parsing clinical notes format:', err);
    }
  };

  // Format notes text helper
  const getFormattedNotes = () => {
    return `CHIEF COMPLAINT:\n${complaint.trim()}\n\nOBSERVATIONS:\n${observations.map(o => `- ${o}`).join('\n')}`;
  };

  const handleAddObservation = (e) => {
    e.preventDefault();
    if (!newObservation.trim()) return;
    setObservations((prev) => [...prev, newObservation.trim()]);
    setNewObservation('');
  };

  const handleSaveNotes = async (isFinalized = false) => {
    if (!consultationId) return;
    try {
      setSavingNotes(true);
      const notesContent = getFormattedNotes();
      await api.saveClinicalNotes(consultationId, notesContent, isFinalized);
      if (isFinalized) {
        alert('Consultation clinical observations saved and finalized. Room closed.');
        onNavigate('dashboard');
      } else {
        // Auto-save feedback
        console.log('Progress notes auto-saved successfully');
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
      alert('Error saving clinical notes: ' + err.message);
    } finally {
      setSavingNotes(false);
    }
  };

  // Trigger manual save when clicking Complete
  const handleCompleteCall = () => {
    if (user?.role !== 'doctor') {
      // Patient simply returns to dashboard
      onNavigate('dashboard');
      return;
    }
    const confirmFinalize = window.confirm('Are you sure you want to finalize clinical notes and complete this consultation? This will close the room.');
    if (confirmFinalize) {
      handleSaveNotes(true);
    }
  };

  // Prescription Handling
  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDosage.trim()) return;
    setMedications(prev => [
      ...prev,
      {
        name: newMedName.trim(),
        dosage: newMedDosage.trim(),
        frequency: newMedFreq.trim() || 'Once daily',
        durationDays: Number(newMedDuration) || 30,
        refills: 0
      }
    ]);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedFreq('');
  };

  const handleCreatePrescriptionDraft = async () => {
    if (!diagnosis.trim()) {
      setPrescriptionError('Please enter a diagnosis description');
      return;
    }
    if (medications.length === 0) {
      setPrescriptionError('Please add at least one medication item');
      return;
    }

    try {
      setPrescriptionError('');
      const draft = await api.createPrescription(appointmentId, diagnosis, medications);
      setPrescriptionId(draft.prescription_id);
    } catch (err) {
      setPrescriptionError(err.message || 'Failed to create prescription draft');
    }
  };

  const handleSignPrescription = async () => {
    if (!otpToken) {
      setPrescriptionError('Please enter the 6-digit verification code');
      return;
    }

    try {
      setPrescriptionError('');
      const result = await api.signPrescription(prescriptionId, otpToken);
      setPrescriptionSigned(true);
      setSignatureHash(result.digital_signature_hash);
    } catch (err) {
      setPrescriptionError(err.message || 'Verification code failed');
    }
  };

  return (
    <div className="bg-background font-body text-on-background overflow-hidden h-screen d-flex flex-column">
      {/* Top Navigation Bar */}
      <header className="bg-surface/80 backdrop-blur-xl shadow-sm sticky-top z-50 border-bottom border-outline-variant/10">
        <div className="d-flex justify-content-between align-items-center w-full px-4 max-w-7xl mx-auto h-16">
          <div className="d-flex align-items-center gap-3">
            <span className="font-display text-h3 font-bold text-primary cursor-pointer" onClick={() => onNavigate('dashboard')}>
              Telehealth Connect
            </span>
            <div className="hidden md:flex align-items-center gap-2 px-3 py-1 bg-light rounded-full">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span className="font-label-md text-on-surface">Live Consultation Room</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1 text-on-surface-variant px-3 py-1 rounded-lg bg-light">
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span className="font-label-md">{formatTime()}</span>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant hover:bg-light p-2 rounded-full border-0 bg-transparent" onClick={onLogout}>
              logout
            </button>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex-grow-1 d-flex items-center justify-content-center bg-dark text-white">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p>Securing WebRTC stream and fetching clinical vault details...</p>
          </div>
        </div>
      ) : errorMsg ? (
        <div className="flex-grow-1 d-flex items-center justify-content-center bg-dark text-white p-4">
          <div className="text-center max-w-md">
            <span className="material-symbols-outlined text-danger text-[64px] mb-3">error</span>
            <h3>Access Denied</h3>
            <p className="text-muted">{errorMsg}</p>
            <button className="btn btn-primary mt-3" onClick={() => onNavigate('dashboard')}>Return to Dashboard</button>
          </div>
        </div>
      ) : (
        /* Main Workspace */
        <div className="flex-grow-1 d-flex overflow-hidden position-relative">
          {/* Large Video Surface */}
          <div className="flex-grow-1 position-relative bg-dark d-flex align-items-center justify-content-center group">
            <div className="position-absolute inset-0 z-0">
              {!videoStopped ? (
                <img
                  className="w-full h-full object-cover"
                  alt="Patient Webcam stream"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgw_R0NB-xdyF-XoVwEtQq9hWMMM_5jM5mLjCS9Egrf5KhOaLawuk1GRilU1Y_V-M2KXJ-2CDsd4Wl7LkM8-IoeJb_7KRo0R4_VR18tJ-9cJCD1nv_CLQoXeIaDoXBHSBMEcp_wjYEJlMXaSqs-DcXqskbOlL_ZotbT2fpxSVOCuEOv3NI3-b0pi0-3NhbskZbVX-V27Qyduj3_l2chkK1UDOZqwV_V3gizUo5b5uFiTQp-AnojXWNQg3DQSHX8912Eg11UYuhTCJX"
                />
              ) : (
                <div className="w-full h-full bg-secondary d-flex align-items-center justify-center text-white font-h2">
                  Video Feed Paused
                </div>
              )}
            </div>

            {/* Overlay Indicators */}
            <div className="position-absolute top-3 start-3 z-10 d-flex gap-2">
              <div className="glass-panel px-3 py-2 rounded-xl d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}>
                <span className="material-symbols-outlined text-success text-[20px] fill-icon">signal_cellular_4_bar</span>
                <span className="font-label-md text-on-surface">{connectionQuality} Connection</span>
              </div>
              <div className="glass-panel px-3 py-2 rounded-xl d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)' }}>
                <span className="font-label-md text-on-surface">Channel: {channelName}</span>
              </div>
            </div>

            {/* Picture-in-Picture */}
            <div className="position-absolute bottom-3 end-3 w-64 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-20 group-hover:scale-105 transition-transform duration-300">
              <img
                className="w-full h-full object-cover"
                alt="Clinician Webcam stream"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3ctW4KzLIkYbVlj4md-PuxSGzOaFt3C8M_Ty6W4wNGY840ChPcaEgbrnW4iw8HeD9r_BVd0-XXS9Xl2El3_2pdLsqjJDSI-a44SKGlqHCkjfwVThNhRWjyjbOojmZ529dd7XqF3W-ekdfnxK1QZuuR_DbyUY7FciOGENXAu6qqhCxpGrYITHK9BAV6fMluoxDsKs6y-vI9vvTb1bSDzhpSj-7DSsv5MDIymkJAK_MFWqCYFZbz5-yFmQSqruhnoQMqB9fIL2Gwrh"
              />
              <div className="position-absolute bottom-2 start-2 glass-panel px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white">
                You ({user?.role})
              </div>
            </div>

            {/* Floating Controls */}
            <div className="position-absolute bottom-3 start-50 translate-middle-x z-30 d-flex align-items-center gap-3">
              <div className="glass-panel p-2 rounded-pill d-flex align-items-center gap-3 px-4 shadow-xl" style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>
                <button
                  className={`btn w-12 h-12 rounded-full d-flex align-items-center justify-center border-0 ${
                    audioMuted ? 'bg-danger text-white' : 'bg-white text-dark hover:bg-light'
                  }`}
                  onClick={toggleAudio}
                  title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  <span className="material-symbols-outlined">{audioMuted ? 'mic_off' : 'mic'}</span>
                </button>
                <button
                  className={`btn w-12 h-12 rounded-full d-flex align-items-center justify-center border-0 ${
                    videoStopped ? 'bg-danger text-white' : 'bg-white text-dark hover:bg-light'
                  }`}
                  onClick={toggleVideo}
                  title={videoStopped ? 'Start Video' : 'Stop Video'}
                >
                  <span className="material-symbols-outlined">{videoStopped ? 'videocam_off' : 'videocam'}</span>
                </button>
                <button
                  className={`btn w-12 h-12 rounded-full d-flex align-items-center justify-center border-0 ${
                    isSharingScreen ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-light'
                  }`}
                  onClick={toggleScreenShare}
                  title="Share Screen"
                >
                  <span className="material-symbols-outlined">present_to_all</span>
                </button>
                <div className="vr bg-outline-variant/30 mx-2" style={{ width: '1px', height: '32px' }}></div>
                <button
                  className="btn btn-danger w-12 h-12 rounded-full d-flex align-items-center justify-center shadow-lg shadow-danger/20"
                  onClick={handleCompleteCall}
                  title="End Call"
                >
                  <span className="material-symbols-outlined">call_end</span>
                </button>
              </div>

              {/* Emergency Escalation */}
              <button
                className="emergency-pulse w-14 h-14 rounded-full d-flex flex-column align-items-center justify-center bg-danger text-white border-2 border-white shadow-2xl transition-all border-0"
                onClick={() => setShowSosModal(true)}
                title="Emergency Help"
              >
                <span className="material-symbols-outlined text-[20px]">emergency</span>
                <span className="text-[9px] font-bold leading-none mt-1 uppercase">SOS</span>
              </button>
            </div>
          </div>

          {/* Right Side Drawer */}
          <aside className="w-[400px] bg-white border-start border-outline-variant/20 d-flex flex-column hidden lg:flex">
            {/* Tabs */}
            <div className="d-flex border-bottom border-outline-variant/20">
              <button
                className={`flex-grow-1 py-3 border-0 bg-transparent font-label-md ${
                  activeTab === 'notes' ? 'text-primary border-bottom border-2 border-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
              <button
                className={`flex-grow-1 py-3 border-0 bg-transparent font-label-md ${
                  activeTab === 'chat' ? 'text-primary border-bottom border-2 border-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => setActiveTab('chat')}
              >
                Chat
              </button>
              <button
                className={`flex-grow-1 py-3 border-0 bg-transparent font-label-md ${
                  activeTab === 'files' ? 'text-primary border-bottom border-2 border-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => setActiveTab('files')}
              >
                Files
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-grow-1 overflow-y-auto p-4 space-y-4">
              {/* Patient Profile */}
              <div className="d-flex align-items-center gap-3 bg-light rounded-2xl p-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 d-flex align-items-center justify-center text-primary font-bold">
                  SJ
                </div>
                <div>
                  <h4 className="font-label-md text-on-surface mb-0">Sarah Johnson</h4>
                  <p className="text-[12px] text-on-surface-variant mb-0">34 yrs • Post-op recovery</p>
                </div>
              </div>

              {activeTab === 'notes' && (
                <>
                  {/* Live Notes */}
                  <section className="space-y-md">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="font-h3 text-on-surface mb-0">Clinical Notes</h3>
                      <span className="text-[11px] font-bold text-success bg-success/10 px-2 py-1 rounded">
                        {savingNotes ? 'Saving...' : 'Auto-Saving'}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="d-flex flex-column gap-1">
                        <label className="font-label-md text-on-surface-variant">Chief Complaint</label>
                        <textarea
                          disabled={user?.role !== 'doctor'}
                          className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                          value={complaint}
                          onChange={(e) => {
                            setComplaint(e.target.value);
                            // Debounce auto-save mock
                          }}
                          rows={3}
                        />
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <label className="font-label-md text-on-surface-variant">Observations Checklist</label>
                        <div className="bg-light rounded-xl p-3 min-h-[120px]">
                          <ul className="list-disc ps-3 mb-3 space-y-sm text-on-surface">
                            {observations.map((obs, i) => (
                              <li key={i}>{obs}</li>
                            ))}
                          </ul>
                          {user?.role === 'doctor' && (
                            <form onSubmit={handleAddObservation} className="d-flex gap-2">
                              <input
                                type="text"
                                className="form-control form-control-sm border-0 bg-white"
                                placeholder="Add clinical observation..."
                                value={newObservation}
                                onChange={(e) => setNewObservation(e.target.value)}
                              />
                              <button type="submit" className="btn btn-primary btn-sm px-3" style={{ background: '#6366f1', border: 'none' }}>Add</button>
                            </form>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Quick Actions (Doctor only) */}
                  {user?.role === 'doctor' && (
                    <section className="pt-3 border-top border-light">
                      <h3 className="font-label-md text-on-surface-variant mb-3">Clinical Commands</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          className="btn btn-outline-secondary d-flex align-items-center justify-content-start gap-2 p-2 border-light rounded-xl text-on-surface"
                          onClick={() => {
                            setDiagnosis('Essential Hypertension checkup.');
                            setShowPrescribeModal(true);
                          }}
                        >
                          <span className="material-symbols-outlined text-primary">prescriptions</span>
                          <span className="font-label-md font-semibold">Write Rx</span>
                        </button>
                        <button className="btn btn-outline-secondary d-flex align-items-center justify-content-start gap-2 p-2 border-light rounded-xl text-on-surface" onClick={() => alert('Lab order sync completed.')}>
                          <span className="material-symbols-outlined text-primary">lab_research</span>
                          <span className="font-label-md font-semibold">Order Lab</span>
                        </button>
                      </div>
                    </section>
                  )}
                </>
              )}

              {activeTab === 'chat' && (
                <div className="d-flex flex-column h-100 py-3 justify-content-between">
                  <div className="flex-grow-1 overflow-y-auto mb-3 text-center text-outline text-muted">
                    No chat messages yet.
                  </div>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type a message..." />
                    <button className="btn btn-primary" style={{ background: '#6366f1', border: 'none' }}>Send</button>
                  </div>
                </div>
              )}

              {activeTab === 'files' && (
                <div className="space-y-md">
                  <h4 className="font-label-md">Clinical Record Vault</h4>
                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-xl border border-light">
                    <span className="material-symbols-outlined text-primary text-[28px]">picture_as_pdf</span>
                    <div className="flex-grow-1">
                      <p className="text-label-md font-bold mb-0">cardio_results.pdf</p>
                      <p className="text-label-sm text-outline mb-0">1.2 MB · June 4</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-3 bg-light border-top">
              <button
                className="btn btn-primary w-full py-3 rounded-xl font-h3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
                onClick={handleCompleteCall}
                style={{ background: '#6366f1' }}
              >
                {user?.role === 'doctor' ? 'Finalize & Complete Consultation' : 'Return to Dashboard'}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Write Prescription Modal Drawer */}
      {showPrescribeModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1060 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl bg-white text-dark">
              <div className="modal-header border-0 bg-light p-4 d-flex justify-content-between align-items-center">
                <h4 className="modal-title font-display font-bold">
                  ⚡ Smart E-Prescription Portal (HIPAA)
                </h4>
                <button type="button" className="btn-close border-0 bg-transparent text-lg font-bold" onClick={() => {
                  setShowPrescribeModal(false);
                  setPrescriptionId(null);
                  setPrescriptionSigned(false);
                  setOtpToken('');
                  setPrescriptionError('');
                }}>✕</button>
              </div>

              <div className="modal-body p-4 overflow-y-auto max-h-[70vh]">
                {prescriptionError && (
                  <div className="alert alert-danger rounded-xl py-2 px-3 text-label-sm mb-3">
                    {prescriptionError}
                  </div>
                )}

                {!prescriptionId ? (
                  /* Form to create Draft */
                  <div className="space-y-4">
                    <div className="d-flex flex-column gap-1 mb-3">
                      <label className="font-label-md text-on-surface-variant font-bold">Diagnosis Description</label>
                      <input
                        type="text"
                        className="form-control p-3 bg-light border-0 rounded-xl"
                        placeholder="e.g. Essential Hypertension"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>

                    <div className="border border-light rounded-2xl p-3 mb-3">
                      <h5 className="font-label-md font-bold mb-3">Medications List</h5>
                      
                      <div className="space-y-2 mb-3">
                        {medications.map((med, i) => (
                          <div key={i} className="d-flex justify-content-between align-items-center bg-light p-3 rounded-xl border border-light">
                            <div>
                              <strong className="text-primary">{med.name}</strong> ({med.dosage})
                              <div className="text-label-sm text-outline">{med.frequency} · {med.durationDays} days · {med.refills} refills</div>
                            </div>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-link text-danger border-0"
                              onClick={() => setMedications(prev => prev.filter((_, idx) => idx !== i))}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleAddMedication} className="grid grid-cols-1 md:grid-cols-4 gap-2 align-items-end">
                        <div>
                          <label className="text-[11px] font-bold">Med Name</label>
                          <input type="text" className="form-control form-control-sm" placeholder="e.g. Lisinopril" value={newMedName} onChange={(e) => setNewMedName(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold">Dosage</label>
                          <input type="text" className="form-control form-control-sm" placeholder="e.g. 10mg" value={newMedDosage} onChange={(e) => setNewMedDosage(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold">Frequency</label>
                          <input type="text" className="form-control form-control-sm" placeholder="e.g. Once daily" value={newMedFreq} onChange={(e) => setNewMedFreq(e.target.value)} />
                        </div>
                        <div>
                          <button type="submit" className="btn btn-secondary btn-sm w-full py-2">Add Med</button>
                        </div>
                      </form>
                    </div>

                    <button 
                      type="button" 
                      className="btn btn-primary w-full py-3 rounded-xl font-bold shadow-lg" 
                      onClick={handleCreatePrescriptionDraft}
                      style={{ background: '#6366f1', border: 'none' }}
                    >
                      Generate Prescription Draft
                    </button>
                  </div>
                ) : !prescriptionSigned ? (
                  /* OTP Signing Panel */
                  <div className="text-center py-4 space-y-4 max-w-md mx-auto">
                    <span className="material-symbols-outlined text-[64px] text-primary fill-icon animate-pulse">sms</span>
                    <h4 className="font-bold">Enter 6-Digit MFA Verification Code</h4>
                    <p className="text-muted text-label-sm">
                      A confirmation code has been sent to your registered secure MFA provider.<br/>
                      <strong>Demo Code: 887321</strong>
                    </p>

                    <div className="input-group max-w-xs mx-auto mb-3">
                      <input
                        type="text"
                        maxLength="6"
                        className="form-control text-center font-display font-bold text-h1 p-2 bg-light border-0 rounded-xl"
                        placeholder="000000"
                        value={otpToken}
                        onChange={(e) => setOtpToken(e.target.value)}
                      />
                    </div>

                    <button 
                      type="button" 
                      className="btn btn-success w-full py-3 rounded-xl font-bold"
                      onClick={handleSignPrescription}
                    >
                      Authenticate & Sign E-Prescription
                    </button>
                  </div>
                ) : (
                  /* Signature Success Certificate display */
                  <div className="text-center py-4 space-y-4 max-w-lg mx-auto">
                    <span className="material-symbols-outlined text-[64px] text-success fill-icon">verified</span>
                    <h4 className="font-bold text-success">Prescription Signed & Issued Successfully</h4>
                    <p className="text-muted text-label-sm">
                      The prescription has been digitally signed using your cryptographic key and synchronized with the pharmacy networks.
                    </p>

                    <div className="bg-light p-3 rounded-xl border border-success/20 text-start font-mono text-label-sm break-all">
                      <div><strong>Status:</strong> SIGNED_AND_ISSUED</div>
                      <div className="mt-1"><strong>HMAC SHA-256 Hash:</strong></div>
                      <div className="text-[10px] text-success">{signatureHash}</div>
                      <div className="mt-1"><strong>Secured:</strong> HIPAA Escrow Sync Complete</div>
                    </div>

                    <button 
                      type="button" 
                      className="btn btn-outline-secondary w-full py-3 rounded-xl font-bold mt-3"
                      onClick={() => {
                        setShowPrescribeModal(false);
                        setPrescriptionId(null);
                        setPrescriptionSigned(false);
                        setOtpToken('');
                      }}
                    >
                      Close Prescription Portal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal */}
      {showSosModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl">
              <div className="modal-header bg-danger text-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h5 className="modal-title font-display d-flex align-items-center gap-2 mb-0">
                  <span className="material-symbols-outlined">emergency</span>
                  Emergency Medical Alert (SOS)
                </h5>
                <button type="button" className="btn-close btn-close-white border-0 bg-transparent text-white font-bold" onClick={() => setShowSosModal(false)}>✕</button>
              </div>
              <div className="modal-body p-4 text-center">
                <span className="material-symbols-outlined text-danger text-[64px] mb-3 emergency-pulse">emergency_share</span>
                <h4 className="font-h3 mb-3 text-dark">Initiating Emergency Services Dispatch</h4>
                <p className="font-body text-on-surface-variant mb-4">
                  This action will alert first responders and dispatch emergency medical teams to the patient's registered location coordinates.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <button className="btn btn-outline-secondary px-4 rounded-full" onClick={() => setShowSosModal(false)}>
                    Cancel Alert
                  </button>
                  <button className="btn btn-danger px-4 rounded-full" onClick={() => {
                    setShowSosModal(false);
                    alert('Emergency services dispatched.');
                  }}>
                    Confirm Dispatch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

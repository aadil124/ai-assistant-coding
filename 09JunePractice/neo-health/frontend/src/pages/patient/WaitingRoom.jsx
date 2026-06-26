import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function WaitingRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State controls for mic, camera, and connection
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [stableNetwork, setStableNetwork] = useState(true);
  const [countdown, setCountdown] = useState(252); // 4 minutes 12 seconds
  const [showSettings, setShowSettings] = useState(false);

  // Doctor Details State (with fallback data matching Stitch specs)
  const [doctor, setDoctor] = useState({
    name: "Dr. Sarah Jenkins",
    title: "Senior Cardiologist",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I",
    appointmentType: "Follow-up Visit",
    duration: "30 Minutes",
    consultationId: "NH-90281"
  });

  // Load dynamically if available from local storage or route params
  useEffect(() => {
    const savedName = localStorage.getItem('success_doc_name');
    const savedTitle = localStorage.getItem('success_doc_title');
    const savedAvatar = localStorage.getItem('success_doc_avatar');
    
    if (savedName) {
      setDoctor(prev => ({
        ...prev,
        name: savedName,
        title: savedTitle || prev.title,
        avatar: savedAvatar || prev.avatar
      }));
    } else if (id === 'marcus-thorne') {
      setDoctor(prev => ({
        ...prev,
        name: "Dr. Marcus Thorne",
        title: "Senior Cardiologist & Surgeon",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU",
        consultationId: "NH-38491"
      }));
    }
  }, [id]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown seconds into MM:SS
  const formatTime = (timeInSecs) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = timeInSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulated redirect when call starts
  const handleJoinCall = () => {
    // Navigate to next screen: Consultation Completed (for mock call simulation ending)
    // or let it simulate the consultation lobby workflow
    navigate(`/patient/consultation/completed/${id || 'default'}`);
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Secure Waiting Room | Neo-Health Lobby</title>
      <meta name="description" content="Telehealth consultation secure connection lobby. Test video, audio and view appointment status." />

      {/* Main glass card wrapper */}
      <div className="container-fluid py-2">
        <div className="row g-4">
          
          {/* Video preview & Waiting Area */}
          <div className="col-12 col-lg-8">
            <div className="neo-glass-card p-0 overflow-hidden border shadow-sm position-relative">
              
              {/* Top status indicator header */}
              <div className="p-3 bg-white bg-opacity-75 border-bottom d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="position-relative d-inline-flex align-items-center" style={{ width: '10px', height: '10px' }}>
                    <span className="animate-ping position-absolute h-100 w-100 rounded-circle bg-success opacity-75"></span>
                    <span className="position-relative rounded-circle h-100 w-100 bg-success"></span>
                  </span>
                  <span className="fw-semibold text-success small">Secure Consultation Lobby</span>
                </div>
                <div className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 small">
                  Room ID: {doctor.consultationId}
                </div>
              </div>

              {/* Camera Preview Area */}
              <div className="ratio ratio-16x9 position-relative bg-dark">
                {cameraEnabled ? (
                  <img
                    className="w-100 h-100 object-fit-cover opacity-75"
                    alt="Selfie view from laptop camera showing interior clinical environment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPzjGcWpnPXM-T9KNgcR9wDIHGese89SxbUlV1mBKkaFig4T18bmRrzVuORJD5GABh-u66kWH1OaVDECNr9Hvj-MuDu1E6D07ChBhFokUYl0ECjvhSbLF_0L-7y-0geAd9Wr0Ec-C8Z9g41KimZmXr1tyahtMuzKbHvqtTTnUCmE10qLBczy8bmiH5DpGQ-okpvQmTHrJN_Gkm6QK3druUHRul_ZLjnS9PgpTpUYwBBIALeFxBeQYAsbb_j-h7ynuaPQSFIKu_B2Q"
                  />
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center text-white h-100">
                    <div className="rounded-circle bg-secondary bg-opacity-25 p-4 mb-3 border border-secondary border-opacity-50">
                      <i className="bi bi-camera-video-off fs-1 text-secondary"></i>
                    </div>
                    <p className="fw-semibold text-secondary mb-0">Camera Turned Off</p>
                    <p className="text-secondary small">Click the video icon below to enable preview</p>
                  </div>
                )}

                {/* Top Right Preview Label Watermark */}
                <div className="position-absolute top-0 end-0 m-3 px-3 py-1 bg-dark bg-opacity-50 text-white rounded-3 small fw-medium backdrop-blur-sm">
                  Preview Only
                </div>

                {/* Video controls toolbar overlay */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-pill bg-white bg-opacity-25 border border-white border-opacity-20 shadow-lg backdrop-blur-md d-flex align-items-center gap-3">
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`btn rounded-circle d-flex align-items-center justify-content-center transition-all`}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: micEnabled ? 'rgba(255,255,255,0.9)' : '#dc3545',
                      color: micEnabled ? '#495057' : '#ffffff',
                      border: micEnabled ? '1px solid #dee2e6' : 'none'
                    }}
                    title={micEnabled ? "Mute Microphone" : "Unmute Microphone"}
                  >
                    <i className={`bi ${micEnabled ? 'bi-mic-fill' : 'bi-mic-mute-fill'} fs-5`}></i>
                  </button>

                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`btn rounded-circle d-flex align-items-center justify-content-center transition-all`}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: cameraEnabled ? 'rgba(255,255,255,0.9)' : '#dc3545',
                      color: cameraEnabled ? '#495057' : '#ffffff',
                      border: cameraEnabled ? '1px solid #dee2e6' : 'none'
                    }}
                    title={cameraEnabled ? "Turn Off Camera" : "Turn On Camera"}
                  >
                    <i className={`bi ${cameraEnabled ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'} fs-5`}></i>
                  </button>

                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`btn rounded-circle bg-white bg-opacity-90 border d-flex align-items-center justify-content-center hover-bg-light transition-all`}
                    style={{ width: '48px', height: '48px' }}
                    title="Device Settings"
                  >
                    <i className="bi bi-gear-fill text-dark fs-5"></i>
                  </button>
                </div>
              </div>

              {/* Status details underneath video preview */}
              <div className="p-4 bg-white border-top">
                <div className="row align-items-center g-3">
                  <div className="col-12 col-md-8">
                    <h3 className="h4 fw-bold mb-1">Waiting for {doctor.name}</h3>
                    <p className="text-secondary mb-0">
                      Your cardiologist will join shortly. Scheduled to begin in:{' '}
                      <span className="fw-bold text-primary fs-5" id="countdown-timer">
                        {formatTime(countdown)}
                      </span>
                    </p>
                  </div>
                  <div className="col-12 col-md-4 text-md-end">
                    <span className="text-secondary small text-uppercase tracking-wider d-block mb-1">Queue Position</span>
                    <span className="fs-2 fw-bold text-primary">#1</span>
                  </div>
                </div>

                {/* Progress bar pulsing animation */}
                <div className="progress mt-3 mb-4" style={{ height: '8px' }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                    role="progressbar"
                    style={{ width: countdown > 0 ? '70%' : '100%' }}
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                {/* Connections Checklist */}
                <div className="d-flex flex-wrap gap-4 border-top pt-3 text-secondary small">
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${cameraEnabled ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} fs-5`}></i>
                    <span>Camera {cameraEnabled ? 'Active' : 'Disabled'}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${micEnabled ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} fs-5`}></i>
                    <span>Microphone {micEnabled ? 'Active' : 'Disabled'}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-check-circle-fill text-success fs-5"></i>
                    <span>Stable Network (100 Mbps)</span>
                  </div>
                </div>

                {/* Simulation helper actions when countdown matches 0 */}
                {countdown === 0 && (
                  <div className="alert alert-success border-success bg-success bg-opacity-10 mt-3 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-person-video2 fs-4 text-success"></i>
                      <div>
                        <strong className="d-block">{doctor.name} is waiting for you!</strong>
                        <span className="small text-secondary">The secure meeting room is open and ready.</span>
                      </div>
                    </div>
                    <button onClick={handleJoinCall} className="btn btn-success fw-bold px-4 py-2">
                      Join Call
                    </button>
                  </div>
                )}
                
                {countdown > 0 && (
                  <div className="mt-3 text-end">
                    <button onClick={handleJoinCall} className="btn btn-outline-primary btn-sm fw-medium">
                      Simulate Doctor Arrived (Skip Timer)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Panel: Doctor details and tips */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Doctor Profile Details */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex align-items-center gap-3 mb-4">
                <img
                  className="rounded-circle border"
                  alt={`Headshot of ${doctor.name}`}
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                  src={doctor.avatar}
                />
                <div>
                  <h4 className="fw-bold mb-1 fs-5">{doctor.name}</h4>
                  <span className="badge bg-primary bg-opacity-10 text-primary small fw-semibold">
                    {doctor.title}
                  </span>
                </div>
              </div>

              <div className="border-top pt-3 d-flex flex-column gap-2 small">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Appointment Type</span>
                  <span className="fw-semibold text-dark">{doctor.appointmentType}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Duration</span>
                  <span className="fw-semibold text-dark">{doctor.duration}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Consultation ID</span>
                  <span className="fw-semibold text-dark">#{doctor.consultationId}</span>
                </div>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div className="neo-glass-card p-4 border shadow-sm bg-primary-subtle bg-opacity-25 border-primary border-opacity-20">
              <div className="d-flex align-items-center gap-2 text-primary mb-3">
                <i className="bi bi-lightbulb-fill fs-5"></i>
                <h5 className="fw-bold mb-0 fs-6">Preparation Tips</h5>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0 small text-secondary">
                <li className="d-flex gap-2 align-items-start">
                  <i className="bi bi-check2 text-primary fw-bold mt-0.5"></i>
                  <span>Ensure you are in a quiet, private, and well-lit space.</span>
                </li>
                <li className="d-flex gap-2 align-items-start">
                  <i className="bi bi-check2 text-primary fw-bold mt-0.5"></i>
                  <span>Have your recent medical reports and prescriptions ready.</span>
                </li>
                <li className="d-flex gap-2 align-items-start">
                  <i className="bi bi-check2 text-primary fw-bold mt-0.5"></i>
                  <span>Check that your internet connection is stable.</span>
                </li>
              </ul>
            </div>

            {/* Reschedule footer action button */}
            <div className="mt-auto d-flex flex-column gap-2">
              <button className="btn btn-danger w-100 py-3 fw-bold rounded-3 shadow-sm transition-all" style={{ letterSpacing: '0.5px' }}>
                Reschedule Appointment
              </button>
              <p className="text-center text-secondary small mb-0 mt-1">
                Emergency? Call <span className="fw-bold text-danger">911</span> immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal dialog (Mockup interface) */}
      {showSettings && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-bottom px-4">
                <h5 className="modal-title fw-bold">Device Settings</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSettings(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">Select Camera Device</label>
                  <select className="form-select py-2">
                    <option>FaceTime HD Camera (Built-in)</option>
                    <option>External USB Camera (Obsidian Web)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">Select Microphone Input</label>
                  <select className="form-select py-2">
                    <option>MacBook Pro Microphone (Built-in)</option>
                    <option>Yeti Stereo Microphone (USB)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label fw-semibold small text-secondary">Select Audio Output</label>
                  <select className="form-select py-2">
                    <option>MacBook Pro Speakers (Built-in)</option>
                    <option>External Headphones (Stereo Jack)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-top px-4">
                <button type="button" className="btn btn-primary-neo w-100 py-2.5" onClick={() => setShowSettings(false)}>
                  Apply Device Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
}

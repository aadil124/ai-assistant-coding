import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';

export default function DoctorConsultation() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  // Call options state
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [callTimer, setCallTimer] = useState(0);
  const [connStatus, setConnStatus] = useState('Connected'); // Connected, Reconnecting, Waiting
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'patient', text: 'Hello doctor, I joined the room.', time: '10:02 AM' },
    { sender: 'doctor', text: 'Hi, I see you. Let me check your lipid reports.', time: '10:03 AM' }
  ]);

  const [patientInfo, setPatientInfo] = useState({
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    symptom: 'Chest pain post-workout',
    bloodType: 'O-positive',
    lastVitals: 'BP: 132/84 • HR: 78 bpm • Temp: 98.6 °F'
  });

  // Call timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCallTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format call seconds to MM:SS
  const formatSecs = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    
    setChatLogs(prev => [...prev, {
      sender: 'doctor',
      text: chatMessage,
      time: timeStr
    }]);
    setChatMessage('');
  };

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end this consultation session? This will complete the call, free the room, and redirect you to the prescription generator desk.")) {
      setConnStatus('Ending...');
      setTimeout(() => {
        // Mock save details and navigate to prescription desk
        localStorage.setItem('last_consult_patient', patientInfo.name);
        localStorage.setItem('last_consult_id', appointmentId);
        navigate('/doctor/prescriptions/new');
      }, 800);
    }
  };

  const simulateConnectionDrop = () => {
    setConnStatus('Reconnecting');
    setTimeout(() => {
      setConnStatus('Connected');
    }, 3000);
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Teleconsultation Room | Neo-Health Doctors</title>
      <meta name="description" content="In-browser WebRTC secure consultation channel. Conduct online diagnostics and review patient histories." />

      <div className="container-fluid py-2">
        <div className="row g-4">
          
          {/* Main Video Lobbies Column */}
          <div className="col-12 col-xl-8">
            <div className="neo-glass-card p-0 overflow-hidden border shadow-sm position-relative">
              
              {/* Call Room Status Bar */}
              <div className="p-3 bg-white bg-opacity-75 border-bottom d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="position-relative d-inline-flex align-items-center" style={{ width: '10px', height: '10px' }}>
                    <span className={`animate-ping position-absolute h-100 w-100 rounded-circle bg-${connStatus === 'Connected' ? 'success' : connStatus === 'Reconnecting' ? 'danger' : 'warning'} opacity-75`}></span>
                    <span className={`position-relative rounded-circle h-100 w-100 bg-${connStatus === 'Connected' ? 'success' : connStatus === 'Reconnecting' ? 'danger' : 'warning'}`}></span>
                  </span>
                  <span className={`fw-semibold small text-${connStatus === 'Connected' ? 'success' : connStatus === 'Reconnecting' ? 'danger' : 'warning-emphasis'}`}>
                    {connStatus === 'Connected' ? 'Secure Telehealth Call active' : connStatus === 'Reconnecting' ? 'Reconnecting Peer Feed...' : 'Initializing Room...'}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 fw-bold font-monospace small">
                    {formatSecs(callTimer)}
                  </span>
                  <button onClick={simulateConnectionDrop} className="btn btn-outline-secondary btn-sm small py-1 px-2 border bg-transparent">
                    Simulate Signal Drop
                  </button>
                </div>
              </div>

              {/* Video Screen container */}
              <div className="ratio ratio-16x9 position-relative bg-dark">
                {/* Connection drop overlays */}
                {connStatus === 'Reconnecting' && (
                  <div className="position-absolute inset-0 bg-dark bg-opacity-75 z-3 d-flex flex-column align-items-center justify-content-center text-white">
                    <div className="spinner-border text-danger mb-3" role="status"></div>
                    <h5 className="fw-bold">Signal Disconnection Detected</h5>
                    <p className="small text-secondary mb-0">Re-establishing WebRTC handshake token...</p>
                  </div>
                )}

                {/* Remote Participant camera view */}
                <img
                  alt="Remote patient video stream"
                  className="w-100 h-100 object-fit-cover opacity-75"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPzjGcWpnPXM-T9KNgcR9wDIHGese89SxbUlV1mBKkaFig4T18bmRrzVuORJD5GABh-u66kWH1OaVDECNr9Hvj-MuDu1E6D07ChBhFokUYl0ECjvhSbLF_0L-7y-0geAd9Wr0Ec-C8Z9g41KimZmXr1tyahtMuzKbHvqtTTnUCmE10qLBczy8bmiH5DpGQ-okpvQmTHrJN_Gkm6QK3druUHRul_ZLjnS9PgpTpUYwBBIALeFxBeQYAsbb_j-h7ynuaPQSFIKu_B2Q"
                />

                {/* Local Doctor webcam picture-in-picture */}
                {cameraActive ? (
                  <div className="position-absolute bottom-0 end-0 m-4 rounded-3 border overflow-hidden shadow-lg" style={{ width: '150px', height: '100px', zIndex: '2' }}>
                    <img
                      alt="Doctor local video feed"
                      className="w-100 h-100 object-fit-cover opacity-90"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU"
                    />
                  </div>
                ) : (
                  <div className="position-absolute bottom-0 end-0 m-4 rounded-3 border bg-secondary bg-opacity-75 d-flex align-items-center justify-content-center" style={{ width: '150px', height: '100px', zIndex: '2' }}>
                    <i className="bi bi-camera-video-off-fill text-white"></i>
                  </div>
                )}

                {/* Call Controls Overlay Toolbar */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-pill bg-white bg-opacity-25 border border-white border-opacity-20 shadow-lg backdrop-blur-md d-flex align-items-center gap-3" style={{ zIndex: '2' }}>
                  <button
                    onClick={() => setMicActive(!micActive)}
                    className={`btn rounded-circle d-flex align-items-center justify-content-center transition-all`}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: micActive ? 'rgba(255,255,255,0.9)' : '#dc3545',
                      color: micActive ? '#495057' : '#ffffff',
                      border: micActive ? '1px solid #dee2e6' : 'none'
                    }}
                    title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                  >
                    <i className={`bi ${micActive ? 'bi-mic-fill' : 'bi-mic-mute-fill'} fs-5`}></i>
                  </button>

                  <button
                    onClick={() => setCameraActive(!cameraActive)}
                    className={`btn rounded-circle d-flex align-items-center justify-content-center transition-all`}
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: cameraActive ? 'rgba(255,255,255,0.9)' : '#dc3545',
                      color: cameraActive ? '#495057' : '#ffffff',
                      border: cameraActive ? '1px solid #dee2e6' : 'none'
                    }}
                    title={cameraActive ? "Turn Off Camera" : "Turn On Camera"}
                  >
                    <i className={`bi ${cameraActive ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'} fs-5`}></i>
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="btn btn-danger rounded-pill px-4 py-2.5 fw-bold d-flex align-items-center gap-2 border-0"
                    title="End Call Consultation"
                    id="btn-end-consultation"
                  >
                    <i className="bi bi-telephone-x-fill"></i>
                    <span>End Consultation</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Patient details & Chat side drawer */}
          <div className="col-12 col-xl-4 d-flex flex-column gap-4">
            
            {/* Patient overview card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <h5 className="fw-bold text-dark mb-3 fs-6 border-bottom pb-2">Patient Case Summary</h5>
              <div className="d-flex flex-column gap-2 small">
                <div>
                  <span className="text-secondary d-block">FULL NAME</span>
                  <span className="fw-bold text-dark">{patientInfo.name}</span>
                </div>
                <div className="row g-2 mt-1">
                  <div className="col-6">
                    <span className="text-secondary d-block">AGE / GENDER</span>
                    <span className="fw-semibold text-dark">{patientInfo.age} Yrs / {patientInfo.gender}</span>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary d-block">BLOOD TYPE</span>
                    <span className="fw-semibold text-dark">{patientInfo.bloodType}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-secondary d-block">SYMPTOM COMPLAINT</span>
                  <span className="fw-semibold text-primary">{patientInfo.symptom}</span>
                </div>
                <div className="mt-2 p-2 bg-light border rounded-3 text-secondary" style={{ fontSize: '0.75rem' }}>
                  <span className="fw-bold text-dark d-block mb-0.5">Last Vitals Record</span>
                  {patientInfo.lastVitals}
                </div>
              </div>
            </div>

            {/* Consultation Room Chat */}
            <div className="neo-glass-card p-0 border bg-white shadow-sm overflow-hidden d-flex flex-column" style={{ height: '350px' }}>
              <div className="px-4 py-3 border-bottom bg-light bg-opacity-50">
                <h5 className="fw-bold text-dark mb-0 fs-6">Session Live Chat</h5>
              </div>

              {/* Message scroll feed */}
              <div className="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-2.5" style={{ maxHeight: '220px' }}>
                {chatLogs.map((chat, idx) => {
                  const isDoctor = chat.sender === 'doctor';
                  return (
                    <div key={idx} className={`d-flex flex-column ${isDoctor ? 'align-items-end' : 'align-items-start'}`}>
                      <div
                        className={`p-2.5 rounded-3 max-w-[80%] small ${
                          isDoctor ? 'bg-primary text-white' : 'bg-light text-dark'
                        }`}
                      >
                        {chat.text}
                      </div>
                      <small className="text-secondary mt-0.5" style={{ fontSize: '0.65rem' }}>{chat.time}</small>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="p-3 border-top bg-light bg-opacity-25 mt-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-neo py-2 small"
                    placeholder="Send medical tip, notes..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <button className="btn btn-primary-neo px-3 border-0" type="submit">
                    <i className="bi bi-send-fill"></i>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

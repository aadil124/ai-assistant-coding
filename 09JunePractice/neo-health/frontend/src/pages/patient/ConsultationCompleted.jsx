import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function ConsultationCompleted() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State interaction mockups
  const [pharmacySent, setPharmacySent] = useState(false);
  const [nurseChatOpen, setNurseChatOpen] = useState(false);
  const [nurseMessage, setNurseMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'nurse', text: "Hello! I am Nurse Emily. How can I help you with your post-consultation questions today?" }
  ]);

  // Doctor Details (dynamic with fallback)
  const [doctor, setDoctor] = useState({
    name: "Dr. Aris Thorne",
    title: "Senior Cardiologist",
    hospital: "St. Luke's Medical Center, NY",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZX0OOwCTq7ZoCjrEJMWgwFBr5Uoj-F1kI4C0FlIEXYChNCzLjvj8WLhyo5PqqgvI_qFkCzF1LyTPwwdTbKJDS6jdPSqc5zjfHI3Cq2DuEtnvdVnlM9xhYdsUa1SyVKM0DQMWrm43XrTyh9TdttrWqJ-OalB--GMgWjYfcconkMESCHodnCgoFiVvoyeeyTnTr-QJmzQMRfSDGRkvsIyIoFND3bLjn_6IKmvOM3l4wsPd4lVb7i9hNXMRLvhL2D2zkXGLavhkRGqc",
    appointmentDate: "October 24, 2024",
    duration: "45 mins"
  });

  // Load dynamically based on localStorage or routing
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
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU"
      }));
    }
  }, [id]);

  const handleSendToPharmacy = (e) => {
    e.preventDefault();
    setPharmacySent(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!nurseMessage.trim()) return;

    const userMsg = { sender: 'patient', text: nurseMessage };
    setChatHistory(prev => [...prev, userMsg]);
    setNurseMessage("");

    // Mock nurse response delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        sender: 'nurse',
        text: "I've received your inquiry. I am verifying this detail with your pharmacy records and will confirm shortly."
      }]);
    }, 1500);
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Consultation Completed | Neo-Health Summary</title>
      <meta name="description" content="Telehealth consultation concluded successfully. View medical notes, observation summaries, and prescriptions." />

      <div className="container-fluid py-2">
        
        {/* Hero Completion State */}
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle mb-4 shadow-sm" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <h2 className="fw-bold text-dark mb-2">Consultation Completed</h2>
          <p className="text-secondary mb-0 px-2">
            Your session with <span className="fw-semibold text-dark">{doctor.name}</span> has successfully concluded. Your records have been updated in real-time.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="row g-4 justify-content-center">
          
          {/* Left Column: Doctor Info Card */}
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white text-center shadow-sm h-100 d-flex flex-column align-items-center">
              <div className="position-relative mb-3" style={{ width: '96px', height: '96px' }}>
                <img
                  alt="Doctor profile"
                  className="rounded-4 border w-100 h-100 object-fit-cover shadow-sm"
                  src={doctor.avatar}
                />
              </div>
              <h3 className="fw-bold mb-1 fs-5 text-dark">{doctor.name}</h3>
              <p className="text-secondary small mb-4">{doctor.title} • {doctor.hospital}</p>
              
              <div className="w-100 d-flex flex-column gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/patient/doctor/review/${id || 'marcus-thorne'}`)}
                  className="btn btn-primary-neo w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-star-fill text-warning"></i>
                  <span>Write a Review</span>
                </button>
                
                <button
                  onClick={() => navigate(`/patient/booking/select-slot/${id || 'marcus-thorne'}`)}
                  className="btn btn-light border w-100 py-2.5 fw-medium text-dark hover-bg-light"
                >
                  Book Follow-up
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Session Summary, Prescriptions & Help */}
          <div className="col-12 col-md-8 d-flex flex-column gap-4">
            
            {/* Consultation Summary Detail Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm flex-grow-1">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h4 className="fw-bold mb-0 text-dark fs-5">Consultation Summary</h4>
                <span className="badge bg-secondary-subtle text-secondary-emphasis px-3 py-2 rounded-pill small">
                  {doctor.appointmentDate} • {doctor.duration}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-primary small fw-bold text-uppercase tracking-wider mb-2">Primary Observations</p>
                <p className="text-secondary leading-relaxed mb-0">
                  Patient reports improved respiratory comfort during light exercise. Heart rate variability shows stabilization compared to previous month. Recommended continuing current low-sodium diet and monitoring blood pressure twice daily.
                </p>
              </div>

              <div className="row g-3">
                {/* Medical Notes File Card */}
                <div className="col-12 col-sm-6">
                  <div className="p-3 bg-light border rounded-3 d-flex gap-3 align-items-start h-100">
                    <i className="bi bi-file-earmark-pdf-fill text-primary fs-3 mt-1"></i>
                    <div>
                      <p className="fw-semibold text-dark mb-1 small">Medical Notes</p>
                      <p className="text-secondary small mb-2">Full diagnostic report available</p>
                      <a href="#" className="text-primary fw-semibold small text-decoration-none d-inline-flex align-items-center gap-1 hover-underline" onClick={(e) => { e.preventDefault(); alert("PDF View download simulated."); }}>
                        View PDF <i className="bi bi-box-arrow-up-right small"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Prescription Card */}
                <div className="col-12 col-sm-6">
                  <div className="p-3 bg-light border rounded-3 d-flex gap-3 align-items-start h-100">
                    <i className="bi bi-clipboard2-pulse-fill text-primary fs-3 mt-1"></i>
                    <div>
                      <p className="fw-semibold text-dark mb-1 small">Prescription</p>
                      <p className="text-secondary small mb-2">Lisinopril • 10mg daily</p>
                      {pharmacySent ? (
                        <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1.5 rounded-pill small fw-semibold">
                          <i className="bi bi-check-circle-fill me-1"></i> Sent to Pharmacy
                        </span>
                      ) : (
                        <a href="#" className="text-primary fw-semibold small text-decoration-none d-inline-flex align-items-center gap-1 hover-underline" onClick={handleSendToPharmacy}>
                          Send to Pharmacy <i className="bi bi-prescription2 small"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Support Banner */}
            <div className="neo-glass-card p-4 border shadow-sm bg-primary text-white position-relative overflow-hidden">
              <div className="position-relative z-2 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4">
                <div className="text-center text-sm-start">
                  <h4 className="fw-bold mb-1 fs-5 text-white">Need immediate assistance?</h4>
                  <p className="mb-0 text-white-50 small">Our 24/7 clinical support team is here for any post-consultation queries.</p>
                </div>
                <button
                  onClick={() => setNurseChatOpen(true)}
                  className="btn btn-light text-primary fw-bold px-4 py-2.5 rounded-pill shadow-sm transition-all"
                >
                  Chat with Nurse
                </button>
              </div>
              {/* Background circular decoration */}
              <div className="position-absolute bg-white bg-opacity-10 rounded-circle" style={{ width: '150px', height: '150px', top: '-50px', right: '-50px', zIndex: '1' }}></div>
            </div>

          </div>
        </div>

      </div>

      {/* Nurse Chat Slide-Out Panel */}
      {nurseChatOpen && (
        <div className="position-fixed bottom-0 end-0 m-4 shadow-lg border bg-white z-3" style={{ width: '380px', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Header */}
          <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative" style={{ width: '32px', height: '32px' }}>
                <div className="rounded-circle bg-white text-primary fw-bold d-flex align-items-center justify-content-center w-100 h-100 small shadow-sm">
                  NE
                </div>
                <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle"></span>
              </div>
              <div>
                <h6 className="fw-bold mb-0 text-white leading-tight">Nurse Support</h6>
                <small className="text-white-50">Online • Emily</small>
              </div>
            </div>
            <button
              onClick={() => setNurseChatOpen(false)}
              className="btn-close btn-close-white"
              aria-label="Close Chat"
            ></button>
          </div>

          {/* Messages Outlet */}
          <div className="p-3 bg-light overflow-y-auto" style={{ height: '280px' }}>
            {chatHistory.map((msg, index) => (
              <div key={index} className={`d-flex mb-3 ${msg.sender === 'patient' ? 'justify-content-end' : 'justify-content-start'}`}>
                <div
                  className={`p-2.5 rounded-3 max-w-75 small ${
                    msg.sender === 'patient' ? 'bg-primary text-white' : 'bg-white text-dark border shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-top bg-white d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-neo py-2 shadow-none border small"
              placeholder="Type your message..."
              value={nurseMessage}
              onChange={(e) => setNurseMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary-neo d-flex align-items-center justify-content-center p-2.5 rounded-3">
              <i className="bi bi-send-fill fs-6"></i>
            </button>
          </form>
        </div>
      )}

    </PatientLayout>
  );
}

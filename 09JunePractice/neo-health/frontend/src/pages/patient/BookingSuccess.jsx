import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Load transaction parameters from checkout state
  const [docName, setDocName] = useState("Dr. Sarah Mitchell");
  const [docTitle, setDocTitle] = useState("Senior Cardiologist • Specialist in Preventative Care");
  const [docAvatar, setDocAvatar] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuBFhPG8URt8YvtyOESibuZmgvrwWrfpEZgK9t3hPGFmgoRDkFiPK36gB4By9f86OQKpCuQLDLN1hlDgKfVz88sKVmevWEhCN9PLykxdaqSbejXt_VUDkCxmPZ4aHI-KX2ruysf9uzndJzECbMz516CsDB3Xu5hIMWc35AaKEKz4rNrX8sXk-6wEMgfIlSQmarjFHiisJYxV7SZPy2dwLfnsy52v0HHpEjjnk-juAzA5R_QHhq0S0o6ibk8kf7S7jUkgHh1RYNZXueA");
  const [bookingDate, setBookingDate] = useState("Thursday, October 24, 2024");
  const [bookingTime, setBookingTime] = useState("10:30 AM EST");
  const [fee, setFee] = useState(150.00);

  useEffect(() => {
    const savedName = localStorage.getItem('success_doc_name');
    const savedTitle = localStorage.getItem('success_doc_title');
    const savedAvatar = localStorage.getItem('success_doc_avatar');
    const savedDate = localStorage.getItem('temp_booking_date');
    const savedTime = localStorage.getItem('temp_booking_time');

    if (savedName) setDocName(savedName);
    if (savedTitle) setDocTitle(savedTitle);
    if (savedAvatar) setDocAvatar(savedAvatar);
    if (savedDate) setBookingDate(savedDate);
    if (savedTime) setBookingTime(savedTime);
    if (savedName && savedName.includes("Michael Chen")) {
      setFee(120.00);
    }
  }, []);

  const serviceTax = 12.50;
  const totalPaid = fee + serviceTax;
  const meetingLink = `meet.neohealth.com/j-${docName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-lobby`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light justify-content-center py-5">
      {/* React 19 Document Metadata */}
      <title>Booking Confirmed | Neo-Health Success</title>
      <meta name="description" content="Your telehealth appointment booking and payment have been confirmed. Secure video consultation coordinates generated." />

      {/* Background Decorative Blur Blobs */}
      <div className="position-fixed inset-0 pointer-events-none" style={{ zIndex: '0' }}>
        <div className="position-absolute bg-primary opacity-5 rounded-circle" style={{ width: '40vw', height: '40vw', top: '-10%', right: '-5%', filter: 'blur(120px)' }}></div>
        <div className="position-absolute bg-success opacity-5 rounded-circle" style={{ width: '40vw', height: '40vw', bottom: '-10%', left: '-5%', filter: 'blur(120px)' }}></div>
      </div>

      <main className="container position-relative z-1" style={{ maxWidth: '800px' }}>
        {/* Success Header Icon */}
        <div className="text-center mb-4">
          <div className="position-relative d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '120px', height: '120px' }}>
            <div className="position-absolute inset-0 bg-success bg-opacity-10 rounded-circle animate-pulse"></div>
            <div 
              className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow"
              style={{ width: '80px', height: '80px', animation: 'scale-check 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
            >
              <i className="bi bi-check2 fs-1"></i>
            </div>
          </div>
          <h1 className="fw-bold text-dark mb-1">Payment Successful!</h1>
          <p className="text-secondary max-w-md mx-auto small">
            Your consultation has been confirmed. A receipt and calendar invite have been sent to your email.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="row g-4">
          {/* Column 1: Primary Booking Details */}
          <div className="col-12 col-md-8">
            <div className="neo-glass-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <span className="small fw-bold text-primary tracking-wider text-uppercase">Appointment Details</span>
                <span className="text-secondary small">Ref: #NH-92841</span>
              </div>

              {/* Doctor snippet */}
              <div className="d-flex gap-3 align-items-start mb-4">
                <img
                  alt={docName}
                  className="rounded-3 border flex-shrink-0"
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                  src={docAvatar}
                />
                <div>
                  <h5 className="fw-bold text-dark mb-0">{docName}</h5>
                  <p className="text-secondary small mb-0">{docTitle}</p>
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                {/* Date / Time */}
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light border rounded-circle p-2 d-flex align-items-center justify-content-center text-primary" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div>
                    <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Date & Time</small>
                    <span className="fw-bold text-dark small">{bookingDate} • {bookingTime}</span>
                  </div>
                </div>

                {/* Consultation Link */}
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light border rounded-circle p-2 d-flex align-items-center justify-content-center text-primary" style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-camera-video"></i>
                  </div>
                  <div className="flex-grow-1 d-flex justify-content-between align-items-center min-w-0">
                    <div className="min-w-0">
                      <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Consultation Link</small>
                      <span className="text-primary small fw-semibold text-truncate d-block">{meetingLink}</span>
                    </div>
                    <button 
                      className={`btn btn-sm ${copied ? 'btn-success' : 'btn-light border'} p-2 rounded-3 d-flex align-items-center justify-content-center ms-2`} 
                      style={{ width: '32px', height: '32px' }}
                      onClick={handleCopyLink}
                      type="button"
                      title="Copy lobby link"
                    >
                      <i className={`bi ${copied ? 'bi-check-lg' : 'bi-content-copy'}`}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Payment Receipt & Next Step */}
          <div className="col-12 col-md-4 d-flex flex-column gap-4">
            
            {/* Payment Summary */}
            <div className="neo-glass-card p-4">
              <span className="small fw-bold text-secondary tracking-wider text-uppercase d-block mb-3">Payment Summary</span>
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex justify-content-between text-secondary">
                  <span>Consultation Fee</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Service Tax</span>
                  <span>${serviceTax.toFixed(2)}</span>
                </div>

                <hr className="my-2 opacity-25" />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark">Total Paid</span>
                  <span className="fw-bold text-primary">${totalPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-3 bg-success bg-opacity-10 text-success p-2 rounded-3 border border-success border-opacity-10 d-flex align-items-center justify-content-center gap-2 small fw-semibold">
                <i className="bi bi-patch-check-fill"></i>
                <span className="uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Payment Verified</span>
              </div>
            </div>

            {/* Medical history next step */}
            <Link to="/patient/profile" className="text-decoration-none">
              <div className="bg-primary text-white p-4 rounded-4 shadow-sm position-relative overflow-hidden group cursor-pointer border-0">
                <div className="position-relative z-1">
                  <span className="small text-white text-opacity-75 text-uppercase fw-semibold tracking-wider d-block mb-1">Next Step</span>
                  <h5 className="fw-bold mb-2">Complete your medical history</h5>
                  <span className="badge bg-white text-primary rounded-pill px-2.5 py-1 fw-bold" style={{ fontSize: '0.7rem' }}>
                    Approx. 3 mins
                  </span>
                </div>
                <div className="position-absolute border-0 opacity-10" style={{ right: '-15px', bottom: '-15px', fontSize: '5rem', lineHeight: '0' }}>
                  <i className="bi bi-file-earmark-medical"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Navigation Actions */}
        <div className="mt-5 d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <button 
            className="btn btn-primary-neo btn-lg px-4 py-2.5 w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2 shadow" 
            onClick={() => navigate('/patient/appointments/marcus-thorne')}
            id="success-btn-view"
          >
            <span>View Appointment</span>
            <i className="bi bi-arrow-right"></i>
          </button>
          <button 
            className="btn btn-light border px-4 py-2.5 w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2" 
            onClick={() => navigate('/patient/dashboard')}
            id="success-btn-dashboard"
          >
            <i className="bi bi-grid-1x2"></i>
            <span>Go to Dashboard</span>
          </button>
        </div>

        {/* Footer Support Anchor */}
        <div className="mt-4 text-center">
          <p className="text-secondary small mb-0">
            Need help with your booking? <Link to="/contact" className="text-primary fw-bold text-decoration-none hover-underline">Contact Support</Link>
          </p>
        </div>
      </main>

      <style>{`
        @keyframes scale-check {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

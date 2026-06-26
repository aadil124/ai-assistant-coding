import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function BookingSummary() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load slot data from Select Time Slot stage
  const [bookingDate, setBookingDate] = useState("Monday, Oct 24");
  const [bookingTime, setBookingTime] = useState("10:30 AM — 11:15 AM");

  useEffect(() => {
    const savedDate = localStorage.getItem('temp_booking_date');
    const savedTime = localStorage.getItem('temp_booking_time');
    if (savedDate) setBookingDate(savedDate);
    if (savedTime) setBookingTime(savedTime);
  }, []);

  // Mock doctor details based on ID
  const doctorData = {
    id: id || "marcus-thorne",
    name: id === "michael-chen" ? "Dr. Michael Chen" : "Dr. Marcus Thorne",
    title: id === "michael-chen" ? "Senior Cardiologist, MD" : "Senior Cardiologist & Surgeon",
    specialty: "Cardiologist Specialist",
    hospital: id === "michael-chen" ? "St. Jude Medical Center, NY" : "St. Mary's General Hospital",
    experience: id === "michael-chen" ? "15 years experience" : "12 years experience",
    rating: "4.9",
    reviewsCount: id === "michael-chen" ? "120" : "1.2k",
    feeVal: id === "michael-chen" ? 120.00 : 150.00,
    avatar: id === "michael-chen" 
      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB5u9WNQi9wmrl3xH-0ZnySJa5mowvwB8eHWI06cNOVKdgpPHsZ2q2HlyYRzBqcZitqZKnAWUF9qYvgiU6Nc7YBWX76oTFsNt3-4lVbOWrPfkFuhXZnYiIzn2wuPV-bCe1YHDCreia_JKDc7nyP6RXAZ4QULVoSCmWmt43VDJLLcye6TI4XVKQQHrGgDgsMIexZStawFvSKTF6U_MVXTo1Ys_YeJjAwcy7lxQX0NNKirLkxsGEyvpHu7_duuw6O73Q-qZCOoTBxT2w"
      : "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU"
  };

  const serviceFee = 12.50;
  const totalFee = doctorData.feeVal + serviceFee;

  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.cardholderName.trim() || !formData.cardNumber || !formData.expiryDate || !formData.cvc) {
      setError('Please complete all card payment fields.');
      return;
    }

    setProcessing(true);

    // Save final details for success screen
    localStorage.setItem('success_doc_name', doctorData.name);
    localStorage.setItem('success_doc_title', doctorData.title);
    localStorage.setItem('success_doc_avatar', doctorData.avatar);
    localStorage.setItem('success_visit_reason', formData.reason || 'General checkup');

    setTimeout(() => {
      setProcessing(false);
      navigate('/patient/booking/success');
    }, 2000);
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Confirm Booking & Checkout | Neo-Health</title>
      <meta name="description" content="Review your consultation date, secure telehealth call details, and process payment securely via Stripe." />

      <div className="container-fluid p-0">
        {/* Back Link */}
        <div className="mb-4 d-flex align-items-center gap-2">
          <button 
            className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center" 
            onClick={() => window.history.back()}
            style={{ width: '40px', height: '40px' }}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <span className="text-secondary small fw-medium">Back to Date & Slot Selection</span>
        </div>

        <div className="row g-4">
          {/* Left Column: Confirmation specifications */}
          <div className="col-12 col-lg-7 d-flex flex-column gap-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Confirm your booking</h2>
              <p className="text-secondary small">Please review your appointment details and consultation summary before proceeding to payment.</p>
            </div>

            <div className="row g-3">
              {/* Doctor details card */}
              <div className="col-12">
                <div className="neo-glass-card p-4 d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start">
                  <img
                    alt={doctorData.name}
                    className="rounded-3 border"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    src={doctorData.avatar}
                  />
                  <div className="text-center text-md-start">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-2 px-3 py-1 text-uppercase small">
                      {doctorData.specialty}
                    </span>
                    <h4 className="fw-bold text-dark mb-1">{doctorData.name}</h4>
                    <p className="text-secondary small mb-3">{doctorData.hospital} • {doctorData.experience}</p>
                    
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 small">
                      <span className="d-flex align-items-center gap-1">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="fw-bold text-dark">{doctorData.rating}</span>
                        <span className="text-secondary">({doctorData.reviewsCount} reviews)</span>
                      </span>
                      <span className="d-flex align-items-center gap-1 text-success fw-semibold">
                        <i className="bi bi-shield-check"></i>
                        <span>Board Certified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment info card */}
              <div className="col-12 col-md-6">
                <div className="neo-glass-card p-4 h-100 d-flex flex-column gap-2 justify-content-center">
                  <div className="d-flex align-items-center gap-2 text-primary small fw-bold">
                    <i className="bi bi-calendar-event"></i>
                    <span>DATE & TIME</span>
                  </div>
                  <h4 className="fw-bold text-dark mt-2 mb-1 fs-5">{bookingDate}</h4>
                  <p className="text-secondary small mb-0">{bookingTime}</p>
                  <small className="text-secondary mt-1" style={{ fontSize: '0.75rem' }}>(GMT -05:00) Eastern Time</small>
                </div>
              </div>

              {/* Consultation type card */}
              <div className="col-12 col-md-6">
                <div className="neo-glass-card p-4 h-100 d-flex flex-column gap-2 justify-content-center">
                  <div className="d-flex align-items-center gap-2 text-primary small fw-bold">
                    <i className="bi bi-camera-video"></i>
                    <span>CONSULTATION TYPE</span>
                  </div>
                  <h4 className="fw-bold text-dark mt-2 mb-1 fs-5">Video Call</h4>
                  <p className="text-secondary small mb-0">Secure HD Telehealth</p>
                  <small className="text-success fw-bold mt-1 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Encrypted & HIPAA Compliant</span>
                  </small>
                </div>
              </div>

              {/* Notes input */}
              <div className="col-12">
                <div className="neo-glass-card p-4">
                  <label htmlFor="reason" className="form-label small fw-bold text-secondary uppercase tracking-wider mb-2">
                    REASON FOR VISIT (OPTIONAL)
                  </label>
                  <textarea
                    className="form-control form-control-neo small"
                    id="reason"
                    name="reason"
                    rows="3"
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    value={formData.reason}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout forms */}
          <div className="col-12 col-lg-5">
            <div className="neo-glass-card p-4 shadow-sm sticky-top" style={{ top: '80px' }}>
              <h4 className="fw-bold text-dark mb-4">Payment Details</h4>

              {/* Prices breakdown */}
              <div className="d-flex flex-column gap-3 mb-4 small">
                <div className="d-flex justify-content-between text-secondary">
                  <span>Consultation Fee</span>
                  <span>${doctorData.feeVal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Medical Record Processing</span>
                  <span className="text-success fw-bold">Free</span>
                </div>
                
                <hr className="my-2 opacity-25" />

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold text-dark mb-0">Total</h5>
                  <h4 className="fw-bold text-primary mb-0">${totalFee.toFixed(2)}</h4>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger small py-2 d-flex align-items-center gap-2 mb-3" role="alert" id="checkout-error-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {/* Payment form */}
              <form onSubmit={handleSubmit} id="payment-form" className="d-flex flex-column gap-3">
                <div>
                  <label htmlFor="cardholderName" className="form-label small fw-bold text-dark mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-control form-control-neo"
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="form-label small fw-bold text-dark mb-1">Card Information</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-secondary">
                      <i className="bi bi-credit-card"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-neo border-start-0"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label htmlFor="expiryDate" className="form-label small fw-bold text-dark mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM / YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="cvc" className="form-label small fw-bold text-dark mb-1">CVC</label>
                    <input
                      type="password"
                      className="form-control form-control-neo"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      maxLength="4"
                      value={formData.cvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-1 py-2 text-secondary small text-center" style={{ fontSize: '0.8rem' }}>
                  <i className="bi bi-lock-fill text-success"></i>
                  <span>Payments are secure and encrypted by Stripe</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-neo w-100 py-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  id="checkout-pay-btn"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay and Confirm</span>
                      <i className="bi bi-shield-check"></i>
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
                By confirming, you agree to our <a href="#" className="text-primary text-decoration-none underline">Terms of Service</a> and <a href="#" className="text-primary text-decoration-none underline">Cancellation Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .input-group:focus-within .input-group-text {
          border-color: var(--primary-container) !important;
        }
      `}</style>
    </PatientLayout>
  );
}

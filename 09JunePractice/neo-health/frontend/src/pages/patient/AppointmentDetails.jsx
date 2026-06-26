import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import ErrorBanner from '../../components/shared/ErrorBanner.jsx';

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    // Dynamic fetch simulation based on route params and localStorage
    const savedName = localStorage.getItem('success_doc_name') || "Dr. Sarah Jenkins";
    const savedDate = localStorage.getItem('temp_booking_date') || "Thursday, Oct 24, 2024";
    const savedTime = localStorage.getItem('temp_booking_time') || "10:30 AM - 11:00 AM";
    const savedAvatar = localStorage.getItem('success_doc_avatar') || "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I";

    const database = {
      'marcus-thorne': {
        appointmentId: "NH-930218",
        doctorId: "marcus-thorne",
        doctorName: "Dr. Marcus Thorne",
        doctorTitle: "Senior Cardiologist & Surgeon",
        doctorSpecialty: "Cardiology",
        doctorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU",
        date: savedDate,
        time: savedTime,
        type: "Telehealth Video",
        duration: "30 Minutes",
        status: "Confirmed",
        paymentStatus: "Paid",
        consultationFee: 150.00,
        vatFee: 12.00,
        totalPaid: 162.00,
        stripeSessionId: "cs_test_b1d2e3f4"
      },
      'default': {
        appointmentId: "NH-829104",
        doctorId: "default",
        doctorName: savedName,
        doctorTitle: "Senior Cardiologist",
        doctorSpecialty: "Cardiology",
        doctorAvatar: savedAvatar,
        date: savedDate,
        time: savedTime,
        type: "Telehealth Video",
        duration: "30 Minutes",
        status: "Confirmed",
        paymentStatus: "Paid",
        consultationFee: 150.00,
        vatFee: 12.00,
        totalPaid: 162.00,
        stripeSessionId: "cs_test_a9e8b7c6"
      }
    };

    const record = database[id] || database['default'];
    setAppointment(record);
  }, [id]);

  const handleCancelAppointment = () => {
    if (window.confirm("Are you sure you want to cancel this appointment? Refunds are subject to our 24-hour late cancellation threshold rule.")) {
      setCancelling(true);
      setError('');
      setTimeout(() => {
        setCancelling(false);
        setAppointment(prev => ({
          ...prev,
          status: 'Cancelled',
          paymentStatus: 'Refunded'
        }));
        alert("Your appointment has been cancelled successfully, and your payment was refunded via Stripe.");
      }, 1000);
    }
  };

  const handleDownloadInvoice = () => {
    // Generate simple mock invoice text download trigger
    const invoiceContent = `
=============================================
             NEO-HEALTH INVOICE
=============================================
Invoice ID: INV-${appointment?.appointmentId}
Payment Session: ${appointment?.stripeSessionId}
Date Generated: ${new Date().toLocaleDateString()}
=============================================
Patient: Alex Johnson (ID: #82910)
Doctor: ${appointment?.doctorName}
Specialty: ${appointment?.doctorSpecialty}
Date: ${appointment?.date}
Time: ${appointment?.time}
Type: ${appointment?.type}
=============================================
Breakdown:
Consultation Fee: $${appointment?.consultationFee.toFixed(2)}
VAT (Tax): $${appointment?.vatFee.toFixed(2)}
---------------------------------------------
TOTAL PAID: $${appointment?.totalPaid.toFixed(2)}
=============================================
Status: ${appointment?.paymentStatus}
=============================================
    `;
    const element = document.createElement("a");
    const file = new Blob([invoiceContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${appointment?.appointmentId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!appointment) {
    return (
      <DashboardLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-secondary">Loading appointment details...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* React 19 Document Metadata */}
      <title>Appointment Details | Neo-Health Bookings</title>
      <meta name="description" content="View diagnostic details, Stripe payments transactions, and launch consultation WebRTC lobbies." />

      <div className="container-fluid p-0">
        {/* Back Link */}
        <div className="mb-4 d-flex align-items-center gap-2">
          <button
            className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center"
            onClick={() => navigate('/patient/appointments')}
            style={{ width: '40px', height: '40px' }}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <span className="text-secondary small fw-medium">Back to Appointment List</span>
        </div>

        {/* Page Header */}
        <PageHeader
          title="Appointment Summary"
          subtitle={`Details for Booking Reference #${appointment.appointmentId}`}
        />

        <ErrorBanner message={error} onClose={() => setError('')} />

        <div className="row g-4">
          {/* Left Column: Doctor Info & Booking Details */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Doctor Profile card */}
            <SectionCard title="Consulting Specialist">
              <div className="d-flex flex-column flex-sm-row align-items-start gap-4">
                <img
                  alt={appointment.doctorName}
                  className="rounded-4 border object-fit-cover shadow-sm"
                  style={{ width: '100px', height: '100px' }}
                  src={appointment.doctorAvatar}
                />
                <div className="flex-grow-1">
                  <h3 className="fw-bold text-dark fs-5 mb-1">{appointment.doctorName}</h3>
                  <p className="text-primary fw-medium small mb-2">{appointment.doctorTitle}</p>
                  <p className="text-secondary small mb-3">
                    Board-certified in cardiovascular medicine, representing Neo-Health virtual clinics.
                  </p>
                  <button
                    onClick={() => navigate(`/patient/doctor/${appointment.doctorId}`)}
                    className="btn btn-secondary-neo py-1.5 px-3 small border"
                  >
                    View Doctor Profile
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* Appointment Details Card */}
            <SectionCard title="Consultation Schedule Details">
              <div className="row g-4 text-start">
                <div className="col-6 col-md-3">
                  <span className="text-secondary small d-block mb-1">DATE</span>
                  <span className="fw-bold text-dark">{appointment.date}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary small d-block mb-1">TIME SLOT</span>
                  <span className="fw-bold text-dark">{appointment.time}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary small d-block mb-1">SESSION DURATION</span>
                  <span className="fw-bold text-dark">{appointment.duration}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-secondary small d-block mb-1">CONSULT TYPE</span>
                  <span className="fw-bold text-primary">{appointment.type}</span>
                </div>
              </div>

              <hr className="my-4 opacity-25" />

              <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <span className="text-secondary small d-block mb-1">BOOKING STATUS</span>
                    <StatusBadge status={appointment.status} />
                  </div>
                  <div className="border-start ps-3">
                    <span className="text-secondary small d-block mb-1">PAYMENT STATUS</span>
                    <StatusBadge status={appointment.paymentStatus} />
                  </div>
                </div>

                {appointment.status === 'Confirmed' && (
                  <button
                    onClick={() => navigate(`/patient/consultation/waiting-room/${appointment.doctorId}`)}
                    className="btn btn-primary-neo d-flex align-items-center gap-2 py-2 px-4 shadow-sm"
                    id="details-btn-join"
                  >
                    <i className="bi bi-camera-video-fill"></i>
                    <span>Join Waiting Room</span>
                  </button>
                )}
              </div>
            </SectionCard>
          </div>

          {/* Right Column: Payment & Actions */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Invoice Card */}
            <SectionCard title="Payment Summary">
              <div className="d-flex flex-column gap-2.5 small">
                <div className="d-flex justify-content-between text-secondary">
                  <span>Consultation Fee</span>
                  <span className="fw-bold text-dark">${appointment.consultationFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Platform VAT (10%)</span>
                  <span className="fw-bold text-dark">${appointment.vatFee.toFixed(2)}</span>
                </div>
                <hr className="my-2 opacity-25" />
                <div className="d-flex justify-content-between fs-6 fw-bold">
                  <span className="text-dark">Total Amount Paid</span>
                  <span className="text-primary">${appointment.totalPaid.toFixed(2)}</span>
                </div>
                <p className="text-secondary small mt-2 mb-0 font-italic" style={{ fontSize: '0.75rem' }}>
                  Billing processed securely via Stripe. Transaction token: {appointment.stripeSessionId}.
                </p>
              </div>

              {appointment.paymentStatus === 'Paid' && (
                <button
                  onClick={handleDownloadInvoice}
                  className="btn btn-secondary-neo w-100 py-2.5 mt-4 d-flex align-items-center justify-content-center gap-2 border bg-transparent"
                  id="details-btn-invoice"
                >
                  <i className="bi bi-download"></i>
                  <span>Download Invoice Receipt</span>
                </button>
              )}
            </SectionCard>

            {/* Quick Helper Actions */}
            {appointment.status === 'Confirmed' && (
              <div className="neo-glass-card p-4 border shadow-sm bg-danger-subtle bg-opacity-10 border-danger border-opacity-10">
                <h5 className="fw-bold text-danger mb-2 fs-6">Manage Reservation</h5>
                <p className="text-secondary small mb-3">
                  Need to cancel? Confirm cancellations at least 24 hours prior to avoid platform fee lock.
                </p>
                <button
                  onClick={handleCancelAppointment}
                  disabled={cancelling}
                  className="btn btn-danger w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 text-white border-0"
                  id="details-btn-cancel"
                >
                  {cancelling ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-calendar-x-fill"></i>
                      <span>Cancel Appointment</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

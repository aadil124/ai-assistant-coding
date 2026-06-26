import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function SelectSlot() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock doctor details based on ID
  const doctorData = {
    id: id || "marcus-thorne",
    name: id === "michael-chen" ? "Dr. Michael Chen" : "Dr. Marcus Thorne",
    title: id === "michael-chen" ? "Senior Cardiologist, MD" : "Senior Cardiologist & Surgeon",
    rating: "4.9",
    reviewsCount: id === "michael-chen" ? "120+" : "1.2k",
    fee: id === "michael-chen" ? "$120.00" : "$150.00",
    duration: "30 Minutes",
    avatar: id === "michael-chen" 
      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB5u9WNQi9wmrl3xH-0ZnySJa5mowvwB8eHWI06cNOVKdgpPHsZ2q2HlyYRzBqcZitqZKnAWUF9qYvgiU6Nc7YBWX76oTFsNt3-4lVbOWrPfkFuhXZnYiIzn2wuPV-bCe1YHDCreia_JKDc7nyP6RXAZ4QULVoSCmWmt43VDJLLcye6TI4XVKQQHrGgDgsMIexZStawFvSKTF6U_MVXTo1Ys_YeJjAwcy7lxQX0NNKirLkxsGEyvpHu7_duuw6O73Q-qZCOoTBxT2w"
      : "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU"
  };

  const [selectedDay, setSelectedDay] = useState("02"); // default selected October 02
  const [selectedTime, setSelectedTime] = useState(null);
  const [processing, setProcessing] = useState(false);

  const days = [
    { num: "24", status: "disabled" },
    { num: "25", status: "disabled" },
    { num: "26", status: "disabled" },
    { num: "27", status: "disabled" },
    { num: "28", status: "disabled" },
    { num: "29", status: "disabled" },
    { num: "30", status: "available" },
    { num: "01", status: "available" },
    { num: "02", status: "available" },
    { num: "03", status: "available" },
    { num: "04", status: "available" },
    { num: "05", status: "booked" },
    { num: "06", status: "booked" },
    { num: "07", status: "available" },
  ];

  const timeSlots = [
    { time: "09:00 AM", status: "available" },
    { time: "09:45 AM", status: "available" },
    { time: "10:30 AM", status: "available" },
    { time: "11:15 AM", status: "available" },
    { time: "02:00 PM", status: "available" },
    { time: "02:45 PM", status: "booked" },
    { time: "03:30 PM", status: "available" },
    { time: "04:15 PM", status: "available" }
  ];

  const getFullDateString = (dayNum) => {
    const isOct = Number(dayNum) >= 24;
    return `${isOct ? 'October' : 'November'} ${dayNum}, 2023`;
  };

  const handleContinue = () => {
    if (!selectedDay || !selectedTime) return;
    setProcessing(true);

    // Save selected booking slot details temporarily in localStorage
    localStorage.setItem('temp_booking_date', getFullDateString(selectedDay));
    localStorage.setItem('temp_booking_time', selectedTime);

    setTimeout(() => {
      setProcessing(false);
      navigate(`/patient/booking/summary/${doctorData.id}`);
    }, 1000);
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Select Time Slot | Neo-Health Bookings</title>
      <meta name="description" content="Select your preferred date and time slot for your teleconsultation." />

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
          <span className="text-secondary small fw-medium">Back to Specialist List</span>
        </div>

        {/* Bento Column Layout */}
        <div className="row g-4 items-start">
          {/* Left Column: Doctor summary card and temporary selections */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Doctor Info Card */}
            <div className="neo-glass-card p-4 text-center">
              <div className="position-relative d-inline-block mb-3">
                <img
                  alt={doctorData.name}
                  className="rounded-4 border shadow-sm"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  src={doctorData.avatar}
                />
                <span className="position-absolute bottom-0 end-0 p-1.5 bg-success border border-white rounded-circle"></span>
              </div>
              <h4 className="fw-bold text-dark mb-1">{doctorData.name}</h4>
              <p className="text-primary fw-medium mb-2 small">{doctorData.title}</p>
              
              <div className="d-flex align-items-center justify-content-center gap-1 text-warning mb-3">
                <i className="bi bi-star-fill text-warning"></i>
                <span className="text-dark fw-bold small">{doctorData.rating}</span>
                <span className="text-secondary small">({doctorData.reviewsCount} reviews)</span>
              </div>

              <hr className="my-3 opacity-25" />

              <div className="d-flex flex-column gap-2 text-start small">
                <div className="d-flex justify-content-between text-secondary">
                  <span>Consultation Fee</span>
                  <span className="fw-bold text-dark">{doctorData.fee}</span>
                </div>
                <div className="d-flex justify-content-between text-secondary">
                  <span>Duration</span>
                  <span className="fw-medium text-dark">{doctorData.duration}</span>
                </div>
              </div>
            </div>

            {/* Selection Summary Box */}
            <div 
              className={`p-4 rounded-4 border transition-all ${
                selectedDay && selectedTime 
                  ? 'bg-primary bg-opacity-10 border-primary border-opacity-50' 
                  : 'bg-light border-dashed border-secondary border-opacity-50'
              }`}
            >
              <h5 className="fw-bold text-primary d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-info-circle-fill"></i>
                <span>Booking Details</span>
              </h5>

              {!selectedTime ? (
                <p className="text-secondary small mb-0 font-italic">
                  Select an available date and time slot from the calendar to proceed.
                </p>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-3 bg-white p-2 rounded-3 border">
                    <i className="bi bi-calendar-event text-primary fs-4"></i>
                    <div>
                      <small className="text-secondary uppercase d-block" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Date</small>
                      <span className="fw-bold text-dark small">{getFullDateString(selectedDay)}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 bg-white p-2 rounded-3 border">
                    <i className="bi bi-clock-history text-primary fs-4"></i>
                    <div>
                      <small className="text-secondary uppercase d-block" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Time Slot</small>
                      <span className="fw-bold text-dark small">{selectedTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Date Calendar and Time Slots selector */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Date Calendar section */}
            <div className="neo-glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-dark mb-0">Select a Date</h4>
                  <small className="text-secondary">October 2023</small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-light btn-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }} type="button">
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button className="btn btn-light btn-sm border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }} type="button">
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Weekdays */}
                <div className="row g-2 text-center mb-2">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((wday) => (
                    <div key={wday} className="col text-secondary fw-bold" style={{ fontSize: '0.75rem' }}>{wday}</div>
                  ))}
                </div>

                {/* Days Grid - Oct/Nov mocked */}
                <div className="row row-cols-7 g-2 text-center">
                  {days.map((day, idx) => {
                    const isDisabled = day.status === "disabled";
                    const isBooked = day.status === "booked";
                    const isSelected = selectedDay === day.num && !isDisabled;

                    return (
                      <div className="col" key={idx}>
                        <button
                          type="button"
                          disabled={isDisabled || isBooked}
                          className={`w-100 py-3 rounded-3 d-flex flex-column align-items-center justify-content-center transition-all ${
                            isDisabled 
                              ? 'bg-transparent text-secondary opacity-25 cursor-not-allowed border-0' 
                              : isBooked
                              ? 'bg-light text-secondary opacity-50 cursor-not-allowed border-0'
                              : isSelected
                              ? 'border-2 border-primary bg-primary bg-opacity-10 text-primary fw-bold'
                              : 'border border-secondary border-opacity-25 hover-border-primary bg-white text-dark fw-bold'
                          }`}
                          onClick={() => {
                            setSelectedDay(day.num);
                            setSelectedTime(null); // clear time selection when date changes
                          }}
                        >
                          <span className="small">{day.num}</span>
                          {!isDisabled && (
                            <span 
                              className="rounded-circle mt-1" 
                              style={{ 
                                width: '5px', 
                                height: '5px', 
                                backgroundColor: isBooked ? 'var(--border-color)' : 'var(--secondary-color)' 
                              }}
                            ></span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend indicators */}
              <div className="d-flex align-items-center gap-4 mt-4 small">
                <div className="d-flex align-items-center gap-2">
                  <span className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: 'var(--secondary-color)' }}></span>
                  <span className="text-secondary small">Available</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="rounded-circle bg-light border" style={{ width: '8px', height: '8px' }}></span>
                  <span className="text-secondary small">Fully Booked</span>
                </div>
              </div>
            </div>

            {/* Time Slot list section */}
            <div className="neo-glass-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Available Slots</h4>
                <div className="d-flex align-items-center gap-2 text-secondary small">
                  <i className="bi bi-clock"></i>
                  <span className="fw-semibold">Local Time (EST)</span>
                </div>
              </div>

              <div className="row g-3">
                {timeSlots.map((slot, idx) => {
                  const isBooked = slot.status === "booked";
                  const isSelected = selectedTime === slot.time;

                  return (
                    <div className="col-6 col-sm-3" key={idx}>
                      <button
                        type="button"
                        disabled={isBooked}
                        className={`w-100 py-3 rounded-3 fw-bold transition-all ${
                          isBooked
                            ? 'bg-light text-secondary border-0 opacity-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white border text-dark hover-border-primary'
                        }`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue Primary Action */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className={`btn py-3 px-5 fw-bold rounded-3 d-flex align-items-center gap-3 transition-all ${
                  selectedDay && selectedTime 
                    ? 'btn-primary-neo text-white shadow' 
                    : 'btn-secondary text-secondary opacity-50 cursor-not-allowed'
                }`}
                disabled={!selectedDay || !selectedTime || processing}
                onClick={handleContinue}
                id="select-btn-continue"
              >
                {processing ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Summary</span>
                    <i className="bi bi-arrow-right"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}

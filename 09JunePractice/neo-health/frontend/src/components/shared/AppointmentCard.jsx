import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';

export default function AppointmentCard({ appointment, onCancel }) {
  const navigate = useNavigate();

  const handleStartCall = () => {
    navigate(`/doctor/consultation/${appointment.id}`);
  };

  return (
    <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between gap-3">
      <div>
        {/* Patient Profile */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}>
              {appointment.patientName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0.5 fs-6">{appointment.patientName}</h5>
              <small className="text-secondary">{appointment.patientGender}, {appointment.patientAge} Years • Symptom: {appointment.symptom || 'General Checkup'}</small>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end gap-1">
            <StatusBadge status={appointment.status} />
            <StatusBadge status={appointment.paymentStatus} />
          </div>
        </div>

        {/* Date and Time Details */}
        <div className="row g-2 bg-light p-3 rounded-3 my-2 text-start small">
          <div className="col-12 col-sm-6 d-flex align-items-center gap-2 text-secondary">
            <i className="bi bi-calendar3 text-primary fs-6"></i>
            <span className="fw-medium text-dark">{appointment.date}</span>
          </div>
          <div className="col-12 col-sm-6 d-flex align-items-center gap-2 text-secondary">
            <i className="bi bi-clock text-primary fs-6"></i>
            <span className="fw-medium text-dark">{appointment.time}</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="d-flex gap-2 pt-3 border-top border-light-subtle">
        {appointment.status === 'Confirmed' ? (
          <>
            <button
              onClick={handleStartCall}
              className="btn btn-primary-neo flex-grow-1 py-2.5 d-flex align-items-center justify-content-center gap-2 small"
            >
              <i className="bi bi-camera-video-fill"></i>
              <span>Start Consultation</span>
            </button>
            {onCancel && (
              <button
                onClick={() => onCancel(appointment.id)}
                className="btn btn-light border py-2.5 px-3 fw-medium text-danger hover-bg-danger-subtle small"
                type="button"
              >
                Cancel
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => alert(`Reviewing past charts for: ${appointment.patientName}`)}
            className="btn btn-outline-secondary flex-grow-1 py-2.5 fw-medium text-dark bg-transparent small"
          >
            Review Clinical History
          </button>
        )}
      </div>
    </div>
  );
}

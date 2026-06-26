import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SessionExpiredModal() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSessionExpired = () => {
      setShow(true);
    };

    window.addEventListener('neo-health-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('neo-health-session-expired', handleSessionExpired);
    };
  }, []);

  const handleConfirm = () => {
    setShow(false);
    // Clear storage and navigate to Login
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
    // Refresh page to clean state completely
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div 
      className="position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center z-5"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', zIndex: 10000 }}
      id="session-expired-modal-overlay"
    >
      <div 
        className="neo-glass-card border bg-white shadow-lg p-4 mx-3 animate-fade-in text-dark" 
        style={{ width: '100%', maxWidth: '400px', borderRadius: '16px' }}
        id="session-expired-dialog"
      >
        <div className="d-flex align-items-start gap-3 mb-3">
          <div 
            className="rounded-circle p-2.5 d-flex align-items-center justify-content-center bg-danger bg-opacity-10"
            style={{ width: '44px', height: '44px', flexShrink: 0 }}
          >
            <i className="bi bi-clock-history text-danger fs-4"></i>
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-1">Session Expired</h5>
            <p className="text-secondary small mb-0">
              For security, your administrative or patient terminal session has expired due to inactivity. Please log back in to restore your workspace.
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <button
            type="button"
            className="btn btn-primary-neo px-4 py-2 fw-semibold small"
            onClick={handleConfirm}
            id="session-expired-btn"
          >
            <span>Acknowledge & Sign In</span>
          </button>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: modalFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

import React from 'react';

export default function ConfirmationModal({
  show = false,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "primary", // 'primary', 'danger', 'warning', 'success'
  loading = false
}) {
  if (!show) return null;

  // Map theme styles
  const getThemeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'bi-exclamation-octagon text-danger',
          btnClass: 'btn-danger',
          iconBg: 'bg-danger bg-opacity-10'
        };
      case 'warning':
        return {
          icon: 'bi-exclamation-triangle text-warning',
          btnClass: 'btn-warning text-dark',
          iconBg: 'bg-warning bg-opacity-10'
        };
      case 'success':
        return {
          icon: 'bi-check-circle text-success',
          btnClass: 'btn-success',
          iconBg: 'bg-success bg-opacity-10'
        };
      default:
        return {
          icon: 'bi-info-circle text-primary',
          btnClass: 'btn-primary-neo',
          iconBg: 'bg-primary bg-opacity-10'
        };
    }
  };

  const themeConfig = getThemeConfig();

  return (
    <div 
      className="position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center z-5"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(4px)' }}
      id="confirmation-modal-overlay"
    >
      <div 
        className="neo-glass-card border bg-white shadow-lg p-4 mx-3 animate-fade-in" 
        style={{ width: '100%', maxWidth: '420px', borderRadius: '16px', zIndex: 1001 }}
        id="confirmation-modal-dialog"
      >
        <div className="d-flex align-items-start gap-3 mb-3">
          <div 
            className={`rounded-circle p-2.5 d-flex align-items-center justify-content-center ${themeConfig.iconBg}`}
            style={{ width: '44px', height: '44px', flexShrink: 0 }}
          >
            <i className={`bi ${themeConfig.icon} fs-4`}></i>
          </div>
          <div>
            <h5 className="fw-bold text-dark mb-1">{title}</h5>
            <p className="text-secondary small mb-0">{message}</p>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <button
            type="button"
            className="btn btn-light px-3 py-2 text-secondary fw-semibold border small"
            onClick={onCancel}
            disabled={loading}
            id="confirmation-modal-cancel-btn"
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${themeConfig.btnClass} px-4 py-2 fw-semibold small d-flex align-items-center gap-2`}
            onClick={onConfirm}
            disabled={loading}
            id="confirmation-modal-confirm-btn"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
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
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

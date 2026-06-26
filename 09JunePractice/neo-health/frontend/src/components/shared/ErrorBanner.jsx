import React from 'react';

export default function ErrorBanner({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="alert alert-danger border-danger border-opacity-20 d-flex align-items-center justify-content-between p-3 mb-4 rounded-3" role="alert">
      <div className="d-flex align-items-center gap-2 small">
        <i className="bi bi-exclamation-triangle-fill fs-5"></i>
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      )}
    </div>
  );
}

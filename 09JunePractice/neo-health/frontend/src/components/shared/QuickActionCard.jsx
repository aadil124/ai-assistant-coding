import React from 'react';

export default function QuickActionCard({ title, description, icon, onClick, actionColor = 'primary', className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`neo-glass-card p-4 border bg-white shadow-sm h-100 cursor-pointer transition-all d-flex align-items-start gap-3 ${className}`}
      style={{ cursor: 'pointer' }}
    >
      <div className={`bg-${actionColor} bg-opacity-10 text-${actionColor} p-3 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: '48px', height: '48px' }}>
        <i className={`bi ${icon} fs-4`}></i>
      </div>
      <div className="flex-grow-1">
        <h5 className="fw-bold text-dark mb-1 fs-6 d-flex align-items-center justify-content-between">
          <span>{title}</span>
          <i className="bi bi-chevron-right text-secondary small fs-7"></i>
        </h5>
        <p className="text-secondary small mb-0">{description}</p>
      </div>
    </div>
  );
}

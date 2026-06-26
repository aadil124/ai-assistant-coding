import React from 'react';

export default function SectionCard({ title, action, children, className = '', bodyClassName = 'p-4' }) {
  return (
    <div className={`neo-glass-card bg-white border shadow-sm overflow-hidden h-100 ${className}`}>
      {(title || action) && (
        <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-white bg-opacity-50">
          {title && <h5 className="fw-bold text-dark mb-0 fs-6">{title}</h5>}
          {action && <div className="card-action-container">{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </div>
  );
}

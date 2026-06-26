import React from 'react';

export default function DashboardStatCard({ title, value, icon, trend, trendType = 'success', className = '' }) {
  return (
    <div className={`neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex align-items-center justify-content-between gap-3 ${className}`}>
      <div className="d-flex align-items-center gap-3">
        <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
          <i className={`bi ${icon} fs-3`}></i>
        </div>
        <div>
          <span className="text-secondary small fw-medium text-uppercase tracking-wider d-block mb-1">{title}</span>
          <h3 className="fw-bold text-dark mb-0 fs-2">{value}</h3>
        </div>
      </div>
      {trend && (
        <span className={`badge px-2 py-1 rounded-pill small fw-semibold align-self-start ${
          trendType === 'success'
            ? 'bg-success bg-opacity-10 text-success'
            : trendType === 'warning'
            ? 'bg-warning bg-opacity-10 text-warning-emphasis'
            : 'bg-primary bg-opacity-10 text-primary'
        }`}>
          {trend}
        </span>
      )}
    </div>
  );
}

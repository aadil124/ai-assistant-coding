import React from 'react';

export default function MetricCard({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  color = '210, 100%, 50%', // HSL representation: '210, 100%, 50%' (Primary blue)
  description,
  loading = false
}) {
  if (loading) {
    return (
      <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between position-relative overflow-hidden" style={{ minHeight: '130px' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="w-75">
            <div className="placeholder-glow mb-2">
              <span className="placeholder col-8 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
            </div>
            <div className="placeholder-glow">
              <span className="placeholder col-5 bg-dark opacity-50 rounded" style={{ height: '28px' }}></span>
            </div>
          </div>
          <div className="placeholder bg-secondary opacity-25 rounded-3" style={{ width: '48px', height: '48px' }}></div>
        </div>
        <div className="placeholder-glow">
          <span className="placeholder col-6 bg-secondary opacity-25 rounded" style={{ height: '12px' }}></span>
        </div>
      </div>
    );
  }

  // Generate HSL color variations
  const accentBg = `hsla(${color}, 0.08)`;
  const accentText = `hsl(${color})`;
  const accentBorder = `hsla(${color}, 0.2)`;

  return (
    <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between position-relative overflow-hidden transition-all hover-border-primary" style={{ minHeight: '130px' }}>
      {/* Visual Accent Bar */}
      <div 
        className="position-absolute top-0 start-0 end-0" 
        style={{ height: '4px', backgroundColor: accentText }}
      ></div>

      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <span className="text-secondary small fw-semibold text-uppercase tracking-wider d-block mb-1">{title}</span>
          <h3 className="fw-bold text-dark mb-0 fs-3">{value}</h3>
        </div>
        <div 
          className="rounded-3 d-flex align-items-center justify-content-center border" 
          style={{ 
            width: '48px', 
            height: '48px', 
            backgroundColor: accentBg, 
            color: accentText,
            borderColor: accentBorder
          }}
        >
          <i className={`bi ${icon} fs-4`}></i>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-light-subtle">
        {description && <span className="text-secondary small fw-medium">{description}</span>}
        {trend && (
          <span className={`badge px-2 py-1 rounded-pill small fw-semibold ms-auto ${
            trendUp
              ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-20'
              : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20'
          }`}>
            <i className={`bi ${trendUp ? 'bi-arrow-up-right' : 'bi-arrow-down-right'} me-1`}></i>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

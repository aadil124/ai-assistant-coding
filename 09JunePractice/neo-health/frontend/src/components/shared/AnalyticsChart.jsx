import React, { useState } from 'react';

export default function AnalyticsChart({
  title = "Platform Activity",
  subtitle = "Interactive statistics overview",
  data = [
    { label: 'Jan', value: 4200, secondary: 24 },
    { label: 'Feb', value: 5100, secondary: 30 },
    { label: 'Mar', value: 6800, secondary: 42 },
    { label: 'Apr', value: 7200, secondary: 48 },
    { label: 'May', value: 9100, secondary: 65 },
    { label: 'Jun', value: 12500, secondary: 88 },
    { label: 'Jul', value: 11000, secondary: 78 },
    { label: 'Aug', value: 13200, secondary: 92 },
    { label: 'Sep', value: 14500, secondary: 110 },
  ],
  valuePrefix = "$",
  valueSuffix = "",
  secondaryPrefix = "",
  secondarySuffix = " appts",
  primaryLabel = "Revenue",
  secondaryLabel = "Appointments"
}) {
  const [activeMetric, setActiveMetric] = useState('primary'); // 'primary' or 'secondary'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Extract values based on active metric selection
  const values = data.map(item => activeMetric === 'primary' ? item.value : item.secondary);
  const maxValue = Math.max(...values, 1);

  // Formatting helper
  const formatVal = (val) => {
    if (activeMetric === 'primary') {
      return `${valuePrefix}${val.toLocaleString()}${valueSuffix}`;
    }
    return `${secondaryPrefix}${val.toLocaleString()}${secondarySuffix}`;
  };

  return (
    <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h5 className="fw-bold text-dark mb-1">{title}</h5>
          <small className="text-secondary">{subtitle}</small>
        </div>
        
        {/* Toggle Controls */}
        <div className="btn-group p-1 bg-light rounded-pill border" role="group">
          <button
            type="button"
            className={`btn btn-sm py-1.5 px-3 rounded-pill fw-medium border-0 transition-all ${
              activeMetric === 'primary' ? 'btn-primary-neo' : 'text-secondary bg-transparent'
            }`}
            onClick={() => setActiveMetric('primary')}
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            className={`btn btn-sm py-1.5 px-3 rounded-pill fw-medium border-0 transition-all ${
              activeMetric === 'secondary' ? 'btn-primary-neo' : 'text-secondary bg-transparent'
            }`}
            onClick={() => setActiveMetric('secondary')}
          >
            {secondaryLabel}
          </button>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="flex-grow-1 d-flex flex-column justify-content-end" style={{ minHeight: '260px' }}>
        
        {/* SVG/CSS Line/Area / Bar Hybrid Chart */}
        <div className="d-flex align-items-end justify-content-between w-100 px-2 position-relative" style={{ height: '220px' }}>
          
          {/* Horizontal Gridlines */}
          <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-between pointer-events-none opacity-50 z-0">
            <div className="border-bottom w-100" style={{ borderStyle: 'dashed' }}></div>
            <div className="border-bottom w-100" style={{ borderStyle: 'dashed' }}></div>
            <div className="border-bottom w-100" style={{ borderStyle: 'dashed' }}></div>
            <div className="border-bottom w-100" style={{ borderStyle: 'dashed' }}></div>
          </div>

          {/* Bar rendering */}
          {data.map((item, index) => {
            const val = activeMetric === 'primary' ? item.value : item.secondary;
            const heightPercent = `${Math.max((val / maxValue) * 100, 8)}%`;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="d-flex flex-column align-items-center flex-grow-1 position-relative z-1 px-1"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip Popup */}
                {isHovered && (
                  <div 
                    className="position-absolute bg-dark text-white text-center rounded py-1.5 px-2.5 shadow-sm transition-all"
                    style={{
                      bottom: `calc(${heightPercent} + 12px)`,
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      fontWeight: 600
                    }}
                  >
                    {formatVal(val)}
                    <div className="position-absolute start-50 translate-middle-x bg-dark" style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', bottom: '-3px' }}></div>
                  </div>
                )}

                {/* Animated Column Bar */}
                <div
                  className="w-100 rounded-top transition-all"
                  style={{
                    height: heightPercent,
                    maxHeight: '100%',
                    background: isHovered 
                      ? 'linear-gradient(180deg, var(--primary-container) 0%, rgba(37, 99, 235, 0.4) 100%)'
                      : 'linear-gradient(180deg, var(--primary-color) 0%, rgba(0, 74, 198, 0.2) 100%)',
                    boxShadow: isHovered ? '0 4px 12px rgba(0, 74, 198, 0.25)' : 'none',
                    maxWidth: '45px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* X Axis Labels */}
        <div className="d-flex justify-content-between border-top mt-2 pt-2 px-2 text-secondary fw-semibold text-uppercase tracking-wider" style={{ fontSize: '10px' }}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`text-center flex-grow-1 ${hoveredIndex === index ? 'text-primary' : ''}`}
              style={{ maxWidth: '45px' }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

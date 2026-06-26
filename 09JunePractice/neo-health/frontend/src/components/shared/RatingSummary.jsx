import React from 'react';

export default function RatingSummary({ average, totalReviews, distribution = [85, 10, 3, 2, 0] }) {
  return (
    <div className="neo-glass-card p-4 border bg-white shadow-sm h-100">
      <div className="row g-4 align-items-center">
        {/* Big score */}
        <div className="col-12 col-sm-4 text-center border-sm-end border-light-subtle">
          <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '3.5rem' }}>{average}</h1>
          <div className="d-flex text-warning gap-1 justify-content-center mb-2 fs-5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`bi ${i < Math.round(average) ? 'bi-star-fill' : 'bi-star'}`}></i>
            ))}
          </div>
          <small className="text-secondary tracking-wide fw-semibold d-block text-uppercase">
            {totalReviews} Ratings
          </small>
        </div>

        {/* Breakdown progress bars */}
        <div className="col-12 col-sm-8">
          <div className="d-flex flex-column gap-2">
            {distribution.map((percentage, idx) => {
              const stars = 5 - idx;
              return (
                <div key={stars} className="d-flex align-items-center gap-3 small">
                  <span className="text-secondary fw-semibold text-nowrap" style={{ width: '45px' }}>
                    {stars} Star
                  </span>
                  <div className="progress flex-grow-1" style={{ height: '8px' }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="text-secondary text-end" style={{ width: '35px' }}>
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

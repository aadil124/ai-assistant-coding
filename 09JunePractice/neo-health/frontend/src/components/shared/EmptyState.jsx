import React from 'react';

export default function EmptyState({
  icon = 'bi-folder-x',
  title = 'No records found',
  description = 'There are no active records matching your criteria in this view.',
  actionLabel,
  onActionClick
}) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 neo-glass-card bg-white border border-dashed border-2 py-5 my-4">
      <div className="bg-light rounded-circle p-4 mb-3 border d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
        <i className={`bi ${icon} text-secondary fs-1`}></i>
      </div>
      <h5 className="fw-bold text-dark mb-2">{title}</h5>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '360px' }}>
        {description}
      </p>
      {actionLabel && onActionClick && (
        <button
          onClick={onActionClick}
          className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm py-2 px-4"
          type="button"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

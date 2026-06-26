import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumbs, action }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className="breadcrumb small mb-0">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return isLast ? (
                  <li key={idx} className="breadcrumb-item active text-primary fw-semibold" aria-current="page">
                    {crumb.label}
                  </li>
                ) : (
                  <li key={idx} className="breadcrumb-item">
                    <Link to={crumb.path} className="text-decoration-none text-secondary">
                      {crumb.label}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <h2 className="fw-bold text-dark mb-1 fs-3">{title}</h2>
        {subtitle && <p className="text-secondary mb-0 small">{subtitle}</p>}
      </div>
      {action && <div className="header-action-container">{action}</div>}
    </div>
  );
}

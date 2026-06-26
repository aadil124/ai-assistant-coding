import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeClass = (statusStr) => {
    if (!statusStr) return 'bg-secondary bg-opacity-10 text-secondary';
    const s = statusStr.toLowerCase();
    switch (s) {
      case 'confirmed':
      case 'paid':
      case 'verified':
      case 'active':
      case 'success':
        return 'bg-success bg-opacity-10 text-success border border-success border-opacity-10';
      case 'pending payment':
      case 'pending':
      case 'pending verification':
      case 'unpaid':
        return 'bg-warning bg-opacity-10 text-warning-emphasis border border-warning border-opacity-10';
      case 'cancelled':
      case 'rejected':
      case 'suspended':
      case 'failed':
        return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-10';
      case 'completed':
      case 'refunded':
        return 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10';
    }
  };

  return (
    <span className={`badge px-3 py-2 rounded-pill small fw-semibold text-capitalize ${getBadgeClass(status)}`}>
      {status}
    </span>
  );
}

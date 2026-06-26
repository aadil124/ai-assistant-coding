import React from 'react';
import StatusBadge from './StatusBadge.jsx';

export default function AuditLogsTable({ logs = [], loading = false }) {
  if (loading) {
    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle border-light mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '180px' }}>Administrator</th>
              <th scope="col">Action Details</th>
              <th scope="col">Target Module</th>
              <th scope="col">Target Resource</th>
              <th scope="col">Timestamp</th>
              <th scope="col" style={{ width: '100px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="placeholder-glow">
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className="placeholder bg-secondary opacity-25 rounded-circle" style={{ width: '32px', height: '32px' }}></span>
                    <span className="placeholder col-6 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
                  </div>
                </td>
                <td>
                  <span className="placeholder col-8 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
                </td>
                <td>
                  <span className="placeholder col-4 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
                </td>
                <td>
                  <span className="placeholder col-6 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
                </td>
                <td>
                  <span className="placeholder col-5 bg-secondary opacity-25 rounded" style={{ height: '14px' }}></span>
                </td>
                <td>
                  <span className="placeholder col-8 bg-secondary opacity-25 rounded" style={{ height: '20px' }}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-journal-x fs-1 text-secondary mb-3 d-block"></i>
        <h6 className="fw-bold text-dark">No audit records found</h6>
        <p className="text-secondary small mb-0">No actions matched your criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle border-light mb-0" id="audit-logs-data-table">
        <thead className="table-light text-secondary small fw-bold">
          <tr>
            <th scope="col">Administrator</th>
            <th scope="col">Action Details</th>
            <th scope="col">Target Module</th>
            <th scope="col">Target Resource</th>
            <th scope="col">Timestamp</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="text-dark small">
          {logs.map((log) => {
            // Determine text highlights or helper classes
            const getModuleBadge = (mod) => {
              switch (mod?.toLowerCase()) {
                case 'auth':
                case 'security':
                  return 'bg-dark bg-opacity-10 text-dark';
                case 'doctor':
                case 'verification':
                  return 'bg-info bg-opacity-10 text-info-emphasis';
                case 'appointment':
                case 'bookings':
                  return 'bg-primary bg-opacity-10 text-primary';
                case 'billing':
                case 'refunds':
                  return 'bg-success bg-opacity-10 text-success';
                case 'reviews':
                case 'moderation':
                  return 'bg-warning bg-opacity-10 text-warning-emphasis';
                default:
                  return 'bg-secondary bg-opacity-10 text-secondary';
              }
            };

            return (
              <tr key={log.id} className="transition-all hover-bg-light">
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={log.adminAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80'}
                      alt={log.adminName}
                      className="rounded-circle border"
                      style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoSBD2J04rkVEUZmB3Ky4b7QIJDvVd3i83dDGMhpU1qpmN4StUO1rJB7yLHGIUE6STjc0wb8IkxZTU745GkTIR6DATSKYGIzEVHF-sU5cjX6AUE35gSn6WYHN-LXvBsQTZqpRU9CcMPcPvIXoxfrXGOAgF5RT_6qYKxnSuBrzLS2qoqBk0lD49085xB7x5oPS_VNTSWlIvrBNq9C2Ao0pkWoa3TYDL12R0IcyBTgtnfXVQwMrcxSDViIR0rP-QcnRt5DQVvKuL2Ss';
                      }}
                    />
                    <div>
                      <span className="fw-semibold text-dark d-block">{log.adminName}</span>
                      <small className="text-secondary" style={{ fontSize: '10px' }}>{log.adminEmail}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="fw-medium text-dark">{log.action}</span>
                </td>
                <td>
                  <span className={`badge px-2 py-1 rounded small fw-semibold text-uppercase ${getModuleBadge(log.module)}`}>
                    {log.module}
                  </span>
                </td>
                <td>
                  <code className="text-secondary small fw-mono bg-light px-1.5 py-0.5 rounded border border-light-subtle">
                    {log.target}
                  </code>
                </td>
                <td>
                  <span className="text-secondary">{log.timestamp}</span>
                </td>
                <td>
                  <span className={`badge px-2 py-1 rounded-pill small fw-semibold ${
                    log.status === 'success' || log.status === 'Success'
                      ? 'bg-success bg-opacity-10 text-success'
                      : log.status === 'failed' || log.status === 'Failed'
                      ? 'bg-danger bg-opacity-10 text-danger'
                      : 'bg-warning bg-opacity-10 text-warning-emphasis'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

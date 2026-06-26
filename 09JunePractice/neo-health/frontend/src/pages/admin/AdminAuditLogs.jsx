import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import AuditLogsTable from '../../components/shared/AuditLogsTable.jsx';

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([
    {
      id: 'AUD-001',
      adminName: 'Admin User',
      adminEmail: 'admin@neohealth.com',
      action: 'Approved verification for Dr. Sarah Jenkins',
      module: 'doctor',
      target: 'DOC-001',
      timestamp: 'June 26, 2026 • 10:42 AM',
      status: 'success'
    },
    {
      id: 'AUD-002',
      adminName: 'Admin User',
      adminEmail: 'admin@neohealth.com',
      action: 'Flagged consultation review #10432',
      module: 'reviews',
      target: 'REV-102',
      timestamp: 'June 26, 2026 • 09:15 AM',
      status: 'success'
    },
    {
      id: 'AUD-003',
      adminName: 'System Cron',
      adminEmail: 'cron-job@neohealth.com',
      action: 'Stripe Refund batch payout processed ($450.00)',
      module: 'billing',
      target: 'Stripe API Callback',
      timestamp: 'June 25, 2026 • 11:30 PM',
      status: 'success'
    },
    {
      id: 'AUD-004',
      adminName: 'Admin User',
      adminEmail: 'admin@neohealth.com',
      action: 'Suspended Patient profile user_19482',
      module: 'security',
      target: 'USR-203',
      timestamp: 'June 25, 2026 • 04:22 PM',
      status: 'failed'
    },
    {
      id: 'AUD-005',
      adminName: 'Admin User',
      adminEmail: 'admin@neohealth.com',
      action: 'Logged into Admin Terminal',
      module: 'auth',
      target: 'Terminal IP 192.168.1.45',
      timestamp: 'June 25, 2026 • 08:00 AM',
      status: 'success'
    },
    {
      id: 'AUD-006',
      adminName: 'Admin User',
      adminEmail: 'admin@neohealth.com',
      action: 'Updated Global Consultation Billing fee to $120.00',
      module: 'billing',
      target: 'Settings Config',
      timestamp: 'June 24, 2026 • 02:15 PM',
      status: 'success'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleExportCSV = () => {
    alert("Compiling CSV audit sheets... Download started for audit_ledger_export.csv");
  };

  // Filter actions
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesModule && matchesStatus;
  });

  return (
    <AdminLayout>
      <title>Audit Ledger | Neo-Health Platform Control</title>

      <div className="container-fluid px-0">
        
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">System Audit Ledger</h3>
            <p className="text-secondary small mb-0">Auditable logs of administrative access, modifications, approvals, and dispute payouts.</p>
          </div>
          <div>
            <button 
              className="btn btn-primary-neo btn-sm py-2 px-3 fw-medium d-flex align-items-center gap-2 rounded-3"
              onClick={handleExportCSV}
              id="audit-export-csv-btn"
            >
              <i className="bi bi-file-earmark-spreadsheet"></i>
              <span>Export Ledger (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="neo-glass-card p-3 border bg-white shadow-sm mb-4">
          <div className="row g-3">
            {/* Search Bar */}
            <div className="col-12 col-lg-5">
              <label htmlFor="audit-search" className="form-label small fw-semibold text-secondary mb-1">Search Logs</label>
              <div className="d-flex align-items-center bg-light px-3 py-1.5 rounded-3 border">
                <i className="bi bi-search text-secondary me-2"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 p-0 shadow-none small"
                  placeholder="Search by action text, admin name, target..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="audit-search"
                />
              </div>
            </div>

            {/* Module Category Filter */}
            <div className="col-6 col-md-3 col-lg-3">
              <label htmlFor="audit-module-filter" className="form-label small fw-semibold text-secondary mb-1">Target Module</label>
              <select
                className="form-select bg-light border-light-subtle rounded-3 small"
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                id="audit-module-filter"
              >
                <option value="all">All Modules</option>
                <option value="auth">Authentication</option>
                <option value="doctor">Doctor Directory</option>
                <option value="billing">Billing & Payouts</option>
                <option value="reviews">Review Moderation</option>
                <option value="security">Security & Suspensions</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-6 col-md-3 col-lg-4">
              <label htmlFor="audit-status-filter" className="form-label small fw-semibold text-secondary mb-1">Status</label>
              <select
                className="form-select bg-light border-light-subtle rounded-3 small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                id="audit-status-filter"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Table Wrapper */}
        <div className="neo-glass-card border bg-white shadow-sm overflow-hidden mb-4">
          <AuditLogsTable 
            logs={filteredLogs}
            loading={loading}
          />
        </div>

      </div>
    </AdminLayout>
  );
}

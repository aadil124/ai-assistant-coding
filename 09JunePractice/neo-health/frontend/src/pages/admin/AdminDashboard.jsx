import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout.jsx';
import MetricCard from '../../components/shared/MetricCard.jsx';
import AnalyticsChart from '../../components/shared/AnalyticsChart.jsx';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading metrics
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Quick Action Handler
  const handleQuickAction = (path) => {
    navigate(path);
  };

  const chartData = [
    { label: 'Jan', value: 14500, secondary: 88 },
    { label: 'Feb', value: 18900, secondary: 110 },
    { label: 'Mar', value: 24300, secondary: 145 },
    { label: 'Apr', value: 31200, secondary: 180 },
    { label: 'May', value: 43100, secondary: 260 },
    { label: 'Jun', value: 52400, secondary: 310 },
  ];

  return (
    <AdminLayout>
      <title>Admin Dashboard | Neo-Health Platform Control</title>

      <div className="container-fluid px-0">
        
        {/* Welcome Section */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h3 className="fw-bold text-dark mb-1">Overview Dashboard</h3>
            <p className="text-secondary small mb-0">System performance status and real-time operations.</p>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-secondary btn-sm py-2 px-3 fw-medium d-flex align-items-center gap-2 rounded-3"
              onClick={() => alert("CSV system summary report prepared for download.")}
            >
              <i className="bi bi-download"></i>
              <span>Export System Report</span>
            </button>
            <Link 
              className="btn btn-primary-neo btn-sm py-2 px-3 fw-medium d-flex align-items-center gap-2 rounded-3"
              to="/admin/doctors/pending"
            >
              <i className="bi bi-patch-check"></i>
              <span>Verify Doctors</span>
            </Link>
          </div>
        </div>

        {/* Doctor Verification Alert Banner */}
        {!loading && (
          <div className="alert alert-warning border-warning border-opacity-25 bg-warning bg-opacity-10 p-3 mb-4 rounded-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center text-warning-emphasis" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-shield-fill-exclamation fs-5"></i>
              </div>
              <div>
                <h6 className="fw-bold text-warning-emphasis mb-0.5">Verification Submissions Pending</h6>
                <p className="text-secondary small mb-0">There are 3 new doctor credential files awaiting administrative audit.</p>
              </div>
            </div>
            <Link to="/admin/doctors/pending" className="btn btn-warning text-warning-emphasis fw-bold py-1.5 px-3 btn-sm border-0 rounded-pill">
              Process Audits <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="row g-3 mb-4" id="dashboard-metric-cards-grid">
          <div className="col-12 col-sm-6 col-lg-3">
            <MetricCard
              title="Platform Patients"
              value="1,420"
              icon="bi-people"
              trend="+8.2%"
              trendUp={true}
              color="210, 100%, 50%" // Blue
              description="Registered health seekers"
              loading={loading}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <MetricCard
              title="Active Providers"
              value="84"
              icon="bi-person-heart"
              trend="+4.5%"
              trendUp={true}
              color="170, 100%, 30%" // Teal/Green
              description="3 audits pending upload"
              loading={loading}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <MetricCard
              title="Consultations"
              value="3,124"
              icon="bi-calendar-check"
              trend="+12.4%"
              trendUp={true}
              color="260, 90%, 60%" // Purple
              description="Completed digital visits"
              loading={loading}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <MetricCard
              title="Gross Earnings"
              value="$184,320"
              icon="bi-currency-dollar"
              trend="+15.8%"
              trendUp={true}
              color="40, 100%, 45%" // Amber
              description="Total platform billing volume"
              loading={loading}
            />
          </div>
        </div>

        {/* Charts & Actions Row */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-8">
            <AnalyticsChart
              title="Revenue & Bookings Trend"
              subtitle="Comparison of monthly platform revenue against consultation bookings"
              data={chartData}
              valuePrefix="$"
              primaryLabel="Gross Revenue"
              secondaryLabel="Visits Completed"
            />
          </div>

          <div className="col-12 col-lg-4">
            {/* Quick Actions Panel */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-1">Administrative Utilities</h5>
                <p className="text-secondary small mb-3">Quick redirects to core platform moderation dashboards.</p>
                
                <div className="d-flex flex-column gap-2 mb-3">
                  <button 
                    onClick={() => handleQuickAction('/admin/doctors/pending')} 
                    className="btn btn-light border text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between hover-border-primary text-dark"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-patch-check-fill text-info fs-5"></i>
                      <span className="small fw-semibold">Doctor Verification</span>
                    </div>
                    <span className="badge bg-danger rounded-circle p-1" style={{ width: '8px', height: '8px' }}></span>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('/admin/reviews')} 
                    className="btn btn-light border text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between hover-border-primary text-dark"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-chat-left-text-fill text-warning fs-5"></i>
                      <span className="small fw-semibold">Review Moderation</span>
                    </div>
                    <i className="bi bi-chevron-right text-secondary small"></i>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('/admin/users')} 
                    className="btn btn-light border text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between hover-border-primary text-dark"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-people-fill text-primary fs-5"></i>
                      <span className="small fw-semibold">User Directory</span>
                    </div>
                    <i className="bi bi-chevron-right text-secondary small"></i>
                  </button>

                  <button 
                    onClick={() => handleQuickAction('/admin/refunds')} 
                    className="btn btn-light border text-start py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between hover-border-primary text-dark"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-arrow-left-right text-success fs-5"></i>
                      <span className="small fw-semibold">Refund Queue</span>
                    </div>
                    <i className="bi bi-chevron-right text-secondary small"></i>
                  </button>
                </div>
              </div>

              <div className="border-top pt-3 text-center">
                <Link to="/admin/audit-logs" className="small text-primary text-decoration-none fw-semibold">
                  <i className="bi bi-journal-code me-1"></i> View Platform Activity Log
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Active Operations Row */}
        <div className="row">
          <div className="col-12">
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold text-dark mb-1">Recent Audit Records</h5>
                  <p className="text-secondary small mb-0">System ledger capturing last updates from system administrators.</p>
                </div>
                <Link to="/admin/audit-logs" className="btn btn-sm btn-outline-secondary py-1.5 px-3 rounded-3 fw-medium">
                  View Ledger
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table align-middle border-light mb-0 small">
                  <thead className="table-light text-secondary">
                    <tr>
                      <th>Operator</th>
                      <th>Action</th>
                      <th>Module</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-semibold text-dark">Admin User</td>
                      <td>Approved verification for Dr. Sarah Jenkins</td>
                      <td><span className="badge bg-info bg-opacity-10 text-info-emphasis">Doctor</span></td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">Success</span></td>
                      <td className="text-secondary">Today, 10:42 AM</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold text-dark">Admin User</td>
                      <td>Flagged consultation review #10432</td>
                      <td><span className="badge bg-warning bg-opacity-10 text-warning-emphasis">Reviews</span></td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">Success</span></td>
                      <td className="text-secondary">Today, 09:15 AM</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold text-dark">System Cron</td>
                      <td>Stripe Refund batch payout processed ($450.00)</td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">Billing</span></td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">Success</span></td>
                      <td className="text-secondary">Yesterday, 11:30 PM</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold text-dark">Admin User</td>
                      <td>Suspended Patient profile user_19482</td>
                      <td><span className="badge bg-dark bg-opacity-10 text-dark">Security</span></td>
                      <td><span className="badge bg-danger bg-opacity-10 text-danger">Failed</span></td>
                      <td className="text-secondary">Yesterday, 04:22 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

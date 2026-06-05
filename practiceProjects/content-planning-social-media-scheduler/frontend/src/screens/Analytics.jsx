import React, { useState } from 'react';

export default function Analytics() {
  const [range, setRange] = useState('30d');
  const [exportModal, setExportModal] = useState(false);
  const [exportEmail, setExportEmail] = useState('client@acme-brand.com');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [toastShow, setToastShow] = useState(false);

  const handleExportSubmit = () => {
    setExportModal(false);
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 4000);
  };

  const topPosts = [
    { id: '1', caption: 'Launching our new developer API tools today!', platform: 'linkedin', reach: 42000, er: '10.4%', date: '2026-06-02' },
    { id: '2', caption: 'Weekly analytics recap for the product team.', platform: 'twitter', reach: 18500, er: '8.2%', date: '2026-06-01' },
    { id: '3', caption: 'Behind the scenes at the Acme Creative Office...', platform: 'instagram', reach: 15200, er: '7.8%', date: '2026-06-03' }
  ];

  return (
    <div className="p-4 overflow-auto custom-scrollbar bg-light" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          <label className="text-xs-caps m-0 text-muted" style={{ fontSize: '10px' }}>Date Range</label>
          <select 
            className="form-select form-select-sm rounded-3 shadow-none border" 
            style={{ width: '140px' }}
            value={range}
            onChange={(e) => setRange(e.target.value)}
            data-testid="range-select"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
        <button 
          className="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm"
          onClick={() => setExportModal(true)}
          data-testid="export-report-trigger-btn"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>file_download</span>
          Export Report
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="row g-3 mb-4" data-testid="analytics-summary-banner">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm" data-testid="metric-impressions">
            <span className="text-xs-caps d-block mb-1">Total Impressions</span>
            <h3 className="font-weight-bold text-dark m-0">142,050</h3>
            <span className="text-success" style={{ fontSize: '11px' }}>+12.4% vs prev period</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm" data-testid="metric-clicks">
            <span className="text-xs-caps d-block mb-1">Total Link Clicks</span>
            <h3 className="font-weight-bold text-dark m-0">8,540</h3>
            <span className="text-success" style={{ fontSize: '11px' }}>+8.2% vs prev period</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm" data-testid="metric-engagement-rate">
            <span className="text-xs-caps d-block mb-1">Avg Engagement Rate</span>
            <h3 className="font-weight-bold text-dark m-0">8.8%</h3>
            <span className="text-danger" style={{ fontSize: '11px' }}>-0.5% vs prev period</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border rounded-3 p-3 bg-white shadow-sm">
            <span className="text-xs-caps d-block mb-1">Daily Followers</span>
            <h3 className="font-weight-bold text-dark m-0">+1,205</h3>
            <span className="text-success" style={{ fontSize: '11px' }}>+4.8% growth</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Graph preview */}
        <div className="col-12 col-lg-7">
          <div className="card border rounded-3 bg-white p-3 shadow-sm" data-testid="trend-chart-container">
            <h5 className="font-weight-bold text-dark mb-3" style={{ fontSize: '15px' }}>Historical Reach Analysis</h5>
            {/* Visual simulation of chart */}
            <div className="bg-light rounded p-4 d-flex flex-column align-items-center justify-content-center text-muted recharts-responsive-container" style={{ height: '320px' }}>
              <span className="material-symbols-outlined text-muted mb-2 animate-pulse" style={{ fontSize: '48px' }}>monitoring</span>
              <p className="m-0 font-weight-bold" style={{ fontSize: '13px' }}>Aggregated Reach Data Chart Active</p>
              <p className="text-muted m-0 mt-1" style={{ fontSize: '11px' }}>Plotting combined platform analytics for range: {range}.</p>
              
              {/* Checkbox filters inside charts */}
              <div className="d-flex gap-3 mt-4 flex-wrap">
                <div className="form-check form-switch" style={{ cursor: 'pointer' }}>
                  <input className="form-check-input" type="checkbox" defaultChecked id="ch1" />
                  <label className="form-check-label font-weight-bold text-xs-caps" htmlFor="ch1">LinkedIn</label>
                </div>
                <div className="form-check form-switch" style={{ cursor: 'pointer' }} data-testid="platform-toggle-twitter" aria-checked="true">
                  <input className="form-check-input" type="checkbox" defaultChecked id="ch2" />
                  <label className="form-check-label font-weight-bold text-xs-caps" htmlFor="ch2">Twitter</label>
                </div>
                <div className="form-check form-switch" style={{ cursor: 'pointer' }}>
                  <input className="form-check-input" type="checkbox" defaultChecked id="ch3" />
                  <label className="form-check-label font-weight-bold text-xs-caps" htmlFor="ch3">Instagram</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="col-12 col-lg-5">
          <div className="card border rounded-3 bg-white p-3 shadow-sm h-100" data-testid="leaderboard-table">
            <h5 className="font-weight-bold text-dark mb-3" style={{ fontSize: '15px' }}>Top Performing Posts</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle border-0 m-0" style={{ fontSize: '12px' }}>
                <thead>
                  <tr className="text-muted">
                    <th>Post details</th>
                    <th>Reach</th>
                    <th>ER</th>
                  </tr>
                </thead>
                <tbody>
                  {topPosts.map(post => (
                    <tr key={post.id}>
                      <td style={{ maxWidth: '180px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi bi-${post.platform === 'twitter' ? 'twitter-x' : post.platform} text-muted`}></i>
                          <span className="truncate d-block font-weight-bold">{post.caption}</span>
                        </div>
                      </td>
                      <td>{post.reach.toLocaleString()}</td>
                      <td className="font-weight-bold text-primary" data-testid="row-engagement-rate">{post.er}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Export modal */}
      {exportModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" data-testid="export-report-modal">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Export Performance Report</h5>
                <button type="button" className="btn-close" onClick={() => setExportModal(false)}></button>
              </div>
              <div className="modal-body space-y-4">
                <div className="form-group mb-3">
                  <label className="text-xs-caps mb-1">Export Format</label>
                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className={`btn flex-fill py-2 border ${exportFormat === 'PDF' ? 'btn-primary border-primary' : 'btn-light'}`}
                      onClick={() => setExportFormat('PDF')}
                      data-testid="format-select-PDF"
                    >
                      PDF Report
                    </button>
                    <button 
                      type="button" 
                      className={`btn flex-fill py-2 border ${exportFormat === 'CSV' ? 'btn-primary border-primary' : 'btn-light'}`}
                      onClick={() => setExportFormat('CSV')}
                    >
                      CSV Data Grid
                    </button>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label className="text-xs-caps mb-1">Start Date</label>
                  <input type="date" className="form-control rounded-3" defaultValue="2026-05-01" />
                </div>
                <div className="form-group mb-3">
                  <label className="text-xs-caps mb-1">End Date</label>
                  <input type="date" className="form-control rounded-3" defaultValue="2026-06-01" />
                </div>

                <div className="form-group">
                  <label className="text-xs-caps mb-1">Email Destination</label>
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    value={exportEmail} 
                    onChange={(e) => setExportEmail(e.target.value)}
                    data-testid="export-email-input"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setExportModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleExportSubmit} data-testid="export-submit-btn">Generate & Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Toast */}
      {toastShow && (
        <div className="position-fixed bottom-0 end-0 m-4 p-3 bg-primary text-white rounded-3 shadow-lg z-3 toast-info">
          <div className="d-flex align-items-center gap-2">
            <span className="material-symbols-outlined">info</span>
            <div>
              <p className="m-0 font-weight-bold" style={{ fontSize: '13px' }}>Report compilation has started</p>
              <p className="m-0" style={{ fontSize: '11px' }}>A download link will be emailed to {exportEmail} shortly.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

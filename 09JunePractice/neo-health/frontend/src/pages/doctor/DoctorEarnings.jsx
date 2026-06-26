import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';

export default function DoctorEarnings() {
  const [filterMonth, setFilterMonth] = useState('October');
  const [filterYear, setFilterYear] = useState('2024');

  // Mock financial statistics
  const earningsSummary = {
    gross: 1200.00,
    commission: 300.00,
    net: 900.00
  };

  // Mock monthly statistics for simple CSS charts
  const monthlyData = [
    { label: 'May', net: 450, count: 3 },
    { label: 'Jun', net: 600, count: 4 },
    { label: 'Jul', net: 750, count: 5 },
    { label: 'Aug', net: 600, count: 4 },
    { label: 'Sep', net: 900, count: 6 },
    { label: 'Oct', net: 1200, count: 8 }
  ];

  // Transactions database
  const transactions = [
    { id: "tx1", patient: "John Doe", date: "Oct 24, 2024", type: "Telehealth Video", grossFee: 150.00, commission: 37.50, netFee: 112.50, status: "Paid" },
    { id: "tx2", patient: "Sarah Smith", date: "Oct 24, 2024", type: "Telehealth Video", grossFee: 150.00, commission: 37.50, netFee: 112.50, status: "Paid" },
    { id: "tx3", patient: "Robert Miller", date: "Oct 28, 2024", type: "Telehealth Video", grossFee: 150.00, commission: 37.50, netFee: 112.50, status: "Pending Payout" },
    { id: "tx4", patient: "Emily Chen", date: "Sep 15, 2024", type: "Telehealth Video", grossFee: 150.00, commission: 37.50, netFee: 112.50, status: "Paid" }
  ];

  const handleExportCSV = () => {
    // Generate simple mock CSV spreadsheet text download trigger
    const csvHeader = "Transaction ID,Patient Name,Date,Type,Gross Fee ($),Commission Deducted ($),Net Fee ($),Payout Status\n";
    const csvRows = transactions.map(t => 
      `${t.id},${t.patient},${t.date},${t.type},${t.grossFee.toFixed(2)},${t.commission.toFixed(2)},${t.netFee.toFixed(2)},${t.status}`
    ).join('\n');

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `earnings-report-${filterMonth.toLowerCase()}-${filterYear}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert(`Earnings CSV spreadsheet report for ${filterMonth} ${filterYear} has been generated and download started.`);
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Earnings Ledger & Stats | Neo-Health Doctors</title>
      <meta name="description" content="Review clinical gross and net payout earnings, track commission deductions, and export spreadsheets." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Earnings Dashboard"
          subtitle="Audit and export consultation earnings summaries, commissions, and transaction logs."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Earnings Ledger', path: '/doctor/earnings' }
          ]}
          action={
            <button
              onClick={handleExportCSV}
              className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm"
              id="earnings-btn-export"
            >
              <i className="bi bi-file-earmark-spreadsheet fw-bold"></i>
              <span>Export CSV</span>
            </button>
          }
        />

        {/* Financial Stat widgets */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 border-start border-4 border-primary">
              <span className="text-secondary small fw-medium text-uppercase tracking-wider d-block mb-1">Gross Payouts</span>
              <h3 className="fw-bold text-dark mb-1 fs-2">${earningsSummary.gross.toFixed(2)}</h3>
              <small className="text-secondary">Cumulative gross before commission</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 border-start border-4 border-warning">
              <span className="text-secondary small fw-medium text-uppercase tracking-wider d-block mb-1">Commission Deducted (25%)</span>
              <h3 className="fw-bold text-dark mb-1 fs-2">${earningsSummary.commission.toFixed(2)}</h3>
              <small className="text-secondary">Platform operations support fee</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 border-start border-4 border-success">
              <span className="text-secondary small fw-medium text-uppercase tracking-wider d-block mb-1">Net Earnings (Payout)</span>
              <h3 className="fw-bold text-success mb-1 fs-2">${earningsSummary.net.toFixed(2)}</h3>
              <small className="text-secondary">Securely deposited to checking bank</small>
            </div>
          </div>
        </div>

        {/* CSS Chart Section */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-xl-7">
            <SectionCard title="Monthly Earnings Trend (Net $)">
              <div className="d-flex align-items-end justify-content-between pt-4 px-2" style={{ height: '220px' }}>
                {monthlyData.map((data, idx) => {
                  const maxNet = 1200;
                  const barHeightPercent = (data.net / maxNet) * 100;
                  return (
                    <div key={idx} className="d-flex flex-column align-items-center flex-grow-1">
                      <small className="text-dark fw-bold mb-1">${data.net}</small>
                      <div
                        className="bg-primary bg-opacity-75 rounded-top transition-all"
                        style={{
                          height: `${barHeightPercent * 1.5}px`,
                          width: '40px',
                          boxShadow: '0 -2px 10px rgba(0,74,198,0.1)'
                        }}
                      ></div>
                      <span className="text-secondary mt-2 small">{data.label}</span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>

          <div className="col-12 col-xl-5">
            <SectionCard title="Consultation Count Trend">
              <div className="d-flex align-items-end justify-content-between pt-4 px-2" style={{ height: '220px' }}>
                {monthlyData.map((data, idx) => {
                  const maxCount = 8;
                  const barHeightPercent = (data.count / maxCount) * 100;
                  return (
                    <div key={idx} className="d-flex flex-column align-items-center flex-grow-1">
                      <small className="text-dark fw-bold mb-1">{data.count}</small>
                      <div
                        className="bg-success bg-opacity-75 rounded-top transition-all"
                        style={{
                          height: `${barHeightPercent * 1.5}px`,
                          width: '40px',
                          boxShadow: '0 -2px 10px rgba(0,107,95,0.1)'
                        }}
                      ></div>
                      <span className="text-secondary mt-2 small">{data.label}</span>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Transactions Table ledger */}
        <div className="neo-glass-card p-0 border bg-white shadow-sm overflow-hidden mb-4">
          <div className="px-4 py-3 border-bottom d-flex align-items-center justify-content-between bg-light bg-opacity-25">
            <h5 className="fw-bold text-dark mb-0 fs-6">Recent Earnings Ledger</h5>
            
            {/* Table Filters */}
            <div className="d-flex gap-2">
              <select
                className="form-select form-control-neo py-1.5 px-3 small border"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                style={{ width: '130px', fontSize: '0.8rem' }}
              >
                <option>October</option>
                <option>September</option>
                <option>August</option>
              </select>
              <select
                className="form-select form-control-neo py-1.5 px-3 small border"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                style={{ width: '100px', fontSize: '0.8rem' }}
              >
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="bg-light bg-opacity-50 border-bottom border-light-subtle text-secondary">
                <tr>
                  <th className="py-3 ps-4">Ref ID</th>
                  <th className="py-3">Patient</th>
                  <th className="py-3">Consult Date</th>
                  <th className="py-3">Gross Fee</th>
                  <th className="py-3">Commission</th>
                  <th className="py-3">Net Earning</th>
                  <th className="py-3 text-end pe-4">Payout Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-bottom border-light-subtle">
                    <td className="py-3 ps-4 fw-bold font-monospace text-secondary">{tx.id.toUpperCase()}</td>
                    <td className="py-3 fw-bold text-dark">{tx.patient}</td>
                    <td className="py-3 text-secondary">{tx.date}</td>
                    <td className="py-3 text-secondary">${tx.grossFee.toFixed(2)}</td>
                    <td className="py-3 text-danger">-${tx.commission.toFixed(2)}</td>
                    <td className="py-3 text-success fw-bold">${tx.netFee.toFixed(2)}</td>
                    <td className="py-3 text-end pe-4">
                      <span className={`badge px-2.5 py-1.5 rounded-pill small fw-semibold ${
                        tx.status === 'Paid'
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-warning bg-opacity-10 text-warning-emphasis'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DoctorLayout>
  );
}

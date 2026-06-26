import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function MedicalRecordViewer() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Form state
  const [shareEmail, setShareEmail] = useState("");
  const [shareConsent, setShareConsent] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDownload = () => {
    triggerToast("Medical Record PDF downloaded successfully.");
  };

  const handleShareSubmit = (e) => {
    e.preventDefault();
    if (!shareConsent) return;
    triggerToast(`Medical Record shared securely with ${shareEmail}.`);
    setShowShareModal(false);
    setShareEmail("");
    setShareConsent(false);
  };

  const labComponents = [
    { name: "Glucose", type: "Serum fasting", value: "104 mg/dL", range: "65 - 99 mg/dL", status: "High", isAbnormal: true },
    { name: "Creatinine", type: "Serum level", value: "0.92 mg/dL", range: "0.60 - 1.30 mg/dL", status: "Normal", isAbnormal: false },
    { name: "Sodium", type: "Blood serum", value: "139 mmol/L", range: "135 - 145 mmol/L", status: "Normal", isAbnormal: false },
    { name: "Potassium", type: "Blood serum", value: "4.2 mmol/L", range: "3.5 - 5.2 mmol/L", status: "Normal", isAbnormal: false },
    { name: "Calcium", type: "Serum level", value: "9.4 mg/dL", range: "8.5 - 10.5 mg/dL", status: "Normal", isAbnormal: false },
    { name: "Albumin", type: "Protein fraction", value: "4.5 g/dL", range: "3.5 - 5.5 g/dL", status: "Normal", isAbnormal: false }
  ];

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Medical Record Viewer | Neo-Health Portal</title>
      <meta name="description" content="View Comprehensive Metabolic Panel laboratory test results, trend analytics charts, doctor interpretations, and diagnostic certificates." />

      <div className="container-fluid py-2">
        
        {/* Breadcrumbs & Actions Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 small fw-semibold text-secondary">
              <li className="breadcrumb-item">
                <Link to="/patient/records/prescriptions" className="text-secondary text-decoration-none hover-link-breadcrumb">Records</Link>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                Comprehensive Metabolic Panel
              </li>
            </ol>
          </nav>
          
          <div className="d-flex gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="btn btn-light border py-2.5 px-3 d-flex align-items-center gap-2 fw-medium text-dark hover-bg-light"
            >
              <i className="bi bi-share text-primary"></i>
              <span>Share Record</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-primary-neo py-2.5 px-4 d-flex align-items-center gap-2 shadow-sm"
            >
              <i className="bi bi-download"></i>
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Bento Layout Grid */}
        <div className="row g-4">
          
          {/* Left Column: Report Identity & Clinical Interpretation */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Report Identity Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div className="p-2.5 bg-primary bg-opacity-10 rounded-3 text-primary d-flex align-items-center justify-content-center">
                  <i className="bi bi-activity fs-4"></i>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill small fw-semibold">
                  Final Report
                </span>
              </div>
              <h3 className="fw-bold text-dark mb-1 fs-5">Comprehensive Metabolic Panel</h3>
              <p className="text-secondary small mb-4">
                Panel provides an overall look at your body's chemical balance and metabolism.
              </p>
              
              <div className="border-top border-light-subtle pt-3 d-flex flex-column gap-2.5 small text-secondary">
                <div className="d-flex justify-content-between">
                  <span>Ordered By</span>
                  <strong className="text-dark">Dr. Sarah Jenkins</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Collection Date</span>
                  <strong className="text-dark">Oct 24, 2024 • 08:30 AM</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Report ID</span>
                  <strong className="text-dark">#LAB-99201-CMP</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Facility</span>
                  <strong className="text-dark">Central Diagnostics Lab</strong>
                </div>
              </div>
            </div>

            {/* Doctor's Note Clinical Interpretation */}
            <div className="neo-glass-card border bg-white overflow-hidden shadow-sm">
              <div className="bg-primary bg-opacity-10 px-4 py-3 border-bottom">
                <h4 className="fw-bold mb-0 text-primary small text-uppercase tracking-wider">Doctor's Note</h4>
              </div>
              <div className="p-4">
                <p className="text-secondary leading-relaxed small mb-4" style={{ fontStyle: 'italic' }}>
                  "All values are within normal physiological ranges except for a slightly elevated fasting blood glucose level (104 mg/dL). This is borderline pre-diabetic. Recommendation: Monitor carbohydrate intake and repeat testing in 3 months."
                </p>
                
                <div className="d-flex align-items-center gap-3">
                  <img
                    alt="Doctor profile"
                    className="rounded-circle border"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I"
                  />
                  <div>
                    <h5 className="fw-bold mb-0 text-dark small">Dr. Sarah Jenkins</h5>
                    <small className="text-secondary">Endocrinology Specialist</small>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Table & Trend Visualization */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Analysis Results Table Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0 text-dark fs-5">Analysis Results</h3>
                <div className="d-flex gap-1">
                  <button onClick={() => alert("Zooming functionality simulated.")} className="btn btn-light border btn-sm p-2 hover-bg-light" title="Zoom In">
                    <i className="bi bi-zoom-in text-secondary"></i>
                  </button>
                  <button onClick={() => alert("Print setup dialog simulated.")} className="btn btn-light border btn-sm p-2 hover-bg-light" title="Print Record">
                    <i className="bi bi-printer text-secondary"></i>
                  </button>
                  <button onClick={() => setShowPreviewModal(true)} className="btn btn-light border btn-sm p-2 hover-bg-light" title="View Certificate Document">
                    <i className="bi bi-fullscreen text-secondary"></i>
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-4 text-start">
                  <thead>
                    <tr className="table-light border-bottom border-light-subtle">
                      <th className="px-3 py-2.5 text-secondary fw-semibold small">Component</th>
                      <th className="px-3 py-2.5 text-secondary fw-semibold small">Value</th>
                      <th className="px-3 py-2.5 text-secondary fw-semibold small">Reference Range</th>
                      <th className="px-3 py-2.5 text-secondary fw-semibold small text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {labComponents.map((comp, idx) => (
                      <tr key={idx} className="transition-colors">
                        <td className="px-3 py-2.5">
                          <strong className="d-block text-dark small">{comp.name}</strong>
                          <span className="text-secondary small">{comp.type}</span>
                        </td>
                        <td className={`px-3 py-2.5 fw-bold ${comp.isAbnormal ? 'text-danger' : 'text-dark'}`}>
                          {comp.value}
                        </td>
                        <td className="px-3 py-2.5 text-secondary small">{comp.range}</td>
                        <td className="px-3 py-2.5 text-center">
                          {comp.isAbnormal ? (
                            <span className="badge bg-danger bg-opacity-10 text-danger px-2.5 py-1.5 rounded-pill small fw-semibold">
                              <i className="bi bi-arrow-up-right-circle-fill me-1"></i> High
                            </span>
                          ) : (
                            <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1.5 rounded-pill small fw-semibold">
                              <i className="bi bi-check-circle-fill me-1"></i> Normal
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Scanned Copy Preview Link Frame */}
              <div onClick={() => setShowPreviewModal(true)} className="p-4 bg-light border rounded-3 text-center d-flex flex-column align-items-center justify-content-center cursor-pointer hover-bg-light transition-all border-dashed" style={{ cursor: 'pointer' }}>
                <i className="bi bi-file-earmark-image text-secondary fs-1 mb-2"></i>
                <p className="fw-semibold text-secondary-emphasis mb-1 small">Scanned Copy of Laboratory Certificate #LC-771</p>
                <p className="text-primary small fw-semibold mb-0 hover-underline d-flex align-items-center gap-1">
                  <span>Open Full Document Preview</span>
                  <i className="bi bi-arrow-up-right-square small"></i>
                </p>
              </div>
            </div>

            {/* Glucose Trends Chart Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0 text-dark fs-6">Glucose Trends (Last 12 Months)</h4>
                <span className="badge bg-primary bg-opacity-10 text-primary small fw-semibold">
                  Fasting Serum Glucose
                </span>
              </div>

              {/* CSS Bar Graph Grid mockup */}
              <div className="d-flex align-items-end justify-content-around bg-light p-4 rounded-3" style={{ height: '180px' }}>
                <div className="d-flex flex-column align-items-center w-100 position-relative group">
                  <span className="badge bg-dark text-white mb-2 py-1 px-2 small position-absolute" style={{ bottom: '60px', fontSize: '10px' }}>92 mg/dL</span>
                  <div className="bg-primary bg-opacity-25 rounded-top w-50" style={{ height: '50px' }}></div>
                  <span className="text-secondary small mt-2" style={{ fontSize: '10px' }}>Jan</span>
                </div>
                
                <div className="d-flex flex-column align-items-center w-100 position-relative group">
                  <span className="badge bg-dark text-white mb-2 py-1 px-2 small position-absolute" style={{ bottom: '65px', fontSize: '10px' }}>94 mg/dL</span>
                  <div className="bg-primary bg-opacity-25 rounded-top w-50" style={{ height: '55px' }}></div>
                  <span className="text-secondary small mt-2" style={{ fontSize: '10px' }}>Apr</span>
                </div>

                <div className="d-flex flex-column align-items-center w-100 position-relative group">
                  <span className="badge bg-dark text-white mb-2 py-1 px-2 small position-absolute" style={{ bottom: '63px', fontSize: '10px' }}>93 mg/dL</span>
                  <div className="bg-primary bg-opacity-25 rounded-top w-50" style={{ height: '53px' }}></div>
                  <span className="text-secondary small mt-2" style={{ fontSize: '10px' }}>Jul</span>
                </div>

                <div className="d-flex flex-column align-items-center w-100 position-relative group">
                  <span className="badge bg-danger text-white mb-2 py-1 px-2 small position-absolute fw-bold" style={{ bottom: '90px', fontSize: '10px' }}>104 mg/dL</span>
                  <div className="bg-danger bg-opacity-50 rounded-top w-50" style={{ height: '80px' }}></div>
                  <span className="text-dark fw-bold small mt-2" style={{ fontSize: '10px' }}>Oct (Now)</span>
                </div>
              </div>

              {/* Trend alerts subtext */}
              <div className="mt-4 pt-3 border-top border-light-subtle d-flex align-items-center gap-2 text-danger small">
                <i className="bi bi-info-circle-fill fs-5"></i>
                <span className="fw-medium">Fasting Glucose has increased by 11.8% since your last checkup.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating success toast message */}
      <div
        className={`position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-3 shadow-lg d-flex align-items-center gap-2 transition-all z-3 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{ transition: 'opacity 0.25s, transform 0.25s' }}
      >
        <i className="bi bi-check-circle-fill text-success fs-5"></i>
        <span className="small">{toastMessage}</span>
      </div>

      {/* Share Record Modal Dialog */}
      {showShareModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <form onSubmit={handleShareSubmit}>
                <div className="modal-header border-bottom px-4">
                  <h5 className="modal-title fw-bold">Share Medical Record</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowShareModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <p className="text-secondary small mb-3">
                    Input a health provider email below to share a secure, temporary viewing token for this metabolic panel.
                  </p>
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-secondary">Recipient Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-neo py-2 shadow-none border small"
                      placeholder="provider@hospital.org"
                      required
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      required
                      id="consentCheck"
                      checked={shareConsent}
                      onChange={(e) => setShareConsent(e.target.checked)}
                    />
                    <label className="form-check-label text-dark small" htmlFor="consentCheck">
                      I consent to sharing my laboratory health records in accordance with HIPAA guidelines.
                    </label>
                  </div>
                </div>
                <div className="modal-footer border-top px-4">
                  <button
                    type="button"
                    className="btn btn-light border py-2.5 px-3 fw-medium text-dark hover-bg-light"
                    onClick={() => setShowShareModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-neo py-2.5 px-4" disabled={!shareConsent}>
                    Share Securely
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Scanned Copy Full Screen Image Modal */}
      {showPreviewModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="modal-header border-bottom px-4">
                <h5 className="modal-title fw-bold">Laboratory Certificate #LC-771</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPreviewModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4 bg-light d-flex flex-column align-items-center justify-content-center">
                
                {/* Mock High-fidelity Certificate graphic */}
                <div className="bg-white border rounded shadow p-5 w-100" style={{ maxWidth: '650px', minHeight: '400px', borderTop: '8px solid var(--primary-color) !important' }}>
                  <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <div>
                      <h4 className="fw-bold text-primary mb-0">Central Diagnostics Laboratory</h4>
                      <small className="text-secondary">Official Certified Health Document</small>
                    </div>
                    <i className="bi bi-patch-check-fill text-primary fs-3"></i>
                  </div>
                  
                  <div className="row g-3 small mb-4">
                    <div className="col-6">
                      <span className="text-secondary d-block">Patient Name:</span>
                      <strong className="text-dark">Alex Johnson</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary d-block">Facility Doctor:</span>
                      <strong className="text-dark">Dr. Sarah Jenkins</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary d-block">Report Issued:</span>
                      <strong className="text-dark">Oct 24, 2024</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-secondary d-block">Document Code:</span>
                      <strong className="text-dark">CDL-771928-CMP</strong>
                    </div>
                  </div>

                  <div className="table-responsive mb-4">
                    <table className="table table-bordered table-sm align-middle text-start small">
                      <thead className="table-light">
                        <tr>
                          <th>Test Item</th>
                          <th>Measured Value</th>
                          <th>Biological Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Fasting Serum Glucose</td>
                          <td className="text-danger fw-bold">104 mg/dL (High)</td>
                          <td>65 - 99 mg/dL</td>
                        </tr>
                        <tr>
                          <td>Creatinine Level</td>
                          <td>0.92 mg/dL</td>
                          <td>0.60 - 1.30 mg/dL</td>
                        </tr>
                        <tr>
                          <td>Potassium Content</td>
                          <td>4.2 mmol/L</td>
                          <td>3.5 - 5.2 mmol/L</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-5 pt-3 border-top small text-secondary">
                    <span>Digital Signature Token: <strong>0x8a92f...c32d</strong></span>
                    <span>Approved by: <strong>S. Jenkins</strong></span>
                  </div>
                </div>

              </div>
              <div className="modal-footer border-top px-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary py-2 px-3 fw-medium text-dark bg-transparent"
                  onClick={() => alert("Printing document copy...")}
                >
                  <i className="bi bi-printer me-1"></i> Print Copy
                </button>
                <button
                  type="button"
                  className="btn btn-primary-neo py-2 px-4"
                  onClick={() => setShowPreviewModal(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
}

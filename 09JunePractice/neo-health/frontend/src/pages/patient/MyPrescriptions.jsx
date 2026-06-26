import React, { useState } from 'react';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function MyPrescriptions() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState(1);

  // Form states
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadNotes, setUploadNotes] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDownload = (medName) => {
    triggerToast(`Prescription PDF for ${medName} downloaded successfully.`);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    triggerToast("Prescription uploaded successfully. Awaiting doctor approval.");
    setShowUploadModal(false);
    setUploadFile(null);
    setUploadNotes("");
  };

  const handleSetupDelivery = () => {
    setShowDeliveryModal(true);
    setDeliveryStep(1);
  };

  const handleConfirmDelivery = () => {
    triggerToast("Home delivery setup confirmed! First delivery scheduled.");
    setShowDeliveryModal(false);
  };

  const activePrescriptions = [
    {
      medication: "Lisinopril 10mg",
      category: "Antihypertensive",
      doctor: "Dr. Alexander Chen",
      prescribedDate: "Oct 12, 2023",
      refillDate: "Nov 15, 2023",
      status: "Active"
    },
    {
      medication: "Metformin 500mg",
      category: "Antidiabetic",
      doctor: "Dr. Sarah Miller",
      prescribedDate: "Sep 05, 2023",
      refillDate: "Oct 30, 2023",
      status: "Active"
    }
  ];

  const pastPrescriptions = [
    {
      medication: "Amoxicillin 500mg",
      category: "Antibiotic",
      doctor: "Dr. James Wilson",
      prescribedDate: "June 14, 2023",
      dosage: "3x Daily"
    },
    {
      medication: "Ibuprofen 400mg",
      category: "Pain Relief",
      doctor: "Dr. Sarah Miller",
      prescribedDate: "May 02, 2023",
      dosage: "As needed"
    },
    {
      medication: "Ventolin Inhaler",
      category: "Asthma",
      doctor: "Dr. Lisa Ray",
      prescribedDate: "March 18, 2023",
      dosage: "Inhalation"
    }
  ];

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Prescription Management | Neo-Health Portal</title>
      <meta name="description" content="View active healthcare medications, download prescription PDFs, track pill adherence, and set up pharmacy home delivery." />

      <div className="container-fluid py-2">
        
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Prescription Management</h2>
            <p className="text-secondary mb-0 small">Access your complete medical history and current medication plans.</p>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => alert("Filter options: Active, Expired, All. Under development.")}
              className="btn btn-light border py-2.5 px-3 d-flex align-items-center gap-2 fw-medium text-dark hover-bg-light"
            >
              <i className="bi bi-filter"></i>
              <span>Filter Records</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn btn-primary-neo py-2.5 px-3 d-flex align-items-center gap-2 shadow-sm"
            >
              <i className="bi bi-cloud-arrow-up-fill"></i>
              <span>Upload New</span>
            </button>
          </div>
        </div>

        {/* Bento Section: Active Prescriptions & Delivery Promotion */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-capsule text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0 fs-5">Active Prescriptions</h3>
            </div>
            
            <div className="row g-4">
              {/* Active Cards */}
              {activePrescriptions.map((pres, index) => (
                <div className="col-12 col-md-6 col-xxl-4" key={index}>
                  <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <span className="text-primary small fw-bold text-uppercase tracking-wider">
                            {pres.category}
                          </span>
                          <h4 className="fw-bold text-dark fs-5 mb-0 mt-1">{pres.medication}</h4>
                        </div>
                        <span className="badge bg-success bg-opacity-10 text-success px-2.5 py-1.5 rounded-pill small fw-semibold">
                          {pres.status}
                        </span>
                      </div>
                      
                      <div className="border-top border-light-subtle pt-3 d-flex flex-column gap-2 small text-secondary">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-person text-primary"></i>
                          <span>Prescribed by: <strong className="text-dark">{pres.doctor}</strong></span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-calendar-event text-primary"></i>
                          <span>Prescribed Date: <strong className="text-dark">{pres.prescribedDate}</strong></span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-clock-history text-primary"></i>
                          <span>Next Refill: <strong className="text-dark">{pres.refillDate}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-4 pt-3 border-top border-light-subtle">
                      <button
                        onClick={() => handleDownload(pres.medication)}
                        className="btn btn-light border flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2 text-dark font-medium hover-bg-light"
                      >
                        <i className="bi bi-download"></i>
                        <span>Download PDF</span>
                      </button>
                      <button
                        onClick={() => alert(`Observational usage instructions for ${pres.medication}: Take daily after meals.`)}
                        className="btn btn-light border p-2 d-flex align-items-center justify-content-center text-dark hover-bg-light"
                        title="View Details"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Home Delivery Promo Card */}
              <div className="col-12 col-md-12 col-xxl-4">
                <div className="card border bg-primary text-white p-4 h-100 position-relative overflow-hidden shadow-sm d-flex flex-column justify-content-between" style={{ borderRadius: '16px' }}>
                  <div className="position-relative z-2">
                    <h4 className="fw-bold mb-2 text-white fs-5">Pharmacy Home Delivery</h4>
                    <p className="mb-0 text-white-50 small" style={{ maxWidth: '300px' }}>
                      Skip the queues! Have your active prescriptions delivered directly to your doorstep within 24 hours.
                    </p>
                  </div>
                  <div className="mt-4 pt-2 position-relative z-2">
                    <button
                      onClick={handleSetupDelivery}
                      className="btn btn-light text-primary fw-bold px-4 py-2.5 rounded-3 shadow-sm hover-bg-white transition-all"
                    >
                      Setup Delivery
                    </button>
                  </div>
                  {/* Floating cargo van icon background */}
                  <div className="position-absolute bottom-0 end-0 mb-n3 me-n3 opacity-10" style={{ zIndex: '1' }}>
                    <i className="bi bi-truck text-white" style={{ fontSize: '150px', lineHeight: '1' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Past Records Table */}
        <div className="mb-5">
          <div className="d-flex align-items-center gap-2 mb-3">
            <i className="bi bi-clock-history text-secondary fs-4"></i>
            <h3 className="fw-bold text-dark mb-0 fs-5">Past Records</h3>
          </div>
          
          <div className="neo-glass-card border bg-white shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-start">
                <thead>
                  <tr className="table-light border-bottom border-light-subtle">
                    <th className="px-4 py-3 text-secondary fw-semibold small">Medication</th>
                    <th className="px-4 py-3 text-secondary fw-semibold small">Doctor</th>
                    <th className="px-4 py-3 text-secondary fw-semibold small">Date Issued</th>
                    <th className="px-4 py-3 text-secondary fw-semibold small">Dosage</th>
                    <th className="px-4 py-3 text-secondary fw-semibold small text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pastPrescriptions.map((pres, index) => (
                    <tr key={index} className="transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <strong className="d-block text-dark">{pres.medication}</strong>
                          <span className="small text-secondary">{pres.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-dark font-medium">{pres.doctor}</td>
                      <td className="px-4 py-3 text-secondary small">{pres.prescribedDate}</td>
                      <td className="px-4 py-3">
                        <span className="badge bg-secondary-subtle text-secondary-emphasis px-2 py-1.5 rounded small">
                          {pres.dosage}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-end">
                        <button
                          onClick={() => handleDownload(pres.medication)}
                          className="btn btn-link text-primary p-0 fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 hover-underline"
                        >
                          <i className="bi bi-download small"></i>
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table Pagination Footer */}
            <div className="p-3 bg-light border-top border-light-subtle d-flex justify-content-between align-items-center">
              <span className="small text-secondary">Showing 3 of 12 past prescriptions</span>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-outline-secondary" disabled>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button className="btn btn-outline-secondary" onClick={() => alert("Simulated pagination next page.")}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Health Insight Bento Grids */}
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm border-start border-3 border-danger h-100 d-flex gap-3 align-items-start">
              <i className="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
              <div>
                <h4 className="fw-bold mb-1 fs-6 text-dark">Interaction Warning</h4>
                <p className="text-secondary small mb-0">
                  Avoid taking Lisinopril with grapefruit juice. This interaction may dangerously increase medication absorption.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm border-start border-3 border-primary h-100 d-flex gap-3 align-items-start">
              <i className="bi bi-patch-check-fill text-primary fs-3"></i>
              <div>
                <h4 className="fw-bold mb-1 fs-6 text-dark">Adherence Tracking</h4>
                <p className="text-secondary small mb-0">
                  You've maintained 95% medication adherence this month. Keep up the excellent work for cardiovascular health!
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="neo-glass-card p-4 border bg-white shadow-sm border-start border-3 border-success h-100 d-flex gap-3 align-items-start">
              <i className="bi bi-chat-left-text-fill text-success fs-3"></i>
              <div>
                <h4 className="fw-bold mb-1 fs-6 text-dark">Pharmacist Chat</h4>
                <p className="text-secondary small mb-0">
                  Have questions about pill side effects? Instantly connect with a certified pharmacist on demand, 24/7.
                </p>
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

      {/* Upload Prescription Modal */}
      {showUploadModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <form onSubmit={handleUploadSubmit}>
                <div className="modal-header border-bottom px-4">
                  <h5 className="modal-title fw-bold">Upload Prescription</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowUploadModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-secondary">Upload File (PDF/Image)</label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      onChange={(e) => setUploadFile(e.target.files[0])}
                    />
                    <div className="form-text small">Accepted formats: PDF, JPEG, PNG. Max file size: 5MB.</div>
                  </div>
                  <div>
                    <label className="form-label fw-semibold small text-secondary">Additional Notes / Instructions</label>
                    <textarea
                      className="form-control form-control-neo py-2 shadow-none border small"
                      rows="3"
                      placeholder="Specify refill requirements, dosing instructions..."
                      value={uploadNotes}
                      onChange={(e) => setUploadNotes(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top px-4">
                  <button
                    type="button"
                    className="btn btn-light border py-2.5 px-3 fw-medium text-dark hover-bg-light"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-neo py-2.5 px-4">
                    Submit Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Delivery Settings Modal */}
      {showDeliveryModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-bottom px-4">
                <h5 className="modal-title fw-bold">Home Delivery Setup</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeliveryModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                {deliveryStep === 1 ? (
                  <div>
                    <h6 className="fw-semibold text-dark mb-3">Verify Shipping Address</h6>
                    <div className="p-3 bg-light border rounded-3 mb-3">
                      <p className="fw-semibold text-dark mb-1 small">Alex Johnson</p>
                      <p className="text-secondary small mb-0">100 Broadway St, Apt 4B</p>
                      <p className="text-secondary small mb-0">New York, NY 10005</p>
                    </div>
                    <button
                      onClick={() => setDeliveryStep(2)}
                      className="btn btn-primary-neo w-100 py-2.5"
                    >
                      Confirm Address & Continue
                    </button>
                  </div>
                ) : (
                  <div>
                    <h6 className="fw-semibold text-dark mb-3">Select Prescription Medications</h6>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" defaultChecked id="check1" />
                      <label className="form-check-label text-dark small" htmlFor="check1">
                        Lisinopril 10mg (Refill #2)
                      </label>
                    </div>
                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" defaultChecked id="check2" />
                      <label className="form-check-label text-dark small" htmlFor="check2">
                        Metformin 500mg (Refill #1)
                      </label>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => setDeliveryStep(1)}
                        className="btn btn-light border py-2.5 px-3 fw-medium text-dark hover-bg-light"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmDelivery}
                        className="btn btn-primary-neo flex-grow-1 py-2.5"
                      >
                        Schedule Delivery
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
}

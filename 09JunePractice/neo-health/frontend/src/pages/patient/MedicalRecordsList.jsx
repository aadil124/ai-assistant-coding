import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SearchBar from '../../components/shared/SearchBar.jsx';
import EmptyState from '../../components/shared/EmptyState.jsx';
import SkeletonLoader from '../../components/shared/SkeletonLoader.jsx';
import ErrorBanner from '../../components/shared/ErrorBanner.jsx';

export default function MedicalRecordsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Search, Filter and Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(searchParams.get('type') || 'All');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, name-asc
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock list of medical records
  const initialRecords = [
    {
      id: "prescription-1",
      name: "Lisinopril 10mg Prescription.pdf",
      type: "Prescription",
      doctor: "Dr. Marcus Thorne",
      date: "2024-10-10",
      size: "1.2 MB",
      rawDate: new Date('2024-10-10T10:00:00')
    },
    {
      id: "record-lipid",
      name: "Lipid Panel blood_scan.pdf",
      type: "Lab Report",
      doctor: "Dr. Sarah Jenkins",
      date: "2024-09-26",
      size: "3.4 MB",
      rawDate: new Date('2024-09-26T10:00:00')
    },
    {
      id: "record-mri",
      name: "Cardiovascular MRI Report.pdf",
      type: "Lab Report",
      doctor: "Dr. Marcus Thorne",
      date: "2024-10-12",
      size: "4.2 MB",
      rawDate: new Date('2024-10-12T10:00:00')
    },
    {
      id: "record-note-1",
      name: "Cardiac Consultation Note.pdf",
      type: "Clinical Note",
      doctor: "Dr. Marcus Thorne",
      date: "2024-10-12",
      size: "850 KB",
      rawDate: new Date('2024-10-12T09:00:00')
    }
  ];

  // Simulating loading row skeletons when filters or search queries change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveFilter('All');
    setSortBy('date-desc');
  };

  const handleDownload = (recordName) => {
    // Simulated PDF file download
    const dummyText = `NEO-HEALTH DIGITAL DOWNLOAD\nFile: ${recordName}\nThis is a mock representation of the encrypted clinical record PDF.`;
    const element = document.createElement("a");
    const file = new Blob([dummyText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = recordName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleUploadClick = () => {
    // Trigger file chooser simulation
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.png,.jpg,.jpeg';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          setError('File upload failed: Medical record size exceeds the 10MB threshold limit.');
          return;
        }
        setError('');
        alert(`Successfully uploaded "${file.name}"! The document has been securely encrypted with AES-256 and stored in your profile records.`);
      }
    };
    fileInput.click();
  };

  // Filter & Sort calculation
  const filteredRecords = initialRecords.filter(rec => {
    const matchesSearch = rec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesType = true;
    if (activeFilter === 'prescriptions') matchesType = rec.type === 'Prescription';
    else if (activeFilter === 'reports') matchesType = rec.type === 'Lab Report';
    else if (activeFilter === 'notes') matchesType = rec.type === 'Clinical Note';

    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'date-desc') return b.rawDate - a.rawDate;
    if (sortBy === 'date-asc') return a.rawDate - b.rawDate;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <DashboardLayout>
      {/* React 19 Document Metadata */}
      <title>My Medical Records | Neo-Health Charts</title>
      <meta name="description" content="Access prescriptions, lab results, blood work panels, and clinical documents securely." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Medical Records"
          subtitle="View, search, and download your clinical charts and prescriptions."
          breadcrumbs={[
            { label: 'Dashboard', path: '/patient/dashboard' },
            { label: 'Medical Records', path: '/patient/medical-records' }
          ]}
          action={
            <button
              onClick={handleUploadClick}
              className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm"
              id="records-btn-upload"
            >
              <i className="bi bi-cloud-arrow-up fw-bold"></i>
              <span>Upload Record</span>
            </button>
          }
        />

        <ErrorBanner message={error} onClose={() => setError('')} />

        {/* Controls: Search, Filters & Sorting */}
        <div className="neo-glass-card p-4 border bg-white shadow-sm mb-4">
          <div className="row g-3 align-items-center">
            
            {/* Search input */}
            <div className="col-12 col-lg-5">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by file name, specialty, or doctor..."
                id="record-search"
              />
            </div>

            {/* Type Filter Chips */}
            <div className="col-12 col-lg-4">
              <div className="d-flex flex-wrap gap-2" id="record-type-filter-chips">
                {[
                  { label: 'All Records', val: 'All' },
                  { label: 'Prescriptions', val: 'prescriptions' },
                  { label: 'Lab Reports', val: 'reports' },
                  { label: 'Notes', val: 'notes' }
                ].map(chip => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setActiveFilter(chip.val)}
                    className={`btn rounded-pill px-3 py-1.5 small border transition-all ${
                      activeFilter === chip.val
                        ? 'btn-primary-neo border-primary'
                        : 'btn-light text-secondary hover-bg-light'
                    }`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-12 col-lg-3">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="record-sort" className="small fw-semibold text-secondary text-nowrap mb-0">Sort By:</label>
                <select
                  id="record-sort"
                  className="form-select form-control-neo py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-desc">Newest Date</option>
                  <option value="date-asc">Oldest Date</option>
                  <option value="name-asc">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Records Table Card */}
        <div className="neo-glass-card p-0 border bg-white shadow-sm overflow-hidden mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 small">
              <thead className="bg-light bg-opacity-50 border-bottom border-light-subtle text-secondary">
                <tr>
                  <th className="py-3 ps-4" style={{ width: '40%' }}>File Name</th>
                  <th className="py-3">Record Type</th>
                  <th className="py-3">Issued By</th>
                  <th className="py-3">Release Date</th>
                  <th className="py-3 text-end pe-4" style={{ width: '25%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <SkeletonLoader type="row" count={3} />
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-0 border-0">
                      <EmptyState
                        icon="bi-file-earmark-lock2"
                        title="No records match your criteria"
                        description="Try clear search queries, change filter categories, or upload a new record file to populate this list."
                        actionLabel="Clear Filter Queries"
                        onActionClick={handleClearFilters}
                      />
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => (
                    <tr key={rec.id} className="border-bottom border-light-subtle">
                      {/* File details */}
                      <td className="py-3 ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-primary bg-opacity-10 text-primary p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                            <i className={`bi ${
                              rec.type === 'Prescription'
                                ? 'bi-file-earmark-medical-fill'
                                : rec.type === 'Lab Report'
                                ? 'bi-file-earmark-ruled'
                                : 'bi-file-earmark-text'
                            } fs-5`}></i>
                          </div>
                          <div>
                            <span className="fw-bold text-dark d-block mb-0.5">{rec.name}</span>
                            <small className="text-secondary">{rec.size}</small>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3">
                        <span className={`badge px-2.5 py-1.5 rounded-pill small fw-semibold ${
                          rec.type === 'Prescription'
                            ? 'bg-primary bg-opacity-10 text-primary'
                            : rec.type === 'Lab Report'
                            ? 'bg-success bg-opacity-10 text-success'
                            : 'bg-secondary bg-opacity-10 text-secondary'
                        }`} style={{ fontSize: '0.75rem' }}>
                          {rec.type}
                        </span>
                      </td>

                      {/* Doctor */}
                      <td className="py-3 text-secondary fw-medium">
                        {rec.doctor}
                      </td>

                      {/* Date */}
                      <td className="py-3 text-secondary">
                        {new Date(rec.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 text-end pe-4">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            onClick={() => navigate(`/patient/records/view/${rec.id}`)}
                            className="btn btn-sm btn-light border py-1.5 px-3 fw-medium text-dark hover-bg-light"
                            id={`record-btn-view-${rec.id}`}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(rec.name)}
                            className="btn btn-sm btn-outline-secondary py-1.5 px-2 bg-transparent text-secondary border hover-border-primary"
                            id={`record-btn-dl-${rec.id}`}
                            title="Download Record file"
                          >
                            <i className="bi bi-download"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

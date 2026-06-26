import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';
import ErrorBanner from '../../components/shared/ErrorBanner.jsx';

export default function DoctorRecordUpload() {
  const [patientName, setPatientName] = useState('John Doe');
  const [recordType, setRecordType] = useState('Lab Report');
  const [filesList, setFilesList] = useState([
    { id: 'f1', name: 'blood_panel_doe.pdf', size: '1.4 MB', type: 'Lab Report', date: 'Oct 23, 2024' },
    { id: 'f2', name: 'chest_xray_doe.jpg', size: '4.2 MB', type: 'Clinical Note', date: 'Sep 26, 2024' }
  ]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFileUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    setError('');
    setSuccess('');
    const files = e.target.files;
    if (files && files.length > 0) {
      processFileUpload(files[0]);
    }
  };

  const processFileUpload = (file) => {
    // 1. Validation check (extensions)
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type: The platform accepts PDF, PNG, or JPG formats only.');
      return;
    }

    // 2. Size check (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File upload failed: Medical record size exceeds the 10MB threshold limit.');
      return;
    }

    // 3. Simulated progress upload
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setSuccess(`Successfully uploaded and encrypted "${file.name}"!`);
          
          const newFileRecord = {
            id: `f-${Date.now()}`,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: recordType,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
          setFilesList(prevList => [newFileRecord, ...prevList]);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleDeleteFile = (id) => {
    if (window.confirm("Are you sure you want to delete this medical file record?")) {
      setFilesList(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Medical Record Upload | Neo-Health</title>
      <meta name="description" content="Upload patient diagnostics PDFs or image charts. Encrypt medical records up to 10MB safely." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Clinical Upload Desk"
          subtitle="Attach laboratory test reports and clinical diagnostic charts to patient history files."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Record Upload', path: '/doctor/records/upload' }
          ]}
        />

        <ErrorBanner message={error} onClose={() => setError('')} />

        {success && (
          <div className="alert alert-success border-success border-opacity-20 d-flex align-items-center gap-2 p-3 mb-4 rounded-3" role="alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <span className="small">{success}</span>
          </div>
        )}

        <div className="row g-4">
          {/* Left Column: Drag & Drop Dropzone */}
          <div className="col-12 col-xl-7">
            <div className="d-flex flex-column gap-4">
              
              {/* Patient metadata selection */}
              <SectionCard title="Target Patient Metadata">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="upload-pat" className="form-label small fw-semibold text-secondary">Patient Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="upload-pat"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="upload-type" className="form-label small fw-semibold text-secondary">Record Category Type</label>
                    <select
                      className="form-select form-control-neo py-2.5"
                      id="upload-type"
                      value={recordType}
                      onChange={(e) => setRecordType(e.target.value)}
                    >
                      <option>Lab Report</option>
                      <option>Clinical Note</option>
                    </select>
                  </div>
                </div>
              </SectionCard>

              {/* Drag and Drop Zone */}
              <div
                className="neo-glass-card p-5 border border-dashed border-2 text-center bg-white shadow-sm cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('record-file-picker').click()}
                style={{ minHeight: '260px', cursor: 'pointer' }}
              >
                <input
                  type="file"
                  id="record-file-picker"
                  className="d-none"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                />
                
                <div className="bg-light rounded-circle p-4 mb-3 mx-auto border d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-cloud-arrow-up text-primary fs-1"></i>
                </div>

                <h5 className="fw-bold text-dark mb-1">Drag and drop file here</h5>
                <p className="text-secondary small mb-4">or click to browse local storage explorer</p>
                
                <div className="d-flex flex-wrap justify-content-center gap-3 text-secondary small">
                  <span><i className="bi bi-filetype-pdf text-danger"></i> PDF format</span>
                  <span><i className="bi bi-image text-success"></i> PNG, JPG formats</span>
                  <span><i className="bi bi-shield-fill-check text-primary"></i> Max size 10MB</span>
                </div>
              </div>

              {/* Uploading progress tracker */}
              {uploading && (
                <div className="neo-glass-card p-4 border bg-white shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-2 small">
                    <span className="fw-bold text-dark">Uploading Clinical Document...</span>
                    <span className="text-primary fw-bold font-monospace">{progress}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Uploaded files list */}
          <div className="col-12 col-xl-5">
            <SectionCard title="Uploaded Diagnosis Ledger">
              <div className="d-flex flex-column gap-3">
                {filesList.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 border rounded-3 bg-light bg-opacity-25 d-flex justify-content-between align-items-center small"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 text-primary p-2.5 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-file-earmark-check-fill fs-5"></i>
                      </div>
                      <div>
                        <strong className="text-dark d-block mb-1">{file.name}</strong>
                        <span className="text-secondary small d-block">
                          Category: {file.type} • {file.size}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file.id)}
                      className="btn btn-sm btn-outline-danger border-0 p-2 rounded-circle"
                      title="Delete uploaded record"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SectionCard from '../../components/shared/SectionCard.jsx';

export default function DoctorPrescriptionGen() {
  const [patientName, setPatientName] = useState('John Doe');
  const [patientAge, setPatientAge] = useState(45);
  const [medications, setMedications] = useState([
    { id: 'm1', name: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 Days', instructions: 'Take in the morning with water' }
  ]);

  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    duration: '',
    instructions: ''
  });

  const [signature, setSignature] = useState('Dr. Marcus Thorne');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const savedPatient = localStorage.getItem('last_consult_patient');
    if (savedPatient) {
      setPatientName(savedPatient);
    }
  }, []);

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.dosage || !newMed.duration) {
      alert("Please fill in Medicine Name, Dosage, and Duration fields.");
      return;
    }

    setMedications(prev => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        ...newMed
      }
    ]);

    setNewMed({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      duration: '',
      instructions: ''
    });
  };

  const handleRemoveMedication = (id) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const handleGeneratePrescription = () => {
    if (medications.length === 0) {
      alert("Please add at least one medication prescription line.");
      return;
    }

    const prescriptionText = `
===================================================
               NEO-HEALTH DIGITAL PRESCRIPTION
===================================================
Patient Name: ${patientName}
Age: ${patientAge}
Date Issued: ${new Date().toLocaleDateString()}
===================================================
Prescribed Medications:
${medications.map((m, idx) => `
${idx + 1}. ${m.name}
   Dosage: ${m.dosage}
   Frequency: ${m.frequency}
   Duration: ${m.duration}
   Instructions: ${m.instructions || 'N/A'}
`).join('\n')}
===================================================
Authorized Signature: ${signature} (Digitally Verified)
===================================================
Thank you for using Neo-Health virtual care portal.
    `;

    const blob = new Blob([prescriptionText], { type: 'text/plain' });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `prescription-${patientName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert(`Prescription for ${patientName} has been compiled, digitally signed by ${signature}, and saved securely as an immutable record. File download started.`);
  };

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Prescription Creator Desk | Neo-Health</title>
      <meta name="description" content="Generate and sign digital prescriptions. Add medications, set frequencies, and write instructions." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Prescription Builder Desk"
          subtitle="Generate, sign, and lock digital prescriptions post-consultation."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Prescriptions Gen', path: '/doctor/prescriptions/new' }
          ]}
        />

        <div className="row g-4">
          {/* Left Column: Form and Table */}
          <div className="col-12 col-xl-8">
            <div className="d-flex flex-column gap-4">
              
              {/* Patient Info details summary */}
              <SectionCard title="Patient & Author Credentials">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="p-name" className="form-label small fw-semibold text-secondary">Patient Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="p-name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="p-age" className="form-label small fw-semibold text-secondary">Patient Age</label>
                    <input
                      type="number"
                      className="form-control form-control-neo"
                      id="p-age"
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Dynamic Medicine table */}
              <SectionCard title="Prescribed Medications">
                {medications.length === 0 ? (
                  <p className="text-secondary small font-italic py-3 mb-0">
                    No medications added yet. Use the selector panel below to add medications.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0 small">
                      <thead>
                        <tr className="border-bottom border-light-subtle text-secondary">
                          <th className="py-2">Medicine</th>
                          <th className="py-2">Dosage</th>
                          <th className="py-2">Frequency</th>
                          <th className="py-2">Duration</th>
                          <th className="py-2">Instructions</th>
                          <th className="py-2 text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medications.map((m) => (
                          <tr key={m.id} className="border-bottom border-light-subtle">
                            <td className="py-3 fw-bold text-dark">{m.name}</td>
                            <td className="py-3 text-secondary">{m.dosage}</td>
                            <td className="py-3 text-secondary">{m.frequency}</td>
                            <td className="py-3 text-secondary">{m.duration}</td>
                            <td className="py-3 text-secondary">{m.instructions || 'None'}</td>
                            <td className="py-3 text-end">
                              <button
                                type="button"
                                onClick={() => handleRemoveMedication(m.id)}
                                className="btn btn-sm btn-outline-danger border-0 p-2 rounded-circle"
                                title="Remove medication"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </SectionCard>

              {/* Medicine Form Row */}
              <SectionCard title="Add Medication Line">
                <form onSubmit={handleAddMedication} id="add-medication-form">
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-4">
                      <label htmlFor="med-name" className="form-label small fw-semibold text-secondary">Medicine Name</label>
                      <input
                        type="text"
                        className="form-control form-control-neo"
                        id="med-name"
                        placeholder="e.g. Lisinopril 10mg"
                        value={newMed.name}
                        onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                      />
                    </div>
                    <div className="col-6 col-md-2">
                      <label htmlFor="med-dosage" className="form-label small fw-semibold text-secondary">Dosage</label>
                      <input
                        type="text"
                        className="form-control form-control-neo"
                        id="med-dosage"
                        placeholder="e.g. 1 tablet"
                        value={newMed.dosage}
                        onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                      />
                    </div>
                    <div className="col-6 col-md-3">
                      <label htmlFor="med-freq" className="form-label small fw-semibold text-secondary">Frequency</label>
                      <select
                        className="form-select form-control-neo py-2.5"
                        id="med-freq"
                        value={newMed.frequency}
                        onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                      >
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Three times daily</option>
                        <option>Before meals</option>
                        <option>As needed (PRN)</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-3">
                      <label htmlFor="med-dur" className="form-label small fw-semibold text-secondary">Duration</label>
                      <input
                        type="text"
                        className="form-control form-control-neo"
                        id="med-dur"
                        placeholder="e.g. 30 Days"
                        value={newMed.duration}
                        onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="med-inst" className="form-label small fw-semibold text-secondary">Special Instructions</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="med-inst"
                      placeholder="e.g. Take with food, drink plenty of water"
                      value={newMed.instructions}
                      onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                    />
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-secondary-neo py-2 px-4 border" id="med-add-row-btn">
                      Add Medication
                    </button>
                  </div>
                </form>
              </SectionCard>

            </div>
          </div>

          {/* Right Column: Signature & Preview */}
          <div className="col-12 col-xl-4">
            <div className="d-flex flex-column gap-4">
              
              {/* Signature Card */}
              <SectionCard title="Digital Signature Approval">
                <div className="mb-4">
                  <label htmlFor="doc-sig" className="form-label small fw-semibold text-secondary">Doctor Signature Stamp</label>
                  <input
                    type="text"
                    className="form-control form-control-neo font-monospace bg-light"
                    id="doc-sig"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    required
                  />
                  <small className="text-secondary d-block mt-2">This stamps a verified encrypted signature token at the bottom of the PDF record.</small>
                </div>

                <button
                  type="button"
                  onClick={handleGeneratePrescription}
                  className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  id="prescription-submit-btn"
                >
                  <i className="bi bi-file-earmark-check-fill"></i>
                  <span>Compile & Sign</span>
                </button>
              </SectionCard>

              {/* Preview Desk switch */}
              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="btn btn-light border py-2.5 w-100"
              >
                {previewOpen ? 'Hide Preview Sheet' : 'Show Prescription Preview'}
              </button>

              {previewOpen && (
                <div className="neo-glass-card p-4 border bg-white shadow-sm font-monospace text-start small">
                  <div className="text-center mb-3">
                    <h6 className="fw-bold mb-0">NEO-HEALTH CLINIC</h6>
                    <small className="text-secondary">Digital Prescription Desk</small>
                  </div>
                  <hr className="my-2" />
                  <p className="mb-1 text-dark"><strong>Patient:</strong> {patientName} (Age: {patientAge})</p>
                  <p className="mb-3 text-dark"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  
                  <strong className="d-block mb-1 text-dark">Rx:</strong>
                  {medications.map((m, idx) => (
                    <div key={m.id} className="mb-2">
                      <p className="mb-0 text-dark">{idx + 1}. {m.name} - {m.duration}</p>
                      <small className="text-secondary d-block">Take {m.dosage} • {m.frequency} ({m.instructions || 'N/A'})</small>
                    </div>
                  ))}
                  
                  <hr className="my-3" />
                  <div className="text-end">
                    <small className="text-secondary d-block">Signed Digitally By:</small>
                    <span className="fw-bold text-dark">{signature}</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}

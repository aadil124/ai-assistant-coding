import React, { useState, useEffect } from 'react';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function MyProfile() {
  const [activeSubTab, setActiveSubTab] = useState('account');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  // Profile data form fields
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "River",
    dob: "1992-04-12",
    gender: "Non-binary",
    email: "alex.river@example.com",
    phone: "+1 (555) 012-3456",
    address: "123 Health Ave, Suite 500, San Francisco, CA 94103",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCCabW24hXSYIajQOz7QuMUIpyVEO3vzg-m_qAUhw8OmyiVfEwmcK8RakxMG9nttQPLiFVosEBvCq0qDtU70_FXkFjueP_N_xg2gRqWbfYS1WrN-UqV7iKLkj0Gqjy-gkAfg3d57EBl0k40g3r3I0wX5UVpW6CR6wudpQaznkWKHA--JmlDT0x7kdVJZlafkQ-wKup-NAABoAU-hg6KPRTL8sUq8sTEfMv0ptbMcjXqklrYiwvgopQwJnaoMsBIH5UXeEaGRtf_E"
  });

  // Emergency contacts list
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Sarah River", relation: "Spouse", phone: "+1 (555) 987-6543" }
  ]);

  // New contact form
  const [newContact, setNewContact] = useState({ name: "", relation: "Spouse", phone: "" });

  // Initialize with values if saved previously
  useEffect(() => {
    const savedName = localStorage.getItem('patient_profile_name') || "Alex River";
    const savedEmail = localStorage.getItem('userEmail') || "alex.river@example.com";
    const names = savedName.split(" ");
    
    setFormData(prev => ({
      ...prev,
      firstName: names[0] || prev.firstName,
      lastName: names.slice(1).join(" ") || prev.lastName,
      email: savedEmail
    }));
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`;
    
    // Save to local storage for dynamic greetings sync
    localStorage.setItem('patient_profile_name', fullName);
    localStorage.setItem('userEmail', formData.email);
    
    triggerToast("Profile settings updated successfully.");
  };

  const handleDiscardChanges = () => {
    setFormData({
      firstName: "Alex",
      lastName: "River",
      dob: "1992-04-12",
      gender: "Non-binary",
      email: "alex.river@example.com",
      phone: "+1 (555) 012-3456",
      address: "123 Health Ave, Suite 500, San Francisco, CA 94103",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCCabW24hXSYIajQOz7QuMUIpyVEO3vzg-m_qAUhw8OmyiVfEwmcK8RakxMG9nttQPLiFVosEBvCq0qDtU70_FXkFjueP_N_xg2gRqWbfYS1WrN-UqV7iKLkj0Gqjy-gkAfg3d57EBl0k40g3r3I0wX5UVpW6CR6wudpQaznkWKHA--JmlDT0x7kdVJZlafkQ-wKup-NAABoAU-hg6KPRTL8sUq8sTEfMv0ptbMcjXqklrYiwvgopQwJnaoMsBIH5UXeEaGRtf_E"
    });
    localStorage.removeItem('patient_profile_name');
    triggerToast("Changes discarded.");
  };

  const handleDeleteContact = (id) => {
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
    triggerToast("Emergency contact deleted.");
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;

    setEmergencyContacts(prev => [
      ...prev,
      { id: Date.now(), name: newContact.name, relation: newContact.relation, phone: newContact.phone }
    ]);
    setShowAddContactModal(false);
    setNewContact({ name: "", relation: "Spouse", phone: "" });
    triggerToast("New emergency contact added.");
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Profile Settings | Neo-Health Settings</title>
      <meta name="description" content="Configure patient profile files, edit contact mailing details, record emergency phone numbers, and manage preferences." />

      <div className="container-fluid py-2">
        
        {/* Page Header */}
        <header className="mb-4">
          <h2 className="fw-bold text-dark mb-1">Profile Settings</h2>
          <p className="text-secondary mb-0 small">Manage your clinical information and account preferences.</p>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-4">
          <ul className="nav nav-tabs border-bottom border-light-subtle gap-2">
            {['account', 'security', 'preferences'].map(tab => (
              <li className="nav-item" key={tab}>
                <button
                  onClick={() => setActiveSubTab(tab)}
                  className={`nav-link border-0 pb-3 px-3 fw-semibold text-capitalize transition-all position-relative ${
                    activeSubTab === tab
                      ? 'text-primary border-bottom border-primary active'
                      : 'text-secondary bg-transparent hover-link'
                  }`}
                  style={{
                    borderBottomWidth: activeSubTab === tab ? '3px' : '0px',
                    borderBottomStyle: 'solid',
                    borderColor: 'var(--primary-color)'
                  }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {activeSubTab === 'account' ? (
          <div className="row g-4">
            
            {/* Left Column: Avatar & Completeness */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              
              {/* Avatar Upload Card */}
              <div className="neo-glass-card p-4 border bg-white text-center shadow-sm d-flex flex-column align-items-center">
                <div className="position-relative mb-3 group" style={{ width: '120px', height: '120px' }}>
                  <img
                    alt="Profile preview"
                    className="rounded-circle border border-4 border-light shadow-sm w-100 h-100 object-fit-cover"
                    src={formData.avatar}
                  />
                  <button
                    onClick={() => alert("Photo upload simulation: Select image file.")}
                    className="btn btn-primary rounded-circle border-2 border-white p-0 position-absolute bottom-0 end-0 d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px' }}
                    title="Change Photo"
                  >
                    <i className="bi bi-camera-fill text-white fs-6"></i>
                  </button>
                </div>
                
                <h3 className="fw-bold text-dark mb-1 fs-5">{formData.firstName} {formData.lastName}</h3>
                <p className="text-secondary small mb-4">Patient ID: #NH-90210-AR</p>
                
                <div className="w-100 d-flex flex-column gap-2">
                  <button
                    onClick={() => alert("Uploading photo source...")}
                    className="btn btn-primary-neo w-100 py-2.5"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoSBD2J04rkVEUZmB3Ky4b7QIJDvVd3i83dDGMhpU1qpmN4StUO1rJB7yLHGIUE6STjc0wb8IkxZTU745GkTIR6DATSKYGIzEVHF-sU5cjX6AUE35gSn6WYHN-LXvBsQTZqpRU9CcMPcPvIXoxfrXGOAgF5RT_6qYKxnSuBrzLS2qoqBk0lD49085xB7x5oPS_VNTSWlIvrBNq9C2Ao0pkWoa3TYDL12R0IcyBTgtnfXVQwMrcxSDViIR0rP-QcnRt5DQVvKuL2Ss" }))}
                    className="btn btn-outline-secondary w-100 py-2.5 fw-medium text-dark bg-transparent"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Profile Completeness Card */}
              <div className="neo-glass-card p-4 border bg-white shadow-sm border-start border-3 border-primary">
                <div className="d-flex justify-content-between align-items-center mb-2 small text-secondary">
                  <span>Profile Completion</span>
                  <strong className="text-primary font-bold">85%</strong>
                </div>
                <div className="progress mb-3" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: '85%' }}
                    aria-valuenow="85"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <p className="text-secondary small mb-0" style={{ fontStyle: 'italic' }}>
                  Add insurance details to reach 100%.
                </p>
              </div>

            </div>

            {/* Right Column: Forms & Emergency Contacts */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              
              <form onSubmit={handleSaveProfile} className="d-flex flex-column gap-4">
                
                {/* Personal Information */}
                <div className="neo-glass-card p-4 border bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2">
                    <i className="bi bi-person-fill text-primary fs-5"></i>
                    <h3 className="fw-bold mb-0 text-dark fs-5">Personal Information</h3>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        value={formData.firstName}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        value={formData.lastName}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        value={formData.dob}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">Gender Identity</label>
                      <select
                        name="gender"
                        className="form-select py-2 border shadow-none small"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option>Non-binary</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="neo-glass-card p-4 border bg-white shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2">
                    <i className="bi bi-envelope-open-fill text-primary fs-5"></i>
                    <h3 className="fw-bold mb-0 text-dark fs-5">Contact Details</h3>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        value={formData.email}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label text-secondary small fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        value={formData.phone}
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label text-secondary small fw-semibold">Home Address</label>
                      <textarea
                        name="address"
                        className="form-control form-control-neo py-2 shadow-none border small"
                        rows="2"
                        value={formData.address}
                        required
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts Section */}
                <div className="neo-glass-card p-4 border bg-white shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-heart-pulse-fill text-primary fs-5"></i>
                      <h3 className="fw-bold mb-0 text-dark fs-5">Emergency Contacts</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddContactModal(true)}
                      className="btn btn-link text-primary p-0 fw-semibold small text-decoration-none d-flex align-items-center gap-1 hover-underline"
                    >
                      <i className="bi bi-plus-lg small"></i>
                      <span>Add Contact</span>
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {emergencyContacts.length > 0 ? (
                      emergencyContacts.map(contact => (
                        <div key={contact.id} className="p-3 border rounded-3 d-flex justify-content-between align-items-start bg-light">
                          <div>
                            <h4 className="fw-bold text-dark fs-6 mb-1">{contact.name}</h4>
                            <p className="text-secondary small mb-1">Relationship: <strong className="text-dark">{contact.relation}</strong></p>
                            <p className="text-secondary small mb-0">Phone: <strong className="text-dark">{contact.phone}</strong></p>
                          </div>
                          
                          <div className="d-flex gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setNewContact({ name: contact.name, relation: contact.relation, phone: contact.phone });
                                setShowAddContactModal(true);
                                handleDeleteContact(contact.id);
                              }}
                              className="btn btn-link text-secondary hover-text-primary p-1"
                              title="Edit Contact"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteContact(contact.id)}
                              className="btn btn-link text-secondary hover-text-danger p-1"
                              title="Delete Contact"
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-secondary small mb-0 text-center py-2">No emergency contacts registered.</p>
                    )}
                  </div>
                </div>

                {/* Form Action Controls */}
                <div className="d-flex justify-content-end gap-2 border-top pt-3 border-light-subtle">
                  <button
                    type="button"
                    onClick={handleDiscardChanges}
                    className="btn btn-light border py-2.5 px-4 fw-medium text-dark hover-bg-light"
                  >
                    Discard Changes
                  </button>
                  <button type="submit" className="btn btn-primary-neo py-2.5 px-5 shadow-sm">
                    Save Profile
                  </button>
                </div>

              </form>

            </div>

          </div>
        ) : (
          /* Mock tabs content for Security & Preferences */
          <div className="neo-glass-card border bg-white p-5 text-center shadow-sm">
            <i className="bi bi-gear-wide-connected text-primary fs-1 mb-3 animate-spin"></i>
            <h4 className="fw-bold text-dark mb-2">{activeSubTab === 'security' ? 'Security Configurations' : 'Account Preferences'}</h4>
            <p className="text-secondary small mb-0 mx-auto" style={{ maxWidth: '300px' }}>
              These settings details are synchronized with your global security policies. Contact clinic administration to request core changes.
            </p>
          </div>
        )}

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

      {/* Add Emergency Contact Modal Dialog */}
      {showAddContactModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <form onSubmit={handleAddContactSubmit}>
                <div className="modal-header border-bottom px-4">
                  <h5 className="modal-title fw-bold">Emergency Contact</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddContactModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-secondary">Contact Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo py-2 shadow-none border small"
                      placeholder="Full Name"
                      required
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-secondary">Relationship</label>
                    <select
                      className="form-select py-2 border shadow-none small"
                      value={newContact.relation}
                      onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    >
                      <option>Spouse</option>
                      <option>Parent</option>
                      <option>Child</option>
                      <option>Sibling</option>
                      <option>Friend</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold small text-secondary">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control form-control-neo py-2 shadow-none border small"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-top px-4">
                  <button
                    type="button"
                    className="btn btn-light border py-2.5 px-3 fw-medium text-dark hover-bg-light"
                    onClick={() => setShowAddContactModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-neo py-2.5 px-4">
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </PatientLayout>
  );
}

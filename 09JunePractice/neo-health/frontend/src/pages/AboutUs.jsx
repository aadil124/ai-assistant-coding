import React from 'react';

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Chief Medical Officer & Founder",
      bio: "Board-certified Cardiologist with over 15 years of clinical and research experience.",
      icon: "bi-person-badge",
      color: "text-primary"
    },
    {
      name: "Dr. Marcus Vance",
      role: "Director of Digital Medicine",
      bio: "Pioneer in telemedicine integrations and patient-centric remote care models.",
      icon: "bi-laptop",
      color: "text-success"
    },
    {
      name: "Elena Rostova",
      role: "Chief Technology Officer",
      bio: "Security specialist previously leading privacy architectures at major health tech firms.",
      icon: "bi-shield-check",
      color: "text-info"
    }
  ];

  return (
    <div className="about-us-container py-5">
      {/* React 19 Document Metadata */}
      <title>About Us | Neo-Health Portal</title>
      <meta name="description" content="Learn about the Neo-Health mission, our board-certified medical leadership team, and our values of digital healthcare accessibility." />

      <div className="container">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-5 pb-2">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2 fw-semibold text-uppercase tracking-wider">Our Identity</span>
          <h1 className="fw-bold mb-3">Pioneering Digital Health</h1>
          <p className="text-secondary lead" style={{ fontSize: '1.1rem' }}>
            We bridge the gap between patient needs and expert medical advice, utilizing state-of-the-art telecommunication channels and safe medical systems.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="row g-4 mb-5 align-items-stretch">
          <div className="col-12 col-md-6">
            <div className="neo-glass-card p-4 h-100 d-flex flex-column justify-content-center">
              <h3 className="fw-bold mb-3 text-primary"><i className="bi bi-compass me-2"></i>Our Mission</h3>
              <p className="text-secondary mb-0">
                To democratize access to quality healthcare by delivering secure, intuitive, and immediate digital medical services. We believe that professional medical consultation should be available to everyone, everywhere, at any time, without administrative blockages.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="neo-glass-card p-4 h-100 d-flex flex-column justify-content-center">
              <h3 className="fw-bold mb-3 text-success"><i className="bi bi-eye me-2"></i>Our Vision</h3>
              <p className="text-secondary mb-0">
                To establish the benchmark for digital clinical excellence. Through continuous technology innovation, robust data encryption, and verified medical expertise, we aim to build a global virtual ecosystem where patients manage their health records and consult specialists with absolute trust.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">Our Core Values</h3>
          <p className="text-secondary">The principles guiding every telemedicine consultation and security update.</p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="neo-glass-card p-4 text-center h-100">
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 d-inline-flex">
                <i className="bi bi-heart-fill fs-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Patient-First</h5>
              <p className="text-secondary small mb-0">Every feature is built around user feedback, accessibility, and ease of use.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="neo-glass-card p-4 text-center h-100">
              <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 mb-3 d-inline-flex">
                <i className="bi bi-shield-lock-fill fs-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Ironclad Security</h5>
              <p className="text-secondary small mb-0">HIPAA compliant servers, encrypted calls, and secure databases protect patient details.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="neo-glass-card p-4 text-center h-100">
              <div className="bg-info bg-opacity-10 text-info rounded-circle p-3 mb-3 d-inline-flex">
                <i className="bi bi-patch-check-fill fs-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Clinical Quality</h5>
              <p className="text-secondary small mb-0">Only board-certified doctors with proven medical success records consult on our platform.</p>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="neo-glass-card p-4 text-center h-100">
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-3 mb-3 d-inline-flex">
                <i className="bi bi-lightbulb-fill fs-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Continuous Innovation</h5>
              <p className="text-secondary small mb-0">Pioneering updates including virtual dashboards and digital prescriptions access.</p>
            </div>
          </div>
        </div>

        {/* Board & Team Members */}
        <div className="mb-5">
          <div className="text-center mb-5">
            <h3 className="fw-bold">Medical Leadership</h3>
            <p className="text-secondary">Meet the specialists overseeing patient care standards and technological protocols.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="neo-glass-card p-4 text-center h-100 d-flex flex-column align-items-center">
                  <div className="rounded-circle bg-light border p-4 mb-3 d-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px' }}>
                    <i className={`bi ${member.icon} ${member.color}`} style={{ fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="fw-bold mb-1 text-dark">{member.name}</h5>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-3 px-3 py-1 small">{member.role}</span>
                  <p className="text-secondary small mb-0">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div>
          <div className="text-center mb-5">
            <h3 className="fw-bold">Our Journey</h3>
            <p className="text-secondary">How we grew to serve thousands of patients nationwide.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="position-relative ps-4" style={{ borderLeft: '2px solid var(--border-color)' }}>
                {/* Year 1 */}
                <div className="position-relative mb-4">
                  <div className="position-absolute bg-primary rounded-circle" style={{ width: '12px', height: '12px', left: '-31px', top: '6px', border: '3px solid #ffffff' }}></div>
                  <h6 className="fw-bold text-primary mb-1">2024 — Inception & Beta Rollout</h6>
                  <p className="text-secondary small">
                    Founded by Dr. Sarah Jenkins with a select panel of 15 licensed practitioners. Developed first end-to-end secure teleconsultation prototype.
                  </p>
                </div>
                {/* Year 2 */}
                <div className="position-relative mb-4">
                  <div className="position-absolute bg-success rounded-circle" style={{ width: '12px', height: '12px', left: '-31px', top: '6px', border: '3px solid #ffffff' }}></div>
                  <h6 className="fw-bold text-success mb-1">2025 — Expansion & E-Prescriptions</h6>
                  <p className="text-secondary small">
                    Launched digital health record integration (Feature 1.6) and instant pharmacy sync features. Expanded telemedicine availability to 10 additional states.
                  </p>
                </div>
                {/* Year 3 */}
                <div className="position-relative">
                  <div className="position-absolute bg-info rounded-circle" style={{ width: '12px', height: '12px', left: '-31px', top: '6px', border: '3px solid #ffffff' }}></div>
                  <h6 className="fw-bold text-info mb-1">2026 — Next-Gen Platform Launch</h6>
                  <p className="text-secondary small">
                    Released the modern glassmorphic web dashboard. Enabled advanced patient analytics tools and reviews modules for enhanced transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

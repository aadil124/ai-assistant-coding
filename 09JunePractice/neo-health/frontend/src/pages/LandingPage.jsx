import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      {/* React 19 Document Metadata */}
      <title>Neo-Health | Premium Digital Healthcare Portal</title>
      <meta name="description" content="Access top-tier medical consultations, digital prescriptions, and personal health metrics online with Neo-Health." />
      <meta name="keywords" content="telehealth, online doctor, prescriptions, medical records, digital healthcare" />

      {/* Hero Section */}
      <section className="position-relative overflow-hidden py-5 py-lg-6" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        {/* Background Decorative Blobs */}
        <div className="position-absolute top-0 start-0 translate-middle bg-primary opacity-10 rounded-circle" style={{ width: '40vw', height: '40vw', filter: 'blur(100px)' }}></div>
        <div className="position-absolute bottom-0 end-0 translate-middle bg-info opacity-10 rounded-circle" style={{ width: '30vw', height: '30vw', filter: 'blur(80px)' }}></div>

        <div className="container position-relative z-1">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 mb-3 fw-semibold text-uppercase tracking-wider">
                <i className="bi bi-shield-check me-2"></i>Next-Gen Patient Portal
              </span>
              <h1 className="display-4 fw-extrabold lh-sm mb-3">
                Virtual Healthcare <br />
                <span className="neo-gradient-text">Designed for Life.</span>
              </h1>
              <p className="lead text-secondary mb-4 pb-2" style={{ fontSize: '1.15rem' }}>
                Skip the waiting rooms. Instantly connect with board-certified doctors, manage your prescriptions, and view medical records on our secure, glassmorphic platform.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/register" className="btn btn-primary-neo btn-lg px-4 py-3 d-flex align-items-center justify-content-center gap-2" id="hero-cta-register">
                  <span>Get Started Now</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/about" className="btn btn-secondary-neo btn-lg px-4 py-3 d-flex align-items-center justify-content-center gap-2" id="hero-cta-about">
                  <span>Learn More</span>
                </Link>
              </div>
              <div className="mt-4 pt-3 d-flex justify-content-center justify-content-lg-start align-items-center gap-4 text-start">
                <div>
                  <h4 className="fw-bold text-dark mb-0">15k+</h4>
                  <small className="text-secondary">Happy Patients</small>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-color)', height: '30px' }}></div>
                <div>
                  <h4 className="fw-bold text-dark mb-0">99.8%</h4>
                  <small className="text-secondary">Satisfaction Rate</small>
                </div>
                <div style={{ borderLeft: '1px solid var(--border-color)', height: '30px' }}></div>
                <div>
                  <h4 className="fw-bold text-dark mb-0">24/7</h4>
                  <small className="text-secondary">Support Uptime</small>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              {/* Premium Floating Dashboard Preview Card */}
              <div className="position-relative mx-auto" style={{ maxWidth: '500px' }}>
                <div className="neo-glass-card p-4 position-relative z-2">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle bg-primary text-white p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                        <i className="bi bi-heartpulse-fill fs-5"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-0">Health Index Tracker</h6>
                        <small className="text-success fw-medium"><i className="bi bi-arrow-up-short"></i> +4.2% improvement</small>
                      </div>
                    </div>
                    <span className="badge bg-light text-dark border rounded-pill">Real-time</span>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="bg-light bg-opacity-50 p-3 rounded-3 border">
                        <small className="text-secondary d-block mb-1">Heart Rate</small>
                        <span className="fs-4 fw-bold text-dark">72 <small className="fs-6 fw-normal text-secondary">bpm</small></span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-light bg-opacity-50 p-3 rounded-3 border">
                        <small className="text-secondary d-block mb-1">Blood Oxygen</small>
                        <span className="fs-4 fw-bold text-dark">98 <small className="fs-6 fw-normal text-secondary">%</small></span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="bg-light bg-opacity-50 p-3 rounded-3 border">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-secondary">Next Virtual Consultation</small>
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">Confirmed</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-calendar-event text-primary"></i>
                            <span className="small fw-semibold text-dark">Today, 2:30 PM</span>
                          </div>
                          <span className="small text-secondary">Dr. Sarah Jenkins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 text-center border-top">
                    <Link to="/login" className="text-primary text-decoration-none small fw-semibold d-flex align-items-center justify-content-center gap-1">
                      <span>Access Patient Dashboard</span>
                      <i className="bi bi-chevron-right"></i>
                    </Link>
                  </div>
                </div>
                {/* Secondary back decorative glass element */}
                <div className="position-absolute top-100 start-50 translate-middle neo-glass-card p-3 w-75 z-1 opacity-75 d-none d-sm-block" style={{ transform: 'translate(-50%, -75%) scale(0.95)', filter: 'blur(1px)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-shield-check-fill text-success fs-4"></i>
                    <div>
                      <small className="text-secondary d-block">Encryption</small>
                      <span className="small fw-bold text-dark">AES-256 Bit Secure Connection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-5 bg-white border-top border-bottom" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container py-3">
          <div className="text-center max-w-xl mx-auto mb-5">
            <h2 className="fw-bold mb-3">Complete Medical Services Online</h2>
            <p className="text-secondary">A unified platform integrating video medicine, secure data systems, and client reviews.</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="neo-glass-card p-4 h-100 d-flex flex-column">
                <div className="bg-primary-subtle text-primary rounded-3 p-3 mb-4 d-inline-flex align-self-start">
                  <i className="bi bi-camera-video fs-4"></i>
                </div>
                <h5 className="fw-bold mb-2">Video Consultations</h5>
                <p className="text-secondary small flex-grow-1">
                  Connect face-to-face with board-certified physicians from the comfort of your home. High-definition feed with end-to-end encryption.
                </p>
                <Link to="/register" className="text-primary text-decoration-none small fw-semibold mt-3 d-flex align-items-center gap-1">
                  <span>Learn more</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="neo-glass-card p-4 h-100 d-flex flex-column">
                <div className="bg-success-subtle text-success rounded-3 p-3 mb-4 d-inline-flex align-self-start">
                  <i className="bi bi-file-earmark-medical fs-4"></i>
                </div>
                <h5 className="fw-bold mb-2">Digital Records & Prescriptions</h5>
                <p className="text-secondary small flex-grow-1">
                  Access your post-consultation summaries, doctor recommendations, and pharmacies logs securely anywhere, anytime.
                </p>
                <Link to="/register" className="text-primary text-decoration-none small fw-semibold mt-3 d-flex align-items-center gap-1">
                  <span>Learn more</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="neo-glass-card p-4 h-100 d-flex flex-column">
                <div className="bg-info-subtle text-info rounded-3 p-3 mb-4 d-inline-flex align-self-start">
                  <i className="bi bi-star fs-4"></i>
                </div>
                <h5 className="fw-bold mb-2">Doctor Reviews</h5>
                <p className="text-secondary small flex-grow-1">
                  Read honest feedback submitted by verified patients. Submit reviews of your own consultation experiences to guide others.
                </p>
                <Link to="/register" className="text-primary text-decoration-none small fw-semibold mt-3 d-flex align-items-center gap-1">
                  <span>Learn more</span>
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, var(--background-color) 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-5">
              <h2 className="fw-bold mb-3">Your Privacy and Security is Our Priority</h2>
              <p className="text-secondary mb-4">
                Neo-Health utilizes bank-grade security and adheres strictly to HIPAA compliance protocols to keep your medical discussions and personal information private.
              </p>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <i className="bi bi-patch-check-fill text-primary fs-5 mt-1"></i>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">HIPAA Compliant Data Handling</h6>
                    <p className="text-secondary small mb-0">Your records are completely encrypted at rest and during transit.</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <i className="bi bi-patch-check-fill text-primary fs-5 mt-1"></i>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Verified Medical Providers</h6>
                    <p className="text-secondary small mb-0">Every physician on our platform undergoes rigorous credential validation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7">
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <div className="neo-glass-card p-4 text-center">
                    <h3 className="fw-bold text-primary mb-2">256-bit</h3>
                    <h6 className="fw-semibold mb-1 text-dark">E2E Encryption</h6>
                    <p className="text-secondary small mb-0">Unbreakable safety layer for calls and messages.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="neo-glass-card p-4 text-center">
                    <h3 className="fw-bold text-success mb-2">100%</h3>
                    <h6 className="fw-semibold mb-1 text-dark">Certified Staff</h6>
                    <p className="text-secondary small mb-0">Physicians licensed to practice in your jurisdiction.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="neo-glass-card p-4 text-center">
                    <h3 className="fw-bold text-info mb-2">3 Min</h3>
                    <h6 className="fw-semibold mb-1 text-dark">Average Wait Time</h6>
                    <p className="text-secondary small mb-0">Get connected to a doctor almost instantly.</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="neo-glass-card p-4 text-center">
                    <h3 className="fw-bold text-warning mb-2">4.9/5</h3>
                    <h6 className="fw-semibold mb-1 text-dark">Average Review Score</h6>
                    <p className="text-secondary small mb-0">Highly rated virtual care services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center position-relative overflow-hidden">
        <div className="position-absolute top-50 start-50 translate-middle bg-white opacity-10 rounded-circle" style={{ width: '60vw', height: '60vw', filter: 'blur(120px)' }}></div>
        <div className="container position-relative z-1 py-4">
          <h2 className="display-5 fw-bold mb-3">Ready to Consult a Specialist?</h2>
          <p className="lead opacity-75 max-w-xl mx-auto mb-4" style={{ fontSize: '1.1rem' }}>
            Register your patient profile today and connect with a virtual doctor within minutes.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/register" className="btn btn-light btn-lg px-4 py-3 fw-semibold text-primary" id="cta-register-bottom">Create Free Account</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold" id="cta-login-bottom">Sign In to Portal</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

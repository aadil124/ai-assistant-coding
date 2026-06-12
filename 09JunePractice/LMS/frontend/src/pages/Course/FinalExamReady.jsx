import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function FinalExamReady() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [initiating, setInitiating] = useState(false);

  const handleStartExam = () => {
    const confirmed = window.confirm(
      "WARNING: Once you start the final exam, the 120-minute timer begins immediately and cannot be paused. Do you wish to proceed with your single attempt?"
    );

    if (confirmed) {
      setInitiating(true);
      setTimeout(() => {
        navigate(`/course/${courseId}/exam`);
      }, 2000);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between animate-fade-in" style={{ backgroundColor: 'var(--bg-neutral)' }}>
      <style>{`
        .hero-banner-premium {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .spec-item {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 12px;
        }
        .spec-item:last-child {
          border-bottom: none;
        }
        .icon-box-premium {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--border-light);
          color: var(--text-secondary);
        }
        .overlay-countdown-premium {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.96);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .progress-bar-loading {
          width: 280px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin: 24px auto 0 auto;
        }
        .progress-fill-loading {
          height: 100%;
          background-color: var(--primary);
          animation: loadBar 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .pulse-text {
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Initiating session overlay */}
      {initiating && (
        <div className="overlay-countdown-premium text-center">
          <div>
            <h2 className="h4 fw-bold mb-2 tracking-wider pulse-text">SECURE SESSION INITIATING</h2>
            <p className="text-white-50 small font-monospace">Establishing encrypted environment connection...</p>
            <div className="progress-bar-loading">
              <div className="progress-fill-loading"></div>
            </div>
          </div>
        </div>
      )}

      {/* Top Nav Bar */}
      <header className="nav-premium-top justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary fs-4" style={{ letterSpacing: '-0.02em' }}>EduFlow</Link>
          <nav className="d-none d-md-flex gap-3 ms-4">
            <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary text-sm">Catalog</Link>
            <Link to="/dashboard" className="text-primary text-decoration-none text-sm fw-semibold">My Learning</Link>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-1 text-decoration-none" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="rounded-circle border overflow-hidden bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
            U
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1100px' }}>
        {/* Banner Section */}
        <section className="hero-banner-premium p-4 p-md-5 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white bg-opacity-10 rounded-pill text-white fw-semibold small mb-3">
              <span className="material-symbols-outlined fs-6 text-success" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              CURRICULUM COMPLETED
            </div>
            <h1 className="h2 fw-bold text-white mb-2">Final Certification Gate</h1>
            <p className="text-white-50 mb-0" style={{ maxWidth: '700px', fontSize: '0.975rem', lineHeight: '1.6' }}>
              You have successfully completed all syllabus modules. You are now authorized to initiate the comprehensive final examination. This assessment is designed to test your knowledge retention and core competencies.
            </p>
          </div>
          <div className="bg-white bg-opacity-5 rounded-4 p-4 text-center border border-white border-opacity-10 flex-shrink-0" style={{ width: '220px' }}>
            <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '56px', height: '56px' }}>
              <span className="material-symbols-outlined text-white fs-4">lock_open</span>
            </div>
            <h3 className="h6 fw-bold text-white mb-1">Status: Ready</h3>
            <span className="text-white-50 small">Attempt 1 of 1</span>
          </div>
        </section>

        {/* Details Grid */}
        <div className="row g-4">
          {/* Specifications */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="card-premium-static p-4 bg-white">
              <h2 className="h6 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Exam Specifications
              </h2>
              <div className="d-flex flex-column gap-3 small text-secondary">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Time Limit</span>
                  <span className="fw-bold text-dark">120 Minutes</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Attempts Allowed</span>
                  <span className="fw-bold text-dark">1 Attempt</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Passing Score</span>
                  <span className="fw-bold text-dark">85% Correct</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Assessment Type</span>
                  <span className="fw-bold text-dark">Interactive Quiz</span>
                </div>
              </div>
            </div>

            <div className="card-premium-static p-4 bg-white">
              <h3 className="h6 fw-bold text-dark mb-3">SYSTEM VALIDATION</h3>
              <div className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-secondary small d-block">PROCTOR MODE</span>
                  <span className="fw-semibold text-success small">Algorithmic Check Passed</span>
                </div>
                <span className="material-symbols-outlined text-success">check_circle</span>
              </div>
            </div>
          </div>

          {/* Rules & start */}
          <div className="col-lg-8">
            <div className="card-premium h-100 d-flex flex-column justify-content-between p-4 p-md-5">
              <div>
                <h2 className="h5 fw-bold text-dark mb-3">Academic Integrity Protocol</h2>
                <p className="text-secondary small mb-4">
                  Please review the following rules carefully before launching your examination session. Failure to adhere to these rules can result in automatic invalidation of the attempt.
                </p>

                <div className="row g-4 mb-4">
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box-premium flex-shrink-0" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 small">Continuous Timer</h4>
                      <p className="text-secondary small mb-0">Once initiated, the session cannot be paused or reset. Keep an active connection.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box-premium flex-shrink-0" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 small">Single Opportunity</h4>
                      <p className="text-secondary small mb-0">Only one attempt is authorized per enrollment cycle. Retake requires administrator approval.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box-premium flex-shrink-0">
                      <span className="material-symbols-outlined">browser_updated</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 small">No Tab Switching</h4>
                      <p className="text-secondary small mb-0">Keep the browser tab active. Navigating away or minimizing may trigger session suspension.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box-premium flex-shrink-0">
                      <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 small">Score Verification</h4>
                      <p className="text-secondary small mb-0">Results are computed instantly upon final submission and logged to the student transcript.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 border-top pt-4 mt-4">
                <button
                  onClick={handleStartExam}
                  className="btn-premium-primary px-5 py-3 w-100 w-sm-auto"
                >
                  Start Final Exam
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-secondary small mb-0 flex-grow-1 text-center text-sm-start mt-2 mt-sm-0">
                  By clicking start, you acknowledge the <span className="text-danger fw-semibold">non-reversible attempt</span> and strict time constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2026 EduFlow LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

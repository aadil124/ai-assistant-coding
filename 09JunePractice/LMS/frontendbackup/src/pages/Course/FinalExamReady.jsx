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
        navigate(`/course/${courseId}/final-exam`);
      }, 2000);
    }
  };

  return (
    <div className="ready-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .ready-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .top-nav {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant, #c7c4d7);
          background-color: #ffffff;
          z-index: 50;
        }
        .hero-banner {
          background-color: #213145;
          color: #ffffff;
          border-radius: 1rem;
          position: relative;
          overflow: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 1rem;
          padding: 24px;
        }
        .spec-item {
          border-bottom: 1px solid var(--outline-variant, #c7c4d7);
          padding-bottom: 12px;
        }
        .spec-item:last-child {
          border-bottom: none;
        }
        .icon-box {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .overlay-countdown {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(11, 28, 48, 0.95);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .progress-bar-loading {
          width: 250px;
          height: 6px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          overflow: hidden;
          margin: 20px auto 0 auto;
        }
        .progress-fill-loading {
          height: 100%;
          background-color: var(--primary, #4648d4);
          animation: loadBar 2s ease-out forwards;
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Initiating session overlay */}
      {initiating && (
        <div className="overlay-countdown text-center">
          <div>
            <h2 className="display-6 fw-bold mb-3 animate-pulse">INITIATING SESSION</h2>
            <div className="progress-bar-loading">
              <div className="progress-fill-loading"></div>
            </div>
            <p className="text-white-50 mt-3 small font-monospace">Securing environment connection...</p>
          </div>
        </div>
      )}

      {/* Top Nav Bar */}
      <header className="top-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary font-display fs-4" style={{ letterSpacing: '-0.02em' }}>Lumina LMS</Link>
          <nav className="d-none d-md-flex gap-3 ms-4">
            <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary font-label-md">Catalog</Link>
            <Link to="/dashboard" className="text-primary text-decoration-none border-bottom border-primary pb-1 font-label-md">My Learning</Link>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-1 text-decoration-none">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="rounded-circle border overflow-hidden" style={{ width: '32px', height: '32px' }}>
            <img
              alt="User avatar"
              className="w-100 h-100 object-fit-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkFwQVqaaHSB7aV-Cs-W1eKtBYV5JuuOMJfpN61nAFYwPY8P9RQM3IGAX7uHk3tENmf-dwLHNUClpAh05fr6Lp939zmIxG94y3MEHSWkcMTZ9CBqn3VM8mBrmgnf9LLkTQOaUUuu3pLMAZX6gYNdZIi095PEPiJp8ZL1t9YX3WBHNBvwn94e-iGtHZU9R2i3p1SKWZpKRrjVYW85jkPSWrwBEsofAn_sfo3vO2LIpTjAZxyFZsIOZUwZwMPOnt3WwS7BbpioI3Inq2"
            />
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1200px' }}>
        {/* Banner Section */}
        <section className="hero-banner p-4 p-md-5 mb-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white bg-opacity-10 rounded-pill text-primary-fixed fw-semibold small mb-3">
              <span className="material-symbols-outlined fs-6" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              COURSE COMPLETE
            </div>
            <h1 className="display-5 fw-bold text-white mb-2">Mastering WebGL</h1>
            <p className="text-white-50 mb-0" style={{ maxWidth: '700px', fontSize: '1.1rem' }}>
              You have successfully completed all technical modules. The final certification exam is now ready to be unlocked. This is a high-stakes assessment designed to validate your mastery of 3D rendering pipelines.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-4 p-4 text-center border border-white border-opacity-10 flex-shrink-0" style={{ width: '220px' }}>
            <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
              <span className="material-symbols-outlined text-white fs-3">lock_open</span>
            </div>
            <h3 className="h6 fw-bold text-white mb-1">Exam Status: Ready</h3>
            <span className="text-white-50 small">Attempt 1 of 1</span>
          </div>
        </section>

        {/* Details Grid */}
        <div className="row g-4">
          {/* Prerequisites */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="glass-card">
              <h2 className="h5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary">task_alt</span>
                Prerequisites
              </h2>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-white bg-opacity-50 border rounded-3">
                  <div>
                    <span className="fw-semibold d-block text-dark text-sm">Module 01: Foundations</span>
                    <small className="text-secondary">100% Completed</small>
                  </div>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-white bg-opacity-50 border rounded-3">
                  <div>
                    <span className="fw-semibold d-block text-dark text-sm">Module 02: Shaders & GLSL</span>
                    <small className="text-secondary">100% Completed</small>
                  </div>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-white bg-opacity-50 border rounded-3">
                  <div>
                    <span className="fw-semibold d-block text-dark text-sm">Module 03: Performance Optimization</span>
                    <small className="text-secondary">100% Completed</small>
                  </div>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>

            <div className="bg-light-subtle border rounded-4 p-4">
              <h3 className="h6 fw-bold text-dark mb-3">EXAM SPECIFICATIONS</h3>
              <div className="d-flex flex-column gap-2.5 small text-secondary">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Time Limit</span>
                  <span className="fw-bold text-dark">120 Minutes</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Total Questions</span>
                  <span className="fw-bold text-dark">45 Items</span>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span>Passing Score</span>
                  <span className="fw-bold text-dark">85%</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Difficulty</span>
                  <span className="fw-bold text-dark">Advanced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules & start */}
          <div className="col-lg-8">
            <div className="glass-card border-primary border-opacity-25 h-100 d-flex flex-column justify-content-between p-4 p-md-5">
              <div>
                <h2 className="h4 fw-bold text-dark mb-3">Final Certification Protocol</h2>
                <p className="text-secondary mb-4">
                  Please review the following critical information before initiating the secure exam session. This exam is proctored and uses advanced algorithmic validation.
                </p>

                <div className="row g-4 mb-4">
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box bg-danger bg-opacity-10 text-danger flex-shrink-0">
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 text-sm">Non-Pauseable Timer</h4>
                      <p className="text-secondary small mb-0">Once started, the timer cannot be paused. Closing the browser will forfeit the attempt.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box bg-danger bg-opacity-10 text-danger flex-shrink-0">
                      <span className="material-symbols-outlined">lock_reset</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 text-sm">Single Attempt Policy</h4>
                      <p className="text-secondary small mb-0">You are permitted only one attempt for this certification cycle. Retakes require 30-day cooldown.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box bg-light text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined">terminal</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 text-sm">Code Environment</h4>
                      <p className="text-secondary small mb-0">Live coding portions require an active WebGL2 compatible browser and hardware acceleration.</p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="icon-box bg-light text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined">privacy_tip</span>
                    </div>
                    <div>
                      <h4 className="fw-bold text-dark mb-1 text-sm">Integrity Monitoring</h4>
                      <p className="text-secondary small mb-0">Tab switching or clipboard activity is logged during the examination period.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-dark text-white rounded-3 p-3 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div>
                    <small className="text-primary-fixed block mb-1">SYSTEM STATUS</small>
                    <div className="d-flex align-items-center gap-2">
                      <span className="d-inline-block rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
                      <span className="font-monospace small">Secure Environment Verified</span>
                    </div>
                  </div>
                  <div className="vr bg-white bg-opacity-20 d-none d-md-block" style={{ height: '40px' }}></div>
                  <div>
                    <small className="text-primary-fixed block mb-1">IDENTIFICATION</small>
                    <span className="font-monospace small">USER_ID: LMS_77492</span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column sm:flex-row items-center gap-3 border-top pt-4">
                <button
                  onClick={handleStartExam}
                  className="btn btn-nexus-primary px-5 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                >
                  Start Final Exam
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="text-secondary small mb-0 flex-grow-1 text-center text-sm-start mt-2 mt-sm-0">
                  By clicking start, you acknowledge the <span className="text-danger fw-bold">non-reversible attempt</span> and strict time constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

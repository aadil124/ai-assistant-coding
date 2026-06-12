import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

export default function PublicLandingPage() {
  const navigate = useNavigate();
  
  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // context missing
  }
  const isAuthenticated = auth?.isAuthenticated || false;
  const user = auth?.user || null;

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Instructor') {
        navigate('/instructor', { replace: true });
      } else if (user.role === 'Learner') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Route helper based on user role
  const dashboardLink = user?.role === 'Instructor' ? '/instructor' : '/dashboard';

  return (
    <div className="landing-shell">
      <style>{`
        .landing-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }
        .hero-gradient {
          background: radial-gradient(circle at 50% 0%, var(--primary-glow) 0%, var(--bg-neutral) 70%);
          padding-top: 100px;
          padding-bottom: 80px;
        }
        .enterprise-badge {
          background-color: var(--primary-light);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-weight: 800;
          font-size: 3rem;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: var(--text-primary);
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
        }
        .hero-desc {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 42rem;
          margin: 0 auto 2.5rem auto;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 12px;
          box-shadow: var(--shadow-lg);
        }
        .features-section {
          background-color: var(--bg-neutral);
          padding: 96px 0;
        }
        .cta-section {
          background-color: #0f172a;
          color: #ffffff;
          padding: 96px 0;
        }
        .footer-logo {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
      `}</style>

      {/* Global Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="position-relative hero-gradient text-center px-3 overflow-hidden">
          <div className="container" style={{ maxWidth: '960px' }}>
            <span className="enterprise-badge">SEQUENTIAL EDUCATION SYSTEM</span>
            <h1 className="hero-title mb-4">
              Master structured courses <br className="d-none d-md-block" /> with focused progression.
            </h1>
            <p className="hero-desc">
              EduFlow is a premium learning management system offering step-by-step curriculum designs, automated assessment thresholds, and instant completion certificates.
            </p>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mb-5">
              <Link to="/register" className="btn-premium-primary btn-lg px-4 py-3" style={{ minWidth: '180px', borderRadius: 'var(--radius-md)' }}>
                Get Started
              </Link>
              <Link to="/courses" className="btn-premium-secondary btn-lg px-4 py-3" style={{ minWidth: '180px', borderRadius: 'var(--radius-md)' }}>
                Browse Catalog
              </Link>
            </div>
            <div className="w-100 max-w-5xl mx-auto pt-3">
              <div className="glass-card shadow-lg">
                <img
                  alt="EduFlow Dashboard Interface"
                  className="w-100 h-auto rounded-3 shadow-sm"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNC7lmXyihbr1uI0pPRDIbUU8RA4VdmXdtbvfR54AiAPbQeOA559G62y0wBiT-hmo-eBeIllopmZ-09EcZ88u6QTVP3dc3reWRk5n5GlYoC9TmbjoIhldUoiKPjKceGfIExQQk6iA8ZadaweJJKakQE6B0f-CKLDc_hLj4DfXEZ44PiAp37ZcA3K11wxgkMRRK9tlBwa1kvIW4GSbcB7zdVamMiaMdZASKPnFuLKUAMYrBWcHVgU9AQNnxt2EOSGJpE6TrZLS7kYZ2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="features-section">
          <div className="container px-4">
            <div className="mb-5 text-center">
              <h2 className="h2 fw-bold mb-2">Engineered for Effective Learning</h2>
              <p className="text-secondary max-w-lg mx-auto">A robust system designed to eliminate fragmentation and enforce chronological progression.</p>
            </div>

            <div className="row g-4 text-start">
              {/* Feature 1: Sequential Path Lock */}
              <div className="col-12 col-md-8">
                <div className="card-premium h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3 mb-4" style={{ width: '48px', height: '48px' }}>
                      <span className="material-symbols-outlined text-primary fs-3">lock</span>
                    </div>
                    <h3 className="h4 fw-bold text-dark mb-2">Sequential Locks</h3>
                    <p className="text-secondary mb-0" style={{ maxWidth: '480px' }}>
                      Topic N-1 must be completed before Topic N is unlocked. No bypassing, no fragmentation. Instructors dictate learning pace.
                    </p>
                  </div>
                  <div className="mt-4">
                    <span className="badge-premium badge-premium-primary">Core Mechanics</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: Automated Verification */}
              <div className="col-12 col-md-4">
                <div className="card-premium h-100 d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#ffffff', borderColor: '#2563eb' }}>
                  <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-3 mb-4" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined text-white fs-3">verified</span>
                  </div>
                  <div>
                    <h3 className="h4 fw-bold text-white mb-2">Automated Certificates</h3>
                    <p className="text-white text-opacity-80 mb-0">
                      Instantly issue system-generated, secure completion certificates once the final exam is successfully evaluated.
                    </p>
                  </div>
                  <div className="mt-4">
                    <span className="badge-premium" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>Evaluation Engine</span>
                  </div>
                </div>
              </div>

              {/* Feature 3: Evaluation Engine */}
              <div className="col-12 col-md-4">
                <div className="card-premium h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3 mb-4" style={{ width: '48px', height: '48px' }}>
                      <span className="material-symbols-outlined text-primary fs-3">quiz</span>
                    </div>
                    <h3 className="h4 fw-bold text-dark mb-2">Evaluation Gateways</h3>
                    <p className="text-secondary mb-0">
                      Topic-level quizzes and full final examinations enforce progress thresholds (e.g. 70%) before unlocking certificates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4: Instructor Analytics */}
              <div className="col-12 col-md-8">
                <div className="card-premium h-100">
                  <div className="row align-items-center h-100 g-4">
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3 mb-3" style={{ width: '48px', height: '48px' }}>
                        <span className="material-symbols-outlined text-primary fs-3">analytics</span>
                      </div>
                      <h3 className="h4 fw-bold text-dark mb-2">Course Analytics</h3>
                      <p className="text-secondary mb-0">
                        Instructors can track student progression indexes, assessment scores, and completion rate ratios in real-time.
                      </p>
                    </div>
                    <div className="col-12 col-sm-6 d-flex justify-content-center">
                      <div className="position-relative w-100" style={{ maxWidth: '240px' }}>
                        <div className="position-absolute bg-primary bg-opacity-10 rounded-circle w-100 h-100 blur-xl"></div>
                        <img
                          className="w-100 h-auto rounded-3 shadow-lg position-relative"
                          alt="Growth Trends"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUKxaxD-OlcE-kK90x2UKKlAwdJovWZS0qBfWvXSXdDcDLNmURJIa-mMxIzs82aJp3DWc-UWrWGRXpC4M8JO7Eer2qj4x0iD6XaWy4qYxI1Mn4uBUUjnBQKqCcdV6BTUiGjeppDDrrTPkiDH2CCmQ6qWEJe6gEsbCvsAs1nBtH-_NqcB9F0iet_OUP66vf0Dww_7IVlYzCmw1_kfdihefAQa-WKhsNEfGimMJ4KgaOUre94MGCQEbxiHSRSXzxQnG6ZZqvvoeWZeRw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-center">
          <div className="container px-4">
            <h2 className="display-6 fw-bold mb-4">
              Begin your structured learning journey today.
            </h2>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
              <Link to="/register" className="btn-premium-primary btn-lg px-4 py-3" style={{ minWidth: '180px', borderRadius: 'var(--radius-md)' }}>
                Get Started
              </Link>
              <Link to="/courses" className="btn-premium-secondary btn-lg px-4 py-3" style={{ minWidth: '180px', borderRadius: 'var(--radius-md)' }}>
                Browse Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-5 mt-auto text-start">
        <div className="container px-4">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary fs-4">local_library</span>
                <span className="footer-logo text-dark font-display">EduFlow</span>
              </div>
              <p className="text-secondary small">
                Empowering the next generation of professionals through sequential learning paths.
              </p>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="fw-semibold text-dark small uppercase tracking-wider">Platform</span>
              <Link to="/courses" className="text-secondary text-decoration-none small hover-text-primary">Catalog</Link>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Pricing Plans</a>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="fw-semibold text-dark small uppercase tracking-wider">Company</span>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">About Us</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Careers</a>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="fw-semibold text-dark small uppercase tracking-wider">Resources</span>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Privacy Policy</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Terms of Service</a>
            </div>
          </div>
          <hr className="my-4 border-light" />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <span className="text-secondary small">© 2026 EduFlow Learning System.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

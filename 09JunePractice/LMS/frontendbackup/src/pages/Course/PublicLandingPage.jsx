import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PublicLandingPage() {
  const { isAuthenticated, user } = useAuth();

  // Route helper based on user role
  const dashboardLink = user?.role === 'Instructor' ? '/instructor' : '/dashboard';

  return (
    <div className="landing-shell">
      <style>{`
        .landing-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .header-nav {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant);
          background-color: #ffffff;
        }
        .hero-gradient {
          background: radial-gradient(circle at 50% 0%, #e1e0ff 0%, #f8f9ff 70%);
          padding-top: 80px;
          padding-bottom: 80px;
        }
        .enterprise-badge {
          background-color: var(--primary-fixed, #e1e0ff);
          color: var(--on-primary-fixed, #07006c);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 16px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        .hero-title {
          font-weight: 700;
          font-size: 3rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0b1c30;
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
        }
        .hero-desc {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--on-surface-variant);
          max-width: 40rem;
          margin: 0 auto 2rem auto;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 1.5rem;
          padding: 8px;
          box-shadow: 0 25px 50px -12px rgba(11, 28, 48, 0.25);
        }
        .features-section {
          background-color: #f8f9ff;
          padding: 96px 0;
        }
        .feature-card {
          background-color: #ffffff;
          border: 1px solid var(--outline-variant);
          border-radius: 1.5rem;
          padding: 32px;
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .feature-card-blue {
          background-color: var(--primary);
          color: #ffffff !important;
        }
        .feature-card-gray {
          background-color: var(--surface-container-high);
        }
        .cta-section {
          background-color: var(--inverse-surface);
          color: #ffffff;
          padding: 96px 0;
        }
        .footer-logo {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--on-surface-variant);
        }
      `}</style>

      {/* Header / Navigation Shell */}
      <header className="header-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
            <span className="fs-4 fw-extrabold text-primary font-display" style={{ letterSpacing: '-0.02em' }}>Lumina</span>
          </Link>
          <nav className="d-none md:flex align-items-center gap-3 ms-4">
            <Link to="/courses" className="text-label-md text-primary text-decoration-none border-bottom border-primary pb-1 transition-colors duration-200">Catalog</Link>
            <a className="text-label-md text-secondary text-decoration-none hover-text-primary transition-colors duration-200" href="#">Pricing</a>
            <a className="text-label-md text-secondary text-decoration-none hover-text-primary transition-colors duration-200" href="#">Enterprise</a>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-2">
          {isAuthenticated ? (
            <Link to={dashboardLink} className="btn btn-nexus-primary px-3 py-1.5 rounded-lg shadow-sm">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-link text-dark text-decoration-none font-label-md px-3 py-1.5 rounded-lg hover-bg-light transition-all">Login</Link>
              <Link to="/register" className="btn btn-nexus-primary px-3 py-1.5 rounded-lg shadow-sm active-scale">Register</Link>
            </>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="position-relative hero-gradient text-center px-3 overflow-hidden">
          <div className="container" style={{ maxWidth: '960px' }}>
            <span className="enterprise-badge">ENTERPRISE LEARNING REIMAGINED</span>
            <h1 className="hero-title mb-4">
              Master your craft with <br className="d-none d-md-block" /> world-class instruction.
            </h1>
            <p className="hero-desc">
              The premium learning management system for high-performance teams. Access curated content, expert mentorship, and powerful analytics.
            </p>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mb-5">
              <Link to="/register" className="btn btn-nexus-primary btn-lg px-4 py-3 rounded-xl shadow-lg" style={{ minWidth: '180px' }}>
                Get Started
              </Link>
              <Link to="/courses" className="btn btn-nexus-secondary btn-lg px-4 py-3 rounded-xl" style={{ minWidth: '180px' }}>
                Browse Catalog
              </Link>
            </div>
            <div className="w-full max-w-5xl mx-auto pt-3">
              <div className="glass-card shadow-lg">
                <img
                  alt="Lumina Dashboard Interface"
                  className="w-100 h-auto rounded-4 shadow-sm"
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
              <h2 className="display-6 fw-bold text-dark mb-2">Built for High-Growth Teams</h2>
              <p className="text-secondary max-w-lg mx-auto">Scalable infrastructure designed to meet the demands of modern enterprise education.</p>
            </div>

            <div className="row g-4">
              {/* Feature 1: Interactive Learning */}
              <div className="col-12 col-md-8">
                <div className="feature-card">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3" style={{ width: '48px', height: '48px' }}>
                      <span className="material-symbols-outlined text-primary fs-3">auto_stories</span>
                    </div>
                    <span className="badge bg-light text-secondary rounded-pill border px-3 py-2">Lumina OS</span>
                  </div>
                  <div className="pt-4 mt-5">
                    <h3 className="h4 fw-bold text-dark mb-2">Interactive Learning</h3>
                    <p className="text-secondary mb-0" style={{ maxWidth: '440px' }}>
                      Real-time collaborative workspaces, hands-on coding environments, and synchronized multi-user video playback.
                    </p>
                  </div>
                  <div className="position-absolute bottom-0 right-0 opacity-10" style={{ pointerEvents: 'none' }}>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '200px' }}>stream</span>
                  </div>
                </div>
              </div>

              {/* Feature 2: Expert Mentors */}
              <div className="col-12 col-md-4">
                <div className="feature-card feature-card-blue d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-3 mb-4" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined text-white fs-3">groups</span>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="h4 fw-bold text-white mb-2">Expert Mentors</h3>
                    <p className="text-white text-opacity-80 mb-0">
                      Direct access to industry leaders from world-class organizations. Book 1-on-1 sessions instantly.
                    </p>
                  </div>
                  <div className="mt-4 d-flex align-items-center gap-1">
                    <img className="rounded-circle border border-2 border-primary" style={{ width: '36px', height: '36px', zIndex: 3 }} alt="Mentor 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKJSa0M4-_pY4udTfB31-5wPb67bOBAU63dhcJwN0zko0TeQ7BWWpOAG90yGBhmqvlB-nwEIWS1e-UzdhwuxJ3Tin13C5onaDMHldW5QvFvRwCyS1vwjYqYnA5OrZsE8UNa4nNEDDN0LblsBDpcKtBHH9JHQqKevUtQcidacT4VHT77Ywv3QnE_j0B0JQdZByxW2CDGZA6Z8qdqJshFqg9aLm_lLSlWsaFOQH4KjZJFEFbnREL60fvYrhwhIM4Wyrtzd4J3hWYL4O0" />
                    <img className="rounded-circle border border-2 border-primary" style={{ width: '36px', height: '36px', marginLeft: '-12px', zIndex: 2 }} alt="Mentor 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbfVQwJxPNsLHmcMId10nmDLABB-DXtAuv7OufPcrkc7XLlopZaaAnAvf37Sef18Nuz08D8m8jjrqDIMA8XeLUe62MULSpk7aElbp6VnojKscNKd_DQefG1qHR6nH9Ap-J4W1NFl98p_6we9gTBMxcScckUYOj_JTysTPSgBjrirNDQ3aVZjVMlzSCXJd7NiCYFbl5vNx1UAGSNZu6SSq-DnaN3WY5pCs0sMqpjWTsab80_ojzTVUL_4Zb9NeNwHuxNBq_8tl_hHFj" />
                    <img className="rounded-circle border border-2 border-primary" style={{ width: '36px', height: '36px', marginLeft: '-12px', zIndex: 1 }} alt="Mentor 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxZxLOltnlaNl4zQsj_3MvAfHgPOVqxY4_DvM4dfK_9vxsuVnvI2PsPPYL3PyrLv8UEvYEyomg99nHWxWExmEM-SYpf4XHPJtickgDcOsM0SQQuRRx5dJ-3NDL0QKv-J_M2MTfEcXXJ_O7YoH5GssP5DHdKUeXwfbZPEbxkGfbagIpbDAVkX0Gdw7XWs6mj1oCYM8GiV5CGfk1ZJ6pPWuLS6jZIK-vuQWx0jgYLQI_3eS2ghQ3PYPUvMGfA-vlRkF2_NkbJzdJoMt6" />
                    <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center border border-2 border-primary text-white font-label-sm" style={{ width: '36px', height: '36px', marginLeft: '-12px', zIndex: 0 }}>
                      +12
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3: Enterprise Analytics */}
              <div className="col-12 col-md-4">
                <div className="feature-card feature-card-gray d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center justify-content-center bg-white rounded-3 mb-4 border shadow-sm" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined text-dark fs-3">analytics</span>
                  </div>
                  <div>
                    <h3 className="h4 fw-bold text-dark mb-2">Enterprise Analytics</h3>
                    <p className="text-secondary">
                      Measure ROI with granular skill-gap reporting and automated certification tracking across departments.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4: Seamless Integration */}
              <div className="col-12 col-md-8">
                <div className="feature-card">
                  <div className="row align-items-center h-100 g-4">
                    <div className="col-12 col-sm-6">
                      <h3 className="h4 fw-bold text-dark mb-2">Seamless Integration</h3>
                      <p className="text-secondary">
                        Connect your existing SSO, HRIS, and communication stacks in minutes. Lumina fits right into your workflow.
                      </p>
                      <div className="d-flex gap-2 mt-4">
                        <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined text-secondary fs-5">hub</span>
                        </div>
                        <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined text-secondary fs-5">token</span>
                        </div>
                        <div className="bg-light border rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <span className="material-symbols-outlined text-secondary fs-5">cloud</span>
                        </div>
                      </div>
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
            <h2 className="display-5 fw-bold mb-4">
              Ready to transform your <br /> organization's learning?
            </h2>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
              <button className="btn btn-light btn-lg text-dark px-4 py-3 rounded-xl font-bold" style={{ minWidth: '180px' }}>
                Book a Demo
              </button>
              <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-xl font-bold" style={{ minWidth: '180px' }}>
                Talk to Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-5 mt-auto">
        <div className="container px-4">
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-3">
              <span className="footer-logo mb-2 d-inline-block">Lumina</span>
              <p className="text-secondary small">
                Empowering the next generation of industry leaders through elite education.
              </p>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="font-label-md text-dark">Platform</span>
              <Link to="/courses" className="text-secondary text-decoration-none small hover-text-primary">Catalog</Link>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Pricing</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Enterprise</a>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="font-label-md text-dark">Company</span>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">About</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Careers</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Contact</a>
            </div>
            <div className="col-6 col-md-3 d-flex flex-column gap-2">
              <span className="font-label-md text-dark">Resources</span>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Privacy Policy</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">Terms</a>
              <a className="text-secondary text-decoration-none small hover-text-primary" href="#">System Status</a>
            </div>
          </div>
          <hr className="my-4 border-light" />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <span className="text-secondary small">© 2024 Lumina Enterprise LMS.</span>
            <div className="d-flex gap-2">
              <a className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} href="#">
                <span className="material-symbols-outlined fs-5">language</span>
              </a>
              <a className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} href="#">
                <span className="material-symbols-outlined fs-5">mail</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

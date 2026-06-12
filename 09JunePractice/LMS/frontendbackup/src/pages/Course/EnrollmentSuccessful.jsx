import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function EnrollmentSuccessful() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="success-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .success-shell {
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
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 32px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .success-circle {
          width: 96px;
          height: 96px;
          background-color: #198754;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .pulse-overlay {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background-color: rgba(25, 135, 84, 0.1);
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .float-bg-1 {
          position: absolute;
          top: 25%;
          left: 5%;
          width: 300px;
          height: 300px;
          background-color: rgba(96, 99, 238, 0.05);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .float-bg-2 {
          position: absolute;
          bottom: 25%;
          right: 5%;
          width: 300px;
          height: 300px;
          background-color: rgba(218, 226, 253, 0.08);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
      `}</style>

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

      {/* Main Content */}
      <main className="flex-grow-1 position-relative d-flex align-items-center justify-content-center p-4">
        <div className="float-bg-1"></div>
        <div className="float-bg-2"></div>

        <div className="glass-panel w-100 p-4 p-md-5 d-flex flex-column align-items-center text-center" style={{ maxWidth: '560px' }}>
          <div className="success-circle">
            <div className="pulse-overlay"></div>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', fontWeight: '700' }}>check</span>
          </div>

          <div className="mb-4">
            <h1 className="h2 fw-bold text-dark mb-2">You're in!</h1>
            <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
              You have successfully enrolled in <span className="fw-bold text-dark">Mastering WebGL</span>. Your learning journey starts now.
            </p>
          </div>

          {/* Mini Course Card */}
          <div className="w-100 p-3 bg-light border border-light-subtle rounded-4 d-flex align-items-center gap-3 text-start mb-4">
            <div className="rounded-3 bg-secondary-subtle overflow-hidden flex-shrink-0" style={{ width: '64px', height: '64px' }}>
              <img
                alt="Course thumbnail"
                className="w-100 h-100 object-fit-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnpyN7Kq8VEb4Vd3hXeTlvhMhMbp1UVtzW8MSs2wkOD2rlzBRZ-bRGd0Y0llam0fcqTZAfnJQ2I1JpfEja5p4mXczsoo3X_-LhIwndlRgyClQ6ngqRy8tDcJ-PJ-kga-XektSsHQ4UXBDwlLZD-BJEMtDqLVlylohdF_jrjk8ccouReC15EjwLFBPbdGQwEjTrSs-vTseLGwQ6mXDz7-9Nst07VPGnNqM8uxijPHOPYcdy6Fv58HtRY5IlJhK6bIb21P83vN1x0e2Z"
              />
            </div>
            <div className="flex-grow-1">
              <h3 className="h6 fw-bold mb-1 text-dark">Mastering WebGL: 3D for the Web</h3>
              <div className="d-flex align-items-center gap-2 text-secondary small">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                <span>Estimated 12 hours • 8 Modules</span>
              </div>
            </div>
            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1.5 fw-semibold small">
              Enrolled
            </span>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-column sm:flex-row gap-3 w-100">
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="btn btn-nexus-primary flex-fill py-3 rounded-3 fw-bold"
            >
              Start Learning
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-nexus-secondary flex-fill py-3 rounded-3 fw-bold"
            >
              View My Dashboard
            </button>
          </div>

          {/* Progress Share */}
          <div className="mt-4 text-secondary small d-flex align-items-center gap-2 cursor-pointer opacity-75 hover-opacity-100" style={{ transition: 'opacity 0.2s' }}>
            <span>Share your progress</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>share</span>
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

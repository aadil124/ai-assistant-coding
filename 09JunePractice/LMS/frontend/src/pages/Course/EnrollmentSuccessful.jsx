import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

export default function EnrollmentSuccessful() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="success-shell min-vh-100 d-flex flex-column justify-content-between text-start">
      <style>{`
        .success-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
        }
        .success-circle {
          width: 80px;
          height: 80px;
          background-color: var(--success);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          box-shadow: var(--shadow-md);
        }
        .pulse-overlay {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.15);
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>

      <Navbar />

      {/* Main Content */}
      <main className="flex-grow-1 position-relative d-flex align-items-center justify-content-center p-4">
        <div className="card-premium w-100 p-4 p-md-5 d-flex flex-column align-items-center text-center" style={{ maxWidth: '500px' }}>
          <div className="success-circle">
            <div className="pulse-overlay"></div>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', fontWeight: '700' }}>check</span>
          </div>

          <div className="mb-4">
            <h1 className="h3 fw-bold text-dark mb-2">Enrollment Confirmed!</h1>
            <p className="text-secondary small">
              You are now enrolled in this learning path. Enforced sequential logic is active—complete each topic sequentially to unlock subsequent resources.
            </p>
          </div>

          {/* Mini Course Detail */}
          <div className="w-100 p-3 bg-light border rounded-3 d-flex align-items-center gap-3 text-start mb-4">
            <div className="rounded-2 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
              <span className="material-symbols-outlined fs-3">local_library</span>
            </div>
            <div className="flex-grow-1">
              <h3 className="h6 fw-bold mb-1 text-dark">Course Curriculum</h3>
              <div className="d-flex align-items-center gap-2 text-secondary small" style={{ fontSize: '11px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                <span>Active Sequential Unlock Gate</span>
              </div>
            </div>
            <span className="badge-premium badge-premium-success">
              Active
            </span>
          </div>

          {/* Actions */}
          <div className="d-flex flex-column flex-sm-row gap-3 w-100">
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="btn-premium-primary flex-grow-1 py-2.5"
            >
              Start Learning
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-premium-secondary flex-grow-1 py-2.5"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>

      <footer className="w-100 py-4 px-4 border-top bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2026 EduFlow Learning System. All rights reserved.</p>
        <div className="d-flex gap-3">
          <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary">Catalog</Link>
        </div>
      </footer>
    </div>
  );
}

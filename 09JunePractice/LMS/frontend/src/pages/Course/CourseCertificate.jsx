import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CourseCertificate() {
  const { courseId } = useParams();

  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {}
  const user = auth?.user || null;
  const token = auth?.token || localStorage.getItem('token') || '';

  const [courseTitle, setCourseTitle] = useState('Mastering WebGL');
  const [learnerName, setLearnerName] = useState(user?.name || 'Alex Rivera');
  const [certId, setCertId] = useState('LUM-882-XR9');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/courses/${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setCourseTitle(result.data.title);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (courseId) fetchCourse();
  }, [courseId, token]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/courses/${courseId}/certificate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Certificate download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseTitle}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download certificate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleMouseMove = (e) => {
    const card = document.getElementById('cert-card');
    const container = document.getElementById('cert-container');
    if (!card || !container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = document.getElementById('cert-card');
    if (card) card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between animate-fade-in" style={{ backgroundColor: 'var(--bg-neutral)' }}>
      <style>{`
        .certificate-container {
          perspective: 1500px;
        }
        .certificate-card-premium {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }
        .glass-panel-premium {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }
        .serif-text-custom {
          font-family: Georgia, serif;
        }
      `}</style>

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
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1200px' }}>
        <div className="row g-4 align-items-start">
          {/* Certificate Card */}
          <div className="col-lg-8 certificate-container" id="cert-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="certificate-card-premium p-5 rounded-4 shadow-lg text-center position-relative overflow-hidden" id="cert-card">
              <div className="border border-4 border-double p-5 h-100 d-flex flex-column align-items-center" style={{ borderColor: 'rgba(37,99,235,0.15)' }}>
                <div className="mb-4">
                  <span className="h5 fw-bold text-primary tracking-widest uppercase d-block">Certificate of Excellence</span>
                  <div className="bg-primary mx-auto mt-2" style={{ width: '96px', height: '2px' }}></div>
                </div>

                <p className="text-secondary italic mb-3 serif-text-custom">This is to certify that</p>
                <h1 className="h3 fw-bold text-dark mb-4">{learnerName}</h1>
                <p className="text-secondary mb-2">has successfully completed the specialized professional track</p>
                <h2 className="h5 fw-bold text-primary mb-5">{courseTitle}</h2>

                <p className="text-secondary small max-w-lg mb-5" style={{ maxWidth: '500px', lineHeight: '1.6' }}>
                  Demonstrating proficiency in all core assignments, curriculum exercises, and passing evaluation requirements set by the instructional committee.
                </p>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-end w-100 gap-4 mt-4">
                  <div className="text-start">
                    <div className="bg-secondary bg-opacity-25 mb-2" style={{ width: '120px', height: '1px' }}></div>
                    <span className="fw-bold text-dark d-block">Jordan Sterling</span>
                    <small className="text-secondary">Director of Curriculum</small>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className="bg-light p-2 border rounded-3 mb-2">
                      <span className="material-symbols-outlined text-primary fs-3">qr_code_2</span>
                    </div>
                    <small className="text-secondary">Verify: {certId}</small>
                  </div>
                  <div className="text-md-end text-start">
                    <div className="bg-secondary bg-opacity-25 mb-2 ms-md-auto" style={{ width: '120px', height: '1px' }}></div>
                    <span className="fw-bold text-dark d-block">Sarah Chen</span>
                    <small className="text-secondary">Lead Instructor</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="glass-panel-premium p-4 shadow-sm">
              <h3 className="h6 fw-bold text-dark mb-1">Certificate Actions</h3>
              <p className="text-secondary small mb-4">Official Verified Digital Credential</p>

              <div className="d-flex flex-column gap-3 mb-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading}
                  className="btn-premium-primary py-3 w-100"
                >
                  <span className="material-symbols-outlined fs-5">download</span>
                  {downloading ? 'Downloading...' : 'Download PDF'}
                </button>
                <button className="btn-premium-secondary py-3 w-100">
                  <span className="material-symbols-outlined fs-5">share</span>
                  Share Achievement
                </button>
              </div>

              <div className="border-top pt-4">
                <h4 className="fw-bold text-dark uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>SKILLS VERIFIED</h4>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge-premium badge-premium-primary">Curriculum Syllabus</span>
                  <span className="badge-premium badge-premium-primary">Core Knowledge Mastery</span>
                </div>
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

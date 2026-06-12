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
    // Attempt to fetch course title
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

  // Card parallax rotation effect
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
    <div className="cert-page-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .cert-page-shell {
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
        .certificate-container {
          perspective: 1500px;
        }
        .certificate-card {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid var(--outline-variant, #c7c4d7);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid var(--outline-variant, #c7c4d7);
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

      {/* Main Area */}
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1200px' }}>
        <div className="row g-4 align-items-start">
          {/* Certificate Card */}
          <div className="col-lg-8 certificate-container" id="cert-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="certificate-card bg-white p-5 rounded-4 shadow-lg text-center position-relative overflow-hidden" id="cert-card">
              {/* Decorative Background circles */}
              <div className="position-absolute rounded-circle bg-primary bg-opacity-5" style={{ width: '250px', height: '250px', top: '-100px', right: '-100px', filter: 'blur(30px)' }}></div>
              <div className="position-absolute rounded-circle bg-secondary bg-opacity-5" style={{ width: '200px', height: '200px', bottom: '-100px', left: '-100px', filter: 'blur(30px)' }}></div>

              <div className="border border-4 border-double border-primary border-opacity-20 p-5 h-100 d-flex flex-column align-items-center">
                <div className="mb-4">
                  <span className="h4 fw-bold text-primary tracking-widest uppercase d-block">Certificate of Excellence</span>
                  <div className="bg-primary mx-auto mt-2" style={{ width: '96px', height: '3px' }}></div>
                </div>

                <p className="text-secondary italic mb-3">This is to certify that</p>
                <h1 className="h2 fw-bold text-dark mb-4">{learnerName}</h1>
                <p className="text-secondary mb-2">has successfully completed the specialized professional track</p>
                <h2 className="h4 fw-bold text-primary mb-5">{courseTitle}</h2>

                <p className="text-secondary small max-w-lg mb-5" style={{ maxWidth: '500px' }}>
                  Demonstrating proficiency in advanced 3D rendering techniques, shader programming, and browser-based graphics optimization. Awarded upon rigorous evaluation of technical performance and project execution.
                </p>

                <div className="d-flex flex-column md:flex-row justify-content-between align-items-end w-100 gap-4 mt-4">
                  <div className="text-start">
                    <div className="bg-secondary bg-opacity-25 mb-2" style={{ width: '120px', height: '1px' }}></div>
                    <span className="fw-bold text-dark d-block">Jordan Sterling</span>
                    <small className="text-secondary">Director of Curriculum, Lumina</small>
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
                    <small className="text-secondary">Lead Instructor, Web Graphics</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="glass-panel p-4 rounded-4 shadow-sm">
              <h3 className="h5 fw-bold text-dark mb-1">Certificate Details</h3>
              <p className="text-secondary small mb-4">Issued on October 24, 2024 • No Expiration</p>

              <div className="d-flex flex-column gap-3 mb-4">
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading}
                  className="btn btn-nexus-primary py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <span className="material-symbols-outlined">download</span>
                  {downloading ? 'Downloading...' : 'Download PDF'}
                </button>
                <button className="btn btn-nexus-secondary py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <span className="material-symbols-outlined">share</span>
                  Share to LinkedIn
                </button>
                <button className="btn btn-nexus-secondary py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <span className="material-symbols-outlined">work</span>
                  Add to Portfolio
                </button>
              </div>

              <div className="border-top pt-4">
                <h4 className="fw-bold text-dark uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>Skills Validated</h4>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-1.5 fw-semibold small">GLSL Shaders</span>
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-1.5 fw-semibold small">3D Mathematics</span>
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-1.5 fw-semibold small">WebGPU Prep</span>
                  <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-1.5 fw-semibold small">Performance Optimization</span>
                </div>
              </div>
            </div>

            {/* Course Summary Card */}
            <div className="bg-white border rounded-4 p-4">
              <div className="d-flex gap-3 align-items-center mb-3">
                <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center">
                  <span className="material-symbols-outlined fs-4">view_in_ar</span>
                </div>
                <div>
                  <h4 className="fw-bold text-dark mb-0 text-sm">Mastering WebGL</h4>
                  <small className="text-secondary">42 hours of coursework</small>
                </div>
              </div>
              <p className="text-secondary small mb-3">You completed this course with a final grade of 98.4%, placing you in the top 5% of all graduates.</p>
              <Link to="/courses" className="text-primary text-decoration-none fw-bold small d-flex align-items-center gap-1 hover:underline">
                View Course Curriculum
                <span className="material-symbols-outlined fs-6">arrow_forward</span>
              </Link>
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

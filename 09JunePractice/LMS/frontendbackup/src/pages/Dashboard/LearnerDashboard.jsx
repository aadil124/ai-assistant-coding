import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export default function LearnerDashboard({ initialData = [], isLoading: propIsLoading = false, error: propError = null }) {
  let progressCtx = null;
  try {
    progressCtx = useProgress();
  } catch (e) {
    // Context missing in tests, safe catch
  }

  const enrolledCourses = (initialData && initialData.length > 0)
    ? initialData
    : (progressCtx?.enrolledCourses || []);
  const isLoading = propIsLoading || (progressCtx ? progressCtx.isLoading : false);
  const error = propError || (progressCtx ? progressCtx.error : null);

  const [downloadingCertId, setDownloadingCertId] = useState(null);

  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // Context missing in tests, safe catch
  }

  const user = auth?.user || null;
  const username = user?.name || 'Alex Morgan';

  const handleDownloadCertificate = async (courseId, courseTitle) => {
    setDownloadingCertId(courseId);
    try {
      const response = await fetch(`/courses/${courseId}/certificate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Certificate download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseTitle || 'course'}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingCertId(null);
    }
  };

  const lastActive = enrolledCourses.find(item => item.progressPercent < 100) || enrolledCourses[0] || null;

  return (
    <div className="dashboard-shell min-vh-100 d-flex">
      <style>{`
        .dashboard-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .aside-nav {
          width: 280px;
          border-right: 1px solid var(--outline-variant);
          background-color: #f8f9ff;
          z-index: 50;
        }
        .main-content {
          background-color: #f8f9ff;
          min-width: 0;
        }
        .top-app-bar {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant);
          background-color: #ffffff;
          z-index: 40;
        }
        .dashboard-card {
          background-color: #ffffff;
          border: 1px solid var(--outline-variant);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(11, 28, 48, 0.08);
        }
        .weekly-bar {
          width: 100%;
          background-color: rgba(70, 72, 212, 0.2);
          border-radius: 2px 2px 0 0;
        }
        .weekly-bar.active {
          background-color: var(--primary);
        }
        .timeline-container {
          position: relative;
          padding-left: 24px;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background-color: var(--surface-container-high, #dce9ff);
        }
        .timeline-dot {
          position: absolute;
          left: 0;
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: var(--primary);
          border: 4px solid #ffffff;
          z-index: 2;
        }
      `}</style>

      {/* Side Bar */}
      <aside className="aside-nav d-none d-md-flex flex-column h-screen sticky-top p-4 gap-3">
        <div className="px-3 py-4">
          <h1 className="h5 fw-bold text-dark mb-0">Lumina LMS</h1>
        </div>
        <nav className="flex-grow-1 d-flex flex-column gap-1">
          <Link to="/dashboard" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg bg-light fw-bold text-primary">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="small">Dashboard</span>
          </Link>
          <Link to="/courses" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">school</span>
            <span className="small">My Courses</span>
          </Link>
          <Link to="/courses" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">account_tree</span>
            <span className="small">Catalog</span>
          </Link>
          <a className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all" href="#">
            <span className="material-symbols-outlined">quiz</span>
            <span className="small">Certs</span>
          </a>
          <a className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="small">Settings</span>
          </a>
        </nav>
        <div className="pt-3 border-top d-flex flex-column gap-1">
          <a className="nav-link d-flex align-items-center gap-3 px-3 py-2 text-secondary hover-text-primary small" href="#">
            <span className="material-symbols-outlined">contact_support</span>
            <span>Support</span>
          </a>
          <a className="nav-link d-flex align-items-center gap-3 px-3 py-2 text-secondary hover-text-danger small" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Sign Out</span>
          </a>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="main-content flex-grow-1 d-flex flex-column overflow-y-auto">
        {/* Top App Bar */}
        <header className="top-app-bar sticky-top d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-3">
            <h2 className="h5 fw-bold text-dark mb-0">Welcome back, {username}</h2>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative d-none d-lg-flex align-items-center">
              <span className="material-symbols-outlined position-absolute left-3 text-secondary" style={{ left: '12px' }}>search</span>
              <input
                className="form-control rounded-pill border-0 bg-light"
                style={{ paddingLeft: '36px', fontSize: '13px', width: '240px' }}
                placeholder="Search courses..."
                type="text"
              />
            </div>
            <button className="btn btn-link text-secondary p-1">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="rounded-circle border overflow-hidden" style={{ width: '32px', height: '32px' }}>
              <img
                alt="User avatar"
                className="w-100 h-100 object-fit-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMmQzDTj7kIJckOhEUIbudeNVPI0tb8_74725uy9_nWwgN39lN6gjdifa6cobntgugbeQwifZt8TqV_NHQWlVtfxMg8BnVCUPtgJ38oXHWiIGLXhYtvHcdmKdXqzQ9PWdGdkF9jtHrYl_2LTBr525U9hD0OY8Y_uvD-B6Ky97-ZmBvDwA9tuc0Pqkpo6O3bpq4lx16xxcGfS67e-ID-PfxxYNDYQdXwXqtIIv1KUymLo7H_RkiZjqsoq81BKS4FAG5EJmKdPO3kHno"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 flex-grow-1">
          {isLoading ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5" data-testid="loading-spinner">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-secondary small">Retrieving your learning progress...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <span className="me-2">⚠️</span>
              <div>{error}</div>
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="dashboard-card text-center py-5">
              <h3 className="h5 fw-bold text-secondary mb-3">No Enrolled Courses</h3>
              <p className="text-secondary small mb-4">
                You are not enrolled in any courses yet. Start your journey by exploring our course catalog.
              </p>
              <Link to="/courses" className="btn btn-nexus-primary px-4 py-2 text-decoration-none">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="container-fluid p-0 d-flex flex-column gap-4">
              {/* Hero Grid: Continue Learning + Progress Widget */}
              <div className="row g-4">
                {/* Continue Learning Card */}
                {lastActive && (
                  <div className="col-12 col-xl-8">
                    <div className="dashboard-card d-flex flex-column flex-md-row gap-4 h-100 align-items-center">
                      <div className="rounded-3 overflow-hidden" style={{ width: '100%', maxWidth: '240px', aspectRatio: '16/9' }}>
                        <img
                          className="w-100 h-100 object-fit-cover"
                          alt="Current course thumbnail"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHIa-Azensas8hq4hiz10eLLX4dqYHF0xlXSwvExwoxYYMkmuWn2mmnnbShXe-OVF4Ulc67tI6dRhyxLT6i3099zvQA9Z12xtHoidd31hTz5wrEKYHD2zQx1IMo6PSyOkwGOztgGFCdYHpiBD-fhugNxFt3fGu8XxLE_Qhd9qxrO52YXfyKCZdFK3sh8r2kgRi1yiO531lTCEz0gWjFH46ooSisl6IkP5fp47iQba7SbK01WIevUPHhGX8J8-4byP8aKd2quCAYC3q"
                        />
                      </div>
                      <div className="flex-grow-1 d-flex flex-column gap-3 py-1 text-start w-100">
                        <div>
                          <p className="text-primary fw-bold small uppercase tracking-wider mb-1" style={{ fontSize: '11px' }}>Featured Course</p>
                          <h3 className="h5 fw-bold text-dark mb-1">{lastActive.course.title}</h3>
                          <p className="text-secondary small mb-0">Master the complexity of modern design systems and scalable component libraries.</p>
                        </div>
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="small text-secondary">Course Progress</span>
                            <span className="small text-primary fw-bold">{lastActive.progressPercent}%</span>
                          </div>
                          <div className="progress" style={{ height: '8px', backgroundColor: '#eeefff' }}>
                            <div className="progress-bar bg-primary" style={{ width: `${lastActive.progressPercent}%` }}></div>
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          <Link to={`/course/${lastActive.course.id}`} className="btn btn-nexus-primary px-4 py-2 d-flex align-items-center gap-1 text-decoration-none" data-testid={`resume-link-${lastActive.course.id}`}>
                            <span className="material-symbols-outlined fs-5">play_arrow</span>
                            <span>Resume</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Analytics Widget */}
                <div className="col-12 col-xl-4">
                  <div className="dashboard-card h-100 d-flex flex-column justify-content-between">
                    <h4 className="small fw-bold text-secondary uppercase tracking-wider mb-3 d-flex justify-content-between align-items-center" style={{ fontSize: '11px' }}>
                      Monthly Progress
                      <span className="material-symbols-outlined text-primary">analytics</span>
                    </h4>
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="bg-light p-3 rounded-3 text-center">
                          <p className="h3 fw-bold text-primary mb-0">12</p>
                          <p className="text-secondary small mb-0" style={{ fontSize: '11px' }}>Completed</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-light p-3 rounded-3 text-center">
                          <p className="h3 fw-bold text-primary mb-0">48</p>
                          <p className="text-secondary small mb-0" style={{ fontSize: '11px' }}>Hours Spent</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="small fw-semibold mb-0" style={{ fontSize: '12px' }}>Weekly Goal</h5>
                        <span className="small text-primary fw-bold">85%</span>
                      </div>
                      <div className="d-flex align-items-end justify-content-between gap-1" style={{ height: '80px' }}>
                        <div className="weekly-bar" style={{ height: '40%' }}></div>
                        <div className="weekly-bar" style={{ height: '60%' }}></div>
                        <div className="weekly-bar" style={{ height: '30%' }}></div>
                        <div className="weekly-bar active" style={{ height: '90%' }}></div>
                        <div className="weekly-bar active" style={{ height: '75%' }}></div>
                        <div className="weekly-bar active" style={{ height: '85%' }}></div>
                        <div className="weekly-bar" style={{ height: '20%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Courses Grid */}
              <div className="row mt-2 g-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 fw-bold text-dark mb-0">My Courses</h2>
                    <Link to="/courses" className="text-primary text-decoration-none small fw-semibold">View all</Link>
                  </div>

                  <div className="row g-4">
                    {enrolledCourses.map((item) => {
                      const { course, progressPercent, finalExamPassed } = item;
                      return (
                        <div className="col-12 col-md-6 col-lg-4" key={course.id}>
                          <div className="dashboard-card h-100 d-flex flex-column justify-content-between p-3">
                            <div>
                              <div className="rounded-3 overflow-hidden mb-3" style={{ aspectRatio: '16/9' }}>
                                <img
                                  className="w-100 h-100 object-fit-cover"
                                  alt={course.title}
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqce8vzjtdl4B6rxuULq4S3scWdgZkXu-5ECbI40bYh4uaEQfOk9d2l4bZzif6esiX5vyVyGFSsHMXWDexubK5ijSeqT9yLoH_fUBTK5_jVGM2-Ano8gYy4wL9XgwATnKRtpwENBJxWLmbDbIMpdoMz5oBAcVy6kry00YwvIMODfkzPEB6PiM68NmSeNcDpXawCekTGKdpV7gTtqQ_C0wvhaRGhVriiW5eqKljYG3nWHVUC2tcZ2JwHPY7Irij7-HYmKv2AdddW_yh"
                                />
                              </div>
                              <h4 className="h6 fw-bold text-dark mb-2 leading-tight">{course.title}</h4>
                              <p className="text-secondary small mb-3">{progressPercent}% Complete</p>
                              <div className="progress mb-3" style={{ height: '6px' }}>
                                <div className="progress-bar bg-primary" style={{ width: `${progressPercent}%` }}></div>
                              </div>
                            </div>
                            <div className="d-flex flex-column gap-2 mt-2">
                              <Link
                                to={`/course/${course.id}`}
                                className="btn btn-nexus-secondary py-2 text-decoration-none text-center d-flex align-items-center justify-content-center gap-1"
                                data-testid={`resume-link-${course.id}`}
                              >
                                <span className="material-symbols-outlined fs-5">play_arrow</span>
                                <span>Resume Course</span>
                              </Link>
                              {finalExamPassed && (
                                <button
                                  type="button"
                                  className="btn btn-nexus-primary py-2 d-flex align-items-center justify-content-center gap-1"
                                  data-testid={`download-cert-btn-${course.id}`}
                                  disabled={downloadingCertId === course.id}
                                  onClick={() => handleDownloadCertificate(course.id, course.title)}
                                >
                                  <span className="material-symbols-outlined fs-5">download</span>
                                  <span>{downloadingCertId === course.id ? 'Downloading...' : 'Download Certificate'}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-auto small text-secondary">
          <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
          <div className="d-flex gap-3">
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
            <a className="text-secondary text-decoration-none hover-text-primary" href="#">System Status</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  let auth = null;
  let progress = null;
  try {
    auth = useAuth();
    progress = useProgress();
  } catch (e) {
    // safe fallback
  }

  const { user, isAuthenticated, token } = auth || {};
  const { enrollInCourse, enrolledCourses } = progress || {};

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(0); // first item open by default
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Fallback / Mock Data matching Stitch "Mastering WebGL"
  const defaultCourseDetails = {
    id: 'c1',
    title: 'Mastering WebGL',
    category: 'Advanced Graphics',
    description: 'Dive deep into the world of hardware-accelerated 3D graphics. Learn to build performant, immersive web experiences from scratch with the power of the GPU.',
    longDescription: 'WebGL (Web Graphics Library) is a JavaScript API for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins. This course is meticulously designed to bridge the gap between creative coding and technical engineering. Throughout this journey, we will explore the low-level architecture of shaders, the mathematics of transformations, and the secrets of high-fidelity lighting and material systems. By the end of this course, you won\'t just be using libraries; you\'ll understand the engine underneath them.',
    instructor: 'Dr. Marcus Thorne',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrufP9mBur_gOQlmwybgctayVnmHRYx30aaGilxveLX9Qlqicnob_8HLYyxKOsvXyhYBQ7v9oSX_1_RHRV424GPZx1XMA6OnBrtiKMEhnyaL4lAcy6UHrX-bAKF3ceshKRPgSC4yhHCxJCcsgnhD_ShTrYSDQkgVJBAVyF3cJFp8dYgAtegZPNm1PMVxH6rXFPsQoYD3FUQPWEj0oygEtcAYuvcA7dgoFhVZmyf88PUyogdUnI60E0NOWJr4FKbPzDNB7GkZMcrggu',
    rating: 4.9,
    price: 129.00,
    duration: '18.5 Hours',
    lessonsCount: 32,
    modules: [
      {
        id: 'm1',
        title: 'Foundations of Rasterization',
        lessonsCount: 4,
        duration: '2h 15m',
        topics: [
          { id: 't1', title: 'Understanding the Graphics Pipeline', duration: '15:00', type: 'video' },
          { id: 't2', title: 'Setting up your first Canvas context', duration: '28:00', type: 'video' },
          { id: 't3', title: 'Quiz: Context and Buffers', duration: '10:00', type: 'quiz' }
        ]
      },
      {
        id: 'm2',
        title: 'The Language of Shaders: GLSL',
        lessonsCount: 6,
        duration: '3h 45m',
        topics: [
          { id: 't4', title: 'Vertex Shaders and Data Flow', duration: '45:00', type: 'video' },
          { id: 't5', title: 'Fragment Shaders: Painting with Math', duration: '52:00', type: 'video' }
        ]
      }
    ]
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/courses/${courseId}`, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Merge backend data with default styling structure
            setCourse({
              ...defaultCourseDetails,
              ...result.data,
              // Keep mock details if backend modules/description are empty
              modules: result.data.modules && result.data.modules.length > 0 ? result.data.modules : defaultCourseDetails.modules,
              description: result.data.description || defaultCourseDetails.description,
              title: result.data.title || defaultCourseDetails.title
            });
          } else {
            setCourse(defaultCourseDetails);
          }
        } else {
          // Fallback to mock for local testing
          setCourse(defaultCourseDetails);
        }
      } catch (err) {
        console.error('Failed to fetch course details from backend:', err);
        setCourse(defaultCourseDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, token]);

  const isEnrolled = enrolledCourses?.some(
    (c) =>
      c.course?.id === courseId ||
      c.course?._id === courseId ||
      c.id === courseId ||
      c.courseId === courseId
  );

  const handleEnrollNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      if (enrollInCourse) {
        await enrollInCourse(courseId);
      } else {
        const response = await fetch(`/courses/${courseId}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Enrollment failed');
      }
      // Navigate to Enrollment Success page
      navigate(`/course/${courseId}/enrollment-success`);
    } catch (err) {
      console.error(err);
      alert('Enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Course Details...</span>
        </div>
      </div>
    );
  }

  const currentCourse = course || defaultCourseDetails;

  return (
    <div className="details-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .details-shell {
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
          background: linear-gradient(135deg, #213145 0%, #0b1c30 100%);
          position: relative;
          color: #ffffff;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 80% 20%, rgba(70, 72, 212, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .badge-category {
          background: rgba(70, 72, 212, 0.2);
          border: 1px solid rgba(70, 72, 212, 0.3);
          color: #e1e0ff;
        }
        .accordion-header-btn {
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .stat-card {
          border: 1px solid var(--outline-variant, #c7c4d7);
          border-radius: 1rem;
          background-color: #ffffff;
        }
        .sidebar-sticky {
          position: sticky;
          top: 88px;
        }
        .course-img-placeholder {
          background-color: var(--surface-container-highest, #d3e4fe);
        }
        .related-card {
          text-decoration: none;
          color: inherit;
        }
        .related-card:hover h5 {
          color: var(--primary, #4648d4);
        }
      `}</style>

      {/* Top Nav Bar */}
      <header className="top-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary font-display fs-4" style={{ letterSpacing: '-0.02em' }}>Lumina LMS</Link>
          <nav className="d-none d-md-flex gap-3 ms-4">
            <Link to="/courses" className="text-primary text-decoration-none border-bottom border-primary pb-1 font-label-md">Catalog</Link>
            <Link to="/dashboard" className="text-secondary text-decoration-none hover-text-primary font-label-md">My Learning</Link>
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

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="hero-banner py-5">
          <div className="hero-overlay"></div>
          <div className="container px-4">
            <div className="row align-items-center py-4">
              <div className="col-lg-8">
                <span className="badge badge-category rounded-pill px-3 py-2 mb-3 small">{currentCourse.category || 'Graphics'}</span>
                <h1 className="display-4 fw-bold mb-3">{currentCourse.title}</h1>
                <p className="lead text-white-50 mb-4" style={{ maxWidth: '700px' }}>
                  {currentCourse.description}
                </p>
                <div className="d-flex flex-wrap align-items-center gap-4 pt-2">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      alt="Instructor avatar"
                      className="rounded-circle border border-2 border-white-50 object-fit-cover"
                      style={{ width: '48px', height: '48px' }}
                      src={currentCourse.instructorAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDrufP9mBur_gOQlmwybgctayVnmHRYx30aaGilxveLX9Qlqicnob_8HLYyxKOsvXyhYBQ7v9oSX_1_RHRV424GPZx1XMA6OnBrtiKMEhnyaL4lAcy6UHrX-bAKF3ceshKRPgSC4yhHCxJCcsgnhD_ShTrYSDQkgVJBAVyF3cJFp8dYgAtegZPNm1PMVxH6rXFPsQoYD3FUQPWEj0oygEtcAYuvcA7dgoFhVZmyf88PUyogdUnI60E0NOWJr4FKbPzDNB7GkZMcrggu"}
                    />
                    <div>
                      <small className="d-block text-white-50">Instructor</small>
                      <span className="fw-semibold text-white">{currentCourse.instructor || 'Dr. Marcus Thorne'}</span>
                    </div>
                  </div>
                  <div className="vr bg-white-50" style={{ height: '32px' }}></div>
                  <div>
                    {isEnrolled ? (
                      <Link
                        to={`/course/${courseId}`}
                        className="btn btn-nexus-primary px-4 py-2.5 rounded-3 fw-bold text-decoration-none"
                      >
                        Resume Course
                      </Link>
                    ) : (
                      <button
                        onClick={handleEnrollNow}
                        disabled={isEnrolling}
                        className="btn btn-nexus-primary px-4 py-2.5 rounded-3 fw-bold"
                      >
                        {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container px-4 py-5">
          <div className="row g-4">
            {/* Main Content (left) */}
            <div className="col-lg-8">
              <h2 className="h3 fw-bold mb-4">Course Overview</h2>
              <p className="text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                {currentCourse.longDescription || currentCourse.description}
              </p>

              {/* What you will learn */}
              <div className="p-4 rounded-4 bg-white border border-light-subtle mb-5">
                <h3 className="h5 fw-bold mb-4">What you will learn</h3>
                <div className="row g-3">
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Advanced GLSL shader programming and optimization</span>
                  </div>
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Matrix mathematics for 3D transformations</span>
                  </div>
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Custom lighting models and PBR workflows</span>
                  </div>
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Post-processing effects and render targets</span>
                  </div>
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Integrating WebGL with React and Vue ecosystems</span>
                  </div>
                  <div className="col-md-6 d-flex gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Performance profiling for mobile-first graphics</span>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <h3 className="h4 fw-bold mb-4">Curriculum</h3>
              <div className="d-flex flex-column gap-3 mb-5">
                {currentCourse.modules && currentCourse.modules.map((mod, idx) => (
                  <div
                    key={mod.id || idx}
                    className="border rounded-4 bg-white overflow-hidden"
                  >
                    <button
                      className="accordion-header-btn p-4 d-flex justify-content-between align-items-center w-100"
                      onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="h6 fw-bold mb-0 text-dark">{mod.title}</h4>
                          <span className="text-secondary small">{mod.topics?.length || mod.lessonsCount || 0} Lessons • {mod.duration || '2 Hours'}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-secondary" style={{ transform: activeAccordion === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        expand_more
                      </span>
                    </button>
                    {activeAccordion === idx && (
                      <div className="border-top p-4 bg-light-subtle">
                        <div className="d-flex flex-column gap-3">
                          {mod.topics && mod.topics.map((topic, tIdx) => (
                            <div key={topic.id || tIdx} className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 border border-light-subtle">
                              <div className="d-flex align-items-center gap-2">
                                <span className="material-symbols-outlined text-secondary">
                                  {topic.type === 'quiz' ? 'quiz' : 'play_circle'}
                                </span>
                                <span className="fw-medium text-dark">{topic.title}</span>
                              </div>
                              <span className="text-secondary small">{topic.duration || '15:00'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (right) */}
            <div className="col-lg-4">
              <div className="sidebar-sticky stat-card p-4">
                <h4 className="h6 fw-bold text-dark mb-4">Course Statistics</h4>
                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                    <div className="d-flex align-items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined fs-5">menu_book</span>
                      <span>Lessons</span>
                    </div>
                    <span className="fw-semibold text-dark">{currentCourse.lessonsCount || 32}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                    <div className="d-flex align-items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined fs-5">schedule</span>
                      <span>Duration</span>
                    </div>
                    <span className="fw-semibold text-dark">{currentCourse.duration || '18.5 Hours'}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                    <div className="d-flex align-items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined fs-5">infinite</span>
                      <span>Access</span>
                    </div>
                    <span className="fw-semibold text-dark">Lifetime</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined fs-5">workspace_premium</span>
                      <span>Certificate</span>
                    </div>
                    <span className="fw-semibold text-dark">Included</span>
                  </div>
                </div>

                <div className="border-top pt-3">
                  <p className="text-secondary small mb-3">Secure payment via Stripe</p>
                  {isEnrolled ? (
                    <Link
                      to={`/course/${courseId}`}
                      className="btn btn-nexus-secondary w-100 py-2.5 rounded-3 fw-bold text-decoration-none d-block text-center"
                    >
                      Resume Learning
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={handleEnrollNow}
                        disabled={isEnrolling}
                        className="btn btn-nexus-primary w-100 py-2.5 rounded-3 fw-bold mb-2"
                      >
                        {isEnrolling ? 'Enrolling...' : `Enroll Now - $${currentCourse.price}`}
                      </button>
                      <button
                        onClick={handleEnrollNow}
                        disabled={isEnrolling}
                        className="btn btn-outline-secondary w-100 py-2.5 rounded-3 fw-bold"
                      >
                        Try Free Preview
                      </button>
                    </>
                  )}
                </div>

                {/* Related Courses */}
                <div className="mt-5 border-top pt-4">
                  <h4 className="h6 fw-bold text-dark mb-4">Related Courses</h4>
                  <div className="d-flex flex-column gap-3">
                    <a className="related-card d-flex gap-3 align-items-center" href="#/course/c3">
                      <div className="course-img-placeholder rounded-3" style={{ width: '64px', height: '64px' }}></div>
                      <div>
                        <h5 className="h6 fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Creative Coding with Three.js</h5>
                        <span className="text-secondary small">$89.00</span>
                      </div>
                    </a>
                    <a className="related-card d-flex gap-3 align-items-center" href="#/course/c4">
                      <div className="course-img-placeholder rounded-3" style={{ width: '64px', height: '64px' }}></div>
                      <div>
                        <h5 className="h6 fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Mathematics for Shaders</h5>
                        <span className="text-secondary small">$49.00</span>
                      </div>
                    </a>
                  </div>
                </div>
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
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">System Status</a>
        </div>
      </footer>
    </div>
  );
}

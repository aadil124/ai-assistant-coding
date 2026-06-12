import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * CourseCreator Component
 * Renders the course creation wizard form for instructors.
 * Handles validation, submission requests, error banners, and deletion workflows.
 *
 * @param {Object} props
 * @param {String} props.userRole - The role of the logged-in user ('Instructor' or 'Learner')
 * @param {Array} props.mockCourses - Initial list of courses for deletion tests
 */
export default function CourseCreator({ userRole = 'Instructor', mockCourses = [] }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Software Engineering');
  const [description, setDescription] = useState('');
  const [coursesList, setCoursesList] = useState(mockCourses);

  // Stateful flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Local input validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // Deletion modal state
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Keep courses synced when props change
  useEffect(() => {
    if (mockCourses) {
      setCoursesList(mockCourses);
    }
  }, [mockCourses]);

  // Access check
  if (userRole === 'Learner') {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center p-5 border-0 shadow-sm rounded-4" role="alert">
          <span className="material-symbols-outlined text-danger display-4 mb-3">lock</span>
          <h4 className="fw-bold">🔒 Access Restricted</h4>
          <p className="mb-0 text-secondary">Only registered Instructors have permission to create or delete courses.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setValidationErrors({});

    // Client-side validations
    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ title, category, description }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Clear inputs on success
        setTitle('');
        setDescription('');
        if (result.data && (result.data.id || result.data._id)) {
          navigate(`/instructor/courses/${result.data.id || result.data._id}/curriculum`);
        } else {
          navigate('/instructor');
        }
      } else {
        throw new Error(result.message || 'Server creation error');
      }
    } catch (err) {
      setSubmitError(err.message || 'Server creation error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      const response = await fetch(`/courses/${courseToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (response.ok) {
        setCoursesList((prev) => prev.filter((c) => c.id !== courseToDelete.id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setCourseToDelete(null);
    }
  };

  return (
    <div data-testid="course-creator-wrapper" className="container-fluid p-0 d-flex min-vh-100">
      <style>{`
        .creator-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #f9f9ff;
          color: #141b2b;
          width: 100%;
        }
        .sidebar-panel {
          width: 280px;
          background-color: #f1f3ff;
          border-right: 1px solid rgba(195, 198, 215, 0.3);
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .main-canvas {
          flex: 1;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .stepper-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          max-width: 600px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .stepper-line {
          position: absolute;
          top: 20px;
          left: 40px;
          right: 40px;
          height: 2px;
          background-color: #e9edff;
          z-index: 1;
        }
        .stepper-line-active {
          position: absolute;
          top: 20px;
          left: 40px;
          width: 25%;
          height: 2px;
          background-color: #2563eb;
          z-index: 1;
        }
        .stepper-step {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #f9f9ff;
          padding: 0 10px;
        }
        .step-bubble {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          background-color: #e9edff;
          color: #737686;
        }
        .step-bubble.active {
          background-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
        }
        .creator-form-card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(115, 118, 134, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .tips-card {
          background-color: #e1e8fd;
          border-radius: 16px;
          border: 1px solid rgba(37, 99, 235, 0.1);
        }
      `}</style>

      <div className="creator-container d-flex">
        {/* Left Navigation Sidebar */}
        <aside className="sidebar-panel">
          <div className="mb-4 px-2">
            <h2 className="h4 text-primary fw-bold mb-1">EduFlow Pro</h2>
            <p className="text-secondary small mb-0">Instructor Mode</p>
          </div>

          <nav className="nav flex-column gap-1 mb-auto">
            <Link to="/instructor" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </Link>
            <a href="#" className="nav-link text-primary fw-semibold bg-primary bg-opacity-10 d-flex align-items-center gap-3 px-3 py-2 rounded-3">
              <span className="material-symbols-outlined">school</span>
              <span>My Courses</span>
            </a>
            <a href="#" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">assignment</span>
              <span>Assignments</span>
            </a>
            <a href="#" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">monitoring</span>
              <span>Analytics</span>
            </a>
          </nav>

          <div className="pt-3 border-top mt-auto">
            <a href="#" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">contact_support</span>
              <span>Support</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-canvas">
          {/* Top Bar */}
          <header className="h-16 border-bottom border-light-subtle px-4 d-flex align-items-center justify-content-between bg-white shrink-0">
            <Link to="/instructor" className="text-decoration-none d-flex align-items-center gap-2 text-secondary hover-text-primary">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="fw-semibold small">Back to Dashboard</span>
            </Link>
            <div className="d-flex align-items-center gap-3">
              <span className="material-symbols-outlined text-secondary cursor-pointer">notifications</span>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-light-subtle">
                <img alt="Instructor Profile" className="w-100 h-100 object-fit-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuulQxb2i3oT0S65eomVjydBtoXXH-1EXXpZ_B-EcYpKp1_ZdMgAzJ_g8bECmWmpA-c4RfJf0crEUJQoCrz6-R2M-yTUAFeGeW1x6eLsyU61NqRRYPC5bzkBQgzDsHUzLgRxFeUqj2-mgTACS2H0ZcUwBMo5Ns4z1AyCu8Sa-t5KrNsN-Hcnkm8f8lSSQ9a7f4LwXIrY8AxeMr_FdWlSG9lzZ9e-IKF2Dzu9kx0okPTQRtZYedJ6ep7vQEnA1fSGIW76mpU0CIhAU" />
              </div>
            </div>
          </header>

          <div className="p-4 p-md-5 max-w-4xl mx-auto w-100 flex-grow-1">
            {/* Stepper Progress Bar */}
            <div className="stepper-container">
              <div className="stepper-line"></div>
              <div className="stepper-line-active"></div>
              <div className="stepper-step">
                <div className="step-bubble active">1</div>
                <span className="small mt-1 fw-bold text-primary">Info</span>
              </div>
              <div className="stepper-step">
                <div className="step-bubble">2</div>
                <span className="small mt-1 text-secondary">Curriculum</span>
              </div>
              <div className="stepper-step">
                <div className="step-bubble">3</div>
                <span className="small mt-1 text-secondary">Media</span>
              </div>
              <div className="stepper-step">
                <div className="step-bubble">4</div>
                <span className="small mt-1 text-secondary">Settings</span>
              </div>
            </div>

            {/* Header Title */}
            <div className="mb-4">
              <h1 className="h3 fw-bold text-dark mb-1">Create Course</h1>
              <p className="text-secondary mb-0">Provide basic information to build your syllabus curriculum.</p>
            </div>

            {submitError && (
              <div className="alert alert-danger d-flex align-items-center mb-4 border-0 rounded-3" role="alert">
                <span className="material-symbols-outlined me-2">error</span>
                <div>{submitError}</div>
              </div>
            )}

            <div className="row g-4">
              {/* Form Input Fields */}
              <div className="col-12 col-lg-8">
                <form onSubmit={handleSubmit} className="creator-form-card p-4 p-md-5 bg-white">
                  <div className="mb-4">
                    <label htmlFor="courseTitle" className="form-label fw-bold text-dark mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      className={`form-control py-2.5 rounded-3 ${validationErrors.title ? 'is-invalid' : ''}`}
                      id="courseTitle"
                      placeholder="e.g. Advanced System Design and Architecture"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {validationErrors.title ? (
                      <div className="invalid-feedback">{validationErrors.title}</div>
                    ) : (
                      <div className="form-text text-secondary small">
                        Choose a descriptive, engaging title for your students. (Max 80 characters)
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="category" className="form-label fw-bold text-dark mb-2">
                      Category
                    </label>
                    <select
                      className="form-select py-2.5 rounded-3"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold text-dark mb-2">
                      Description
                    </label>
                    <textarea
                      className={`form-control rounded-3 ${validationErrors.description ? 'is-invalid' : ''}`}
                      id="description"
                      rows="6"
                      placeholder="Explain what students will learn in this course..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {validationErrors.description ? (
                      <div className="invalid-feedback">{validationErrors.description}</div>
                    ) : (
                      <div className="form-text text-secondary small">
                        Provide a brief summary of the goals, structure, and values of the course.
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2.5 rounded-pill fw-semibold shadow-sm w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Course'}
                  </button>
                </form>
              </div>

              {/* Sidebar Deletion Administration */}
              <div className="col-12 col-lg-4 d-flex flex-column gap-4">
                <div className="tips-card p-4 text-primary-emphasis">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="material-symbols-outlined">lightbulb</span>
                    <h3 className="h6 fw-bold mb-0">Course Tips</h3>
                  </div>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2.5 small">
                    <li className="d-flex gap-2">
                      <span className="material-symbols-outlined fs-6 text-primary mt-0.5">check_circle</span>
                      <span>Include clear, actionable learning outcomes in your description.</span>
                    </li>
                    <li className="d-flex gap-2">
                      <span className="material-symbols-outlined fs-6 text-primary mt-0.5">check_circle</span>
                      <span>Structure modules logically from introductory topics to advanced ones.</span>
                    </li>
                  </ul>
                </div>

                {coursesList.length > 0 && (
                  <div className="creator-form-card p-4 bg-white">
                    <h3 className="h6 fw-bold text-dark mb-3">Manage Created Courses</h3>
                    <div className="list-group list-group-flush">
                      {coursesList.map((course) => (
                        <div
                          key={course.id}
                          className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent py-3 border-bottom border-light-subtle"
                        >
                          <span className="fw-semibold text-truncate me-2 text-dark small" style={{ maxWidth: '140px' }} title={course.title}>
                            {course.title}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-danger px-2.5 py-1 rounded-pill"
                            onClick={() => setCourseToDelete(course)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Course Deletion Confirmation Modal Overlay */}
      {courseToDelete && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(20,27,43,0.5)' }} role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-danger-subtle text-danger-emphasis border-0 px-4 pt-4">
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCourseToDelete(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body px-4 py-3">
                <p className="mb-0 text-secondary" style={{ lineHeight: '1.6' }}>
                  Are you sure you want to delete the course <strong className="text-dark">"{courseToDelete.title}"</strong>?
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="modal-footer bg-light border-0 px-4 py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-3.5 py-2 rounded-pill fw-semibold"
                  onClick={() => setCourseToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-3.5 py-2 rounded-pill fw-semibold"
                  onClick={handleConfirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

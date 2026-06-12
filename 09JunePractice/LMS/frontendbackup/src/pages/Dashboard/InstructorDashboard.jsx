import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * InstructorDashboard Component
 * Renders the instructor portal dashboard displaying owned courses lists
 * and their respective statistics & analytics.
 *
 * @param {Object} props
 * @param {Array} props.initialCourses - List of courses owned by the instructor
 */
export default function InstructorDashboard({ initialCourses = null }) {
  const [courses, setCourses] = useState(initialCourses || []);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {
    // Auth context missing in tests
  }

  const user = auth?.user || null;

  useEffect(() => {
    if (initialCourses !== null) {
      setCourses(initialCourses);
    } else {
      const fetchCourses = async () => {
        try {
          const response = await fetch('/courses', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              if (user && user.id) {
                // Filter courses owned by this instructor
                const instructorCourses = result.data.filter((c) => c.instructorId === user.id);
                setCourses(instructorCourses);
              } else {
                setCourses(result.data);
              }
            }
          }
        } catch (err) {
          console.error('Failed to fetch instructor courses:', err);
        }
      };
      fetchCourses();
    }
  }, [initialCourses, user]);

  const fetchAnalytics = async (courseId) => {
    setIsLoading(true);
    setError(null);
    setAnalyticsData(null);
    try {
      // API call to the course analytics endpoint
      const response = await fetch(`/courses/${courseId}/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });

      if (!response.ok) {
        throw new Error('Analytics load failed');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setAnalyticsData(result.data);
      } else {
        throw new Error(result.message || 'Analytics load failed');
      }
    } catch (err) {
      setError(err.message || 'Analytics load failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAnalytics = (courseId) => {
    setActiveCourseId(courseId);
    fetchAnalytics(courseId);
  };

  const handleCloseAnalytics = () => {
    setActiveCourseId(null);
    setAnalyticsData(null);
    setError(null);
  };

  const handleRefreshAnalytics = () => {
    if (activeCourseId) {
      fetchAnalytics(activeCourseId);
    }
  };

  const activeCourse = courses.find((c) => c.id === activeCourseId);

  return (
    <div data-testid="instructor-dashboard-wrapper" className="container-fluid p-0 d-flex min-vh-100">
      <style>{`
        .dashboard-container {
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
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
        }
        .course-card {
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(115, 118, 134, 0.12);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          transition: all 0.2s ease-out;
        }
        .course-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .metric-card {
          background-color: #ffffff;
          border-radius: 12px;
          border: 1px solid rgba(115, 118, 134, 0.12);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          padding: 20px;
        }
        .metric-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
      `}</style>

      <div className="dashboard-container d-flex">
        {/* Left Sidebar */}
        <aside className="sidebar-panel">
          <div className="mb-4 px-2">
            <h1 className="h4 text-primary fw-bold mb-1">EduFlow Pro</h1>
            <p className="text-secondary small mb-0">Instructor Mode</p>
          </div>

          <nav className="nav flex-column gap-1 mb-auto">
            <a href="#" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </a>
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
            <Link to="/course/create" className="btn btn-primary w-100 py-2.5 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3 shadow-sm">
              <span className="material-symbols-outlined fs-5">add</span>
              <span>Create New Course</span>
            </Link>
            <a href="#" className="nav-link text-secondary d-flex align-items-center gap-3 px-3 py-2 rounded-3 hover-bg">
              <span className="material-symbols-outlined">contact_support</span>
              <span>Support</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-canvas">
          <header className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 fw-bold text-dark mb-1">Instructor Dashboard</h1>
              <p className="text-secondary mb-0">Manage your courses and view live learning metrics.</p>
            </div>
          </header>

          {courses.length === 0 ? (
            <div className="card text-center p-5 shadow-sm bg-white border-0 rounded-4">
              <div className="card-body">
                <span className="material-symbols-outlined text-secondary display-5 mb-3">school</span>
                <h3 className="card-title text-secondary h5 mb-3">No Courses Found</h3>
                <p className="card-text text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
                  You have not created any courses yet. Start your instructor journey by creating your first course.
                </p>
                <Link to="/course/create" className="btn btn-primary px-4 py-2.5 rounded-pill fw-semibold shadow-sm">
                  Create a Course
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4 mb-5">
              {courses.map((course) => (
                <div className="col-12 col-md-6 col-lg-4" key={course.id}>
                  <div className="course-card h-100">
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill fw-semibold text-capitalize">
                          {course.category || 'Software'}
                        </span>
                        <h2 className="h5 card-title text-dark fw-bold mb-3" style={{ lineHeight: '1.4' }}>
                          {course.title}
                        </h2>
                      </div>
                      <div className="mt-3">
                        <button
                          className={`btn w-100 py-2 rounded-3 fw-semibold ${
                            activeCourseId === course.id ? 'btn-secondary' : 'btn-outline-primary'
                          }`}
                          onClick={() => handleViewAnalytics(course.id)}
                        >
                          View Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Panel */}
          {activeCourseId && (
            <div className="card shadow-sm border-0 rounded-4 bg-white p-4 p-md-5 mb-4">
              <div className="card-body p-0">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-4">
                  <div>
                    <h2 className="h4 text-dark fw-bold mb-1">
                      Course Analytics: {activeCourse?.title}
                    </h2>
                    <p className="text-secondary small mb-0">Performance and enrollment insights</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary px-3 py-2 rounded-pill fw-medium"
                      onClick={handleRefreshAnalytics}
                      disabled={isLoading}
                    >
                      Refresh
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger px-3 py-2 rounded-pill fw-medium"
                      onClick={handleCloseAnalytics}
                    >
                      Close
                    </button>
                  </div>
                </div>

                {isLoading && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading analytics...</p>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4 border-0 rounded-3" role="alert">
                    <span className="material-symbols-outlined me-2 text-danger">error</span>
                    <div>{error}</div>
                  </div>
                )}

                {analyticsData && !isLoading && !error && (
                  <div>
                    {/* Stats Grid */}
                    <div className="row g-4 mb-5">
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="metric-card h-100">
                          <div className="metric-icon bg-primary bg-opacity-10 text-primary">
                            <span className="material-symbols-outlined">groups</span>
                          </div>
                          <p className="small text-secondary text-uppercase tracking-wider mb-1 fw-semibold">Total Enrolled</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Total Enrolled: {analyticsData.totalEnrolled}</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="metric-card h-100">
                          <div className="metric-icon bg-success bg-opacity-10 text-success">
                            <span className="material-symbols-outlined">verified</span>
                          </div>
                          <p className="small text-secondary text-uppercase tracking-wider mb-1 fw-semibold">Completion Rate</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Completion Rate: {analyticsData.completionRate}%</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="metric-card h-100">
                          <div className="metric-icon bg-warning bg-opacity-10 text-warning">
                            <span className="material-symbols-outlined">quiz</span>
                          </div>
                          <p className="small text-secondary text-uppercase tracking-wider mb-1 fw-semibold">Avg Quiz Score</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Average Quiz Score: {analyticsData.averageQuizScore}%</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="metric-card h-100">
                          <div className="metric-icon bg-info bg-opacity-10 text-info">
                            <span className="material-symbols-outlined">assignment</span>
                          </div>
                          <p className="small text-secondary text-uppercase tracking-wider mb-1 fw-semibold">Avg Final Exam</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Average Final Exam Score: {analyticsData.averageFinalExamScore}%</h3>
                        </div>
                      </div>
                    </div>

                    {/* Enrolled Learners Table */}
                    <div className="border border-light-subtle rounded-4 bg-light p-4 shadow-sm">
                      <h3 className="h5 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                        <span className="material-symbols-outlined text-primary">list_alt</span>
                        <span>Enrolled Student Details</span>
                      </h3>
                      {analyticsData.learners && analyticsData.learners.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-hover mb-0 bg-white align-middle rounded-3 overflow-hidden shadow-sm">
                            <thead className="table-light border-bottom">
                              <tr>
                                <th className="px-4 py-3 text-secondary font-label-sm font-semibold">STUDENT NAME</th>
                                <th className="px-4 py-3 text-secondary font-label-sm font-semibold">EMAIL</th>
                                <th className="px-4 py-3 text-secondary font-label-sm font-semibold text-center">PROGRESS</th>
                                <th className="px-4 py-3 text-secondary font-label-sm font-semibold">COMPLETION DATE</th>
                              </tr>
                            </thead>
                            <tbody>
                              {analyticsData.learners.map((learner) => (
                                <tr key={learner.id} className="border-bottom border-light-subtle">
                                  <td className="px-4 py-3 fw-semibold text-dark">{learner.name}</td>
                                  <td className="px-4 py-3 text-secondary">{learner.email}</td>
                                  <td className="px-4 py-3">
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                      <div className="progress flex-grow-1" style={{ height: '6px', maxWidth: '120px' }}>
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: `${learner.progressPercent}%` }}
                                          aria-valuenow={learner.progressPercent}
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                      <span className="small fw-semibold text-dark">{learner.progressPercent}%</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-secondary small">
                                    {learner.completedAt
                                      ? new Date(learner.completedAt).toLocaleDateString()
                                      : 'In Progress'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-muted mb-0 py-4 text-center">No students currently enrolled in this course.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

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
    <div data-testid="instructor-dashboard-wrapper" className="container-fluid p-0 d-flex min-vh-100 animate-fade-in text-start" style={{ backgroundColor: 'var(--bg-neutral)' }}>
      <style>{`
        .main-canvas-premium {
          flex: 1;
          margin-left: 260px; /* Offset for fixed sidebar */
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
        }
      `}</style>

      <Sidebar />

      {/* Main Content Area */}
      <main className="main-canvas-premium">
          <header className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 fw-bold text-dark mb-1">Instructor Dashboard</h1>
              <p className="text-secondary mb-0">Manage your course catalog and monitor cohort metrics.</p>
            </div>
          </header>

          {courses.length === 0 ? (
            <div className="card-premium text-center p-5 bg-white">
              <div className="card-body py-4">
                <span className="material-symbols-outlined text-secondary display-5 mb-3">school</span>
                <h3 className="card-title text-secondary h5 mb-3">No Courses Found</h3>
                <p className="card-text text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
                  You have not created any courses yet. Start your instructor journey by creating your first course.
                </p>
                <Link to="/course/create" className="btn-premium-primary px-4 py-2.5">
                  Create a Course
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4 mb-5">
              {courses.map((course) => {
                const cId = course.id || course._id;
                return (
                  <div className="col-12 col-md-6 col-lg-4" key={cId}>
                    <div className="card-premium h-100 d-flex flex-column justify-content-between p-4 bg-white">
                      <div>
                        <span className="badge-premium badge-premium-primary mb-3 text-capitalize">
                          {course.category || 'Software Engineering'}
                        </span>
                        <h2 className="h5 card-title text-dark fw-bold mb-3" style={{ lineHeight: '1.4' }}>
                          {course.title}
                        </h2>
                      </div>
                      <div className="mt-3">
                        <button
                          className={`w-100 py-2 ${
                            activeCourseId === cId ? 'btn-premium-secondary' : 'btn-premium-primary'
                          }`}
                          onClick={() => handleViewAnalytics(cId)}
                        >
                          View Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Analytics Panel */}
          {activeCourseId && (
            <div className="card-premium bg-white p-4 p-md-5 mb-4 shadow-lg">
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
                      className="btn-premium-secondary btn-sm px-3 py-1.5"
                      onClick={handleRefreshAnalytics}
                      disabled={isLoading}
                    >
                      Refresh
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-3 fw-medium"
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
                        <div className="card-premium-static h-100 p-4 bg-white border">
                          <p className="small text-secondary text-uppercase tracking-wider mb-2 fw-semibold">Total Enrolled</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Total Enrolled: {analyticsData.totalEnrolled}</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="card-premium-static h-100 p-4 bg-white border">
                          <p className="small text-secondary text-uppercase tracking-wider mb-2 fw-semibold">Completion Rate</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Completion Rate: {analyticsData.completionRate}%</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="card-premium-static h-100 p-4 bg-white border">
                          <p className="small text-secondary text-uppercase tracking-wider mb-2 fw-semibold">Avg Quiz Score</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Average Quiz Score: {analyticsData.averageQuizScore}%</h3>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3">
                        <div className="card-premium-static h-100 p-4 bg-white border">
                          <p className="small text-secondary text-uppercase tracking-wider mb-2 fw-semibold">Avg Final Exam</p>
                          <h3 className="h4 fw-bold text-dark mb-0">Average Final Exam Score: {analyticsData.averageFinalExamScore}%</h3>
                        </div>
                      </div>
                    </div>

                    {/* Enrolled Learners Table */}
                    <div className="border border-light-subtle rounded-3 bg-light p-4">
                      <h3 className="h6 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
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
  );
}

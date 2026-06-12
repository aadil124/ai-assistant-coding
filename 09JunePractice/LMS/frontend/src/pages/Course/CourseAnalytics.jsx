import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';

export default function CourseAnalytics() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
      };
      // Fetch course
      const resCourse = await fetch(`/courses/${courseId}`, { headers });
      if (resCourse.ok) {
        const dataCourse = await resCourse.json();
        if (dataCourse.success && dataCourse.data) {
          setCourse(dataCourse.data);
        }
      }

      // Fetch analytics
      const resAnalytics = await fetch(`/courses/${courseId}/analytics`, { headers });
      if (resAnalytics.ok) {
        const dataAnalytics = await resAnalytics.json();
        if (dataAnalytics.success && dataAnalytics.data) {
          setAnalytics(dataAnalytics.data);
        }
      } else {
        const errData = await resAnalytics.json();
        throw new Error(errData.message || 'Failed to load analytics data.');
      }
    } catch (err) {
      setError(err.message || 'Error loading course analytics.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchAnalytics();
    }
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'var(--bg-neutral)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading course analytics...</span>
        </div>
      </div>
    );
  }

  // Fallbacks if data is missing
  const totalEnrolled = analytics?.totalEnrolled || 0;
  const completionRate = analytics?.completionRate || 0;
  const averageQuizScore = analytics?.averageQuizScore || 0;
  const averageFinalExamScore = analytics?.averageFinalExamScore || 0;
  const learners = analytics?.learners || [];

  // Filter learners
  const filteredLearners = learners.filter(learner => {
    if (selectedStatus === 'All Status') return true;
    if (selectedStatus === 'Active') return learner.progressPercent > 0 && learner.progressPercent < 100;
    if (selectedStatus === 'Completed') return learner.progressPercent === 100;
    return true;
  });

  return (
    <div className="min-vh-100 d-flex animate-fade-in" style={{ backgroundColor: 'var(--bg-neutral)', width: '100%' }}>
      <style>{`
        .main-canvas-premium {
          flex: 1;
          margin-left: 260px; /* Offset for fixed sidebar */
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
        }
        .learner-avatar-premium {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .progress-bar-custom {
          height: 6px;
          border-radius: 3px;
          background-color: var(--border-color);
        }
        .progress-fill-custom {
          height: 100%;
          border-radius: 3px;
          background-color: var(--primary);
        }
        .bar-chart-container {
          height: 200px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding: 0 8px;
        }
        .bar-chart-bar {
          flex: 1;
          background-color: var(--border-color);
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .bar-chart-bar:hover {
          background-color: var(--primary);
        }
        .bar-chart-bar.active {
          background-color: var(--primary);
        }
      `}</style>

      <Sidebar />

      {/* Main Canvas */}
      <main className="main-canvas-premium">
        {/* Header Bar */}
        <header className="nav-premium-top justify-content-between shrink-0 mb-4 bg-transparent border-0 shadow-none px-0">
          <Link to="/instructor/courses" className="text-decoration-none d-flex align-items-center gap-1 text-secondary hover-text-primary small">
            <span className="material-symbols-outlined fs-5">arrow_back</span>
            <span>Back to Courses</span>
          </Link>
        </header>

        {/* Content Container */}
        <div className="container-fluid px-0" style={{ maxWidth: '1120px' }}>
          {/* Breadcrumb & Title */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-decoration-none text-secondary hover-text-primary">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-truncate text-secondary" style={{ maxWidth: '200px' }}>{course?.title || 'Course'}</span>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-primary fw-semibold">Analytics</span>
            </nav>
            <div className="d-flex justify-content-between align-items-end">
              <div>
                <h2 className="h3 fw-bold text-dark mb-1">{course?.title || 'Course Analytics'}</h2>
                <p className="text-secondary mb-0">Detailed performance insights for the current cohort.</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger border-0 rounded-3 mb-4" role="alert">
              {error}
            </div>
          )}

          {/* Stats Bento Grid */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-4">
              <div className="card-premium-static p-4 bg-white d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-outlined fs-5">group</span>
                  </div>
                  <span className="badge-premium badge-premium-success">+12%</span>
                </div>
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Total Enrolled</span>
                  <h3 className="h1 fw-bold text-dark mt-1 mb-0">{totalEnrolled}</h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card-premium-static p-4 bg-white d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-outlined fs-5">task_alt</span>
                  </div>
                  <span className="badge-premium badge-premium-success">+5%</span>
                </div>
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Completion Rate</span>
                  <h3 className="h1 fw-bold text-dark mt-1 mb-2">{completionRate}%</h3>
                  <div className="progress-bar-custom">
                    <div className="progress-fill-custom shadow-sm" style={{ width: `${completionRate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card-premium-static p-4 bg-white d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <span className="material-symbols-outlined fs-5">grade</span>
                  </div>
                </div>
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Avg Quiz / Exam Score</span>
                  <h3 className="h1 fw-bold text-dark mt-1 mb-0">
                    {averageQuizScore}% <span className="text-muted fs-5">/ {averageFinalExamScore}%</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Histogram Chart Section */}
          <div className="card-premium-static p-4 bg-white border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h6 fw-bold mb-0">Quiz Score Distribution</h3>
              <div className="d-flex align-items-center gap-3 text-secondary small">
                <div className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></span>
                  <span>Learners</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle bg-light border" style={{ width: '8px', height: '8px' }}></span>
                  <span>Class Avg</span>
                </div>
              </div>
            </div>

            {/* Simulated Chart Bars */}
            <div className="bar-chart-container border-bottom pb-2">
              <div className="bar-chart-bar" style={{ height: '15%' }} title="0-20%: 15% of users"></div>
              <div className="bar-chart-bar" style={{ height: '25%' }} title="20-40%: 25% of users"></div>
              <div className="bar-chart-bar" style={{ height: '40%' }} title="40-60%: 40% of users"></div>
              <div className="bar-chart-bar" style={{ height: '60%' }} title="60-80%: 60% of users"></div>
              <div className="bar-chart-bar active" style={{ height: '85%' }} title="80-90%: 85% of users"></div>
              <div className="bar-chart-bar" style={{ height: '55%' }} title="90-100%: 55% of users"></div>
            </div>
            <div className="d-flex justify-content-between text-secondary small pt-2">
              <span>0-20%</span>
              <span>20-40%</span>
              <span>40-60%</span>
              <span>60-80%</span>
              <span>80-90%</span>
              <span>90-100%</span>
            </div>
          </div>

          {/* Learner Performance Table */}
          <div className="card-premium-static p-0 overflow-hidden mb-5 bg-white border">
            <div className="p-4 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <h3 className="h6 fw-bold text-dark mb-0">Learner Performance</h3>
              <div className="d-flex gap-2 align-items-center">
                <select
                  className="input-premium py-1.5 px-3 text-secondary"
                  style={{ width: '160px' }}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Learner</th>
                    <th>Progress</th>
                    <th>Last Active</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLearners.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-secondary">
                        No learners match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLearners.map((learner) => {
                      const isCompleted = learner.progressPercent === 100;
                      return (
                        <tr key={learner.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div className="learner-avatar-premium">
                                {learner.name ? learner.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="mb-0 fw-bold small text-dark">{learner.name}</p>
                                <p className="mb-0 text-muted small" style={{ fontSize: '11px' }}>{learner.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ width: '140px' }}>
                              <div className="d-flex justify-content-between small text-secondary mb-1" style={{ fontSize: '10px' }}>
                                <span>{learner.progressPercent}%</span>
                              </div>
                              <div className="progress-bar-custom" style={{ height: '4px' }}>
                                <div
                                  className={`h-100 rounded-pill ${isCompleted ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${learner.progressPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-secondary small">{learner.completedAt ? new Date(learner.completedAt).toLocaleDateString() : 'Active recently'}</span>
                          </td>
                          <td className="text-center">
                            <span className={`badge-premium ${
                              isCompleted 
                                ? 'badge-premium-success' 
                                : 'badge-premium-primary'
                            }`}>
                              {isCompleted ? 'Completed' : 'Active'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-top d-flex justify-content-between align-items-center text-secondary small bg-light">
              <span>Showing {filteredLearners.length} of {learners.length} learners</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

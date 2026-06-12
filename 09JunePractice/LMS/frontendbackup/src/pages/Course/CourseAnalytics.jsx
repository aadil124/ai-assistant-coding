import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
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
    <div className="analytics-shell min-vh-100 d-flex">
      <style>{`
        .analytics-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          width: 100%;
        }
        .aside-nav {
          width: 280px;
          border-right: 1px solid #c7c4d7;
          background-color: #ffffff;
        }
        .main-canvas {
          flex: 1;
          background-color: #f8f9ff;
        }
        .stats-card {
          background-color: #ffffff;
          border: 1px solid #c7c4d7;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #c7c4d7;
        }
        .learner-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #4648d4;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .table-container {
          background-color: #ffffff;
          border: 1px solid #c7c4d7;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .progress-bar-custom {
          height: 6px;
          border-radius: 3px;
          background-color: #e5eeff;
        }
        .progress-fill-custom {
          height: 100%;
          border-radius: 3px;
          background-color: #4648d4;
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
          background-color: #e5eeff;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }
        .bar-chart-bar:hover {
          background-color: #4648d4;
        }
        .bar-chart-bar.active {
          background-color: #4648d4;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="aside-nav d-none d-md-flex flex-column h-screen sticky-top p-4 gap-3">
        <div className="px-2 py-3 mb-3 d-flex align-items-center gap-2">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
            <span className="material-symbols-outlined font-fill-1">school</span>
          </div>
          <div>
            <h1 className="h6 fw-bold text-primary mb-0">Enterprise Academy</h1>
            <p className="text-secondary small mb-0">Instructor Portal</p>
          </div>
        </div>

        <nav className="flex-grow-1 d-flex flex-column gap-1">
          <Link to="/instructor" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/instructor/courses" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg bg-light fw-bold text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
            <span>Courses</span>
          </Link>
          <Link to="/instructor/settings" className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover-bg-light transition-all">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="pt-3 border-top d-flex flex-column gap-1">
          <Link to="/dashboard" className="nav-link d-flex align-items-center gap-3 px-3 py-2 text-secondary hover-text-primary small">
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>Learner Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="main-canvas flex-grow-1 p-4 md:p-5 overflow-auto">
        {/* Header Bar */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <Link to="/instructor/courses" className="text-decoration-none d-flex align-items-center gap-1 text-secondary hover-text-primary small">
              <span className="material-symbols-outlined fs-6">arrow_back</span>
              <span>Back to Courses</span>
            </Link>
          </div>
          <div className="avatar-box">
            <img
              className="w-100 h-100 object-fit-cover"
              alt="Instructor Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r6EtbG-OyOIw39kn1fIpqAbWhs3NT42EGPFC-BiOv86N2-IM0YFbCyBPH54LKNgpjTkgGZgsFAeTrpN2McM7TOYYGhC1bnI84m2SQXTvCYI-w3ta30ITWoljRZgYRrkF61RpKGFJBN93LYWOv1uKwMCPP3ORIqRlX9GmmooRLgXer-beVwRQtZIqknyK8pmFI50-yUYc9HA84MJZtBG4BlnfhE8LbzJZH5TVmZNr4oUDn0nd6ATWn16xHrb77uAL_3TMMKBkksqH"
            />
          </div>
        </header>

        {/* Content Container */}
        <div className="container-fluid px-0" style={{ maxWidth: '1120px' }}>
          {/* Breadcrumb & Title */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-decoration-none text-secondary hover-text-primary">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-truncate" style={{ maxWidth: '200px' }}>{course?.title || 'Course'}</span>
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
              <div className="stats-card d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center">
                    <span className="material-symbols-outlined fs-5">group</span>
                  </div>
                  <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1 small">+12%</span>
                </div>
                <div>
                  <span className="text-secondary small uppercase tracking-wider fw-bold">Total Enrolled</span>
                  <h3 className="h1 fw-bold text-dark mt-1 mb-0">{totalEnrolled}</h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stats-card d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-secondary bg-opacity-10 text-secondary rounded-3 p-2.5 d-flex align-items-center justify-content-center">
                    <span className="material-symbols-outlined fs-5">task_alt</span>
                  </div>
                  <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1 small">+5%</span>
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
              <div className="stats-card d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-2.5 d-flex align-items-center justify-content-center">
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
          <div className="stats-card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h6 fw-bold mb-0">Quiz Score Distribution</h3>
              <div className="d-flex align-items-center gap-3 text-secondary small">
                <div className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></span>
                  <span>Learners</span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle bg-light-subtle border" style={{ width: '8px', height: '8px' }}></span>
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
          <div className="table-container mb-5 bg-white">
            <div className="p-4 border-bottom border-light-subtle d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <h3 className="h6 fw-bold text-dark mb-0">Learner Performance</h3>
              <div className="d-flex gap-2 align-items-center">
                <select
                  className="form-select form-select-sm rounded-3 border-light-subtle text-secondary"
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
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4 py-3 small text-secondary fw-semibold">Learner</th>
                    <th className="px-4 py-3 small text-secondary fw-semibold">Progress</th>
                    <th className="px-4 py-3 small text-secondary fw-semibold">Last Active</th>
                    <th className="px-4 py-3 small text-secondary fw-semibold text-center">Status</th>
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
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="learner-avatar">
                                {learner.name ? learner.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="mb-0 fw-bold small text-dark">{learner.name}</p>
                                <p className="mb-0 text-muted small" style={{ fontSize: '11px' }}>{learner.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
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
                          <td className="px-4 py-3 text-secondary small">
                            {learner.completedAt ? new Date(learner.completedAt).toLocaleDateString() : 'Active recently'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`badge px-2.5 py-1 rounded-pill small ${
                              isCompleted 
                                ? 'bg-success bg-opacity-10 text-success' 
                                : 'bg-primary bg-opacity-10 text-primary'
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

            <div className="px-4 py-3 border-top border-light-subtle d-flex justify-content-between align-items-center text-secondary small">
              <span>Showing {filteredLearners.length} of {learners.length} learners</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

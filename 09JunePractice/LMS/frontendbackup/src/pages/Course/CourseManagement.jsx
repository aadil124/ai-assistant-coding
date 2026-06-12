import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const auth = useAuth();
  const user = auth?.user || null;
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/courses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Filter courses owned by this instructor
          const filtered = user?.id 
            ? result.data.filter(c => c.instructorId === user.id)
            : result.data;
          setCourses(filtered);
        }
      } else {
        throw new Error('Failed to fetch courses');
      }
    } catch (err) {
      setError(err.message || 'Error loading courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course and all its progress records?')) {
      return;
    }
    try {
      const response = await fetch(`/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      if (response.ok) {
        setCourses(prev => prev.filter(c => c.id !== courseId && c._id !== courseId));
      } else {
        const resData = await response.json();
        alert(resData.message || 'Deletion failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error deleting course');
    }
  };

  // Filter logic
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? c.category === selectedCategory : true;
    // mock status match or add logic if needed
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="management-shell min-vh-100 d-flex">
      <style>{`
        .management-shell {
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
          padding: 20px;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #c7c4d7;
        }
        .glass-bar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid #c7c4d7;
          border-radius: 12px;
          padding: 16px;
        }
        .table-container {
          background-color: #ffffff;
          border: 1px solid #c7c4d7;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .course-img-placeholder {
          width: 56px;
          height: 40px;
          border-radius: 8px;
          background-color: #e5eeff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4648d4;
          font-weight: bold;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="aside-nav d-none d-md-flex flex-column h-screen sticky-top p-4 gap-3">
        <div className="px-2 py-3 mb-3 d-flex align-items-center gap-2">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2 d-flex align-items-center justify-content-center">
            <span className="material-symbols-outlined font-fill-1">school</span>
          </div>
          <div>
            <h1 className="h5 fw-bold text-primary mb-0">Enterprise Academy</h1>
            <p className="text-secondary small mb-0">Instructor Portal</p>
          </div>
        </div>

        <Link to="/course/create" className="btn btn-nexus-primary w-100 py-3 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-4">
          <span className="material-symbols-outlined">add</span>
          <span>New Course</span>
        </Link>

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

      {/* Main Content */}
      <main className="main-canvas flex-grow-1 p-4 md:p-5 overflow-auto">
        {/* Top bar */}
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">Course Management</h2>
          <div className="d-flex align-items-center gap-3">
            <div className="avatar-box">
              <img
                className="w-100 h-100 object-fit-cover"
                alt="Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6r6EtbG-OyOIw39kn1fIpqAbWhs3NT42EGPFC-BiOv86N2-IM0YFbCyBPH54LKNgpjTkgGZgsFAeTrpN2McM7TOYYGhC1bnI84m2SQXTvCYI-w3ta30ITWoljRZgYRrkF61RpKGFJBN93LYWOv1uKwMCPP3ORIqRlX9GmmooRLgXer-beVwRQtZIqknyK8pmFI50-yUYc9HA84MJZtBG4BlnfhE8LbzJZH5TVmZNr4oUDn0nd6ATWn16xHrb77uAL_3TMMKBkksqH"
              />
            </div>
          </div>
        </header>

        {/* Stats Bento */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card">
              <span className="text-secondary small uppercase tracking-wider">Total Courses</span>
              <h3 className="fw-bold mt-2 mb-0">{courses.length}</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card">
              <span className="text-secondary small uppercase tracking-wider">Active Learners</span>
              <h3 className="fw-bold mt-2 mb-0">1,284</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card">
              <span className="text-secondary small uppercase tracking-wider">Completion Rate</span>
              <h3 className="fw-bold mt-2 mb-0">78.5%</h3>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card">
              <span className="text-secondary small uppercase tracking-wider">Average Rating</span>
              <h3 className="fw-bold mt-2 mb-0">4.92</h3>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-bar mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex flex-wrap gap-2 flex-grow-1" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              className="form-control rounded-3 border-light-subtle"
              style={{ width: '240px' }}
              placeholder="Filter by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select rounded-3 border-light-subtle"
              style={{ width: '160px' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
            </select>
          </div>
          <Link to="/course/create" className="btn btn-nexus-primary px-4 py-2 d-flex align-items-center gap-1 text-decoration-none">
            <span className="material-symbols-outlined fs-5">add</span>
            <span>Create Course</span>
          </Link>
        </div>

        {/* Courses Table */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading courses...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">{error}</div>
        ) : filteredCourses.length === 0 ? (
          <div className="card text-center p-5 bg-white border border-light-subtle rounded-4">
            <h3 className="text-secondary h5 mb-3">No Courses Found</h3>
            <p className="text-muted mb-4">You have not created any courses matching the criteria.</p>
            <Link to="/course/create" className="btn btn-nexus-primary px-4 py-2 text-decoration-none">Create Your First Course</Link>
          </div>
        ) : (
          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4 py-3 text-secondary font-label-sm">Course</th>
                    <th className="px-4 py-3 text-secondary font-label-sm">Category</th>
                    <th className="px-4 py-3 text-secondary font-label-sm">Total Learners</th>
                    <th className="px-4 py-3 text-secondary font-label-sm">Status</th>
                    <th className="px-4 py-3 text-secondary font-label-sm text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((c) => {
                    const cId = c.id || c._id;
                    return (
                      <tr key={cId}>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="course-img-placeholder">
                              {c.title ? c.title.substring(0, 2).toUpperCase() : 'CO'}
                            </div>
                            <div>
                              <p className="fw-semibold text-dark mb-0">{c.title}</p>
                              <span className="text-secondary small">{c.description?.substring(0, 50)}...</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill text-capitalize">{c.category || 'Development'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="fw-semibold text-dark">842</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-1.5">
                            <div className="rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></div>
                            <span className="text-sm">Published</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-end">
                          <div className="d-flex justify-content-end gap-1">
                            <button
                              type="button"
                              className="btn btn-link text-secondary p-1"
                              title="Analytics"
                              onClick={() => navigate(`/instructor/courses/${cId}/analytics`)}
                            >
                              <span className="material-symbols-outlined fs-5">bar_chart</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-link text-secondary p-1"
                              title="Edit Curriculum"
                              onClick={() => navigate(`/instructor/courses/${cId}/curriculum`)}
                            >
                              <span className="material-symbols-outlined fs-5">edit_note</span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-link text-danger p-1"
                              title="Delete Course"
                              onClick={() => handleDeleteCourse(cId)}
                            >
                              <span className="material-symbols-outlined fs-5">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

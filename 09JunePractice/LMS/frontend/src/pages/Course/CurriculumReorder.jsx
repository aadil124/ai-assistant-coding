import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function CurriculumReorder() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user || null;

  const [course, setCourse] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [originalCurriculum, setOriginalCurriculum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchCourseData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCourse(result.data);
          // Sort modules by sequenceIndex initially
          const sortedModules = result.data.modules 
            ? [...result.data.modules].sort((a, b) => a.sequenceIndex - b.sequenceIndex)
            : [];
          setCurriculum(sortedModules);
          setOriginalCurriculum(JSON.parse(JSON.stringify(sortedModules)));
        } else {
          throw new Error(result.message || 'Failed to fetch course');
        }
      } else {
        throw new Error('Failed to fetch course');
      }
    } catch (err) {
      setError(err.message || 'Error loading curriculum data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Reorder modules: Move Up
  const moveModuleUp = (index) => {
    if (index === 0) return;
    const updated = [...curriculum];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setCurriculum(updated);
  };

  // Reorder modules: Move Down
  const moveModuleDown = (index) => {
    if (index === curriculum.length - 1) return;
    const updated = [...curriculum];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setCurriculum(updated);
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    setError(null);

    // Prepare modules payload with updated sequenceIndex
    const reorderedPayload = curriculum.map((mod, index) => ({
      id: mod.id || mod._id,
      sequenceIndex: index
    }));

    try {
      const response = await fetch(`/courses/${courseId}/curriculum/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ modules: reorderedPayload }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setShowToast(true);
        setOriginalCurriculum(JSON.parse(JSON.stringify(curriculum)));
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        throw new Error(result.message || 'Failed to save curriculum order');
      }
    } catch (err) {
      setError(err.message || 'Error saving curriculum order');
      // Revert to original order
      setCurriculum(JSON.parse(JSON.stringify(originalCurriculum)));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setCurriculum(JSON.parse(JSON.stringify(originalCurriculum)));
    navigate(`/instructor/courses/${courseId}/curriculum`);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'var(--bg-neutral)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading curriculum...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex animate-fade-in text-start" style={{ backgroundColor: 'var(--bg-neutral)', width: '100%' }}>
      <style>{`
        .main-canvas-premium {
          flex: 1;
          margin-left: 260px; /* Offset for fixed sidebar */
          padding: 40px;
          overflow-y: auto;
          height: 100vh;
        }
        .reorder-card-premium {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: var(--transition-fast);
        }
        .reorder-card-premium:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }
        .drag-indicator-btn {
          color: var(--text-secondary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .drag-indicator-btn:hover {
          color: var(--primary);
        }
        .custom-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: #1e293b;
          color: #ffffff;
          padding: 16px 24px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 16px;
          z-index: 1050;
          transition: var(--transition-normal);
        }
      `}</style>

      <Sidebar />

      {/* Main Canvas */}
      <main className="main-canvas-premium">
        {/* Top Navbar */}
        <header className="nav-premium-top justify-content-between shrink-0 mb-4 bg-transparent border-0 shadow-none px-0">
          <Link to={`/instructor/courses/${courseId}/curriculum`} className="text-decoration-none d-flex align-items-center gap-1 text-secondary hover-text-primary small">
            <span className="material-symbols-outlined fs-5">arrow_back</span>
            <span>Back to Curriculum</span>
          </Link>
        </header>

        {/* Content Container */}
        <div className="container-fluid px-0" style={{ maxWidth: '960px' }}>
          {/* Breadcrumb & Header */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-decoration-none text-secondary hover-text-primary">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-truncate text-secondary" style={{ maxWidth: '200px' }}>{course?.title || 'Course'}</span>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-primary fw-semibold">Reorder Curriculum</span>
            </nav>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              <div>
                <h2 className="h3 fw-bold mb-1">Curriculum Structure</h2>
                <p className="text-secondary mb-0">Reorganize modules to optimize the learner flow.</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn-premium-secondary py-2"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="btn-premium-primary py-2 d-flex align-items-center gap-2"
                  onClick={handleSaveOrder}
                  disabled={isSaving}
                >
                  <span className="material-symbols-outlined fs-5">save</span>
                  <span>{isSaving ? 'Saving...' : 'Save Order'}</span>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger border-0 rounded-3 mb-4 d-flex align-items-center gap-2" role="alert">
              <span className="material-symbols-outlined">error</span>
              <div>{error}</div>
            </div>
          )}

          {/* Module list */}
          <div className="d-flex flex-column gap-3 mb-5">
            {curriculum.length === 0 ? (
              <div className="card-premium text-center py-5 bg-white">
                <span className="material-symbols-outlined text-secondary fs-1 mb-3">folder_open</span>
                <p className="text-secondary mb-0">No modules created yet. Go back to curriculum builder to add modules.</p>
              </div>
            ) : (
              curriculum.map((module, index) => (
                <div key={module.id || module._id} className="reorder-card-premium overflow-hidden">
                  <div className="p-4 bg-white d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      <span className="badge-premium badge-premium-primary">
                        Module {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="h6 fw-bold mb-0 text-dark">{module.title}</h3>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <button
                        type="button"
                        className="drag-indicator-btn btn p-1 d-flex align-items-center justify-content-center rounded"
                        onClick={() => moveModuleUp(index)}
                        disabled={index === 0}
                        title="Move Module Up"
                        aria-label="Move Module Up"
                      >
                        <span className="material-symbols-outlined fs-5">keyboard_arrow_up</span>
                      </button>
                      <button
                        type="button"
                        className="drag-indicator-btn btn p-1 d-flex align-items-center justify-content-center rounded"
                        onClick={() => moveModuleDown(index)}
                        disabled={index === curriculum.length - 1}
                        title="Move Module Down"
                        aria-label="Move Module Down"
                      >
                        <span className="material-symbols-outlined fs-5">keyboard_arrow_down</span>
                      </button>
                    </div>
                  </div>

                  {/* Optional: Show topics in read-only nested block */}
                  {module.topics && module.topics.length > 0 && (
                    <div className="px-4 pb-4 pt-0 bg-light border-top">
                      <div className="d-flex flex-column gap-2 mt-3 ps-4 border-start">
                        {module.topics.map((topic, tIndex) => (
                          <div key={topic.id || topic._id} className="d-flex align-items-center gap-2 py-1">
                            <span className="material-symbols-outlined text-secondary fs-6">play_circle</span>
                            <span className="small text-secondary">{topic.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Automated path note */}
          <div className="card-premium p-4 bg-white border d-flex align-items-start gap-3">
            <span className="material-symbols-outlined text-primary fs-3">auto_fix_high</span>
            <div>
              <h4 className="h6 fw-bold text-dark mb-1">Automated Path Optimization</h4>
              <p className="text-secondary small mb-0">Reordering modules directly impacts the learning sequence. Make sure prerequisites are positioned appropriately for learners.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="custom-toast animate-fade-in" id="save-toast">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <div>
            <p className="mb-0 fw-bold small">Changes saved successfully</p>
            <p className="mb-0 text-white-50 small" style={{ fontSize: '11px' }}>Curriculum sequence has been updated across all student portals.</p>
          </div>
        </div>
      )}
    </div>
  );
}

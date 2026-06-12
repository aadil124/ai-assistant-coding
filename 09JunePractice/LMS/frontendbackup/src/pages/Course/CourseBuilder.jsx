import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

/**
 * CourseBuilder Component
 * Renders the course curriculum editor page.
 * Manages modules, topics, and reordering.
 *
 * @param {Object} props
 * @param {String} props.courseId - ID of the course being edited
 * @param {Array} props.initialCurriculum - List of modules in the course
 */
export default function CourseBuilder({ courseId: propCourseId, initialCurriculum = [] }) {
  const params = useParams();
  const courseId = propCourseId || params.courseId;

  const [curriculum, setCurriculum] = useState(initialCurriculum);
  const [originalCurriculum, setOriginalCurriculum] = useState(initialCurriculum);

  useEffect(() => {
    if ((!initialCurriculum || initialCurriculum.length === 0) && courseId) {
      const fetchCurriculum = async () => {
        try {
          const response = await fetch(`/courses/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && result.data.modules) {
              setCurriculum(result.data.modules);
              setOriginalCurriculum(result.data.modules);
            }
          }
        } catch (err) {
          console.error('Failed to fetch curriculum:', err);
        }
      };
      fetchCurriculum();
    }
  }, [initialCurriculum, courseId]);

  // Add Module states
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  // Add Topic states
  const [activeAddTopicModuleId, setActiveAddTopicModuleId] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');

  // Saving states
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [reorderError, setReorderError] = useState(null);

  // Sync state with props
  useEffect(() => {
    if (initialCurriculum) {
      setCurriculum(initialCurriculum);
      setOriginalCurriculum(initialCurriculum);
    }
  }, [initialCurriculum]);

  // Add Module submit
  const handleSaveModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    try {
      const nextSequence = curriculum.length;
      const response = await fetch(`/courses/${courseId}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          title: newModuleTitle,
          sequenceIndex: nextSequence,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add module');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCurriculum((prev) => [...prev, { ...result.data, topics: [] }]);
        setOriginalCurriculum((prev) => [...prev, { ...result.data, topics: [] }]);
        setNewModuleTitle('');
        setShowAddModule(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Topic submit
  const handleSaveTopic = async (e, moduleId) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    try {
      const parentModule = curriculum.find((m) => m.id === moduleId);
      const nextSequence = parentModule?.topics?.length || 0;

      const response = await fetch(`/modules/${moduleId}/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          title: newTopicTitle,
          sequenceIndex: nextSequence,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add topic');
      }

      const result = await response.json();
      if (result.success && result.data) {
        setCurriculum((prev) =>
          prev.map((mod) => {
            if (mod.id === moduleId) {
              return {
                ...mod,
                topics: [...(mod.topics || []), result.data],
              };
            }
            return mod;
          })
        );
        setOriginalCurriculum((prev) =>
          prev.map((mod) => {
            if (mod.id === moduleId) {
              return {
                ...mod,
                topics: [...(mod.topics || []), result.data],
              };
            }
            return mod;
          })
        );
        setNewTopicTitle('');
        setActiveAddTopicModuleId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Optimistic Move Down
  const handleMoveDown = (idx) => {
    if (idx >= curriculum.length - 1) return;
    setReorderError(null);
    setOriginalCurriculum(curriculum); // Keep backup

    const updated = [...curriculum];
    const temp = updated[idx];
    updated[idx] = updated[idx + 1];
    updated[idx + 1] = temp;

    const updatedWithSequence = updated.map((mod, i) => ({
      ...mod,
      sequenceIndex: i,
    }));

    setCurriculum(updatedWithSequence);
  };

  // Optimistic Move Up
  const handleMoveUp = (idx) => {
    if (idx <= 0) return;
    setReorderError(null);
    setOriginalCurriculum(curriculum); // Keep backup

    const updated = [...curriculum];
    const temp = updated[idx];
    updated[idx] = updated[idx - 1];
    updated[idx - 1] = temp;

    const updatedWithSequence = updated.map((mod, i) => ({
      ...mod,
      sequenceIndex: i,
    }));

    setCurriculum(updatedWithSequence);
  };

  // Batch Save Order
  const handleSaveOrder = async () => {
    setIsSavingOrder(true);
    setReorderError(null);
    try {
      const response = await fetch(`/courses/${courseId}/curriculum/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          modules: curriculum.map((mod) => ({
            id: mod.id,
            sequenceIndex: mod.sequenceIndex,
          })),
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setOriginalCurriculum(curriculum); // Commit order backup
      } else {
        throw new Error(result.message || 'Reordering failed');
      }
    } catch (err) {
      setReorderError(err.message || 'Reordering failed');
      setCurriculum(originalCurriculum); // Rollback optimistic UI swap
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <div data-testid="course-builder-wrapper" className="container-fluid p-0 d-flex min-vh-100">
      <style>{`
        .builder-container {
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
        .builder-card {
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid rgba(115, 118, 134, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          margin-bottom: 24px;
        }
        .reorder-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(115, 118, 134, 0.2);
          background-color: #ffffff;
          color: #434655;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .reorder-btn:hover {
          background-color: #f1f3ff;
          color: #2563eb;
          border-color: #2563eb;
        }
        .reorder-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>

      <div className="builder-container d-flex">
        {/* Left Sidebar */}
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
          {/* Top Header Bar */}
          <header className="h-16 border-bottom border-light-subtle px-4 d-flex align-items-center justify-content-between bg-white shrink-0">
            <div className="d-flex align-items-center gap-3">
              <Link to="/instructor" className="text-decoration-none d-flex align-items-center gap-2 text-secondary hover-text-primary me-2">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="fw-semibold small">Back</span>
              </Link>
              <div className="vr" style={{ height: '20px' }}></div>
              <h1 className="h5 fw-bold text-dark mb-0 ms-2">Course Curriculum</h1>
            </div>
            <div>
              <button
                className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2"
                onClick={() => handleSaveOrder()}
                disabled={isSavingOrder}
              >
                <span className="material-symbols-outlined fs-5">save</span>
                <span>{isSavingOrder ? 'Saving order...' : 'Save Order'}</span>
              </button>
            </div>
          </header>

          <div className="p-4 p-md-5 max-w-4xl mx-auto w-100 flex-grow-1">
            {reorderError && (
              <div className="alert alert-danger d-flex align-items-center mb-4 border-0 rounded-3" role="alert">
                <span className="material-symbols-outlined me-2">error</span>
                <div>{reorderError}</div>
              </div>
            )}

            {/* Modules List */}
            <div className="mb-4">
              {curriculum.map((module, idx) => (
                <div key={module.id} className="builder-card p-4">
                  {/* Module Header */}
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="material-symbols-outlined text-primary">folder</span>
                      <div className="module-title-item fw-bold h5 text-dark mb-0" style={{ lineHeight: '1.4' }}>
                        {module.title}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="reorder-btn"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        aria-label="Move Up"
                      >
                        <span className="material-symbols-outlined fs-5">arrow_upward</span>
                      </button>
                      <button
                        className="reorder-btn"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === curriculum.length - 1}
                        aria-label="Move Down"
                      >
                        <span className="material-symbols-outlined fs-5">arrow_downward</span>
                      </button>
                    </div>
                  </div>

                  {/* Topics List */}
                  <ul className="list-group list-group-flush mb-3">
                    {module.topics?.map((topic) => (
                      <li
                        key={topic.id}
                        className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent py-2.5 border-light-subtle"
                      >
                        <div className="d-flex align-items-center gap-2 text-secondary">
                          <span className="material-symbols-outlined fs-5">article</span>
                          <span className="small fw-medium">{topic.title}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Add Topic Panel */}
                  {activeAddTopicModuleId === module.id ? (
                    <form
                      onSubmit={(e) => handleSaveTopic(e, module.id)}
                      className="mt-3 bg-light p-3 rounded-3 border"
                    >
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Enter topic title"
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-sm btn-success px-3 rounded-pill fw-semibold">
                          Save Topic
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary px-3 rounded-pill fw-semibold"
                          onClick={() => {
                            setActiveAddTopicModuleId(null);
                            setNewTopicTitle('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-2">
                      <button
                        className="btn btn-sm btn-link text-primary p-0 fw-semibold text-decoration-none d-flex align-items-center gap-1"
                        onClick={() => setActiveAddTopicModuleId(module.id)}
                      >
                        <span className="material-symbols-outlined fs-5">add</span>
                        <span>Add Topic</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Module Section */}
            {showAddModule ? (
              <form onSubmit={handleSaveModule} className="card shadow-sm border-0 p-4 bg-light rounded-4">
                <div className="mb-3">
                  <label htmlFor="newModuleTitleInput" className="form-label fw-bold text-dark small mb-2">
                    New Module Title
                  </label>
                  <input
                    id="newModuleTitleInput"
                    type="text"
                    className="form-control py-2.5 rounded-3"
                    placeholder="Enter module title"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success px-3.5 py-2 rounded-pill fw-semibold shadow-sm">
                    Save Module
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3.5 py-2 rounded-pill fw-semibold"
                    onClick={() => {
                      setShowAddModule(false);
                      setNewModuleTitle('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="btn btn-outline-primary w-100 py-3.5 border-dashed rounded-4 fw-semibold d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowAddModule(true)}
              >
                <span className="material-symbols-outlined fs-5">add</span>
                <span>Add Module</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

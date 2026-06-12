import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function CreateModuleTopic() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [sequenceIndex, setSequenceIndex] = useState(1);
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicType, setNewTopicType] = useState('Video');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const res = await fetch(`/courses/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (res.ok) {
            const result = await res.json();
            if (result.success && result.data) {
              setCourse(result.data);
              setSequenceIndex((result.data.modules?.length || 0) + 1);
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchCourse();
    }
  }, [courseId]);

  const handleAddTopicPlaceholder = () => {
    if (!newTopicTitle.trim()) return;
    setTopics(prev => [...prev, { title: newTopicTitle, type: newTopicType }]);
    setNewTopicTitle('');
  };

  const handleRemoveTopic = (index) => {
    setTopics(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveCurriculum = async (e) => {
    e.preventDefault();
    if (!moduleTitle.trim()) {
      setError('Module title is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      // 1. Create the module
      const resModule = await fetch(`/courses/${courseId}/modules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          title: moduleTitle,
          sequenceIndex: sequenceIndex - 1,
        }),
      });

      if (!resModule.ok) {
        throw new Error('Failed to create module');
      }

      const dataModule = await resModule.json();
      const newModuleId = dataModule.data.id || dataModule.data._id;

      // 2. Create the topics under this module
      for (let i = 0; i < topics.length; i++) {
        const t = topics[i];
        const resTopic = await fetch(`/modules/${newModuleId}/topics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
          body: JSON.stringify({
            title: t.title,
            sequenceIndex: i,
          }),
        });

        if (!resTopic.ok) {
          throw new Error(`Failed to create topic: ${t.title}`);
        }
        
        // Note: For actual Resource types, we could do POST /topics/:topicId/resources
        // but this form simplifies the high-level creation structure.
      }

      setSuccessMsg('Module and topics added successfully!');
      setTimeout(() => {
        navigate(`/instructor/courses/${courseId}/curriculum`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error saving curriculum structure');
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading course details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="module-topic-shell min-vh-100 d-flex">
      <style>{`
        .module-topic-shell {
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
        }
        .bento-card {
          background-color: #ffffff;
          border: 1px solid #c7c4d7;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(11, 28, 48, 0.05);
        }
        .tip-box {
          background-color: #e5eeff;
          color: #4648d4;
          border-radius: 8px;
          padding: 16px;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="aside-nav d-none d-md-flex flex-column h-screen sticky-top p-4 gap-3">
        <div className="px-2 py-3 mb-3">
          <h1 className="h5 fw-bold text-primary mb-0">Enterprise Academy</h1>
          <p className="text-secondary small mb-0">Instructor Portal</p>
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
      </aside>

      {/* Main Content */}
      <main className="main-canvas p-4 md:p-5 overflow-auto">
        <div className="container-fluid max-w-5xl px-0">
          {/* Header */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-secondary text-decoration-none">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-dark">{course.title}</span>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-primary fw-bold">Add Module</span>
            </nav>
            <h2 className="h4 fw-bold mb-1">Structure Your Curriculum</h2>
            <p className="text-secondary mb-0">Add modules and topics to organize your course roadmap.</p>
          </div>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}

          <form onSubmit={handleSaveCurriculum} className="row g-4">
            {/* Left Column: Form Editor */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              <div className="bento-card">
                <h3 className="h6 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined text-primary">segment</span>
                  <span>New Module Details</span>
                </h3>
                
                <div className="row g-3">
                  <div className="col-12 col-md-8">
                    <label className="form-label small fw-semibold text-secondary">Module Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3 border-light-subtle"
                      placeholder="e.g. Advanced State Management"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold text-secondary">Sequence Order</label>
                    <input
                      type="number"
                      className="form-control rounded-3 border-light-subtle"
                      value={sequenceIndex}
                      onChange={(e) => setSequenceIndex(parseInt(e.target.value) || 1)}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Topics block */}
              <div className="bento-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h6 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-primary">format_list_bulleted</span>
                    <span>Topics in this Module</span>
                  </h3>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                  {topics.length === 0 ? (
                    <p className="text-secondary small py-2 mb-0">No topics added to this module yet. Add topics below.</p>
                  ) : (
                    topics.map((t, idx) => (
                      <div key={idx} className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          <span className="material-symbols-outlined text-secondary">drag_handle</span>
                          <div>
                            <p className="fw-semibold text-dark mb-0 text-sm">{t.title}</p>
                            <span className="text-secondary small" style={{ fontSize: '11px' }}>{t.type}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleRemoveTopic(idx)}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Topic Input Form */}
                <div className="p-3 border rounded-3 bg-light-subtle">
                  <h4 className="small fw-semibold text-dark mb-3">Add Topic</h4>
                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-control form-control-sm rounded-3 border-light-subtle"
                        placeholder="Topic title..."
                        value={newTopicTitle}
                        onChange={(e) => setNewTopicTitle(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <select
                        className="form-select form-select-sm rounded-3 border-light-subtle"
                        value={newTopicType}
                        onChange={(e) => setNewTopicType(e.target.value)}
                      >
                        <option value="Video">Video Content</option>
                        <option value="Notes">PDF / Markdown Notes</option>
                        <option value="Quiz">Interactive Quiz</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary w-100 rounded-3"
                        onClick={handleAddTopicPlaceholder}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-nexus-primary px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving Module...' : 'Save and Return'}
                </button>
                <Link to={`/instructor/courses/${courseId}/curriculum`} className="btn btn-nexus-secondary px-4 py-2">
                  Cancel
                </Link>
              </div>
            </div>

            {/* Right Column: Tips */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-3">
              <div className="bento-card bg-light-subtle border-0">
                <h4 className="small fw-bold text-secondary uppercase tracking-wider mb-2">Outline Preview</h4>
                <p className="text-secondary small mb-3">Existing modules in this course:</p>
                <div className="d-flex flex-column gap-2">
                  {course.modules?.map((m, idx) => (
                    <div key={m.id || m._id} className="p-2 border rounded-3 bg-white d-flex align-items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-secondary fs-5">folder</span>
                      <span className="fw-medium text-truncate">{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tip-box d-flex gap-3 align-items-start">
                <span className="material-symbols-outlined">lightbulb</span>
                <div>
                  <h4 className="fw-bold text-sm mb-1">Curriculum Pro-Tip</h4>
                  <p className="small mb-0" style={{ fontSize: '12px' }}>
                    Shorter modules increase overall retention. Break lessons down into 10-15 minute blocks to keep learners motivated and engaged!
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

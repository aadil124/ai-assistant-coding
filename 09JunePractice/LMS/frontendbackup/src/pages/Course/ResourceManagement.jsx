import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ResourceManagement() {
  const { courseId, topicId } = useParams();
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // New Resource Form
  const [type, setType] = useState('Video');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchData = async () => {
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
          
          // Find the topic details
          const allTopics = dataCourse.data.modules?.flatMap(m => m.topics || []) || [];
          const matchedTopic = allTopics.find(t => t.id === topicId || t._id === topicId);
          if (matchedTopic) {
            setTopic(matchedTopic);
          }
        }
      }

      // Fetch topic details to get resources (Note: in progressRoutes, there's GET /courses/:id/topics/:topicId)
      const resTopicDetails = await fetch(`/courses/${courseId}/topics/${topicId}`, { headers });
      if (resTopicDetails.ok) {
        const dataTopic = await resTopicDetails.json();
        if (dataTopic.success && dataTopic.data && dataTopic.data.resources) {
          setResources(dataTopic.data.resources);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (courseId && topicId) {
      fetchData();
    }
  }, [courseId, topicId]);

  const handleAddResource = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      const payload = { type };
      if (type === 'Notes') {
        payload.content = content;
      } else {
        payload.url = url;
      }

      const res = await fetch(`/topics/${topicId}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSuccessMsg('Resource added successfully!');
        setResources(prev => [...prev, result.data]);
        setShowModal(false);
        setUrl('');
        setContent('');
      } else {
        throw new Error(result.message || 'Failed to add resource');
      }
    } catch (err) {
      setError(err.message || 'Error saving resource');
    } finally {
      setIsLoading(false);
    }
  };

  if (!course || !topic) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading resource manager...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="resource-shell min-vh-100 d-flex">
      <style>{`
        .resource-shell {
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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(11, 28, 48, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
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
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
                <Link to="/instructor/courses" className="text-secondary text-decoration-none">Courses</Link>
                <span className="material-symbols-outlined fs-6">chevron_right</span>
                <Link to={`/instructor/courses/${courseId}/curriculum`} className="text-secondary text-decoration-none">{course.title}</Link>
                <span className="material-symbols-outlined fs-6">chevron_right</span>
                <span className="text-primary fw-bold">Resources</span>
              </nav>
              <h2 className="h4 fw-bold mb-1">Resource Management</h2>
              <p className="text-secondary mb-0">Manage materials for topic: <strong className="text-dark">{topic.title}</strong></p>
            </div>
            <button
              type="button"
              className="btn btn-nexus-primary px-4 py-2 d-flex align-items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              <span className="material-symbols-outlined fs-5">cloud_upload</span>
              <span>Add Resource</span>
            </button>
          </div>

          {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}

          {/* Resources List */}
          <div className="bento-card">
            <h3 className="h6 fw-bold text-dark mb-4">Topic Resources</h3>
            {resources.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-secondary mb-0">No resources configured for this topic yet.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3 text-secondary font-label-sm">Name</th>
                      <th className="px-4 py-3 text-secondary font-label-sm">Type</th>
                      <th className="px-4 py-3 text-secondary font-label-sm">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((r) => {
                      const rId = r.id || r._id;
                      return (
                        <tr key={rId}>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded bg-primary bg-opacity-10 text-primary p-2 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-outlined">
                                  {r.type === 'Video' ? 'play_circle' : 'description'}
                                </span>
                              </div>
                              <span className="fw-semibold text-dark">{r.type === 'Video' ? 'Video Lecture' : 'Study Notes'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-1.5 rounded-pill">{r.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-secondary small text-truncate d-inline-block" style={{ maxWidth: '300px' }}>
                              {r.type === 'Video' ? r.url : r.content?.substring(0, 80)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Resource Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-4 shadow-lg overflow-hidden w-100 mx-3" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <h3 className="h6 fw-bold text-dark mb-0">Add New Resource</h3>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            
            <form onSubmit={handleAddResource} className="p-4 d-flex flex-column gap-3">
              {error && <div className="alert alert-danger mb-0" role="alert">{error}</div>}

              <div>
                <label className="form-label small fw-semibold text-secondary">Resource Type</label>
                <select
                  className="form-select rounded-3 border-light-subtle"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Video">Video Link</option>
                  <option value="Notes">Study Notes (Markdown)</option>
                </select>
              </div>

              {type === 'Video' ? (
                <div>
                  <label className="form-label small fw-semibold text-secondary">Video URL</label>
                  <input
                    type="url"
                    className="form-control rounded-3 border-light-subtle"
                    placeholder="e.g. https://www.youtube.com/embed/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="form-label small fw-semibold text-secondary">Notes Content (Markdown supported)</label>
                  <textarea
                    className="form-control rounded-3 border-light-subtle"
                    style={{ minHeight: '150px' }}
                    placeholder="Write notes here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-nexus-secondary px-4 py-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-nexus-primary px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Resource'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

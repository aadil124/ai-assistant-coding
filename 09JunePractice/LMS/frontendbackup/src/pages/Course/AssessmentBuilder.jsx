import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function AssessmentBuilder() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  
  const [passingThreshold, setPassingThreshold] = useState(80);
  const [randomizeOrder, setRandomizeOrder] = useState(false);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt: 'Which principle best describes the \'F-Pattern\' in visual design?',
      options: [
        'Users read in a horizontal motion then down.',
        'A focus on the bottom right corner.',
        '',
        ''
      ],
      correctIndex: 0
    }
  ]);

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
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchCourse();
    }
  }, [courseId]);

  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: Date.now(),
        prompt: '',
        options: ['', '', '', ''],
        correctIndex: 0
      }
    ]);
  };

  const handleRemoveQuestion = (id) => {
    if (questions.length === 1) return;
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleUpdatePrompt = (id, text) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, prompt: text } : q));
  };

  const handleUpdateOption = (qId, optIdx, text) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optIdx] = text;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSelectCorrect = (qId, optIdx) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, correctIndex: optIdx } : q));
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    setSuccessMsg('Assessment configuration saved successfully!');
    setTimeout(() => {
      navigate(`/instructor/courses/${courseId}/curriculum`);
    }, 1500);
  };

  if (!course) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading course...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-shell min-vh-100 d-flex">
      <style>{`
        .builder-shell {
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

      {/* Main Canvas */}
      <main className="main-canvas p-4 md:p-5 overflow-auto">
        <div className="container-fluid max-w-5xl px-0">
          {/* Header */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-secondary text-decoration-none">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-dark">{course.title}</span>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-primary fw-bold">Assessment Builder</span>
            </nav>
            <h2 className="h4 fw-bold mb-1">Topic Assessment Builder</h2>
            <p className="text-secondary mb-0">Design evaluation quizzes and exams to test learner knowledge.</p>
          </div>

          {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}

          <form onSubmit={handleSaveQuiz} className="row g-4">
            {/* Left Column: Question editor */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              <div className="bento-card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h6 fw-bold text-dark mb-0">Quiz Settings</h3>
                  <div className="d-flex align-items-center gap-2">
                    <label className="small text-secondary fw-semibold">Passing Threshold:</label>
                    <span className="fw-bold text-primary">{passingThreshold}%</span>
                  </div>
                </div>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="100"
                  value={passingThreshold}
                  onChange={(e) => setPassingThreshold(parseInt(e.target.value) || 80)}
                />
              </div>

              {/* Dynamic Questions List */}
              <div className="d-flex flex-column gap-3">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="bento-card border-start border-primary border-4">
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill fw-semibold">
                        Question {String(qIdx + 1).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        className="btn btn-link text-danger p-0"
                        onClick={() => handleRemoveQuestion(q.id)}
                        disabled={questions.length === 1}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-secondary">Question Prompt</label>
                      <textarea
                        className="form-control rounded-3 border-light-subtle"
                        rows="2"
                        placeholder="e.g. Which principle best describes the F-Pattern?"
                        value={q.prompt}
                        onChange={(e) => handleUpdatePrompt(q.id, e.target.value)}
                        required
                      />
                    </div>

                    <div className="row g-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctIndex === optIdx;
                        return (
                          <div className="col-12 col-md-6" key={optIdx}>
                            <label className="form-label small text-secondary">Option {String.fromCharCode(65 + optIdx)}</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control rounded-start border-light-subtle"
                                placeholder={`Enter option ${String.fromCharCode(65 + optIdx)}`}
                                value={opt}
                                onChange={(e) => handleUpdateOption(q.id, optIdx, e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className={`btn border-light-subtle ${isCorrect ? 'btn-success text-white' : 'btn-outline-success'}`}
                                onClick={() => handleSelectCorrect(q.id, optIdx)}
                                title="Mark as Correct Answer"
                              >
                                <span className="material-symbols-outlined">check_circle</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-outline-primary w-100 py-3 rounded-3 border-dashed d-flex align-items-center justify-content-center gap-2 fw-semibold"
                onClick={handleAddQuestion}
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add Another Question</span>
              </button>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-nexus-primary px-4 py-2">
                  Complete Assessment Configuration
                </button>
                <Link to={`/instructor/courses/${courseId}/curriculum`} className="btn btn-nexus-secondary px-4 py-2">
                  Cancel
                </Link>
              </div>
            </div>

            {/* Right Column: Sidebar summaries */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-3">
              <div className="bento-card">
                <h4 className="small fw-bold text-secondary uppercase tracking-wider mb-3">Quiz Summary</h4>
                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span className="text-secondary small">Total Questions</span>
                  <span className="fw-bold text-dark">{questions.length}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <span className="text-secondary small">Est. Time</span>
                  <span className="fw-bold text-dark">{questions.length * 2} mins</span>
                </div>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <span className="text-secondary small">Randomize Questions</span>
                  <div className="form-check form-switch m-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={randomizeOrder}
                      onChange={(e) => setRandomizeOrder(e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

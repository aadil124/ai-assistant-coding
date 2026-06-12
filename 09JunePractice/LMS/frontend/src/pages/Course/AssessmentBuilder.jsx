import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';

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
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'var(--bg-neutral)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading course...</span>
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
      `}</style>

      <Sidebar />

      {/* Main Canvas */}
      <main className="main-canvas-premium">
        <div className="container-fluid px-0" style={{ maxWidth: '960px' }}>
          {/* Header */}
          <div className="mb-4">
            <nav className="d-flex align-items-center gap-1 text-secondary small mb-2">
              <Link to="/instructor/courses" className="text-secondary text-decoration-none">Courses</Link>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-dark">{course.title}</span>
              <span className="material-symbols-outlined fs-6">chevron_right</span>
              <span className="text-primary fw-semibold">Assessment Builder</span>
            </nav>
            <h2 className="h4 fw-bold mb-1">Topic Assessment Builder</h2>
            <p className="text-secondary mb-0">Design evaluation quizzes and exams to test learner knowledge.</p>
          </div>

          {successMsg && <div className="alert alert-success border-0 rounded-3 small animate-fade-in" role="alert">{successMsg}</div>}

          <form onSubmit={handleSaveQuiz} className="row g-4">
            {/* Left Column: Question editor */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              <div className="card-premium bg-white p-4">
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
                  <div key={q.id} className="card-premium bg-white p-4 border-start border-primary border-4">
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <span className="badge-premium badge-premium-primary">
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

                    <div className="form-group-premium">
                      <label className="label-premium">Question Prompt</label>
                      <textarea
                        className="input-premium"
                        rows="2"
                        placeholder="e.g. Which principle best describes the F-Pattern?"
                        value={q.prompt}
                        onChange={(e) => handleUpdatePrompt(q.id, e.target.value)}
                        required
                      />
                    </div>

                    <div className="row g-3">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctIndex === optIdx;
                        return (
                          <div className="col-12 col-md-6" key={optIdx}>
                            <label className="label-premium">Option {String.fromCharCode(65 + optIdx)}</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control rounded-start border-light-subtle py-2 px-3 text-dark"
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
                className="btn btn-outline-primary w-100 py-3.5 rounded-3 border-dashed d-flex align-items-center justify-content-center gap-2 fw-semibold mb-3"
                onClick={handleAddQuestion}
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add Another Question</span>
              </button>

              <div className="d-flex gap-2">
                <button type="submit" className="btn-premium-primary py-2.5 px-4">
                  Complete Assessment Configuration
                </button>
                <Link to={`/instructor/courses/${courseId}/curriculum`} className="btn-premium-secondary py-2.5 px-4">
                  Cancel
                </Link>
              </div>
            </div>

            {/* Right Column: Sidebar summaries */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-3">
              <div className="card-premium-static p-4 bg-white border">
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

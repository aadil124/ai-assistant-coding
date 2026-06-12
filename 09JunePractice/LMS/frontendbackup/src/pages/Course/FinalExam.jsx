import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export default function FinalExam() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  let progressCtx = null;
  try {
    progressCtx = useProgress();
  } catch (e) {}

  let auth = null;
  try {
    auth = useAuth();
  } catch (e) {}
  const token = auth?.token || localStorage.getItem('token') || '';

  const [questions, setQuestions] = useState([]);
  const [passingThreshold, setPassingThreshold] = useState(85);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState({}); // maps question id -> selectedOptionIndex
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60); // 120 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback Mock Questions if backend doesn't have it
  const defaultQuestions = [
    {
      id: 'mock_fe_q0',
      questionText: 'Explain the difference between Fragment and Vertex shaders in the modern rendering pipeline.',
      options: [
        'Vertex shaders calculate pixel colors after rasterization, whereas fragment shaders determine the positions of vertices in 3D space.',
        'Vertex shaders operate on individual vertices to transform 3D coordinates; Fragment shaders operate on pixel-level data to determine final screen color.',
        'Both shaders are identical in function but run at different clock speeds on the CPU rather than the GPU hardware.'
      ]
    },
    {
      id: 'mock_fe_q1',
      questionText: 'Which coordinate system is used as the intermediate target during the projection transformation before NDC?',
      options: [
        'Clip Space',
        'Eye Space',
        'World Space',
        'Screen Space'
      ]
    },
    {
      id: 'mock_fe_q2',
      questionText: 'What is the purpose of a Framebuffer object (FBO) in WebGL?',
      options: [
        'To speed up CPU calculations of geometry positions.',
        'To enable off-screen rendering by targeting textures or renderbuffers instead of the default screen canvas.',
        'To control the aspect ratio of the main drawing context.'
      ]
    }
  ];

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/courses/${courseId}/final-exam`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.questions) {
            setQuestions(result.questions);
            setPassingThreshold(result.passingThreshold || 85);
          } else {
            setQuestions(defaultQuestions);
          }
        } else {
          setQuestions(defaultQuestions);
        }
      } catch (err) {
        console.error('Failed to fetch final exam:', err);
        setQuestions(defaultQuestions);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [courseId, token]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleSubmitExam = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const formattedAnswers = questions.map(q => ({
      questionId: q.id,
      selectedOptionIndex: answers[q.id] !== undefined ? answers[q.id] : -1
    }));

    setIsSubmitting(true);
    try {
      const response = await fetch(`/courses/${courseId}/final-exam/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers: formattedAnswers })
      });

      if (!response.ok) throw new Error('Submission failed');
      const result = await response.json();

      if (result.success) {
        if (progressCtx) {
          await progressCtx.refreshEnrolledCourses();
        }
        // Navigate to final exam results page (CourseCompletion.jsx)
        navigate(`/course/${courseId}/completion`, { state: { result } });
      } else {
        throw new Error(result.message || 'Exam submit failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit exam. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Exam Questions...</span>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const totalCount = questions.length;
  const progressPercent = Math.round((Object.keys(answers).length / totalCount) * 100);

  return (
    <div className="exam-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .exam-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .top-nav {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant, #c7c4d7);
          background-color: #ffffff;
          z-index: 50;
        }
        .aside-nav {
          border-right: 1px solid var(--outline-variant, #c7c4d7);
          background-color: #ffffff;
        }
        .question-btn {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          border: 1px solid var(--outline-variant, #c7c4d7);
          background-color: #ffffff;
          font-weight: 600;
          color: #464554;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .question-btn.completed {
          background-color: var(--primary, #4648d4);
          color: #ffffff;
          border-color: var(--primary, #4648d4);
        }
        .question-btn.active {
          ring: 2px solid var(--primary, #4648d4);
          background-color: var(--secondary-container, #dae2fd);
          color: var(--on-secondary-fixed, #131b2e);
        }
        .question-card {
          background-color: #ffffff;
          border: 1px solid var(--outline-variant, #c7c4d7);
          border-radius: 12px;
          padding: 32px;
          min-height: 500px;
        }
        .option-label {
          border: 1px solid var(--outline-variant, #c7c4d7);
          border-radius: 10px;
          padding: 16px 20px;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          transition: all 0.2s;
        }
        .option-label:hover {
          border-color: var(--primary, #4648d4);
          background-color: rgba(70, 72, 212, 0.03);
        }
        .option-label.selected {
          border-color: var(--primary, #4648d4);
          background-color: rgba(70, 72, 212, 0.05);
          box-shadow: 0 0 0 1px var(--primary, #4648d4);
        }
        .option-radio {
          margin-top: 4px;
        }
      `}</style>

      {/* Top Nav Bar */}
      <header className="top-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary font-display fs-4" style={{ letterSpacing: '-0.02em' }}>Lumina LMS</Link>
          <div className="vr bg-light" style={{ height: '24px' }}></div>
          <div>
            <span className="small text-secondary d-block">WebGL 3D Graphics</span>
            <span className="small text-primary fw-bold uppercase" style={{ fontSize: '10px' }}>Final Examination</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div className="text-end">
            <div className="d-flex align-items-center gap-1.5 text-danger fw-bold" style={{ fontSize: '1.05rem' }}>
              <span className="material-symbols-outlined fs-5">timer</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
            <div className="progress" style={{ height: '3px', width: '100px', marginTop: '4px' }}>
              <div className="progress-bar bg-danger" style={{ width: `${(timeLeft / 7200) * 100}%` }}></div>
            </div>
          </div>
          <button
            onClick={handleSubmitExam}
            disabled={isSubmitting}
            className="btn btn-nexus-primary px-4 py-2 rounded-3 fw-bold"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>
      </header>

      {/* Split Content */}
      <div className="container-fluid px-4 py-4 flex-grow-1">
        <div className="row g-4">
          {/* Question Grid Sidebar */}
          <aside className="col-lg-3">
            <div className="aside-nav p-4 border rounded-4 bg-white">
              <h3 className="h6 fw-bold mb-3 d-flex justify-content-between">
                <span>QUESTION PROGRESS</span>
                <span className="text-primary">{Object.keys(answers).length} / {totalCount}</span>
              </h3>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {questions.map((q, idx) => {
                  const isCompleted = answers[q.id] !== undefined;
                  const isActive = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`question-btn ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="border-top pt-3 text-secondary small d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="d-inline-block rounded bg-primary" style={{ width: '12px', height: '12px' }}></span>
                  <span>Answered</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="d-inline-block rounded bg-white border border-secondary" style={{ width: '12px', height: '12px' }}></span>
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Question card */}
          <section className="col-lg-9">
            {currentQuestion ? (
              <div className="question-card d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="badge bg-light border text-secondary px-3 py-1.5 rounded-pill small">
                      Question {currentIdx + 1} of {totalCount}
                    </span>
                  </div>
                  <h2 className="h4 fw-bold text-dark mb-4">{currentQuestion.questionText}</h2>

                  {/* Options List */}
                  <div className="d-flex flex-column gap-3 mb-4">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = answers[currentQuestion.id] === idx;
                      return (
                        <label
                          key={idx}
                          className={`option-label ${isSelected ? 'selected' : ''}`}
                        >
                          <input
                            type="radio"
                            className="option-radio form-check-input"
                            name={`q-${currentQuestion.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(currentQuestion.id, idx)}
                          />
                          <span className="text-dark fw-medium">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="d-flex justify-content-between border-top pt-4">
                  <button
                    onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentIdx === 0}
                    className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-bold bg-white"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      if (currentIdx < totalCount - 1) {
                        setCurrentIdx(prev => prev + 1);
                      } else {
                        handleSubmitExam();
                      }
                    }}
                    className="btn btn-nexus-primary px-4 py-2 rounded-3 fw-bold"
                  >
                    {currentIdx === totalCount - 1 ? 'Finish Exam' : 'Save & Next'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="text-secondary">No questions loaded.</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

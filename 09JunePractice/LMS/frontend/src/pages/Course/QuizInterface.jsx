import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

const DEFAULT_MOCK_QUIZ = {
  id: 'mock-quiz-1',
  title: 'Quiz Assessment',
  durationMinutes: 15,
  questions: [
    {
      id: 'q1',
      questionText: 'What Hook is used to subscribe to side effects in React?',
      options: ['useState', 'useEffect', 'useMemo', 'useContext'],
      correctAnswerIndex: 1
    },
    {
      id: 'q2',
      questionText: 'What is the purpose of Mongoose in MongoDB schemas?',
      options: ['To manage relational indexes', 'To write raw shell commands', 'To provide object-document mapping (ODM)', 'To run clustering queries'],
      correctAnswerIndex: 2
    }
  ]
};

export default function QuizInterface({
  quiz = null,
  onSubmit = null,
  onClose = null,
  courseId = null,
  topicId = null
}) {
  const navigate = useNavigate();
  const params = useParams();

  let progressCtx = null;
  try {
    progressCtx = useProgress();
  } catch (e) {
    // Context missing in tests
  }

  const resolvedTopicId = topicId || params.topicId;
  const resolvedCourseId = courseId || params.courseId;

  const [fetchedQuiz, setFetchedQuiz] = useState(null);

  // Resolve the actual quiz data
  const activeQuiz = useMemo(() => {
    return quiz || fetchedQuiz || DEFAULT_MOCK_QUIZ;
  }, [quiz, fetchedQuiz]);

  const questions = useMemo(() => {
    return activeQuiz.questions || [];
  }, [activeQuiz]);

  // States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // maps question index -> selected option index
  const [timeLeft, setTimeLeft] = useState((activeQuiz.durationMinutes || 15) * 60);
  const [status, setStatus] = useState('taking'); // taking, submitting, completed, timeup
  const [errorMessage, setErrorMessage] = useState('');
  const [resultSummary, setResultSummary] = useState(null);

  // Fetch quiz if not provided as prop
  useEffect(() => {
    if (!quiz && resolvedTopicId) {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`/topics/${resolvedTopicId}/assessment`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setFetchedQuiz(result.data);
            }
          }
        } catch (err) {
          console.error('Failed to fetch assessment:', err);
        }
      };
      fetchQuiz();
    }
  }, [quiz, resolvedTopicId]);

  // Sync timer duration once quiz resolves
  useEffect(() => {
    if (activeQuiz && activeQuiz !== DEFAULT_MOCK_QUIZ) {
      setTimeLeft((activeQuiz.durationMinutes || 15) * 60);
    }
  }, [activeQuiz]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSubmitQuizRef = useRef(null);
  useEffect(() => {
    handleSubmitQuizRef.current = handleSubmitQuiz;
  });

  // Countdown timer effect
  useEffect(() => {
    if (status !== 'taking') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Watch timeLeft to trigger auto-submit when timeup
  useEffect(() => {
    if (status === 'taking' && timeLeft === 0) {
      setStatus('timeup');
      if (handleSubmitQuizRef.current) {
        handleSubmitQuizRef.current(true);
      }
    }
  }, [timeLeft, status]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // SVG dashOffset for circular timer progress
  const timerPercentage = (timeLeft / ((activeQuiz.durationMinutes || 15) * 60)) * 100;
  const dashOffset = 100 - timerPercentage;

  // Option selection
  const handleSelectOption = (optionIndex) => {
    if (status !== 'taking') return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  // Navigations
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Submit Logic
  const handleSubmitQuiz = async (isTimeUp = false) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      if (onSubmit) {
        const submissionAnswers = {};
        questions.forEach((q, idx) => {
          const selectedIdx = answers[idx];
          submissionAnswers[q.id || q._id] = selectedIdx !== undefined ? q.options[selectedIdx] : '';
        });
        await onSubmit(submissionAnswers);
        setStatus('completed');
      } else if (resolvedTopicId) {
        const formattedAnswers = Object.entries(answers).map(([qIdxStr, optIdx]) => {
          const qIdx = parseInt(qIdxStr, 10);
          const question = questions[qIdx];
          return {
            questionId: question.id || question._id,
            selectedOptionIndex: optIdx
          };
        });

        // Fill remaining unanswered questions
        questions.forEach((q) => {
          const hasAnswer = formattedAnswers.some((fa) => fa.questionId === (q.id || q._id));
          if (!hasAnswer) {
            formattedAnswers.push({
              questionId: q.id || q._id,
              selectedOptionIndex: -1
            });
          }
        });

        const response = await fetch(`/topics/${resolvedTopicId}/assessment/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          },
          body: JSON.stringify({ answers: formattedAnswers }),
        });

        if (!response.ok) {
          throw new Error('Assessment evaluation failed');
        }

        const result = await response.json();
        if (result.success) {
          setResultSummary({
            totalQuestions,
            correctCount: Math.round((result.score / 100) * totalQuestions),
            scorePercent: result.score,
            passed: result.passed,
            timeSpent: ((activeQuiz.durationMinutes || 15) * 60) - timeLeft
          });
          setStatus('completed');
          if (progressCtx) {
            progressCtx.refreshEnrolledCourses();
          }
        } else {
          throw new Error(result.message || 'Assessment evaluation failed');
        }
      } else {
        // Standalone flow
        let correctCount = 0;
        questions.forEach((q, idx) => {
          if (answers[idx] === q.correctAnswerIndex) {
            correctCount++;
          }
        });
        const scorePercent = Math.round((correctCount / totalQuestions) * 100);
        const passed = scorePercent >= 70;

        await new Promise((resolve) => setTimeout(resolve, 800));

        setResultSummary({
          totalQuestions,
          correctCount,
          scorePercent,
          passed,
          timeSpent: ((activeQuiz.durationMinutes || 15) * 60) - timeLeft
        });
        setStatus('completed');
      }
    } catch (err) {
      setStatus('taking');
      setErrorMessage(err.message || 'Quiz submission failed. Please try again.');
    }
  };

  const handleExit = () => {
    if (onClose) {
      onClose();
    } else if (resolvedCourseId) {
      navigate(`/course/${resolvedCourseId}`);
    } else {
      navigate(-1);
    }
  };

  const isQuestionAnswered = (index) => {
    return answers[index] !== undefined;
  };

  // Completed view
  if (status === 'completed') {
    const summary = resultSummary || {
      totalQuestions: totalQuestions,
      correctCount: Object.keys(answers).length,
      scorePercent: 100,
      passed: true,
      timeSpent: 60
    };

    return (
      <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100 text-start animate-fade-in">
        <style>{`
          .custom-circle-progress {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            position: relative;
            background: conic-gradient(
              ${summary.passed ? 'var(--success)' : 'var(--error)'} ${summary.scorePercent * 3.6}deg,
              var(--border-light) 0deg
            );
          }
          .custom-circle-progress::after {
            content: "";
            position: absolute;
            width: 102px;
            height: 102px;
            border-radius: 50%;
            background-color: white;
          }
          .custom-circle-text {
            position: relative;
            z-index: 2;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
          }
        `}</style>
        <div className="card-premium text-center p-5" style={{ maxWidth: '500px', width: '100%' }}>
          {summary.passed ? (
            <div className="mb-4">
              <span className="fs-1">🎉</span>
              <h2 className="h4 fw-bold text-success mt-2">Quiz Completed!</h2>
              <p className="text-secondary small">Congratulations! You have successfully passed this assessment.</p>
            </div>
          ) : (
            <div className="mb-4">
              <span className="fs-1">❌</span>
              <h2 className="h4 fw-bold text-danger mt-2">Assessment Failed</h2>
              <p className="text-secondary small">You did not meet the 70% passing threshold for this quiz.</p>
            </div>
          )}

          {/* Circular score badge */}
          <div className="custom-circle-progress">
            <span className="custom-circle-text">{summary.scorePercent}%</span>
          </div>

          <div className="row g-3 py-3 border-top border-bottom mb-4 text-start small">
            <div className="col-6">
              <span className="text-muted d-block uppercase tracking-wider" style={{ fontSize: '10px' }}>CORRECT ANSWERS</span>
              <span className="fw-bold text-dark">{summary.correctCount} of {summary.totalQuestions}</span>
            </div>
            <div className="col-6">
              <span className="text-muted d-block uppercase tracking-wider" style={{ fontSize: '10px' }}>TIME SPENT</span>
              <span className="fw-bold text-dark">{formatTime(summary.timeSpent)}</span>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <button 
              onClick={handleExit} 
              className={`btn-premium-primary w-100 py-2.5`}
            >
              {summary.passed ? 'Continue Learning' : 'Try Again'}
            </button>
            <button 
              onClick={handleExit} 
              className="btn-premium-secondary w-100 py-2.5"
            >
              Back to Curriculum
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'submitting') {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-white">
        <div className="spinner-border text-primary" role="status" style={{ width: '3.5rem', height: '3.5rem' }}>
          <span className="visually-hidden">Evaluating...</span>
        </div>
        <h3 className="h5 fw-bold text-dark mt-4">Evaluating Answers</h3>
        <p className="text-secondary small">Please wait while we evaluate your results...</p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100 text-start" style={{ backgroundColor: 'var(--bg-neutral)' }}>
      <style>{`
        .glass-header {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background-color: rgba(255, 255, 255, 0.9);
          height: 64px;
        }
        .option-button {
          width: 100%;
          text-align: left;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .option-button:hover {
          background-color: var(--border-light);
          transform: translateY(-1px);
        }
        .option-button.active {
          border-color: var(--primary);
          background-color: var(--primary-light);
        }
        .custom-timer-circle {
          transform: rotate(-90deg);
          transform-origin: center;
        }
      `}</style>

      {/* Top Bar Navigation */}
      <header className="position-fixed top-0 start-0 w-100 z-3 glass-header border-bottom shadow-sm">
        <div className="container h-100 px-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-5 fw-bold text-primary tracking-tight">EduFlow</span>
            <div className="vr d-none d-sm-block" style={{ height: '24px' }}></div>
            <h1 className="h6 text-dark fw-semibold mb-0 d-none d-sm-block">{activeQuiz.title}</h1>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="d-none d-md-flex flex-column align-items-end" style={{ width: '180px' }}>
              <span className="small text-secondary mb-1">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <div className="progress w-100" style={{ height: '6px', borderRadius: 'var(--radius-full)' }}>
                <div 
                  className="progress-bar bg-primary" 
                  role="progressbar" 
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`, borderRadius: 'var(--radius-full)' }}
                ></div>
              </div>
            </div>

            {/* Circular Countdown Timer */}
            <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <svg className="w-100 h-100 custom-timer-circle" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  stroke={timeLeft < 60 ? 'var(--error)' : 'var(--primary)'} 
                  strokeWidth="3" 
                  strokeDasharray="100" 
                  strokeDashoffset={dashOffset} 
                />
              </svg>
              <span 
                className={`position-absolute fw-bold ${timeLeft < 60 ? 'text-danger' : 'text-primary'}`} 
                style={{ fontSize: '11px' }}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            <button 
              type="button" 
              onClick={handleExit}
              className="btn btn-link p-0 text-secondary"
              aria-label="Exit quiz"
            >
              <span className="material-symbols-outlined text-dark">close</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow-1 w-100 d-flex flex-column align-items-center px-4" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
        <div className="w-100 text-start" style={{ maxWidth: '720px' }}>
          {errorMessage && (
            <div className="alert alert-danger shadow-sm mb-4" role="alert">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="mb-4">
            <span className="badge-premium badge-premium-primary mb-3">REQUIRED ASSESSMENT</span>
            <h2 className="h4 fw-bold text-dark lh-sm mb-0">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Option Buttons */}
          <div className="d-flex flex-column gap-3 mb-4">
            {currentQuestion.options.map((option, idx) => {
              const optionLetter = String.fromCharCode(65 + idx);
              const isSelected = answers[currentQuestionIndex] === idx;

              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`option-button ${isSelected ? 'active' : ''}`}
                >
                  <div className="d-flex align-items-center">
                    <div 
                      className={`d-flex align-items-center justify-content-center rounded-circle fw-bold me-3 flex-shrink-0`}
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                        backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                      }}
                    >
                      {optionLetter}
                    </div>
                    <span className="text-dark small fw-medium">{option}</span>
                  </div>

                  {isSelected && (
                    <span className="material-symbols-outlined text-primary fs-5">check_circle</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Floating Bottom Navigation */}
      <footer className="position-fixed bottom-0 start-0 w-100 bg-white border-top py-3 px-4 z-3 shadow-lg">
        <div className="container d-flex align-items-center justify-content-between" style={{ maxWidth: '720px' }}>
          <button 
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-premium-secondary py-1.5 px-3 border-0 text-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <span className="material-symbols-outlined fs-6 me-1">arrow_back</span>
            Previous
          </button>

          {/* Stepper Indicator */}
          <div className="d-none d-sm-flex align-items-center gap-2">
            {questions.map((_, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = isQuestionAnswered(idx);
              return (
                <div 
                  key={idx}
                  className="rounded-circle"
                  style={{
                    width: isCurrent ? '10px' : '8px',
                    height: isCurrent ? '10px' : '8px',
                    backgroundColor: isCurrent 
                      ? 'var(--primary)' 
                      : isAnswered 
                        ? 'var(--primary-light)' 
                        : 'var(--border-color)',
                    transform: isCurrent ? 'scale(1.2)' : 'none',
                    transition: 'all 0.2s'
                  }}
                />
              );
            })}
          </div>

          <button 
            type="button"
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === undefined}
            className="btn-premium-primary py-2 px-4"
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
            <span className="material-symbols-outlined fs-6 ms-1">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

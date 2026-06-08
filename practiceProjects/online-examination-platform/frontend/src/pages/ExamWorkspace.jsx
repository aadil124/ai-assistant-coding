import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, ProgressBar, Modal, Badge } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, Flag, ShieldCheck, AlertCircle, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import SecureLockdownWrapper from '../components/SecureLockdownWrapper';

const ExamWorkspace = () => {
  const { 
    activeSession, 
    answers, 
    syncAnswer, 
    networkStatus, 
    setNetworkStatus,
    logAnomaly 
  } = useContext(ExamContext);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(2700); // 45 mins
  const [flagged, setFlagged] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Redirect if no session exists
  useEffect(() => {
    if (!activeSession) {
      navigate('/login');
    }
  }, [activeSession, navigate]);

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Network State simulation
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setNetworkStatus]);

  if (!activeSession) return null;

  const currentQuestion = activeSession.questions[currentIdx];
  const totalQuestions = activeSession.questions.length;
  
  const formattedTime = () => {
    const hrs = String(Math.floor(timer / 3600)).padStart(2, '0');
    const mins = String(Math.floor((timer % 3600) / 60)).padStart(2, '0');
    const secs = String(timer % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const handleSelectAnswer = (value) => {
    syncAnswer(currentQuestion.id, value);
  };

  const handleToggleFlag = () => {
    setFlagged(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }));
  };

  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.floor((answeredCount / totalQuestions) * 100);
  };

  const getQuestionStatus = (idx) => {
    const q = activeSession.questions[idx];
    if (idx === currentIdx) return 'active';
    if (flagged[q.id]) return 'flagged';
    if (answers[q.id]) return 'answered';
    return 'unanswered';
  };

  const handleSubmitExam = () => {
    setShowSubmitModal(false);
    navigate('/exams/sess_882a-bc923/results');
  };

  return (
    <SecureLockdownWrapper>
      <div className="vh-100 d-flex flex-column bg-light overflow-hidden">
        {/* Transactional Header */}
        <header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between z-2">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary-subtle p-2 rounded">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="h6 fw-bold text-dark mb-0">{activeSession.examTitle}</h1>
              <span className="small text-secondary">Candidate ID: SE-99284-K</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-4">
            {/* Timer Checkpoint warnings (UIC-004) */}
            <div className={`d-flex align-items-center gap-2 px-3 py-2 rounded-3 border fw-semibold ${
              timer < 300 
                ? 'bg-danger-subtle text-danger border-danger-subtle pulse-red-border' 
                : 'bg-light text-dark border-light-subtle'
            }`}>
              <span className="material-symbols-outlined small">timer</span>
              <span className="font-monospace h5 mb-0">{formattedTime()}</span>
            </div>

            <div className="d-flex flex-column align-items-end gap-1" style={{ width: 180 }}>
              <div className="d-flex justify-content-between w-100 small text-secondary">
                <span>Q: {currentIdx + 1}/{totalQuestions}</span>
                <span>{calculateProgress()}% Complete</span>
              </div>
              <ProgressBar now={calculateProgress()} className="w-100" style={{ height: 6 }} />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="d-flex flex-grow-1 overflow-hidden position-relative">
          {/* Collapsible Sidebar */}
          {sidebarOpen && (
            <aside className="bg-white border-end d-flex flex-column p-4 transition-all" style={{ width: 280 }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="small fw-semibold text-uppercase tracking-wider text-secondary">Exam Overview</span>
                <Button variant="link" className="p-0 text-secondary" onClick={() => setSidebarOpen(false)}>
                  Collapse
                </Button>
              </div>
              <div className="row g-2 overflow-y-auto custom-scrollbar flex-grow-1 pr-2 align-content-start">
                {activeSession.questions.map((q, idx) => {
                  const status = getQuestionStatus(idx);
                  let btnVariant = 'outline-secondary';
                  let styleClass = '';
                  
                  if (status === 'active') {
                    btnVariant = 'primary';
                    styleClass = 'ring-2 ring-primary-subtle ring-offset-2';
                  } else if (status === 'answered') {
                    btnVariant = 'secondary';
                    styleClass = 'bg-secondary-subtle border-0 text-dark';
                  } else if (status === 'flagged') {
                    btnVariant = 'warning';
                    styleClass = 'bg-warning-subtle text-dark border border-warning';
                  }

                  return (
                    <div className="col-3" key={q.id}>
                      <Button 
                        variant={btnVariant} 
                        className={`w-100 py-2 ${styleClass}`}
                        onClick={() => setCurrentIdx(idx)}
                      >
                        {idx + 1}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}

          {!sidebarOpen && (
            <Button 
              variant="white" 
              className="position-absolute start-0 top-0 mt-3 ms-3 border shadow-sm z-3" 
              onClick={() => setSidebarOpen(true)}
            >
              Expand Panel
            </Button>
          )}

          {/* Question display view */}
          <section className="flex-grow-1 overflow-y-auto bg-white p-5 d-flex justify-content-center">
            <div className="max-w-3xl w-100">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Badge bg="secondary" className="px-2 py-1 text-uppercase">{currentQuestion.section}</Badge>
                <span className="text-secondary small">/ Question {currentIdx + 1}</span>
              </div>

              <article className="mb-5">
                <h2 className="h4 fw-bold text-dark leading-snug mb-3">
                  {currentQuestion.body}
                </h2>

                {currentQuestion.type === 'mcq' && (
                  <div className="d-flex flex-column gap-3 mt-4">
                    {currentQuestion.options.map((opt) => (
                      <label 
                        key={opt.id}
                        className={`d-flex align-items-start gap-3 p-3 border rounded-3 cursor-pointer transition-all ${
                          answers[currentQuestion.id] === opt.id 
                            ? 'border-primary bg-primary-subtle border-2' 
                            : 'border-light-subtle hover:bg-light'
                        }`}
                      >
                        <Form.Check 
                          type="radio" 
                          name={currentQuestion.id}
                          checked={answers[currentQuestion.id] === opt.id}
                          onChange={() => handleSelectAnswer(opt.id)}
                          className="mt-1"
                        />
                        <div>
                          <span className="fw-semibold text-dark d-block">{opt.text}</span>
                          <span className="small text-secondary">{opt.subtext}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'essay' && (
                  <Form.Group className="mt-4" controlId="essayText">
                    <Form.Control 
                      as="textarea" 
                      rows={8}
                      placeholder="Write your detailed essay answer here..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      className="rounded-3"
                    />
                    <div className="d-flex justify-content-between mt-2 small text-secondary">
                      <span>Min 30 characters required for manual review</span>
                      <span>Word count: {((answers[currentQuestion.id] || '').trim().split(/\s+/).filter(Boolean)).length}</span>
                    </div>
                  </Form.Group>
                )}
              </article>
            </div>
          </section>
        </div>

        {/* Footer controls */}
        <footer className="bg-white border-top py-3 px-4 d-flex align-items-center justify-content-between z-2">
          <div className="d-flex align-items-center gap-3">
            <Button 
              variant="outline-secondary" 
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="d-flex align-items-center gap-1 rounded-3"
            >
              <ChevronLeft size={16} /> Previous
            </Button>
            <div className="vr bg-secondary opacity-20" style={{ height: 24 }}></div>
            <Button 
              variant={flagged[currentQuestion.id] ? 'warning' : 'outline-secondary'}
              onClick={handleToggleFlag}
              className="d-flex align-items-center gap-2 rounded-3"
            >
              <Flag size={16} /> Flag for Review
            </Button>
          </div>

          <div className="d-flex align-items-center gap-4">
            {/* Sync connection status banner */}
            <div className={`d-flex align-items-center gap-2 small fw-semibold ${
              networkStatus === 'offline' ? 'text-warning' : 'text-secondary opacity-70'
            }`}>
              <Save size={16} className={networkStatus === 'offline' ? 'animate-pulse' : ''} />
              <span>
                {networkStatus === 'offline' 
                  ? 'Offline mode - saving locally to browser' 
                  : 'All changes synced with server'}
              </span>
            </div>

            {currentIdx < totalQuestions - 1 ? (
              <Button 
                variant="primary" 
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="d-flex align-items-center gap-1 rounded-3 px-4"
              >
                Next <ChevronRight size={16} />
              </Button>
            ) : (
              <Button 
                variant="success" 
                onClick={() => setShowSubmitModal(true)}
                className="rounded-3 px-4"
              >
                Submit Examination
              </Button>
            )}
          </div>
        </footer>

        {/* Submit Confirmation Modal */}
        <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Submit Assessment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to finalize and submit your examination answers?</p>
            <Alert variant="warning" className="d-flex gap-2 py-2 mb-0 small">
              <AlertCircle size={18} className="mt-1" />
              <span>You cannot modify your responses after this action. Unanswered questions will be scored as 0.</span>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleSubmitExam}>
              Confirm and Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </SecureLockdownWrapper>
  );
};

export default ExamWorkspace;

import React, { useContext } from 'react';
import { Container, Card, Button, Alert, ProgressBar } from 'react-bootstrap';
import { Award, CheckCircle, Info, Download, QrCode, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';

const ResultsView = () => {
  const { activeSession, answers, logout } = useContext(ExamContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <Container className="max-w-md">
        <Card className="border shadow-sm p-4 rounded-4 bg-white text-center">
          <Card.Body>
            <div className="d-inline-flex bg-success-subtle p-3 rounded-circle mb-3">
              <Award size={40} className="text-success" />
            </div>
            <h2 className="fw-bold text-dark mb-1">Exam Submitted</h2>
            <p className="text-secondary small">Biology Final Examination</p>
            
            {/* Objective Score card */}
            <div className="p-4 rounded-4 bg-light border border-light-subtle my-4">
              <span className="small text-secondary d-block uppercase tracking-wider mb-2">Objective Questions Score</span>
              <span className="display-5 fw-bold text-primary d-block mb-3">18 / 20</span>
              <ProgressBar now={90} variant="success" className="h-1 mb-2" />
              <span className="small text-success fw-semibold d-block">90% Correct</span>
            </div>

            {/* Pending Descriptive essay grading notification */}
            <Alert variant="warning" className="d-flex gap-2 text-start small mb-4">
              <Info size={18} className="mt-1 flex-shrink-0" />
              <span>
                <strong>Manual Review Awaiting:</strong> Descriptive essay responses are double-blinded and currently queued for Examiner grading. Final certificate will generate upon completion.
              </span>
            </Alert>

            {/* Certificates Preview and Download links */}
            <div className="d-flex flex-column gap-2 mb-4">
              <Button 
                variant="outline-primary"
                onClick={() => navigate('/verify/cert_772a-99cd3')} 
                className="w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              >
                <QrCode size={18} /> Verify Mock Certificate
              </Button>
            </div>

            <Button variant="outline-secondary" className="w-100 py-2 rounded-3" onClick={handleLogout}>
              <LogOut size={16} className="me-2" /> Log Out
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResultsView;

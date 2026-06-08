import React, { useState, useContext } from 'react';
import { Container, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Camera, User, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';

const BiometricVerify = () => {
  const { startExamSession } = useContext(ExamContext);
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, scanning, verified, failed
  const navigate = useNavigate();

  const handleSelfieCapture = () => {
    setSelfieCaptured(true);
  };

  const handleIdUpload = (e) => {
    if (e.target.files.length > 0) {
      setIdUploaded(true);
    }
  };

  const executeVerification = () => {
    setStatus('scanning');
    
    // Simulate biometric matching delay
    setTimeout(() => {
      // Simulate successful match score >= 85%
      setStatus('verified');
    }, 2500);
  };

  const startExam = async () => {
    await startExamSession('ex_biology_final_uuid');
    navigate('/exams/sess_882a-bc923/workspace');
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <Container className="max-w-md">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Identity Verification</h2>
          <p className="text-secondary small">Compare your live photo against your photo identification document</p>
        </div>

        <Card className="border shadow-sm p-4 rounded-4 bg-white">
          <Card.Body>
            {status === 'pending' && (
              <div className="space-y-4">
                {/* Selfie Step */}
                <div className="p-3 border rounded-3 text-center mb-3">
                  <Camera size={28} className="text-secondary mb-2" />
                  <span className="fw-semibold text-dark d-block small mb-2">Webcam Facial Scan</span>
                  {selfieCaptured ? (
                    <Alert variant="success" className="py-1 small mb-0">Facial scan captured</Alert>
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={handleSelfieCapture}>
                      Capture Selfie
                    </Button>
                  )}
                </div>

                {/* ID Step */}
                <div className="p-3 border rounded-3 text-center mb-4">
                  <FileText size={28} className="text-secondary mb-2" />
                  <span className="fw-semibold text-dark d-block small mb-2">Government Photo ID</span>
                  {idUploaded ? (
                    <Alert variant="success" className="py-1 small mb-0">Photo ID uploaded</Alert>
                  ) : (
                    <Form.Group controlId="idFile">
                      <Form.Control 
                        type="file" 
                        size="sm" 
                        onChange={handleIdUpload}
                        accept="image/*"
                      />
                    </Form.Group>
                  )}
                </div>

                <Button 
                  onClick={executeVerification}
                  disabled={!selfieCaptured || !idUploaded}
                  variant="primary" 
                  className="w-100 py-2 rounded-3 shadow-sm"
                >
                  Verify Biometrics
                </Button>
              </div>
            )}

            {status === 'scanning' && (
              <div className="text-center py-4">
                <Spinner animation="border" className="text-primary mb-3" />
                <span className="d-block fw-semibold text-dark small">Comparing biometric vectors...</span>
                <span className="d-block text-slate-500 x-small mt-1">Verifying likeness matching score (threshold &gt;= 85%)</span>
              </div>
            )}

            {status === 'verified' && (
              <div className="text-center py-3">
                <CheckCircle2 size={56} className="text-success mb-3" />
                <h4 className="fw-bold text-success">Verification Successful</h4>
                <p className="text-secondary small mb-4">
                  Biometric likeness score: <strong className="text-success">92.4% match</strong>. 
                  Your identity has been confirmed.
                </p>
                <Button variant="success" className="w-100 py-2 rounded-3" onClick={startExam}>
                  Launch Secure Exam Environment
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default BiometricVerify;

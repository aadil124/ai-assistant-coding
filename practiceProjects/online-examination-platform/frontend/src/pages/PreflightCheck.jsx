import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, ProgressBar, Spinner } from 'react-bootstrap';
import { Video, Mic, Globe, Monitor, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PreflightCheck = () => {
  const [camera, setCamera] = useState('pending'); // pending, checking, passed, failed
  const [mic, setMic] = useState('pending');
  const [network, setNetwork] = useState('pending');
  const [screen, setScreen] = useState('pending');
  
  const [micLevel, setMicLevel] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const runDiagnostics = () => {
    setIsChecking(true);
    setCamera('checking');
    setMic('checking');
    setNetwork('checking');
    setScreen('checking');

    // Simulate Camera check
    setTimeout(() => {
      setCamera('passed');
    }, 1000);

    // Simulate Mic check with volume pulses
    let pulseCount = 0;
    const micInterval = setInterval(() => {
      setMicLevel(Math.floor(Math.random() * 80) + 10);
      pulseCount++;
      if (pulseCount >= 8) {
        clearInterval(micInterval);
        setMic('passed');
        setMicLevel(0);
      }
    }, 250);

    // Simulate Bandwidth speed check
    setTimeout(() => {
      setUploadSpeed(1.82); // MBps
      setNetwork('passed');
    }, 2500);

    // Simulate Screen size check
    setTimeout(() => {
      const isOk = window.screen.width >= 1024 && window.screen.height >= 768;
      setScreen(isOk ? 'passed' : 'failed');
      setIsChecking(false);
    }, 3000);
  };

  const getStatusIcon = (status) => {
    if (status === 'checking') return <Spinner animation="border" size="sm" className="text-primary" />;
    if (status === 'passed') return <CheckCircle className="text-success" size={20} />;
    if (status === 'failed') return <XCircle className="text-danger" size={20} />;
    return <div className="border rounded-circle bg-light" style={{ width: 20, height: 20 }}></div>;
  };

  const allPassed = camera === 'passed' && mic === 'passed' && network === 'passed' && screen === 'passed';

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <Container className="max-w-md">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">System Readiness Check</h2>
          <p className="text-secondary small">Verify your device permissions and network speed before launching the exam</p>
        </div>

        <Card className="border shadow-sm rounded-4 p-3 bg-white">
          <Card.Body>
            <ListGroup variant="flush" className="mb-4">
              {/* Camera */}
              <ListGroup.Item className="d-flex align-items-center justify-content-between py-3 border-light">
                <div className="d-flex align-items-center gap-3">
                  <Video size={20} className="text-secondary" />
                  <div>
                    <span className="fw-semibold text-dark d-block small">Webcam Access</span>
                    <span className="text-slate-500 x-small">Capture video feed for proctoring</span>
                  </div>
                </div>
                {getStatusIcon(camera)}
              </ListGroup.Item>

              {/* Microphone */}
              <ListGroup.Item className="d-flex flex-column py-3 border-light">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex align-items-center gap-3">
                    <Mic size={20} className="text-secondary" />
                    <div>
                      <span className="fw-semibold text-dark d-block small">Microphone Input</span>
                      <span className="text-slate-500 x-small">Monitor background audio anomalies</span>
                    </div>
                  </div>
                  {getStatusIcon(mic)}
                </div>
                {mic === 'checking' && (
                  <div className="mt-2 w-100">
                    <ProgressBar now={micLevel} variant="success" className="h-1" />
                  </div>
                )}
              </ListGroup.Item>

              {/* Network Speed */}
              <ListGroup.Item className="d-flex align-items-center justify-content-between py-3 border-light">
                <div className="d-flex align-items-center gap-3">
                  <Globe size={20} className="text-secondary" />
                  <div>
                    <span className="fw-semibold text-dark d-block small">Bandwidth check</span>
                    <span className="text-slate-500 x-small">
                      {network === 'passed' ? `Speed: ${uploadSpeed} Mbps (Passed)` : 'Upload speed check (min 1 Mbps)'}
                    </span>
                  </div>
                </div>
                {getStatusIcon(network)}
              </ListGroup.Item>

              {/* Screen Resolution */}
              <ListGroup.Item className="d-flex align-items-center justify-content-between py-3 border-light">
                <div className="d-flex align-items-center gap-3">
                  <Monitor size={20} className="text-secondary" />
                  <div>
                    <span className="fw-semibold text-dark d-block small">Screen Resolution</span>
                    <span className="text-slate-500 x-small">Check screen dimensions (min 1024x768)</span>
                  </div>
                </div>
                {getStatusIcon(screen)}
              </ListGroup.Item>
            </ListGroup>

            <div className="d-flex flex-column gap-2">
              <Button 
                onClick={runDiagnostics} 
                disabled={isChecking}
                variant="primary" 
                className="w-100 py-2 rounded-3"
              >
                {isChecking ? 'Checking System...' : 'Run Diagnostics'}
              </Button>
              <Button 
                onClick={() => navigate('/exams/ex_biology_final_uuid/identification')}
                disabled={!allPassed}
                variant="success" 
                className="w-100 py-2 rounded-3"
              >
                Proceed to Identification
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PreflightCheck;

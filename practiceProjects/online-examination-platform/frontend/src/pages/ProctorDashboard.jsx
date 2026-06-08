import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Offcanvas, Form, Alert } from 'react-bootstrap';
import { Shield, Users, AlertTriangle, Grid, Plus, Send, Video, Monitor, X, Play } from 'lucide-react';
import { ExamContext } from '../context/ExamContext';
import { useNavigate } from 'react-router-dom';

const ProctorDashboard = () => {
  const { proctorCandidates, proctorWarn, proctorTerminate, logout } = useContext(ExamContext);
  const [activeCandidate, setActiveCandidate] = useState(null);
  const [warningText, setWarningText] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  const handleSelectCandidate = (cand) => {
    setActiveCandidate(cand);
    setShowDrawer(true);
  };

  const handleSendWarning = () => {
    if (!warningText.trim() || !activeCandidate) return;
    proctorWarn(activeCandidate.session_id, warningText);
    
    // Update local drawer state
    setActiveCandidate(prev => ({
      ...prev,
      chats: [...prev.chats, { sender: 'proctor', text: warningText, timestamp: new Date().toLocaleTimeString() }]
    }));
    setWarningText('');
  };

  const handleTerminate = () => {
    if (!activeCandidate) return;
    proctorTerminate(activeCandidate.session_id);
    
    // Update local drawer state
    setActiveCandidate(prev => ({ ...prev, status: 'invalidated' }));
    alert(`Session for ${activeCandidate.candidate_name} has been terminated.`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex flex-column text-white" style={{ backgroundColor: '#0F172A' }}>
      {/* Top Header */}
      <header className="py-3 px-4 bg-slate-900 border-bottom border-secondary border-opacity-20 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <Shield size={24} className="text-primary" />
          <h1 className="h5 fw-bold mb-0">SecureExam Proctor Mission Control</h1>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button variant="outline-light" size="sm" onClick={handleLogout}>Log Out</Button>
          <div className="w-8 h-8 rounded-circle bg-secondary overflow-hidden">
            <div className="bg-primary text-white w-100 h-100 d-flex align-items-center justify-content-center fw-bold">PD</div>
          </div>
        </div>
      </header>

      {/* Main Panel */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="d-none d-md-flex flex-column p-4 bg-slate-900 border-end border-secondary border-opacity-20" style={{ width: 260 }}>
          <div className="mb-4">
            <h2 className="h5 fw-bold text-primary mb-1">Mission Control</h2>
            <span className="small text-secondary">Enterprise Dashboard</span>
          </div>
          <div className="d-flex flex-column gap-2 flex-grow-1">
            <Button variant="primary" className="text-start py-2 d-flex align-items-center gap-2">
              <Grid size={18} /> Grid View
            </Button>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-grow-1 d-flex flex-column overflow-hidden p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-4 flex-wrap">
              <div>
                <span className="small text-secondary d-block">Proctoring Status</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="w-2 h-2 rounded-circle bg-emerald-500 animate-pulse"></span>
                  <span className="fw-semibold text-emerald-500">Live Active</span>
                </div>
              </div>
              <div>
                <span className="small text-secondary d-block">Active Candidates</span>
                <span className="fw-bold h5 mb-0">
                  {proctorCandidates.filter(c => c.status === 'active').length} Active
                </span>
              </div>
            </div>
            <Button variant="primary" className="d-flex align-items-center gap-2">
              <Plus size={18} /> New Session
            </Button>
          </div>

          {/* WebRTC Video Grid */}
          <div className="overflow-y-auto custom-scrollbar flex-grow-1">
            <Row className="g-3">
              {proctorCandidates.map((cand) => (
                <Col key={cand.session_id} md={6} lg={4}>
                  <Card 
                    className={`bg-slate-800 border-0 rounded-4 overflow-hidden cursor-pointer ${
                      cand.status === 'invalidated' 
                        ? 'border border-danger' 
                        : cand.suspicion_score > 50 
                          ? 'border border-warning pulse-red-border' 
                          : 'border border-transparent'
                    }`}
                    onClick={() => handleSelectCandidate(cand)}
                  >
                    <div className="position-relative aspect-video bg-black d-flex align-items-center justify-content-center">
                      <Video size={48} className="text-secondary opacity-30" />
                      {cand.status === 'invalidated' && (
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-70 d-flex align-items-center justify-content-center">
                          <Badge bg="danger" className="px-3 py-2 text-uppercase">Invalidated</Badge>
                        </div>
                      )}
                      {cand.suspicion_score > 50 && cand.status === 'active' && (
                        <Badge bg="danger" className="position-absolute top-3 end-3 px-2 py-1 uppercase text-xs">
                          Suspicion: {cand.suspicion_score}%
                        </Badge>
                      )}
                    </div>
                    <Card.Body className="bg-slate-900 d-flex justify-content-between align-items-center py-3">
                      <div>
                        <Card.Title className="h6 fw-bold mb-0 text-white">{cand.candidate_name}</Card.Title>
                        <span className="small text-secondary">ID: {cand.candidate_id}</span>
                      </div>
                      <div className="d-flex gap-2">
                        <Badge bg={cand.status === 'active' ? 'success' : 'danger'}>
                          {cand.status}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </main>
      </div>

      {/* Drawer */}
      <Offcanvas 
        show={showDrawer} 
        onHide={() => setShowDrawer(false)} 
        placement="end" 
        className="bg-slate-900 text-white"
        style={{ width: 450 }}
      >
        <Offcanvas.Header closeButton className="btn-close-white border-bottom border-secondary border-opacity-20">
          <Offcanvas.Title>
            <h2 className="h5 fw-bold text-white mb-0">{activeCandidate?.candidate_name}</h2>
            <span className="small text-secondary">Candidate detailed log & interventions</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column gap-4">
          {activeCandidate && (
            <>
              {/* Suspicion Indicator */}
              <div className="p-3 bg-slate-800 rounded-3 border border-secondary border-opacity-20 d-flex justify-content-between align-items-center">
                <span className="small fw-semibold text-secondary uppercase">Suspicion Rating</span>
                <span className={`h2 mb-0 fw-bold ${
                  activeCandidate.suspicion_score > 50 ? 'text-danger' : 'text-success'
                }`}>
                  {activeCandidate.suspicion_score}%
                </span>
              </div>

              {/* Status details */}
              <div>
                <h5 className="small text-secondary uppercase fw-semibold mb-2">Workspace Controls</h5>
                <Row className="g-2">
                  <Col>
                    <Button variant="outline-light" className="w-100 py-3 d-flex flex-column align-items-center gap-1">
                      <Play size={18} />
                      <span className="small">WebRTC Audio</span>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-light" className="w-100 py-3 d-flex flex-column align-items-center gap-1">
                      <Monitor size={18} />
                      <span className="small">Screen Feed</span>
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* Anomaly list */}
              <div className="flex-grow-1 overflow-y-auto custom-scrollbar pr-2">
                <h5 className="small text-secondary uppercase fw-semibold mb-3">Incident Timeline</h5>
                {activeCandidate.anomalies.length === 0 ? (
                  <p className="text-secondary small">No behavioral anomalies flagged.</p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {activeCandidate.anomalies.map((anom, idx) => (
                      <div key={idx} className="d-flex gap-3">
                        <div className="w-1 bg-danger rounded-pill"></div>
                        <div>
                          <p className="small fw-bold mb-0 text-white">{anom.type}</p>
                          <p className="small text-secondary mb-0">{anom.timestamp} - {anom.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Intercom Chat */}
              <div className="mt-auto border-top border-secondary border-opacity-20 pt-3">
                <h5 className="small text-secondary uppercase fw-semibold mb-2">Warning Intercom</h5>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="text" 
                    placeholder="Type warning message..." 
                    value={warningText} 
                    onChange={(e) => setWarningText(e.target.value)}
                    className="bg-slate-800 border-0 text-white rounded-3 py-2"
                  />
                  <Button variant="primary" className="px-3" onClick={handleSendWarning}>
                    <Send size={18} />
                  </Button>
                </div>
              </div>

              {/* Lockdown Actions */}
              <div className="d-flex flex-column gap-2 mt-2">
                <Button 
                  variant="danger" 
                  disabled={activeCandidate.status === 'invalidated'}
                  onClick={handleTerminate}
                  className="w-100 py-3 fw-bold rounded-3 flex items-center justify-center gap-2"
                >
                  Terminate Exam Session
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProctorDashboard;

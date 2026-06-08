import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, ListGroup, Table, Badge } from 'react-bootstrap';
import { BookOpen, Settings, CheckSquare, Plus, Save, AlertTriangle, UserCheck, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';

const ExaminerPortal = () => {
  const { logout } = useContext(ExamContext);
  const navigate = useNavigate();

  // Question Creator State
  const [qBody, setQBody] = useState('');
  const [qType, setQType] = useState('mcq');
  const [qOptions, setQOptions] = useState(['', '']);
  const [qCorrect, setQCorrect] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  // Exam Builder State
  const [examTitle, setExamTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [poolTag, setPoolTag] = useState('');
  const [poolCount, setPoolCount] = useState('5');
  const [examConfigList, setExamConfigList] = useState([]);

  // Essay Grading State
  const [gradingQueue, setGradingQueue] = useState([
    {
      id: 'qi_essay_1',
      question_body: 'Describe the core concepts of cellular respiration, detailing glycolysis, the Krebs cycle, and electron transport chains.',
      candidate_answer_text: 'Cellular respiration is the multi-step metabolic process where glucose is converted into ATP. In glycolysis, which occurs in the cytoplasm, glucose is split into two molecules of pyruvate, generating a net of 2 ATP and 2 NADH. Pyruvate then enters the mitochondria, converting to Acetyl-CoA. In the Krebs cycle, this enters and is oxidized, releasing CO2, and yielding NADH, FADH2, and 2 ATP. Finally, the electron transport chain in the inner membrane uses these electron carriers to drive oxidative phosphorylation, creating approximately 28 to 32 ATP.',
      max_points: 20
    }
  ]);
  const [assignedScore, setAssignedScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAddOption = () => {
    setQOptions([...qOptions, '']);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!qBody.trim()) return;

    const newQ = {
      id: `q_${Date.now()}`,
      body: qBody,
      type: qType,
      options: qType === 'mcq' ? qOptions.map((text, idx) => ({ text, is_correct: idx === qCorrect })) : [],
      created_at: new Date().toLocaleDateString()
    };

    setQuestionsList([newQ, ...questionsList]);
    setQBody('');
    setQOptions(['', '']);
    alert('Question added to Central Question Bank.');
  };

  const handleSaveExam = (e) => {
    e.preventDefault();
    if (!examTitle.trim()) return;

    const newExam = {
      id: `ex_${Date.now()}`,
      title: examTitle,
      duration_minutes: duration,
      poolTag,
      poolCount
    };

    setExamConfigList([newExam, ...examConfigList]);
    setExamTitle('');
    alert('Exam configuration published.');
  };

  const handleGradingSubmit = (e) => {
    e.preventDefault();
    if (!assignedScore || !feedback) return;
    
    // Check validation feedback length rule (VAL-12.2)
    if (parseInt(assignedScore) < 10 && feedback.trim().length < 30) {
      alert('Validation Error: Feedback comments must be at least 30 characters when awarding less than 50% points.');
      return;
    }

    setGradingQueue(prev => prev.filter(item => item.id !== 'qi_essay_1'));
    setAssignedScore('');
    setFeedback('');
    alert('Double-Blind grading score submitted.');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <Navbar bg="white" expand="lg" className="border-bottom py-3 mb-4">
        <Container>
          <Navbar.Brand className="fw-bold text-primary">
            SecureExam Examiner Console
          </Navbar.Brand>
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
            Log Out
          </Button>
        </Container>
      </Navbar>

      <Container className="pb-5">
        <Tabs defaultActiveKey="authoring" id="examiner-tabs" className="mb-4 bg-white p-2 rounded border border-light-subtle">
          
          {/* Tab 1: Question Bank Authoring */}
          <Tab eventKey="authoring" title={<span><BookOpen size={16} className="me-2" />Question Bank</span>}>
            <Row>
              <Col md={6}>
                <Card className="border shadow-sm p-4 rounded-4 bg-white mb-4">
                  <h4 className="fw-bold text-dark mb-3">Add New Question</h4>
                  <Form onSubmit={handleSaveQuestion}>
                    <Form.Group className="mb-3" controlId="qTypeSelect">
                      <Form.Label className="small fw-semibold text-secondary">Question Type</Form.Label>
                      <Form.Select value={qType} onChange={(e) => setQType(e.target.value)}>
                        <option value="mcq">Multiple Choice (MCQ)</option>
                        <option value="essay">Free-text Essay</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="qBodyText">
                      <Form.Label className="small fw-semibold text-secondary">Question Body (Markdown/LaTeX formulas supported)</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={qBody}
                        placeholder="Given $2x + 5 = 15$, solve for $x$."
                        onChange={(e) => setQBody(e.target.value)}
                      />
                    </Form.Group>

                    {qType === 'mcq' && (
                      <div className="mb-4">
                        <Form.Label className="small fw-semibold text-secondary d-flex justify-content-between align-items-center">
                          <span>Options</span>
                          <Button variant="link" className="p-0 text-primary small" onClick={handleAddOption}>
                            + Add Option
                          </Button>
                        </Form.Label>
                        {qOptions.map((opt, idx) => (
                          <div key={idx} className="d-flex gap-2 align-items-center mb-2">
                            <Form.Check 
                              type="radio" 
                              name="correctOption"
                              checked={qCorrect === idx}
                              onChange={() => setQCorrect(idx)}
                            />
                            <Form.Control 
                              type="text" 
                              placeholder={`Option ${idx + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...qOptions];
                                newOpts[idx] = e.target.value;
                                setQOptions(newOpts);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Button type="submit" variant="primary" className="w-100 py-2 rounded-3 shadow-sm">
                      <Save size={16} className="me-2" /> Save to Question Bank
                    </Button>
                  </Form>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card className="border shadow-sm p-4 rounded-4 bg-white">
                  <h4 className="fw-bold text-dark mb-3">Questions Repository</h4>
                  {questionsList.length === 0 ? (
                    <p className="text-secondary small">No custom questions created yet. Seeded bank active.</p>
                  ) : (
                    <ListGroup variant="flush">
                      {questionsList.map((q) => (
                        <ListGroup.Item key={q.id} className="py-3 px-0 border-light">
                          <Badge bg="secondary" className="mb-2 text-uppercase">{q.type}</Badge>
                          <p className="fw-semibold text-dark mb-1 small">{q.body}</p>
                          <span className="text-slate-500 x-small">Added on: {q.created_at}</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Tab 2: Exam Config Builder */}
          <Tab eventKey="exams" title={<span><Settings size={16} className="me-2" />Exam Builder</span>}>
            <Row>
              <Col md={6}>
                <Card className="border shadow-sm p-4 rounded-4 bg-white mb-4">
                  <h4 className="fw-bold text-dark mb-3">Create Exam Configuration</h4>
                  <Form onSubmit={handleSaveExam}>
                    <Form.Group className="mb-3" controlId="examTitleInput">
                      <Form.Label className="small fw-semibold text-secondary">Exam Title</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Advanced Systems Architecture"
                        value={examTitle}
                        onChange={(e) => setExamTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="examDurationInput">
                      <Form.Label className="small fw-semibold text-secondary">Duration (Minutes)</Form.Label>
                      <Form.Control 
                        type="number" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </Form.Group>

                    <Row className="mb-4">
                      <Col>
                        <Form.Group controlId="poolTagInput">
                          <Form.Label className="small fw-semibold text-secondary">Dynamic Pool Tag</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="System-Design-1"
                            value={poolTag}
                            onChange={(e) => setPoolTag(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="poolCountInput">
                          <Form.Label className="small fw-semibold text-secondary">Question Count</Form.Label>
                          <Form.Control 
                            type="number" 
                            value={poolCount}
                            onChange={(e) => setPoolCount(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button type="submit" variant="primary" className="w-100 py-2 rounded-3 shadow-sm">
                      Publish Exam Configuration
                    </Button>
                  </Form>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="border shadow-sm p-4 rounded-4 bg-white">
                  <h4 className="fw-bold text-dark mb-3">Active Configurations</h4>
                  {examConfigList.length === 0 ? (
                    <p className="text-secondary small">No custom exams published yet. Standard mock pools active.</p>
                  ) : (
                    <Table responsive hover className="small text-dark">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Duration</th>
                          <th>Pool Rule</th>
                        </tr>
                      </thead>
                      <tbody>
                        {examConfigList.map((ex) => (
                          <tr key={ex.id}>
                            <td className="fw-semibold">{ex.title}</td>
                            <td>{ex.duration_minutes} Mins</td>
                            <td>Pull {ex.poolCount} questions from '{ex.poolTag}'</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Tab 3: Descriptive Grading Portal */}
          <Tab eventKey="grading" title={<span><CheckSquare size={16} className="me-2" />Grading Queue</span>}>
            <Card className="border shadow-sm p-4 rounded-4 bg-white">
              <h4 className="fw-bold text-dark mb-3">Double-Blind Essay Evaluation Queue</h4>
              {gradingQueue.length === 0 ? (
                <Alert variant="success" className="py-2 text-center small mb-0">
                  <UserCheck size={20} className="me-2" /> Evaluation queue is empty. All submissions graded.
                </Alert>
              ) : (
                <div className="space-y-4">
                  {gradingQueue.map((item) => (
                    <div key={item.id} className="p-3 border rounded-3 bg-light text-dark mb-3">
                      <Badge bg="secondary" className="mb-2">Anonymized Candidate Submission</Badge>
                      <h5 className="h6 fw-bold mb-3">{item.question_body}</h5>
                      <div className="bg-white p-3 rounded border border-light-subtle font-body-md text-secondary mb-4 leading-relaxed">
                        {item.candidate_answer_text}
                      </div>

                      <Form onSubmit={handleGradingSubmit} className="max-w-md">
                        <Form.Group className="mb-3" controlId="scoreInput">
                          <Form.Label className="small fw-semibold text-secondary">Assigned Score (Max {item.max_points} points)</Form.Label>
                          <Form.Control 
                            type="number" 
                            placeholder="e.g. 18"
                            max={item.max_points}
                            value={assignedScore}
                            onChange={(e) => setAssignedScore(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="feedbackInput">
                          <Form.Label className="small fw-semibold text-secondary">Evaluation Feedback Notes</Form.Label>
                          <Form.Control 
                            as="textarea"
                            rows={3}
                            placeholder="Write constructive scoring justification feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                          />
                        </Form.Group>

                        <Button type="submit" variant="success" className="px-4 py-2 rounded-3">
                          Submit Final Score
                        </Button>
                      </Form>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default ExaminerPortal;

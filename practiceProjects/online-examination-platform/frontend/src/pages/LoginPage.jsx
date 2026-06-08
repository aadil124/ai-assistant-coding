import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';

const LoginPage = () => {
  const { loginUser } = useContext(ExamContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Candidate');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    // Authenticate and Route
    loginUser(username, role);
    
    if (role === 'Candidate') {
      navigate('/exams/ex_biology_final_uuid/readiness'); // Pre-flight check
    } else if (role === 'Proctor') {
      navigate('/proctor/dashboard');
    } else if (role === 'Examiner') {
      navigate('/examiner/dashboard');
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <Container className="max-w-md">
        <div className="text-center mb-4">
          <div className="d-inline-flex bg-primary-subtle p-3 rounded-circle mb-3">
            <Shield size={32} className="text-primary" />
          </div>
          <h2 className="fw-bold text-dark">SecureExam Sign In</h2>
          <p className="text-secondary small">Access your enterprise assessment workspace</p>
        </div>

        <Card className="border shadow-sm p-4 rounded-4 bg-white">
          <Card.Body>
            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="roleSelect">
                <Form.Label className="small fw-semibold text-secondary">Sign In As</Form.Label>
                <Form.Select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="rounded-3"
                >
                  <option value="Candidate">Candidate (Test Taker)</option>
                  <option value="Proctor">Proctor (Invigilator)</option>
                  <option value="Examiner">Examiner (Course Creator/Grader)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="usernameInput">
                <Form.Label className="small fw-semibold text-secondary">Username / Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="passwordInput">
                <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 py-2 rounded-3 shadow-sm">
                Sign In to Workspace
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;

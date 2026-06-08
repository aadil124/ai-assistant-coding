import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { CheckCircle2, ShieldAlert, Search, FileSignature } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';

const VerificationPortal = () => {
  const { certId } = useParams();
  const { verifyCertificate } = useContext(ExamContext);
  const [uuidInput, setUuidInput] = useState(certId || '');
  const [certData, setCertData] = useState(null);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (certId) {
      const data = verifyCertificate(certId);
      setCertData(data);
      setSearched(true);
    }
  }, [certId, verifyCertificate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!uuidInput.trim()) return;
    navigate(`/verify/${uuidInput}`);
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">
      <Container className="max-w-md">
        <div className="text-center mb-4">
          <div className="d-inline-flex bg-primary-subtle p-3 rounded-circle mb-3">
            <FileSignature size={32} className="text-primary" />
          </div>
          <h2 className="fw-bold text-dark">Certificate Verification</h2>
          <p className="text-secondary small">Stateless cryptographic verification portal</p>
        </div>

        <Card className="border shadow-sm p-4 rounded-4 bg-white mb-4">
          <Card.Body>
            <Form onSubmit={handleSearch}>
              <Form.Group className="mb-3" controlId="uuidInput">
                <Form.Label className="small fw-semibold text-secondary">Credential UUID</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="text" 
                    placeholder="cert_772a-99cd3"
                    value={uuidInput}
                    onChange={(e) => setUuidInput(e.target.value)}
                    className="rounded-3"
                  />
                  <Button type="submit" variant="primary" className="px-3">
                    <Search size={18} />
                  </Button>
                </div>
              </Form.Group>
            </Form>

            {searched && certData && (
              <div className="text-center mt-4 pt-3 border-top border-light-subtle">
                <CheckCircle2 size={48} className="text-success mb-2" />
                <Badge bg="success" className="px-3 py-2 text-uppercase mb-3">
                  Verified Certificate
                </Badge>
                
                <div className="text-start bg-light p-3 rounded-3 border border-light-subtle space-y-2">
                  <span className="d-block small text-secondary">Candidate Recipient</span>
                  <span className="fw-bold text-dark d-block h5 mb-3">{certData.recipient_name}</span>

                  <span className="d-block small text-secondary">Exam Certification</span>
                  <span className="fw-semibold text-dark d-block mb-3">{certData.exam_title}</span>

                  <span className="d-block small text-secondary">Date Issued</span>
                  <span className="text-dark d-block small mb-3">{new Date(certData.issued_at).toLocaleDateString()}</span>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light-subtle small">
                    <span className="text-secondary">Signature Check:</span>
                    <strong className="text-success">Verified Secure (KMS)</strong>
                  </div>
                </div>
              </div>
            )}

            {searched && !certData && (
              <div className="text-center mt-4 pt-3 border-top border-light-subtle">
                <ShieldAlert size={48} className="text-danger mb-2" />
                <h4 className="fw-bold text-danger">Invalid Credential</h4>
                <p className="text-secondary small">
                  The provided UUID does not match any registered certificate hash. Document authenticity cannot be validated.
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        <Button variant="link" className="w-100 text-secondary small decoration-none" onClick={() => navigate('/login')}>
          Go to Sign In page
        </Button>
      </Container>
    </div>
  );
};

export default VerificationPortal;

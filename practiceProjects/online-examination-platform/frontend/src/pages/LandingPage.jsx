import React from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Shield, ArrowRight, Video, Fingerprint, Globe, CloudLightning, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-vh-100 bg-light flex-column d-flex">
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="border-bottom sticky-top py-3">
        <Container>
          <Navbar.Brand className="fw-bold text-primary flex items-center">
            <Shield size={24} className="me-2 text-primary" />
            SecureExam
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto">
              <Nav.Link href="#" className="fw-semibold text-dark">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#solutions">Solutions</Nav.Link>
              <Nav.Link href="#compliance">Compliance</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-2">
              <Link to="/login">
                <Button variant="link" className="text-secondary fw-semibold decoration-none">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" className="shadow-sm">Book a Demo</Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="py-5 text-center bg-white border-bottom position-relative">
          <Container className="py-5">
            <div className="d-inline-flex align-items-center gap-2 bg-primary-subtle text-primary px-3 py-1 rounded-pill mb-4 border border-primary-subtle">
              <span className="small fw-semibold">v4.0 Enterprise Edition Available</span>
            </div>
            <h1 className="display-4 fw-bold text-dark tracking-tight mb-3">
              The Gold Standard for Secure <span className="text-primary">Online Assessments</span>
            </h1>
            <p className="lead text-secondary max-w-2xl mx-auto mb-4">
              Experience the most reliable examination platform trusted by Fortune 500s and elite educational institutions worldwide. Precision proctoring meets effortless candidate experiences.
            </p>
            <div className="d-flex gap-3 justify-content-center mb-5 flex-wrap">
              <Link to="/login">
                <Button variant="primary" size="lg" className="shadow px-4 py-3 flex items-center">
                  Book a Demo <ArrowRight size={18} className="ms-2" />
                </Button>
              </Link>
              <Button variant="outline-secondary" size="lg" className="px-4 py-3">
                View Case Studies
              </Button>
            </div>
          </Container>
        </section>

        {/* Bento Grid / Key Pillars */}
        <section id="features" className="py-5 bg-light">
          <Container className="py-4">
            <div className="text-start mb-5">
              <h2 className="fw-bold h1 text-dark mb-2">Built for Absolute Certainty</h2>
              <p className="text-secondary lead">Our core technology stack is engineered to handle the world's most high-stakes certification flows without compromise.</p>
            </div>
            <Row className="g-4">
              {/* Feature 1: AI Proctoring */}
              <Col md={8}>
                <Card className="h-100 p-4 border border-light-subtle shadow-sm bg-white rounded-4">
                  <Card.Body className="d-flex flex-column flex-md-row gap-4 align-items-center">
                    <div className="flex-grow-1">
                      <Video size={40} className="text-primary mb-3" />
                      <Card.Title className="fw-semibold text-dark h4 mb-2">AI-Augmented Proctoring</Card.Title>
                      <Card.Text className="text-secondary">
                        Real-time behavioral analysis and eye-gaze tracking that flags anomalies without disrupting candidate workspace flow. Co-pilot alerts increase invigilator review speeds by 400%.
                      </Card.Text>
                    </div>
                    <div className="w-100 w-md-50 bg-light rounded-4 overflow-hidden shadow-sm aspect-square d-flex align-items-center justify-content-center">
                      <Cpu size={64} className="text-secondary opacity-30" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 2: ID Biometrics */}
              <Col md={4}>
                <Card className="h-100 p-4 border border-light-subtle shadow-sm bg-white rounded-4">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="bg-primary-subtle p-3 rounded-3 mb-4 d-inline-block w-auto align-self-start">
                      <Fingerprint size={24} className="text-primary" />
                    </div>
                    <div>
                      <Card.Title className="fw-semibold text-dark h4 mb-2">Identity Verification</Card.Title>
                      <Card.Text className="text-secondary small">
                        Multi-factor biometric validation ensuring the right person is taking the right exam, every single time.
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 3: Global Compliance */}
              <Col md={4}>
                <Card className="h-100 p-4 border border-light-subtle shadow-sm bg-white rounded-4">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="bg-primary-subtle p-3 rounded-3 mb-4 d-inline-block w-auto align-self-start">
                      <Globe size={24} className="text-primary" />
                    </div>
                    <div>
                      <Card.Title className="fw-semibold text-dark h4 mb-2">Global Compliance</Card.Title>
                      <Card.Text className="text-secondary small">
                        Data residency localized to your region, ensuring 100% adherence to global privacy laws and GDPR standards.
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Feature 4: Scalable Infra */}
              <Col md={8}>
                <Card className="h-100 p-4 border border-light-subtle shadow-sm bg-white rounded-4">
                  <Card.Body className="d-flex flex-column flex-md-row gap-4 align-items-center">
                    <div className="flex-grow-1">
                      <CloudLightning size={40} className="text-primary mb-3" />
                      <Card.Title className="fw-semibold text-dark h4 mb-2">Scalable Infrastructure</Card.Title>
                      <Card.Text className="text-secondary">
                        Designed to handle massive surges. Whether it's 10 candidates or 10 million, our distributed cloud guarantees zero downtime during high-concurrency exam windows.
                      </Card.Text>
                    </div>
                    <div className="w-100 w-md-50 bg-light rounded-4 border border-primary-subtle d-flex align-items-center justify-content-center py-4">
                      <div className="d-flex align-items-end gap-2 h-24">
                        <div className="w-6 bg-primary opacity-20 rounded-top" style={{ height: '25%' }}></div>
                        <div className="w-6 bg-primary opacity-40 rounded-top" style={{ height: '50%' }}></div>
                        <div className="w-6 bg-primary opacity-60 rounded-top" style={{ height: '75%' }}></div>
                        <div className="w-6 bg-primary rounded-top" style={{ height: '100%' }}></div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Security Spotlight */}
        <section id="solutions" className="py-5 bg-dark text-white overflow-hidden position-relative">
          <Container className="py-5">
            <Row className="align-items-center g-5">
              <Col md={7}>
                <span className="small fw-semibold bg-white bg-opacity-10 px-3 py-1 rounded-pill mb-3 d-inline-block">Security First</span>
                <h2 className="display-5 fw-bold mb-3">Bank-Grade Security for High-Stakes Credentials</h2>
                <p className="lead opacity-75 mb-4">
                  We don't just secure exams; we protect your organization's reputation. Our security protocols are audited annually by third-party experts to ensure absolute integrity.
                </p>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <Shield size={24} className="text-info mt-1" />
                    <div>
                      <h5 className="fw-semibold mb-1">GDPR & CCPA Compliant</h5>
                      <p className="small opacity-75">Automatic data scrubbing and right-to-be-forgotten protocols built into the core API.</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-3">
                    <ShieldAlert size={24} className="text-info mt-1" />
                    <div>
                      <h5 className="fw-semibold mb-1">SOC2 Type II Certified</h5>
                      <p className="small opacity-75">Rigorous operational controls verified by independent AICPA-accredited auditors.</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="dark-glass-card p-4 rounded-4 text-white">
                  <h6 className="small font-monospace text-secondary mb-3">NETWORK_STATUS: SECURE</h6>
                  <div className="d-flex justify-content-between bg-white bg-opacity-5 p-3 rounded-3 border border-white border-opacity-10 mb-3">
                    <div>
                      <span className="small text-secondary d-block">Uptime</span>
                      <span className="h4 fw-bold">99.99%</span>
                    </div>
                    <div>
                      <span className="small text-secondary d-block">Latency</span>
                      <span className="h4 fw-bold">&lt;40ms</span>
                    </div>
                  </div>
                  <Button variant="outline-light" className="w-100 py-2 font-label-md">Download Security Whitepaper</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-5 bg-white">
          <Container className="py-4">
            <div className="bg-primary text-white rounded-4 p-5 text-center shadow-lg position-relative overflow-hidden">
              <h2 className="fw-bold mb-3">Ready to secure your next assessment?</h2>
              <p className="lead opacity-90 max-w-xl mx-auto mb-4">Join 500+ global organizations that trust SecureExam for their certification and academic integrity needs.</p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <Link to="/login">
                  <Button variant="light" size="lg" className="text-primary fw-semibold px-4 py-3 shadow">Book Your Demo</Button>
                </Link>
                <Button variant="outline-light" size="lg" className="px-4 py-3">Talk to Sales</Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-5">
        <Container>
          <Row className="gy-4 justify-content-between align-items-center">
            <Col md={4}>
              <h5 className="fw-bold text-dark mb-2">SecureExam</h5>
              <p className="small text-secondary">Establishing trust in the digital examination landscape through relentless innovation and security.</p>
            </Col>
            <Col md={6} className="d-flex gap-4 justify-content-md-end flex-wrap text-start">
              <div>
                <h6 className="fw-bold small text-uppercase tracking-wider text-dark mb-2">Legal</h6>
                <Nav className="flex-column small">
                  <Nav.Link href="#" className="p-0 text-secondary mb-1">Privacy Policy</Nav.Link>
                  <Nav.Link href="#" className="p-0 text-secondary mb-1">Terms of Service</Nav.Link>
                </Nav>
              </div>
              <div>
                <h6 className="fw-bold small text-uppercase tracking-wider text-dark mb-2">Support</h6>
                <Nav className="flex-column small">
                  <Nav.Link href="#" className="p-0 text-secondary mb-1">Contact Support</Nav.Link>
                  <Nav.Link href="#" className="p-0 text-secondary mb-1">Status</Nav.Link>
                </Nav>
              </div>
            </Col>
          </Row>
          <div className="border-top mt-4 pt-3 text-center small text-secondary">
            © 2026 SecureExam Enterprise. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;

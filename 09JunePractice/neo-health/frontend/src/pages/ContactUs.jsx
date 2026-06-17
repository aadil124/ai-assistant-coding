import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate API request submission
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-us-container py-5">
      {/* React 19 Document Metadata */}
      <title>Contact Us | Neo-Health Portal</title>
      <meta name="description" content="Get in touch with the Neo-Health customer support and medical coordination staff. We are available 24/7." />

      <div className="container">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2 fw-semibold text-uppercase tracking-wider">Get In Touch</span>
          <h1 className="fw-bold mb-3">We Are Here to Help</h1>
          <p className="text-secondary lead" style={{ fontSize: '1.1rem' }}>
            Have a question about telemedicine consultations, appointments, or prescriptions? Reach out using the form or direct support channels.
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Details Column */}
          <div className="col-12 col-lg-5">
            <h3 className="fw-bold mb-4 text-dark">Direct Channels</h3>
            
            <div className="d-flex flex-column gap-4 mb-5">
              <div className="d-flex align-items-start gap-3">
                <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-telephone fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1 text-dark">Call Support</h6>
                  <p className="text-secondary small mb-1">Speak directly with medical billing or support coordinators.</p>
                  <span className="fw-semibold text-primary">+1 (555) 123-4567</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div className="rounded-3 bg-success bg-opacity-10 text-success p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-envelope fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1 text-dark">Email Inquiries</h6>
                  <p className="text-secondary small mb-1">Our average response time is under 1 hour.</p>
                  <span className="fw-semibold text-success">support@neo-health.com</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div className="rounded-3 bg-info bg-opacity-10 text-info p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-geo-alt fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1 text-dark">Central Plaza Office</h6>
                  <p className="text-secondary small mb-1">Medical coordinates & engineering headquarters.</p>
                  <span className="fw-semibold text-info">100 Medical Plaza, Suite 400, NY 10001</span>
                </div>
              </div>
            </div>

            <div className="neo-glass-card p-4">
              <h5 className="fw-bold mb-3"><i className="bi bi-clock me-2 text-primary"></i>Operation Hours</h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small">
                <li className="d-flex justify-content-between text-secondary">
                  <span>Monday — Friday</span>
                  <span className="fw-semibold text-dark">7:00 AM — 9:00 PM</span>
                </li>
                <li className="d-flex justify-content-between text-secondary">
                  <span>Saturday</span>
                  <span className="fw-semibold text-dark">8:00 AM — 5:00 PM</span>
                </li>
                <li className="d-flex justify-content-between text-secondary">
                  <span>Sunday</span>
                  <span className="fw-semibold text-dark">Closed (Emergency Only)</span>
                </li>
                <li className="d-flex justify-content-between text-secondary border-top pt-2 mt-2">
                  <span className="fw-semibold text-primary">Virtual Consultation Access</span>
                  <span className="fw-semibold text-success">24/7 Available</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <div className="col-12 col-lg-7">
            <div className="neo-glass-card p-4 p-md-5">
              <h3 className="fw-bold mb-3 text-dark">Send a Message</h3>
              <p className="text-secondary small mb-4">Complete the form below and our response coordinators will direct your query.</p>

              {submitted && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert" id="contact-success-alert">
                  <i className="bi bi-check-circle-fill fs-5"></i>
                  <div>
                    <strong>Thank you!</strong> Your message has been received. We will get back to you shortly.
                  </div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert" id="contact-error-alert">
                  <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} id="contact-form">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label small fw-semibold text-dark">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label small fw-semibold text-dark">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-neo"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label small fw-semibold text-dark">Subject</label>
                    <input
                      type="text"
                      className="form-control form-control-neo"
                      id="subject"
                      name="subject"
                      placeholder="Consultation scheduling issue, billing query, etc."
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label small fw-semibold text-dark">Your Message</label>
                    <textarea
                      className="form-control form-control-neo"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="How can we assist you today?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary-neo w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                      id="contact-form-submit"
                    >
                      <span>Submit Inquiry</span>
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

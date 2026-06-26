import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto py-5" style={{ background: 'rgba(250, 248, 255, 0.8)', borderTop: '1px solid rgba(225, 226, 237, 0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-4">
            <Link className="d-flex align-items-center gap-2 mb-3 text-decoration-none" to="/">
              <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '1.5rem' }}></i>
              <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
            </Link>
            <p className="text-secondary small mb-3">
              A premium digital healthcare portal offering teleconsultations, instant medical records, and expert medical advice at your fingertips.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary hover-primary" id="footer-social-twitter" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-secondary hover-primary" id="footer-social-facebook" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary hover-primary" id="footer-social-linkedin" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-secondary hover-primary" id="footer-social-instagram" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-3 text-dark">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link className="text-secondary text-decoration-none small hover-link" to="/" id="footer-link-home">Home</Link></li>
              <li><Link className="text-secondary text-decoration-none small hover-link" to="/about" id="footer-link-about">About Us</Link></li>
              <li><Link className="text-secondary text-decoration-none small hover-link" to="/faq" id="footer-link-faq">FAQs</Link></li>
              <li><Link className="text-secondary text-decoration-none small hover-link" to="/contact" id="footer-link-contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-bold mb-3 text-dark">Our Services</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" className="text-secondary text-decoration-none small hover-link" id="footer-link-telehealth">Virtual Consultations</a></li>
              <li><a href="#" className="text-secondary text-decoration-none small hover-link" id="footer-link-prescriptions">E-Prescriptions</a></li>
              <li><a href="#" className="text-secondary text-decoration-none small hover-link" id="footer-link-analytics">Health Analytics</a></li>
              <li><a href="#" className="text-secondary text-decoration-none small hover-link" id="footer-link-support">24/7 Patient Care</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3 text-dark">Contact Info</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-secondary small">
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt text-primary"></i>
                100 Medical Plaza, Suite 400, NY 10001
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-primary"></i>
                +1 (555) 123-4567
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-primary"></i>
                support@neo-health.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: 'rgba(225, 226, 237, 0.8)' }} />
        <div className="row">
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="text-secondary small mb-0">&copy; {new Date().getFullYear()} Neo-Health Inc. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
            <span className="text-secondary small font-monospace">Demo Practice Application</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

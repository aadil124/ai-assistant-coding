import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-100 py-5 bg-white border-top mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-primary mb-3">Lumina Editorial</h5>
            <p className="text-secondary small">Refining the narrative for the discerning reader.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary hover-primary"><span className="material-symbols-outlined fs-5">alternate_email</span></a>
              <a href="#" className="text-secondary hover-primary"><span className="material-symbols-outlined fs-5">public</span></a>
              <a href="#" className="text-secondary hover-primary"><span className="material-symbols-outlined fs-5">rss_feed</span></a>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-dark small mb-3 uppercase tracking-widest">Sections</h6>
            <ul className="list-unstyled space-y-2">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Technology</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Design</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Culture</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Case Studies</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-dark small mb-3 uppercase tracking-widest">Company</h6>
            <ul className="list-unstyled space-y-2">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>About Us</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Membership</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Writers</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Contact</a></li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-dark small mb-3 uppercase tracking-widest">Legal</h6>
            <ul className="list-unstyled space-y-2">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small hover-primary" onClick={(e) => e.preventDefault()}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-5 pt-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small mb-0">© 2026 Lumina Editorial. All rights reserved.</p>
          <div className="small text-secondary opacity-75">Built for focus.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

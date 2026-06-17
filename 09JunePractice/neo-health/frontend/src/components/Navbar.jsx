import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ background: 'rgba(250, 248, 255, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(225, 226, 237, 0.6)' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '1.5rem' }}></i>
          <span className="neo-gradient-text">Neo-Health</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/faq">FAQs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link fw-medium px-3 ${isActive ? 'text-primary' : 'text-secondary'}`} to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <Link className="btn btn-secondary-neo" to="/login">Login</Link>
            <Link className="btn btn-primary-neo" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

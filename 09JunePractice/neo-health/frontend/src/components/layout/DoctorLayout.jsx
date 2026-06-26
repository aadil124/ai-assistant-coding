import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function DoctorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light text-dark">
      {/* Mobile Top Bar */}
      <header className="d-lg-none bg-white border-bottom px-3 py-2 d-flex justify-content-between align-items-center sticky-top z-3">
        <Link className="d-flex align-items-center gap-2 text-decoration-none fw-bold text-dark" to="/doctor/dashboard">
          <i className="bi bi-heart-pulse-fill text-primary fs-4"></i>
          <span className="neo-gradient-text">Neo-Health</span>
        </Link>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-light border p-2 rounded-circle"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <i className={`bi ${theme === 'light' ? 'bi-moon-fill text-dark' : 'bi-sun-fill text-warning'} fs-5`}></i>
          </button>
          <button
            className="btn btn-light border p-2"
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Navigation"
          >
            <i className={`bi ${sidebarOpen ? 'bi-x-lg' : 'bi-list'} fs-5`}></i>
          </button>
        </div>
      </header>

      <div className="d-flex flex-grow-1 position-relative">
        {/* Sidebar Navigation */}
        <aside
          className={`bg-white border-end d-flex flex-column p-3 position-fixed top-0 bottom-0 z-3 transition-all`}
          style={{
            width: '280px',
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            left: '0',
            visibility: sidebarOpen ? 'visible' : 'hidden',
            '@media (min-width: 992px)': {
              transform: 'none',
              visibility: 'visible',
              position: 'sticky'
            }
          }}
          id="doctor-sidebar"
        >
          {/* Brand Logo */}
          <div className="mb-4 px-2 pt-2">
            <Link className="d-flex align-items-center gap-2 text-decoration-none" to="/doctor/dashboard">
              <i className="bi bi-heart-pulse-fill text-primary" style={{ fontSize: '1.8rem' }}></i>
              <span className="fw-bold fs-4 neo-gradient-text">Neo-Health</span>
            </Link>
            <small className="text-secondary tracking-wide fw-medium text-uppercase ps-1">Doctor Portal</small>
          </div>

          {/* Navigation Links */}
          <nav className="nav flex-column gap-1 flex-grow-1">
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/dashboard"
              end
            >
              <i className="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/appointments"
            >
              <i className="bi bi-calendar3"></i>
              <span>Appointments</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/availability"
            >
              <i className="bi bi-clock-history"></i>
              <span>Availability</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/records/upload"
            >
              <i className="bi bi-cloud-arrow-up"></i>
              <span>Upload Records</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/reviews"
            >
              <i className="bi bi-star"></i>
              <span>Patient Reviews</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/earnings"
            >
              <i className="bi bi-wallet2"></i>
              <span>Earnings Tracker</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/doctor/settings"
            >
              <i className="bi bi-person-fill-gear"></i>
              <span>Settings</span>
            </NavLink>
          </nav>

          {/* Bottom Actions */}
          <div className="border-top pt-3 mt-auto d-flex flex-column gap-2">
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium transition-all ${
                  isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-secondary hover-link'
                }`
              }
              to="/contact"
            >
              <i className="bi bi-question-circle"></i>
              <span>Help Center</span>
            </NavLink>
            <a
              href="#"
              onClick={handleLogout}
              className="nav-link d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 fw-medium text-danger hover-bg-danger-subtle"
              id="sidebar-logout"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </a>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 d-lg-none"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column min-w-0" style={{ paddingLeft: '0', transition: 'padding 0.3s ease' }} id="doctor-content-wrapper">
          {/* Top Header */}
          <header className="d-none d-lg-flex bg-white border-bottom px-4 py-3 justify-content-between align-items-center sticky-top z-2">
            <div className="d-flex align-items-center gap-3 bg-light px-3 py-2 rounded-pill border" style={{ width: '380px' }}>
              <i className="bi bi-search text-secondary"></i>
              <input
                type="text"
                className="form-control bg-transparent border-0 p-0 shadow-none small"
                placeholder="Search patient records, charts..."
                id="header-search-bar"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    alert(`Simulated search: "${e.target.value}". Found 2 matches in clinical charts.`);
                  }
                }}
              />
            </div>

            <div className="d-flex align-items-center gap-4">
              <button
                className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center"
                type="button"
                onClick={toggleTheme}
                style={{ width: '40px', height: '40px' }}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                <i className={`bi ${theme === 'light' ? 'bi-moon-fill text-dark' : 'bi-sun-fill text-warning'}`}></i>
              </button>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center position-relative"
                  type="button"
                  onClick={() => alert("No pending verifications. All system credentials up-to-date.")}
                >
                  <i className="bi bi-bell text-secondary"></i>
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
                </button>
              </div>

              <div className="border-start" style={{ height: '30px' }}></div>
              <div className="d-flex align-items-center gap-3">
                <Link to="/doctor/profile" className="d-flex align-items-center gap-3 text-decoration-none text-dark">
                  <div className="text-end">
                    <p className="fw-semibold text-dark mb-0 small">Dr. Marcus Thorne</p>
                    <small className="text-secondary">Specialist ID: #77291</small>
                  </div>
                  <img
                    alt="Doctor avatar"
                    className="rounded-circle border"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU"
                  />
                </Link>
              </div>
            </div>
          </header>

          {/* Inner Content Outlet */}
          <main className="flex-grow-1 p-3 p-md-4 bg-body">
            {children}
          </main>
        </div>
      </div>

      <style>{`
        #doctor-sidebar {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 992px) {
          #doctor-sidebar {
            transform: none !important;
            visibility: visible !important;
            position: sticky !important;
            height: 100vh !important;
          }
          #doctor-content-wrapper {
            padding-left: 0 !important;
          }
        }
        .hover-link:hover {
          background-color: rgba(0, 74, 198, 0.05);
          color: var(--primary-color) !important;
        }
      `}</style>
    </div>
  );
}

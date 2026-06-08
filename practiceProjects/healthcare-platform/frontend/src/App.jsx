import React, { useState, useEffect } from 'react';
import HomeShowcase from './components/HomeShowcase';
import DashboardOverview from './components/DashboardOverview';
import ConsultationRoom from './components/ConsultationRoom';
import api from './utils/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeAppointmentId, setActiveAppointmentId] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  
  // Auth Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('9876543210'); // Default Indian mobile number
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle auto login checks
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
    }
  }, []);

  const handleNavigation = (screenName, appointmentId = null) => {
    if (appointmentId) {
      setActiveAppointmentId(appointmentId);
    }
    
    // Auth Guard
    if (screenName !== 'home' && !user) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }

    setCurrentScreen(screenName);
  };

  const handleLogout = async () => {
    await api.logout();
    localStorage.removeItem('user');
    setUser(null);
    setActiveAppointmentId(null);
    setCurrentScreen('home');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (authMode === 'login') {
        const response = await api.login(email, password);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setShowAuthModal(false);
        // Clear fields
        setEmail('');
        setPassword('');
        setCurrentScreen('dashboard');
      } else {
        await api.registerPatient(email, password, phoneNumber);
        setSuccessMsg('Account created successfully! Please log in.');
        setAuthMode('login');
        setPassword('');
      }
    } catch (err) {
      if (err.errors && err.errors.length > 0) {
        const detailedErrors = err.errors.map(e => e.message).join(' | ');
        setErrorMsg(`Validation failed: ${detailedErrors}`);
      } else {
        setErrorMsg(err.message || 'Authentication failed');
      }
    }
  };

  const handleQuickLogin = (role) => {
    setErrorMsg('');
    if (role === 'doctor') {
      setEmail('dr.aris@telehealthconnect.com');
      setPassword('Password123!');
    } else {
      setEmail('sarah.johnson@example.com');
      setPassword('Password123!');
    }
  };

  return (
    <div className="telehealth-app">
      {currentScreen === 'home' && (
        <HomeShowcase 
          onNavigate={handleNavigation} 
          user={user} 
          onLogout={handleLogout} 
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setShowAuthModal(true);
          }}
        />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardOverview 
          onNavigate={handleNavigation} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
      {currentScreen === 'consultation' && (
        <ConsultationRoom 
          onNavigate={handleNavigation} 
          user={user} 
          onLogout={handleLogout} 
          appointmentId={activeAppointmentId}
        />
      )}

      {/* Modern Authentication Modal */}
      {showAuthModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-3xl overflow-hidden shadow-2xl bg-white text-dark">
              {/* Top gradient decoration */}
              <div className="h-2 bg-gradient-to-r from-primary via-tertiary to-secondary" style={{ height: '6px', background: 'linear-gradient(90deg, #6366f1, #3b82f6, #ec4899)' }}></div>
              
              <div className="modal-header border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                <h3 className="modal-title font-display text-h3 font-bold text-on-surface">
                  {authMode === 'login' ? 'Welcome Back' : 'Create Patient Account'}
                </h3>
                <button 
                  type="button" 
                  className="btn-close border-0 bg-transparent text-outline hover:text-dark font-bold text-lg" 
                  onClick={() => {
                    setShowAuthModal(false);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  style={{ fontSize: '1.25rem' }}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body p-4">
                {errorMsg && (
                  <div className="alert alert-danger rounded-xl py-2 px-3 text-label-sm mb-3 d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="alert alert-success rounded-xl py-2 px-3 text-label-sm mb-3 d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>{successMsg}</span>
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="d-flex flex-column gap-1 mb-3">
                    <label className="font-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="d-flex flex-column gap-1 mb-3">
                    <label className="font-label-md text-on-surface-variant" htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      required
                      className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {authMode === 'signup' && (
                    <div className="d-flex flex-column gap-1 mb-3">
                      <label className="font-label-md text-on-surface-variant" htmlFor="phone">Phone Number (E.164 format)</label>
                      <input
                        id="phone"
                        type="text"
                        required
                        className="form-control bg-light border-0 rounded-xl p-3 focus:ring-2 focus:ring-primary/20"
                        placeholder="+15085550143"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full py-3 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-98 transition-all"
                    style={{ background: '#6366f1', color: '#fff', border: 'none' }}
                  >
                    {authMode === 'login' ? 'Log In' : 'Sign Up'}
                  </button>
                </form>

                {/* Quick Dev Login */}
                {authMode === 'login' && (
                  <div className="mt-4 pt-3 border-top border-light">
                    <p className="text-center text-label-sm text-outline mb-2">Development Accounts (One-Click Seed Data)</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        type="button" 
                        className="btn btn-outline-primary btn-sm rounded-lg py-2 px-3 font-semibold"
                        onClick={() => handleQuickLogin('doctor')}
                      >
                        👩‍⚕️ Dr. Aris (Doctor)
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-sm rounded-lg py-2 px-3 font-semibold"
                        onClick={() => handleQuickLogin('patient')}
                      >
                        👤 Sarah (Patient)
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-3 text-center">
                  {authMode === 'login' ? (
                    <p className="text-label-sm mb-0">
                      Don't have a patient account?{' '}
                      <button 
                        type="button" 
                        className="btn btn-link p-0 font-semibold text-primary decoration-none" 
                        onClick={() => {
                          setAuthMode('signup');
                          setErrorMsg('');
                        }}
                      >
                        Register Here
                      </button>
                    </p>
                  ) : (
                    <p className="text-label-sm mb-0">
                      Already have an account?{' '}
                      <button 
                        type="button" 
                        className="btn btn-link p-0 font-semibold text-primary decoration-none" 
                        onClick={() => {
                          setAuthMode('login');
                          setErrorMsg('');
                        }}
                      >
                        Log In Here
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

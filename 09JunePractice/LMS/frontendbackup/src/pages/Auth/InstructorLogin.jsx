import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function InstructorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const user = await login(email, password);
      if (user.role !== 'Instructor') {
        throw new Error('Access denied. This portal is for instructors only.');
      }
      navigate('/instructor');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const target = document.getElementById('parallax-container');
    if (!target) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    target.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
  };

  return (
    <div className="login-shell min-vh-100 flex-grow-1 d-flex" onMouseMove={handleMouseMove}>
      <style>{`
        .login-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .branding-side {
          background-color: #213145;
          color: #ffffff;
        }
        .login-input:focus {
          border-color: var(--primary, #4648d4);
          box-shadow: 0 0 0 3px rgba(70, 72, 212, 0.15);
          outline: none;
        }
        .parallax-wrap {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <div className="row g-0 w-100 min-vh-100">
        {/* Left Side: Branding */}
        <section className="col-lg-6 branding-side d-none d-lg-flex align-items-center justify-content-center p-5 position-relative overflow-hidden">
          <div className="position-absolute rounded-circle bg-primary bg-opacity-10" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px', filter: 'blur(80px)' }}></div>
          <div className="position-absolute rounded-circle bg-secondary bg-opacity-10" style={{ width: '400px', height: '400px', bottom: '-100px', right: '-100px', filter: 'blur(80px)' }}></div>

          <div className="parallax-wrap w-100" style={{ maxWidth: '500px' }} id="parallax-container">
            <div className="d-flex align-items-center gap-2 mb-5">
              <div className="rounded-3 bg-primary p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px' }}>
                <span className="material-symbols-outlined fs-5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <span className="h5 fw-bold text-white mb-0">Lumina Academy</span>
            </div>

            <h1 className="display-5 fw-bold text-white mb-4 leading-tight">
              Elevate your teaching <span className="text-primary-fixed-dim" style={{ color: '#c0c1ff' }}>experience.</span>
            </h1>
            <p className="text-white-50 mb-5" style={{ fontSize: '1.1rem' }}>
              Join an elite community of educators. Lumina provides the high-performance tools you need to manage curriculum, track student progress, and deliver world-class learning experiences.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-white bg-opacity-10 border border-white border-opacity-10 rounded-pill px-3 py-2 text-white small d-flex align-items-center gap-1.5">
                <span className="material-symbols-outlined fs-6">analytics</span>
                Advanced Analytics
              </span>
              <span className="badge bg-white bg-opacity-10 border border-white border-opacity-10 rounded-pill px-3 py-2 text-white small d-flex align-items-center gap-1.5">
                <span className="material-symbols-outlined fs-6">auto_awesome</span>
                AI-Driven Insights
              </span>
              <span className="badge bg-white bg-opacity-10 border border-white border-opacity-10 rounded-pill px-3 py-2 text-white small d-flex align-items-center gap-1.5">
                <span className="material-symbols-outlined fs-6">verified</span>
                Premium Quality
              </span>
            </div>

            <div className="mt-5 rounded-4 overflow-hidden shadow-lg border border-light-subtle bg-white bg-opacity-10">
              <img
                alt="Instructor preview"
                className="w-100 object-fit-cover"
                style={{ aspectRatio: '16/10' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD601YGQbfdheuf3y9_ea5GHhfvcna9KlApcNTOH_ApMAQZPOQVT1kOFWhN5OaSd_XG2ovGrmr76kXmDF6tiLIX1YM4WaxpQdDz1P8st9VjFGJkhsP_lPFwnd9o37-DFFWmMIt5Q7X_rRw1aEqQcC7euAcLKbUA8JWfZSq-PdC-lnR0l02hZXO5OJbhXxsPHBKlqQOw063WKn-CnE3LX3jTF6jddS7UhY2Nu1MsszUFyCkdem9QZQz4bULWU6h4dTQF_kLwFU36QY89"
              />
            </div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
          <div className="w-100" style={{ maxWidth: '420px' }}>
            <div className="d-flex d-lg-none align-items-center gap-2 mb-4">
              <div className="rounded-3 bg-primary p-2 d-flex align-items-center justify-content-center text-white" style={{ width: '32px', height: '32px' }}>
                <span className="material-symbols-outlined fs-6" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <span className="h6 fw-bold text-dark mb-0">Lumina</span>
            </div>

            <header className="mb-4">
              <h2 className="h3 fw-bold text-dark mb-1">Welcome Back</h2>
              <p className="text-secondary small">Please enter your details to access the instructor portal.</p>
            </header>

            {error && (
              <div className="alert alert-danger rounded-3 py-2.5 px-3 mb-4 small border-0 text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3.5">
              <div className="d-flex flex-column gap-1.5">
                <label className="text-secondary small fw-medium ml-1" htmlFor="email">Email Address</label>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute text-secondary" style={{ left: '12px', top: '12px' }}>mail</span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@academy.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="login-input w-full pl-10 pr-4 py-2.5 bg-light border border-light-subtle rounded-3 text-sm focus:bg-white"
                  />
                </div>
              </div>

              <div className="d-flex flex-column gap-1.5">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="text-secondary small fw-medium ml-1" htmlFor="password">Password</label>
                  <a className="small text-primary text-decoration-none" href="#">Forgot Password?</a>
                </div>
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute text-secondary" style={{ left: '12px', top: '12px' }}>lock</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="login-input w-full pl-10 pr-12 py-2.5 bg-light border border-light-subtle rounded-3 text-sm focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute text-secondary p-0 text-decoration-none"
                    style={{ right: '12px', top: '10px' }}
                  >
                    <span className="material-symbols-outlined fs-5">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="form-check my-2">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label text-secondary small select-none" htmlFor="remember">
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-nexus-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-2"
              >
                {isSubmitting ? 'Sign In...' : 'Sign In'}
                <span className="material-symbols-outlined fs-5">arrow_forward</span>
              </button>
            </form>

            <div className="relative my-4 text-center">
              <span className="bg-white px-2 small text-secondary">Or continue with</span>
              <div className="border-top" style={{ marginTop: '-10px', zIndex: -1 }}></div>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100 py-2.5 rounded-3 small text-dark d-flex align-items-center justify-content-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  Google
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100 py-2.5 rounded-3 small text-dark d-flex align-items-center justify-content-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.51 12.09 1.011 1.454 2.202 3.074 3.776 3.014 1.52-.06 2.09-.981 3.93-.981 1.83 0 2.356.981 3.949.951 1.622-.027 2.645-1.455 3.643-2.924 1.155-1.684 1.622-3.321 1.655-3.414-.033-.015-3.175-1.213-3.211-4.815-.033-3.003 2.454-4.444 2.569-4.512-1.403-2.059-3.562-2.292-4.323-2.336-1.89-.153-3.41 1.04-3.977 1.04zm2.144-4.664c.844-1.022 1.41-2.43 1.254-3.832-1.207.049-2.667.806-3.533 1.814-.775.889-1.453 2.316-1.272 3.684 1.341.104 2.712-.644 3.551-1.666z"></path>
                  </svg>
                  Apple
                </button>
              </div>
            </div>

            <footer className="mt-5 text-center">
              <p className="text-secondary small">
                Don't have an instructor account?{' '}
                <a className="text-primary fw-bold text-decoration-none" href="#">Apply to Join</a>
              </p>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}

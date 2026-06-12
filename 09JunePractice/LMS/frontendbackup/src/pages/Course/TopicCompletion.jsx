import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TopicCompletion() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const spawn = () => {
      if (particles.length < 100) {
        particles.push(new Particle());
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawn();
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.y > canvas.height) particles.splice(i, 1);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="completion-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .completion-shell {
          background-color: #f8f9ff;
          color: #0b1c30;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .top-nav {
          height: 64px;
          border-bottom: 1px solid var(--outline-variant, #c7c4d7);
          background-color: #ffffff;
          z-index: 50;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 1rem;
        }
        .confetti-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .achievement-card {
          position: relative;
          overflow: hidden;
        }
        .glow-overlay {
          position: absolute;
          right: -20px;
          top: -20px;
          width: 140px;
          height: 140px;
          background-color: rgba(96, 99, 238, 0.15);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
      `}</style>

      {/* Top Nav Bar */}
      <header className="top-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary font-display fs-4" style={{ letterSpacing: '-0.02em' }}>Lumina LMS</Link>
          <nav className="d-none d-md-flex gap-3 ms-4">
            <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary font-label-md">Catalog</Link>
            <Link to="/dashboard" className="text-primary text-decoration-none border-bottom border-primary pb-1 font-label-md">My Learning</Link>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-1 text-decoration-none">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="rounded-circle border overflow-hidden" style={{ width: '32px', height: '32px' }}>
            <img
              alt="User avatar"
              className="w-100 h-100 object-fit-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkFwQVqaaHSB7aV-Cs-W1eKtBYV5JuuOMJfpN61nAFYwPY8P9RQM3IGAX7uHk3tENmf-dwLHNUClpAh05fr6Lp939zmIxG94y3MEHSWkcMTZ9CBqn3VM8mBrmgnf9LLkTQOaUUuu3pLMAZX6gYNdZIi095PEPiJp8ZL1t9YX3WBHNBvwn94e-iGtHZU9R2i3p1SKWZpKRrjVYW85jkPSWrwBEsofAn_sfo3vO2LIpTjAZxyFZsIOZUwZwMPOnt3WwS7BbpioI3Inq2"
            />
          </div>
        </div>
      </header>

      {/* Confetti Canvas */}
      <canvas className="confetti-canvas" id="confetti"></canvas>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="container px-0" style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>
          {/* Celebratory Hero */}
          <div className="text-center mb-5">
            <div className="d-inline-flex p-4 rounded-circle bg-primary bg-opacity-10 mb-4 position-relative">
              <div className="position-absolute inset-0 bg-primary bg-opacity-5 rounded-circle blur-lg"></div>
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h1 className="display-5 fw-bold text-dark mb-2">Module 1 Completed</h1>
            <p className="text-secondary mb-0" style={{ fontSize: '1.15rem' }}>
              Great job! You've mastered the fundamentals. You're now ready to tackle more complex challenges.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="row g-4 align-items-stretch">
            {/* Achievement Card */}
            <div className="col-md-5">
              <div className="glass-card achievement-card p-4 h-100 d-flex flex-column justify-content-between">
                <div className="glow-overlay"></div>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded px-2 py-1 uppercase small">
                      NEW ACHIEVEMENT
                    </span>
                    <span className="material-symbols-outlined text-warning">military_tech</span>
                  </div>
                  <h2 className="h5 fw-bold text-dark mb-2">Foundation Master</h2>
                  <p className="text-secondary small mb-0">
                    Awarded for finishing Module 1 with an accuracy score above 90%.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-primary fw-bold small">Achievement Completed</span>
                    <span className="text-primary fw-bold small">100%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Up Card */}
            <div className="col-md-7">
              <div className="bg-white border rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-secondary uppercase tracking-wider d-block">Next Milestone</small>
                      <h2 className="h4 fw-bold text-dark mb-2">Advanced Layout Techniques</h2>
                    </div>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '40px' }}>
                      lock_open
                    </span>
                  </div>
                  <p className="text-secondary mb-4">
                    Dive into the world of complex grid systems, fluid typography, and responsive architectural patterns.
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="btn btn-nexus-primary flex-grow-1 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  >
                    Continue to Next Topic
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <button className="btn btn-light border px-3 rounded-3 d-flex align-items-center justify-content-center text-secondary">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2024 Lumina Enterprise LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

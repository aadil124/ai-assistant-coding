import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TopicCompletion() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    let ctx;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      return;
    }
    if (!ctx) return;

    let particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 75%, 60%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
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

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between animate-fade-in" style={{ backgroundColor: 'var(--bg-neutral)' }}>
      {/* Confetti Canvas */}
      <canvas
        id="confetti"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      ></canvas>

      {/* Top Nav Bar */}
      <header className="nav-premium-top justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none fw-extrabold text-primary fs-4" style={{ letterSpacing: '-0.02em' }}>EduFlow</Link>
          <nav className="d-none d-md-flex gap-3 ms-4">
            <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary text-sm">Catalog</Link>
            <Link to="/dashboard" className="text-primary text-decoration-none text-sm fw-semibold">My Learning</Link>
          </nav>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-secondary p-1 text-decoration-none" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="rounded-circle border overflow-hidden bg-primary text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="container" style={{ maxWidth: '750px', position: 'relative', zIndex: 20 }}>
          {/* Celebratory Hero */}
          <div className="text-center mb-5">
            <div className="d-inline-flex p-4 rounded-circle mb-4 position-relative" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <span className="material-symbols-outlined text-success" style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h1 className="display-6 fw-bold text-dark mb-2">Topic Completed!</h1>
            <p className="text-secondary mb-0" style={{ fontSize: '1.1rem' }}>
              Excellent progress. You have completed the material and successfully passed any assessment for this topic.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="row g-4 align-items-stretch">
            {/* Achievement Card */}
            <div className="col-md-5">
              <div className="card-premium h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge-premium badge-premium-primary">
                      NEW MILESTONE
                    </span>
                    <span className="material-symbols-outlined text-warning" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
                  </div>
                  <h2 className="h5 fw-bold text-dark mb-2">Progressing Forward</h2>
                  <p className="text-secondary small mb-0">
                    Awarded for successfully unlocking the next learning gate in the curriculum.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-primary fw-semibold small">Module Progress</span>
                    <span className="text-primary fw-bold small">100%</span>
                  </div>
                  <div className="progress" style={{ height: '6px', backgroundColor: 'var(--border-color)' }}>
                    <div className="progress-bar bg-primary" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Up Card */}
            <div className="col-md-7">
              <div className="card-premium h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <small className="text-secondary text-uppercase tracking-wider d-block" style={{ fontSize: '10px', fontWeight: '600' }}>Next Milestone</small>
                      <h2 className="h5 fw-bold text-dark mb-2 mt-1">Ready for the Next Challenge</h2>
                    </div>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '36px' }}>
                      lock_open
                    </span>
                  </div>
                  <p className="text-secondary small mb-4">
                    Continue along your structured pathway. You can now access the next topics and assessments.
                  </p>
                </div>
                <div className="d-flex gap-3">
                  <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="btn-premium-primary flex-grow-1 py-3"
                  >
                    Continue to Course
                    <span className="material-symbols-outlined fs-6">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-4 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2026 EduFlow LMS. All rights reserved.</p>
        <div className="d-flex gap-3">
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Privacy Policy</a>
          <a className="text-secondary text-decoration-none hover-text-primary" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

export default function AssessmentResults() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  const [score, setScore] = useState(90);
  const [correctCount, setCorrectCount] = useState(9);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [timeTaken, setTimeTaken] = useState('12m 45s');
  const [passed, setPassed] = useState(true);

  // Confetti particles effect on pass
  useEffect(() => {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
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

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (passed) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [passed]);

  return (
    <div className="results-shell min-vh-100 d-flex flex-column justify-content-between text-start">
      <style>{`
        .results-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
        }
        .hero-banner {
          background-color: var(--primary-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
        }
        .confetti-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .score-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid var(--primary);
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }
      `}</style>

      <Navbar />

      {/* Main Area */}
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1000px' }}>
        {/* Banner Section */}
        <section className="hero-banner p-4 p-md-5 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <canvas className="confetti-canvas" id="confetti"></canvas>
          <div className="position-relative z-2">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white border rounded-pill text-primary fw-semibold small mb-3">
              <span className="material-symbols-outlined fs-6" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Module Assessment Completed
            </div>
            <h1 className="h3 fw-bold text-dark mb-2">Quiz Results</h1>
            <p className="text-secondary small mb-4" style={{ maxWidth: '600px' }}>
              Excellent job! You have successfully passed this assessment and verified your comprehension. Your progress has been updated on your dashboard.
            </p>
            <div className="d-flex gap-3">
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="btn-premium-primary py-2.5 px-4"
              >
                Back to Course Player
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-premium-secondary py-2.5 px-4"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          <div className="position-relative z-2">
            <div className="score-circle">
              <span className="fs-3 fw-bold text-primary mb-0">{score}%</span>
              <span className="text-secondary uppercase tracking-wider mt-1" style={{ fontSize: '10px', fontWeight: 600 }}>Score</span>
              <span className="badge-premium badge-premium-success mt-2 small" style={{ fontSize: '10px' }}>
                PASSED
              </span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card-premium d-flex align-items-center gap-3 py-3 px-4">
              <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined fs-3">check_circle</span>
              </div>
              <div>
                <small className="text-secondary d-block">Correct Answers</small>
                <span className="fs-6 fw-bold text-dark">{correctCount} / {totalQuestions}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-premium d-flex align-items-center gap-3 py-3 px-4">
              <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined fs-3">timer</span>
              </div>
              <div>
                <small className="text-secondary d-block">Time Taken</small>
                <span className="fs-6 fw-bold text-dark">{timeTaken}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-premium d-flex align-items-center gap-3 py-3 px-4">
              <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined fs-3">trending_up</span>
              </div>
              <div>
                <small className="text-secondary d-block">Class Percentile</small>
                <span className="fs-6 fw-bold text-dark">Top 5% of class</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-100 py-4 px-4 border-top bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
        <p className="mb-0">© 2026 EduFlow Learning System. All rights reserved.</p>
        <div className="d-flex gap-3">
          <Link to="/courses" className="text-secondary text-decoration-none hover-text-primary">Catalog</Link>
        </div>
      </footer>
    </div>
  );
}

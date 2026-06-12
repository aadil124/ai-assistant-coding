import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
    <div className="results-shell min-vh-100 d-flex flex-column justify-content-between">
      <style>{`
        .results-shell {
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
        .hero-banner {
          background-color: var(--surface-container-highest, #d3e4fe);
          border-radius: 1rem;
          position: relative;
          overflow: hidden;
        }
        .confetti-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 1rem;
          padding: 24px;
        }
        .score-circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 4px solid var(--primary, #4648d4);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          display: flex;
          flex-column: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
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

      {/* Main Area */}
      <main className="flex-grow-1 container px-4 py-5" style={{ maxWidth: '1200px' }}>
        {/* Banner Section */}
        <section className="hero-banner p-4 p-md-5 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <canvas className="confetti-canvas" id="confetti"></canvas>
          <div className="position-relative z-2">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white bg-opacity-50 border rounded-pill text-primary fw-semibold small mb-3">
              <span className="material-symbols-outlined fs-6" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Module Assessment Completed
            </div>
            <h1 className="h2 fw-bold text-dark mb-2">Assessment Results: Module 1 Quiz</h1>
            <p className="text-secondary mb-4" style={{ maxWidth: '600px' }}>
              Fantastic work! You've successfully demonstrated mastery of the core concepts in Digital Architecture foundations. Your performance puts you in the top 5% of learners this month.
            </p>
            <div className="d-flex gap-3">
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="btn btn-nexus-primary px-4 py-2.5 rounded-3 fw-bold"
              >
                Next Topic: Cloud Infrastructure
              </button>
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="btn btn-outline-secondary px-4 py-2.5 rounded-3 fw-bold bg-white"
              >
                Review Materials
              </button>
            </div>
          </div>

          <div className="position-relative z-2">
            <div className="score-circle flex-column">
              <span className="display-5 fw-bold text-primary mb-0">{score}%</span>
              <span className="small text-secondary uppercase tracking-wider mt-1">Score</span>
              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1.5 fw-semibold mt-2 small">
                PASSED
              </span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="glass-card d-flex align-items-center gap-3">
              <div className="rounded-3 bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined fs-3">check_circle</span>
              </div>
              <div>
                <small className="text-secondary d-block">Correct Answers</small>
                <span className="fs-5 fw-bold text-dark">{correctCount} / {totalQuestions}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card d-flex align-items-center gap-3">
              <div className="rounded-3 bg-secondary bg-opacity-10 text-secondary p-3 d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined fs-3">timer</span>
              </div>
              <div>
                <small className="text-secondary d-block">Time Taken</small>
                <span className="fs-5 fw-bold text-dark">{timeTaken}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card d-flex align-items-center gap-3">
              <div className="rounded-3 bg-secondary-subtle p-3 d-flex align-items-center justify-content-center text-dark">
                <span className="material-symbols-outlined fs-3">trending_up</span>
              </div>
              <div>
                <small className="text-secondary d-block">Class Percentile</small>
                <span className="fs-5 fw-bold text-dark">95th Percentile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Breakdown */}
        <div className="bg-white border rounded-4 overflow-hidden mb-4">
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h3 className="h6 fw-bold mb-0 text-dark">Question Breakdown</h3>
            <div className="d-flex gap-3 small">
              <span className="d-flex align-items-center gap-1 text-success">
                <span className="material-symbols-outlined fs-6">check</span> Correct
              </span>
              <span className="d-flex align-items-center gap-1 text-danger">
                <span className="material-symbols-outlined fs-6">close</span> Incorrect
              </span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-sm">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-secondary">Question</th>
                  <th className="px-4 py-3 text-secondary">Topic</th>
                  <th className="px-4 py-3 text-secondary text-end">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light">
                <tr>
                  <td className="px-4 py-3 fw-semibold text-dark">Explain the concept of high availability in cloud infrastructure.</td>
                  <td className="px-4 py-3 text-secondary"><span className="badge bg-secondary-subtle text-secondary-emphasis">Architecture</span></td>
                  <td className="px-4 py-3 text-success text-end"><span className="material-symbols-outlined fs-5">check_circle</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 fw-semibold text-dark">What is the primary difference between horizontal and vertical scaling?</td>
                  <td className="px-4 py-3 text-secondary"><span className="badge bg-secondary-subtle text-secondary-emphasis">Scalability</span></td>
                  <td className="px-4 py-3 text-success text-end"><span className="material-symbols-outlined fs-5">check_circle</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 fw-semibold text-dark">Which data storage solution is best suited for unstructured metadata?</td>
                  <td className="px-4 py-3 text-secondary"><span className="badge bg-secondary-subtle text-secondary-emphasis">Storage</span></td>
                  <td className="px-4 py-3 text-danger text-end"><span className="material-symbols-outlined fs-5">cancel</span></td>
                </tr>
              </tbody>
            </table>
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

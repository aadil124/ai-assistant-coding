import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function InstructorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const user = await login(email, password);
      if (user.role !== "Instructor") {
        throw new Error("Access denied. This portal is for instructors only.");
      }
      navigate("/instructor");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMouseMove = (e) => {
    const target = document.getElementById("parallax-container");
    if (!target) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
    target.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
  };

  return (
    <div
      className="login-shell min-vh-100 flex-grow-1 d-flex"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        .login-shell {
          background-color: var(--bg-neutral);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
        }
        .branding-side {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
        }
        .parallax-wrap {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <div className="row g-0 w-100 min-vh-100">
        {/* Left Side: Branding */}
        <section className="col-lg-6 branding-side d-none d-lg-flex align-items-center justify-content-center p-5 position-relative overflow-hidden">
          <div
            className="position-absolute rounded-circle bg-primary bg-opacity-10"
            style={{
              width: "400px",
              height: "400px",
              top: "-100px",
              left: "-100px",
              filter: "blur(80px)",
            }}
          ></div>
          <div
            className="position-absolute rounded-circle bg-secondary bg-opacity-10"
            style={{
              width: "400px",
              height: "400px",
              bottom: "-100px",
              right: "-100px",
              filter: "blur(80px)",
            }}
          ></div>

          <div
            className="parallax-wrap w-100"
            style={{ maxWidth: "500px" }}
            id="parallax-container"
          >
            <div className="d-flex align-items-center gap-2 mb-5 text-start">
              <span className="material-symbols-outlined fs-3 text-primary">
                auto_awesome
              </span>
              <span className="h5 fw-bold text-white mb-0">
                EduFlow Academy
              </span>
            </div>

            <div className="text-start">
              <h1 className="display-6 fw-bold text-white mb-4 leading-tight">
                Elevate your teaching experience.
              </h1>
              <p
                className="text-white text-opacity-70 mb-5"
                style={{ fontSize: "1.05rem", lineHeight: "1.6" }}
              >
                Join an elite community of educators. EduFlow provides the
                high-performance tools you need to build sequential curriculums,
                trace student progression, and analyze score dynamics.
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <span
                className="badge-premium badge-premium-primary border border-primary border-opacity-20 px-3 py-2 text-white small d-flex align-items-center gap-1.5"
                style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  color: "#93c5fd",
                }}
              >
                <span className="material-symbols-outlined fs-6">
                  analytics
                </span>
                Advanced Analytics
              </span>
              <span
                className="badge-premium badge-premium-primary border border-primary border-opacity-20 px-3 py-2 text-white small d-flex align-items-center gap-1.5"
                style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  color: "#93c5fd",
                }}
              >
                <span className="material-symbols-outlined fs-6">reorder</span>
                Curriculum Wizard
              </span>
              <span
                className="badge-premium badge-premium-primary border border-primary border-opacity-20 px-3 py-2 text-white small d-flex align-items-center gap-1.5"
                style={{
                  background: "rgba(37, 99, 235, 0.15)",
                  color: "#93c5fd",
                }}
              >
                <span className="material-symbols-outlined fs-6">verified</span>
                Verified Credentials
              </span>
            </div>

            <div className="mt-5 rounded-4 overflow-hidden shadow-lg border border-light-subtle bg-white bg-opacity-10">
              <img
                alt="Instructor preview"
                className="w-100 object-fit-cover"
                style={{ aspectRatio: "16/10" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD601YGQbfdheuf3y9_ea5GHhfvcna9KlApcNTOH_ApMAQZPOQVT1kOFWhN5OaSd_XG2ovGrmr76kXmDF6tiLIX1YM4WaxpQdDz1P8st9VjFGJkhsP_lPFwnd9o37-DFFWmMIt5Q7X_rRw1aEqQcC7euAcLKbUA8JWfZSq-PdC-lnR0l02hZXO5OJbhXxsPHBKlqQOw063WKn-CnE3LX3jTF6jddS7UhY2Nu1MsszUFyCkdem9QZQz4bULWU6h4dTQF_kLwFU36QY89"
              />
            </div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5 bg-white">
          <div className="w-100" style={{ maxWidth: "380px" }}>
            <div className="d-flex d-lg-none align-items-center justify-content-center gap-2 mb-4">
              <span className="material-symbols-outlined fs-4 text-primary">
                local_library
              </span>
              <span className="h6 fw-bold text-dark mb-0">EduFlow</span>
            </div>

            <header className="mb-4 text-start">
              <h2 className="h4 fw-bold text-dark mb-1">Instructor Portal</h2>
              <p className="text-secondary small">
                Sign in to manage your academy, courses, and analytics.
              </p>
            </header>

            {error && (
              <div
                className="alert alert-danger rounded-3 py-2.5 px-3 mb-4 small border-0 text-center"
                role="alert"
              >
                ⚠️ {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-3 text-start"
            >
              <div className="form-group-premium">
                <label className="label-premium" htmlFor="email">
                  Email Address
                </label>
                <div className="position-relative">
                  <span
                    className="material-symbols-outlined position-absolute text-secondary"
                    style={{ left: "12px", top: "10px", fontSize: "18px" }}
                  >
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@academy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-premium pl-10"
                    style={{ paddingLeft: "40px" }}
                  />
                </div>
              </div>

              <div className="form-group-premium">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="label-premium mb-0" htmlFor="password">
                    Password
                  </label>
                  <a
                    className="small text-primary text-decoration-none"
                    href="#"
                    style={{ fontSize: "11px" }}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="position-relative">
                  <span
                    className="material-symbols-outlined position-absolute text-secondary"
                    style={{ left: "12px", top: "10px", fontSize: "18px" }}
                  >
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-premium pl-10 pr-12"
                    style={{ paddingLeft: "40px", paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute text-secondary p-0 text-decoration-none"
                    style={{ right: "12px", top: "8px" }}
                  >
                    <span className="material-symbols-outlined fs-5">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="form-check my-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  style={{ cursor: "pointer" }}
                />
                <label
                  className="form-check-label text-secondary small select-none cursor-pointer"
                  htmlFor="remember"
                >
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 mt-2"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
                <span className="material-symbols-outlined fs-6">
                  arrow_forward
                </span>
              </button>
            </form>

            <div className="text-center mt-4 border-top pt-3">
              <p className="text-secondary small mb-0">
                Are you a learner?{" "}
                <Link
                  to="/login"
                  className="text-primary fw-bold text-decoration-none"
                >
                  Student Sign In
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

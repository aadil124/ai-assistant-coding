import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables for form input
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Doctor Details (dynamic with fallback)
  const [doctor, setDoctor] = useState({
    name: "Dr. Alexander Sterling",
    title: "Senior Cardiologist",
    hospital: "Heart & Vascular Institute, NY",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANlpMoBIIUk_rcNQwTkC7QTftzYfBaGW71sr_-xY8nJZBBXuWhw9eCAnSqewbtK92Te_e8Wa8ulvapy0FFYxjzgFwEO86z-EzSKuX-Hoh6QD9UjGjkFz3_r53ecRiNfo5MiCvdO7yCJKVaHwjl-9X6iFj76TitXMKeJZLN8hH_tWtcGe0G3zVBvxSpb3ffk_8iEz0qT-G18sOWirTC4sKX_l53VJhbBSoOXMDV9AKndIzexWafWsHjjUxcFCc_43pAI9JP4OBZvxE",
    rating: "4.9",
    reviewsCount: "124"
  });

  // Load dynamically based on localStorage or routing
  useEffect(() => {
    const savedName = localStorage.getItem('success_doc_name');
    const savedTitle = localStorage.getItem('success_doc_title');
    const savedAvatar = localStorage.getItem('success_doc_avatar');
    
    if (savedName) {
      setDoctor(prev => ({
        ...prev,
        name: savedName,
        title: savedTitle || prev.title,
        avatar: savedAvatar || prev.avatar
      }));
    } else if (id === 'marcus-thorne') {
      setDoctor(prev => ({
        ...prev,
        name: "Dr. Marcus Thorne",
        title: "Senior Cardiologist & Surgeon",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU",
        rating: "4.9",
        reviewsCount: "1.2k"
      }));
    }
  }, [id]);

  const handleBack = () => {
    navigate(`/patient/doctor/${id || 'marcus-thorne'}`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || feedbackText.length < 20) return;

    // Simulate review submission success
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate(`/patient/doctor/${id || 'marcus-thorne'}`);
    }, 2500);
  };

  const isFormValid = rating > 0 && feedbackText.length >= 20 && feedbackText.length <= 2000;

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>Write a Review | Neo-Health Feedback</title>
      <meta name="description" content="Rate your telehealth doctor, submit clinical consultation reviews, and provide patient portal care feedback." />

      <div className="container-fluid py-2">
        
        {/* Back navigation header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center"
            title="Go Back"
          >
            <i className="bi bi-arrow-left fs-5"></i>
          </button>
          <span className="text-secondary small fw-semibold">Return to Doctor Profile</span>
        </div>

        <div className="row g-4">
          
          {/* Main Review Form */}
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            
            {/* Doctor Identity Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex align-items-center gap-3">
                <img
                  className="rounded-3 border object-fit-cover"
                  alt={`Headshot of ${doctor.name}`}
                  style={{ width: '80px', height: '80px' }}
                  src={doctor.avatar}
                />
                <div>
                  <h3 className="fw-bold text-dark mb-1 fs-5">{doctor.name}</h3>
                  <p className="text-secondary small mb-1">{doctor.title} • {doctor.hospital}</p>
                  <div className="d-flex align-items-center gap-1 text-primary small">
                    <i className="bi bi-star-fill text-warning"></i>
                    <strong className="text-dark">{doctor.rating}</strong>
                    <span className="text-secondary">({doctor.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields Card */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-4">
                
                {/* Star Rating Selectors */}
                <div>
                  <h4 className="fw-bold text-dark fs-5 mb-1">Overall Rating</h4>
                  <p className="text-secondary small mb-3">How would you rate your recent visit and care experience?</p>
                  
                  {/* Rating Stars Grid */}
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="btn p-0 bg-transparent border-0"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <i
                          className={`bi ${
                            star <= (hoverRating || rating) ? 'bi-star-fill text-warning' : 'bi-star text-secondary-subtle'
                          }`}
                          style={{ fontSize: '2.5rem' }}
                        ></i>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Input Area */}
                <div>
                  <h4 className="fw-bold text-dark fs-5 mb-1">Your Feedback</h4>
                  <p className="text-secondary small mb-3">Describe your experience, the doctor's communication, and the facility environment.</p>
                  
                  <textarea
                    className="form-control form-control-neo p-3 shadow-none border small w-100 min-vh-25"
                    rows="6"
                    placeholder="Share details about your consultation, wait times, and how the doctor addressed your concerns..."
                    value={feedbackText}
                    required
                    onChange={(e) => setFeedbackText(e.target.value)}
                  ></textarea>
                  
                  <div className="d-flex justify-content-between mt-2 text-secondary small">
                    <span>Minimum 20 characters</span>
                    <span className={feedbackText.length > 2000 ? 'text-danger fw-bold' : ''}>
                      {feedbackText.length} / 2000
                    </span>
                  </div>
                </div>

                {/* Privacy & Anonymous Checkbox */}
                <div className="p-3 bg-light border rounded-3 d-flex gap-3 align-items-start">
                  <i className="bi bi-lock-fill text-primary fs-4 mt-0.5"></i>
                  <div>
                    <h5 className="fw-semibold text-primary mb-1 small">Privacy & Anonymity</h5>
                    <p className="text-secondary small mb-2">
                      Your detailed feedback is extremely valuable. You can choose to post this review anonymously.
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="anonymousCheck"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <label className="form-check-label text-dark small" htmlFor="anonymousCheck">
                        Post this review anonymously on the doctor's public profile page.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="d-flex justify-content-end gap-2 border-top pt-3 border-light-subtle">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-light border py-2.5 px-4 fw-medium text-dark hover-bg-light"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary-neo py-2.5 px-5 shadow-sm"
                    disabled={!isFormValid}
                  >
                    Submit Review
                  </button>
                </div>

              </form>
            </div>

          </div>

          {/* Sidebar Guidelines */}
          <div className="col-12 col-lg-4 d-flex flex-column gap-4">
            
            {/* Review Tips Panel */}
            <div className="neo-glass-card p-4 border bg-white shadow-sm">
              <div className="d-flex align-items-center gap-2 text-primary mb-3">
                <i className="bi bi-lightbulb-fill fs-5"></i>
                <h4 className="fw-bold mb-0 fs-6">Review Tips</h4>
              </div>
              
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0 small text-secondary">
                <li className="d-flex gap-3 align-items-start">
                  <div className="rounded-circle bg-light border p-2 d-flex align-items-center justify-content-center shrink-0" style={{ width: '36px', height: '36px' }}>
                    <i className="bi bi-chat-left-dots-fill text-primary"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1 small">Communication</h5>
                    <p className="mb-0 text-secondary">Did the doctor listen carefully and explain things in a way you could understand?</p>
                  </div>
                </li>
                <li className="d-flex gap-3 align-items-start">
                  <div className="rounded-circle bg-light border p-2 d-flex align-items-center justify-content-center shrink-0" style={{ width: '36px', height: '36px' }}>
                    <i className="bi bi-clock-fill text-primary"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1 small">Punctuality</h5>
                    <p className="mb-0 text-secondary">How long did you wait in the reception and the exam room? Was the staff efficient?</p>
                  </div>
                </li>
                <li className="d-flex gap-3 align-items-start">
                  <div className="rounded-circle bg-light border p-2 d-flex align-items-center justify-content-center shrink-0" style={{ width: '36px', height: '36px' }}>
                    <i className="bi bi-shield-fill-check text-primary"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-1 small">Care Quality</h5>
                    <p className="mb-0 text-secondary">Describe the thoroughness of the examination and the clarity of the treatment plan.</p>
                  </div>
                </li>
              </ul>

              <hr className="my-4 border-light-subtle" />

              <div className="space-y-2">
                <span className="text-secondary small text-uppercase tracking-wider d-block mb-2 font-semibold">Please avoid</span>
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <i className="bi bi-x-circle-fill text-danger fs-6"></i>
                  <span>Sharing private medical info</span>
                </div>
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <i className="bi bi-x-circle-fill text-danger fs-6"></i>
                  <span>Using offensive language</span>
                </div>
                <div className="d-flex align-items-center gap-2 small text-secondary">
                  <i className="bi bi-x-circle-fill text-danger fs-6"></i>
                  <span>Mentioning specific costs</span>
                </div>
              </div>
            </div>

            {/* Support Agent Card */}
            <div className="neo-glass-card p-4 border bg-primary bg-opacity-10 border-primary border-opacity-20 shadow-sm position-relative overflow-hidden">
              <div className="position-relative z-2">
                <h5 className="fw-bold text-dark mb-1 fs-6">Need help?</h5>
                <p className="text-secondary small mb-3">Our support team is here to assist with your portal experience.</p>
                <button
                  onClick={() => alert("Contacting Neo Health support...")}
                  className="btn btn-link p-0 text-primary fw-bold small text-decoration-none d-flex align-items-center gap-1 hover-underline"
                >
                  <span>Contact Support</span>
                  <i className="bi bi-arrow-right small"></i>
                </button>
              </div>
              <div className="position-absolute bottom-0 end-0 mb-n3 me-n3 opacity-10" style={{ zIndex: '1' }}>
                <i className="bi bi-person-badge-fill text-primary" style={{ fontSize: '100px', lineHeight: '1' }}></i>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Floating success toast message */}
      <div
        className={`position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-3 shadow-lg d-flex align-items-center gap-2 transition-all z-3 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        style={{ transition: 'opacity 0.25s, transform 0.25s' }}
      >
        <i className="bi bi-check-circle-fill text-success fs-5"></i>
        <span className="small">Review submitted successfully! Returning to doctor profile...</span>
      </div>
    </PatientLayout>
  );
}

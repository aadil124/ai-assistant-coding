import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const doctorData = {
    id: "marcus-thorne",
    name: "Dr. Marcus Thorne",
    title: "Senior Cardiologist & Surgeon",
    rating: "4.9",
    reviewsCount: "1.2k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU",
    experience: "15+ Years Experience",
    hospital: "St. Jude Medical Center, NY",
    languages: "English, German",
    fee: "$150.00",
    nextAvailability: {
      date: "Tomorrow, Oct 24",
      time: "09:30 AM - 11:00 AM"
    },
    biography: "Dr. Marcus Thorne is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine. He specializes in interventional cardiology and advanced heart failure management. Throughout his career, he has performed over 3,000 successful procedures and is widely recognized for his patient-centric approach and precision in complex cardiac cases. He is an active researcher and frequent speaker at international medical conferences.",
    qualifications: [
      { type: "Doctor of Medicine (MD)", detail: "Johns Hopkins School of Medicine • 2005", icon: "bi-mortarboard-fill" },
      { type: "Cardiology Residency", detail: "Mayo Clinic Graduate School • 2009", icon: "bi-award-fill" },
      { type: "Board Certified in Cardiovascular Disease", detail: "American Board of Internal Medicine • 2011", icon: "bi-patch-check-fill" }
    ],
    reviews: [
      {
        id: "rev1",
        author: "Sarah M.",
        date: "2 weeks ago",
        rating: 5,
        text: "Dr. Thorne is incredibly thorough. He took the time to explain my condition in a way I could actually understand. Highly recommend!",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuoaaJq1dzpLYqpwaoHbWLUS9er7xhRKeApSB0VopLEJr-okk5z-PZa53MVCv8wJHNOGIeCiOw1JkzsxU5WnlhW0sCTGSWBnG2BilhbwHBn9kgFrtRUdTt0QJ-fo8bjSsgqTxjrBcqMe9fZCwlUoKyaYXzf7Pmmg0kYz103JCYMBeSaa5Us4wHD72pPIXlrLSEGqRkCnCQtb6B5Futrlbb2NQuGyKDPzhTKbZZQ3T5YNovdRQY71UZArGrBAJeykuVr0576bTFpIY"
      },
      {
        id: "rev2",
        author: "James L.",
        date: "1 month ago",
        rating: 4,
        text: "Very professional staff and Dr. Thorne was very punctual. The clinic itself is state-of-the-art. Great experience overall.",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAJwL6ltVqVHvdFWpn1RCqRkOGGZUtq3PdR633VGzPz2NHkCOUKvDid-yu0zt0Naq6eJzLUrLqcVOAEGMFDAD1Fnf0F7k0JlnJcXW-I66TndV6ViGnNYBqVFtgDOmdHlJg-a-WKQpknFd5dLxvU-JHgOpfcGEqbC5oKNLuvsNFTHbkdMcUx-RVXkYd3EURmbOzYdpN6gLRYl9I18SwV3EkEqurilMPkLgFbRPMlsIbTvwHOR24HkeeownobAve9zzHGcrUE_rpYiA"
      }
    ]
  };

  const handleBookAppointment = () => {
    navigate(`/patient/booking/select-slot/${doctorData.id}`);
  };

  const handleWriteReview = () => {
    navigate(`/patient/doctor/review/${doctorData.id}`);
  };

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>{doctorData.name} | Doctor Profile | Neo-Health</title>
      <meta name="description" content={`View medical credentials, ratings, next available slots, and patient reviews for ${doctorData.name}.`} />

      <div className="container-fluid p-0">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-secondary">Find Doctors</Link></li>
            <li className="breadcrumb-item"><span className="text-secondary">Cardiology</span></li>
            <li className="breadcrumb-item active text-primary fw-bold" aria-current="page">{doctorData.name}</li>
          </ol>
        </nav>

        {/* Bento Grid Layout */}
        <div className="row g-4">
          {/* Column 1: Profile & Identity Card */}
          <div className="col-12 col-xl-8">
            <div className="neo-glass-card p-4 h-100 d-flex flex-column flex-md-row gap-4 align-items-start">
              <div className="position-relative mx-auto mx-md-0 flex-shrink-0">
                <img
                  alt={doctorData.name}
                  className="rounded-4 border shadow-sm"
                  style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                  src={doctorData.avatar}
                />
                <div
                  className="position-absolute translate-middle-x bg-white px-3 py-1 rounded-pill shadow-sm border d-flex align-items-center gap-1 text-nowrap"
                  style={{ bottom: '-15px', left: '50%' }}
                >
                  <i className="bi bi-star-fill text-warning small"></i>
                  <span className="small fw-bold text-dark">{doctorData.rating} ({doctorData.reviewsCount} Reviews)</span>
                </div>
              </div>

              <div className="flex-grow-1 w-100 mt-3 mt-md-0">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold text-dark mb-1">{doctorData.name}</h2>
                    <p className="text-primary fw-semibold mb-3">{doctorData.title}</p>
                  </div>
                  <button
                    className={`btn rounded-circle p-2 d-flex align-items-center justify-content-center border transition-all ${
                      favorite ? 'btn-danger border-danger text-white' : 'btn-light hover-bg-danger-subtle text-secondary'
                    }`}
                    onClick={() => setFavorite(!favorite)}
                    type="button"
                    aria-label="Favorite doctor"
                  >
                    <i className={`bi ${favorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </button>
                </div>

                <div className="d-flex flex-wrap gap-3 mb-4 text-secondary small">
                  <span className="d-flex align-items-center gap-2">
                    <i className="bi bi-briefcase text-primary"></i>
                    {doctorData.experience}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt text-primary"></i>
                    {doctorData.hospital}
                  </span>
                  <span className="d-flex align-items-center gap-2">
                    <i className="bi bi-translate text-primary"></i>
                    {doctorData.languages}
                  </span>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3">
                  <button
                    className="btn btn-primary-neo py-2.5 px-4 flex-grow-1"
                    onClick={handleBookAppointment}
                    id="doc-btn-book"
                  >
                    Book Appointment
                  </button>
                  <button className="btn btn-secondary-neo py-2.5 px-4 flex-grow-1" type="button">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Next Availability & Fees Card */}
          <div className="col-12 col-xl-4">
            <div className="neo-glass-card p-4 h-100 d-flex flex-column justify-content-between gap-4">
              <div>
                <h4 className="fw-bold text-dark mb-3">Next Availability</h4>
                
                <div className="p-3 bg-light rounded-3 border mb-3 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <i className="bi bi-calendar-check-fill fs-5"></i>
                    </div>
                    <div>
                      <p className="fw-bold text-dark mb-0 small">{doctorData.nextAvailability.date}</p>
                      <small className="text-secondary">{doctorData.nextAvailability.time}</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>

                {/* Days list grid */}
                <div className="row g-2 text-center">
                  <div className="col-4">
                    <div className="p-2 border rounded-3 hover-border-primary cursor-pointer transition-all bg-white" onClick={handleBookAppointment}>
                      <small className="text-secondary d-block">Wed</small>
                      <span className="fw-bold text-dark">25</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 border rounded-3 hover-border-primary cursor-pointer transition-all bg-white" onClick={handleBookAppointment}>
                      <small className="text-secondary d-block">Thu</small>
                      <span className="fw-bold text-dark">26</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 border rounded-3 hover-border-primary cursor-pointer transition-all bg-white" onClick={handleBookAppointment}>
                      <small className="text-secondary d-block">Fri</small>
                      <span className="fw-bold text-dark">27</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-2 border-secondary opacity-25" />

              <div>
                <small className="text-secondary text-uppercase fw-semibold tracking-wider d-block mb-1">Consultation Fee</small>
                <h4 className="fw-bold text-dark mb-0">
                  {doctorData.fee} <span className="small fw-normal text-secondary">/ session</span>
                </h4>
              </div>
            </div>
          </div>

          {/* Column 3: Biography */}
          <div className="col-12 col-xl-8">
            <div className="d-flex flex-column gap-4">
              <div className="neo-glass-card p-4">
                <h4 className="fw-bold text-dark mb-3">Biography</h4>
                <p className="text-secondary leading-relaxed mb-0 small">{doctorData.biography}</p>
              </div>

              {/* Column 4: Qualifications */}
              <div className="neo-glass-card p-4">
                <h4 className="fw-bold text-dark mb-3">Qualifications & Education</h4>
                <div className="d-flex flex-column gap-3">
                  {doctorData.qualifications.map((qual, idx) => (
                    <div key={idx} className="d-flex gap-3 align-items-start">
                      <div className="bg-light border rounded-3 p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '45px', height: '45px' }}>
                        <i className={`bi ${qual.icon} text-secondary fs-4`}></i>
                      </div>
                      <div>
                        <p className="fw-bold text-dark mb-0 small">{qual.type}</p>
                        <small className="text-secondary">{qual.detail}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Patient Reviews */}
          <div className="col-12 col-xl-4">
            <div className="neo-glass-card p-4 h-100 d-flex flex-column justify-content-between gap-4">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold text-dark mb-0">Patient Reviews</h4>
                  <a href="#" className="small text-primary text-decoration-none fw-semibold">View All</a>
                </div>

                <div className="d-flex flex-column gap-3">
                  {doctorData.reviews.map((rev) => (
                    <div key={rev.id} className="pb-3 border-bottom last-border-none">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            alt={rev.author}
                            className="rounded-circle border"
                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                            src={rev.avatar}
                          />
                          <div>
                            <p className="fw-semibold text-dark mb-0 small">{rev.author}</p>
                            <small className="text-secondary" style={{ fontSize: '0.75rem' }}>{rev.date}</small>
                          </div>
                        </div>
                        <div className="d-flex text-warning gap-0.5" style={{ fontSize: '0.8rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-secondary small mb-0 font-italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-secondary-neo w-100 py-2.5"
                onClick={handleWriteReview}
                id="doc-btn-review"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .last-border-none:last-child {
          border-bottom: 0 !important;
        }
        .hover-border-primary:hover {
          border-color: var(--primary-color) !important;
        }
      `}</style>
    </PatientLayout>
  );
}

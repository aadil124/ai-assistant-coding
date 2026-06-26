import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout.jsx';

export default function MyAppointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Load dynamically scheduled appointments if they exist in local storage
  const [scheduledBooking, setScheduledBooking] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem('success_doc_name') || "Dr. Sarah Jenkins";
    const savedDate = localStorage.getItem('temp_booking_date') || "Thursday, Oct 24, 2024";
    const savedTime = localStorage.getItem('temp_booking_time') || "10:30 AM EST";
    const savedAvatar = localStorage.getItem('success_doc_avatar') || "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I";

    // Set dynamic scheduled booking
    setScheduledBooking({
      id: "marcus-thorne",
      dr: savedName,
      spec: savedName.includes("Sarah") ? "Cardiology • Telehealth" : "Cardiology • Telehealth",
      status: "Confirmed",
      date: savedDate,
      time: savedTime,
      type: "tele",
      img: savedAvatar
    });
  }, []);

  const mockData = {
    upcoming: [
      {
        id: "sarah-mitchell",
        dr: "Dr. Sarah Mitchell",
        spec: "Cardiology • Telehealth",
        status: "Confirmed",
        date: "Thursday, Oct 24, 2024",
        time: "10:30 AM - 11:00 AM",
        type: "tele",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5gmFA80Dz0cjaudLU9S-rFaWsKwMpz4TeGZNuG6tQiKA8Un5EKpw-RPC2VSovsVy5u9Nhtoyz-VJ0UfQ3LiYH9yJf3qxKE-G0Awobzvc2mPuew2F5FrAQ1n4kDsFKYoq-R8It3zVomIF5bYSyK-Jnx9CLx1KXSyc0Ikikrvav3Uf3zbxj2QTTW-RNNCgUagaazTYeZMZdzHyI4zkstZ2h_I77-YuKn24uD-ZCNc8SNe4JS0llxHy7Az-ahRjukPbryFih5aXg4LI"
      },
      {
        id: "james-wilson",
        dr: "Dr. James Wilson",
        spec: "Neurology • In-Clinic",
        status: "Follow-up",
        date: "Monday, Oct 28, 2024",
        time: "02:15 PM - 03:00 PM",
        type: "clinic",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9BaZtHwqiRB8J6iG-Ufp_7tu9IiA1d6svPw__zib3-8RCmwU4E2WGLt4RHMlxstuAMKanxYYHfiuAybrmIGBUC9a7k6iGKs6CEpxMtO62fpUD5vXHrAne_1zY-EAdUYcJrhZq-ETTEzMMfIKquL3cv1I8ayr6yyO-Ek-QZ-oVomRElKerkomGf_2c1Ynj1YZ_2UHAQ54Q7nX8TQAApQZOBl5cEoeejywg2tL0Wuo73WpwHiAtxOHrnBFIYX3uLtXYnCIP8ffwzpQ"
      },
      {
        id: "elena-rodriguez",
        dr: "Dr. Elena Rodriguez",
        spec: "Pediatrics • Telehealth",
        status: "Urgent Care",
        date: "Thursday, Nov 02, 2024",
        time: "09:00 AM - 09:30 AM",
        type: "tele",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJI5yc8Vzw2rIus4TZVv_nVXGguccVxGzvOS42B-C76r8P4QdcPP9QVnmGhSG6Wi2WeJ5v6fh4qgTxjR1r17_7EsQ76zpkcafnKQOa03w6E7znAivqr5kHBTC29QsW4Hh5DKkx0uzmuYzWyFAGKeCJ8LvqDujDHVff8UJpX9PN_TDQTybQtisPWrbc66uwW0Q9JGNzjalqcP00ogTkA10vAzNBdEqGwjvNOEB7_tpnS94xTh-BnKJyZtZE67IfYiZMpkJ6aOK41sQ"
      }
    ],
    past: [
      {
        id: "emily-chen",
        dr: "Dr. Emily Chen",
        spec: "Dermatology • In-Clinic",
        status: "Completed",
        date: "Friday, Sep 15, 2024",
        time: "11:00 AM - 11:45 AM",
        type: "clinic",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuoaaJq1dzpLYqpwaoHbWLUS9er7xhRKeApSB0VopLEJr-okk5z-PZa53MVCv8wJHNOGIeCiOw1JkzsxU5WnlhW0sCTGSWBnG2BilhbwHBn9kgFrtRUdTt0QJ-fo8bjSsgqTxjrBcqMe9fZCwlUoKyaYXzf7Pmmg0kYz103JCYMBeSaa5Us4wHD72pPIXlrLSEGqRkCnCQtb6B5Futrlbb2NQuGyKDPzhTKbZZQ3T5YNovdRQY71UZArGrBAJeykuVr0576bTFpIY"
      }
    ],
    cancelled: [
      {
        id: "robert-fox",
        dr: "Dr. Robert Fox",
        spec: "General Practice • Telehealth",
        status: "Cancelled",
        date: "Tuesday, Oct 01, 2024",
        time: "04:00 PM - 04:30 PM",
        type: "tele",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_LUVkxRLdtqJfZRfZnDf5DaY_SWYcUptyYr5HRBIJH3H1siOjMWWlVQ6QRk4_0ByoYX1ivnl2g5-TgVWoQFkLngcGc-6Fx0HFCfwvUT7aB81ozElP5i2J9SxJnqEP-1_dXqRfgeEZcfG32YJwko_HhMoBb3q5vDVeDZYkjB4SGoRepRY05bRI6J7HF_3Kjd21CP01FvyPHFzopCiPBq7hIA0nxdfVEv14CAc86HC0yAD0s2wcBNVM6erJJEIVvdA-jtIdneAjKIk"
      }
    ]
  };

  const handleJoinMeeting = (docId) => {
    navigate(`/patient/consultation/waiting-room/${docId || 'default'}`);
  };

  const handleNewBooking = () => {
    navigate('/patient/doctor/marcus-thorne');
  };

  // Combine static mock data with dynamic scheduled appointment if it exists
  const getTabItems = () => {
    const list = mockData[activeTab];
    if (activeTab === 'upcoming' && scheduledBooking) {
      // Avoid duplication if Sarah Jenkins/Mitchell is already present
      const exists = list.some(item => item.dr === scheduledBooking.dr);
      if (!exists) {
        return [scheduledBooking, ...list];
      }
    }
    return list;
  };

  const currentItems = getTabItems();

  return (
    <PatientLayout>
      {/* React 19 Document Metadata */}
      <title>My Appointments | Neo-Health Dashboard</title>
      <meta name="description" content="View upcoming consultations, past medical histories, and reschedule healthcare appointments." />

      <div className="container-fluid py-2">
        {/* Page Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-end gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">My Appointments</h2>
            <p className="text-secondary mb-0 small">Manage and track your healthcare journey.</p>
          </div>
          <button
            onClick={handleNewBooking}
            className="btn btn-primary-neo d-flex align-items-center gap-2 shadow-sm"
          >
            <i className="bi bi-plus-lg fw-bold"></i>
            <span>Book New Appointment</span>
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="mb-4">
          <ul className="nav nav-tabs border-bottom border-light-subtle gap-2">
            {['upcoming', 'past', 'cancelled'].map(tab => (
              <li className="nav-item" key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`nav-link border-0 pb-3 px-3 fw-semibold text-capitalize transition-all position-relative ${
                    activeTab === tab
                      ? 'text-primary border-bottom border-primary active'
                      : 'text-secondary bg-transparent hover-link'
                  }`}
                  style={{
                    borderBottomWidth: activeTab === tab ? '3px' : '0px',
                    borderBottomStyle: 'solid',
                    borderColor: 'var(--primary-color)'
                  }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Appointments Grid */}
        <div className="row g-4">
          {currentItems.map((item, index) => (
            <div className="col-12 col-xl-6" key={`${item.id}-${index}`}>
              <div className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    <img
                      alt={`Headshot of ${item.dr}`}
                      className="rounded-3 border object-fit-cover"
                      style={{ width: '64px', height: '64px' }}
                      src={item.img}
                    />
                    <div>
                      <h4 className="fw-bold text-dark fs-5 mb-1">{item.dr}</h4>
                      <p className="text-secondary small mb-0">{item.spec}</p>
                    </div>
                  </div>
                  <span
                    className={`badge px-3 py-2 rounded-pill small fw-semibold ${
                      item.status === 'Confirmed' || item.status === 'Follow-up'
                        ? 'bg-success bg-opacity-10 text-success'
                        : item.status === 'Cancelled'
                        ? 'bg-danger bg-opacity-10 text-danger'
                        : 'bg-primary bg-opacity-10 text-primary'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="row g-2 bg-light p-3 rounded-3 my-1">
                  <div className="col-12 col-sm-6 d-flex align-items-center gap-2 text-secondary small">
                    <i className="bi bi-calendar3 text-primary fs-6"></i>
                    <span className="fw-medium text-dark">{item.date}</span>
                  </div>
                  <div className="col-12 col-sm-6 d-flex align-items-center gap-2 text-secondary small">
                    <i className="bi bi-clock text-primary fs-6"></i>
                    <span className="fw-medium text-dark">{item.time}</span>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-auto pt-3 border-top border-light-subtle">
                  {activeTab === 'upcoming' && item.type === 'tele' ? (
                    <button
                      onClick={() => handleJoinMeeting(item.id)}
                      className="btn btn-primary-neo flex-grow-1 py-2.5 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-camera-video-fill"></i>
                      <span>Join Meeting</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Details for ${item.dr} are listed in diagnostic summaries.`)}
                      className="btn btn-outline-secondary flex-grow-1 py-2.5 fw-medium text-dark bg-transparent"
                    >
                      View Details
                    </button>
                  )}

                  {activeTab === 'upcoming' && item.type === 'clinic' && (
                    <button
                      onClick={() => alert("Clinic location directions: 100 Broadway St, NY. Open in Google Maps.")}
                      className="btn btn-primary-neo flex-grow-1 py-2.5 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                      <span>Get Directions</span>
                    </button>
                  )}

                  {activeTab === 'upcoming' ? (
                    <button
                      onClick={() => navigate(`/patient/booking/select-slot/${item.id}`)}
                      className="btn btn-light border py-2.5 px-3 fw-medium text-dark hover-bg-light"
                    >
                      Reschedule
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/contact')}
                      className="btn btn-light border py-2.5 px-4 fw-medium text-dark hover-bg-light"
                    >
                      Help
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Dotted empty state outline grid space */}
          {currentItems.length < 3 && (
            <div className="col-12 col-xl-6">
              <div
                onClick={handleNewBooking}
                className="rounded-4 border border-dashed border-light-secondary p-4 d-flex flex-column align-items-center justify-content-center text-center text-secondary h-100 min-h-[200px] cursor-pointer hover-bg-light transition-all"
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-calendar-check text-secondary-emphasis fs-1 mb-2"></i>
                <h5 className="fw-semibold text-secondary-emphasis mb-1">Ready to Schedule?</h5>
                <p className="small text-secondary mb-0 max-w-[280px]">
                  Book another consultation with our care team specialized doctors.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
}

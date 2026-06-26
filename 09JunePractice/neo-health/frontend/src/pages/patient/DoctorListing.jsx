import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import SearchBar from '../../components/shared/SearchBar.jsx';
import FilterPanel from '../../components/shared/FilterPanel.jsx';
import EmptyState from '../../components/shared/EmptyState.jsx';
import SkeletonLoader from '../../components/shared/SkeletonLoader.jsx';

export default function DoctorListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [specialty, setSpecialty] = useState('All');
  const [rating, setRating] = useState('All Ratings');
  const [availability, setAvailability] = useState('All Availabilities');
  const [sortBy, setSortBy] = useState('rating'); // rating, fee, experience
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fallback / mock doctor database
  const fullDoctorDatabase = [
    {
      id: "marcus-thorne",
      name: "Dr. Marcus Thorne",
      title: "Senior Cardiologist & Surgeon",
      specialty: "Cardiology",
      rating: 4.9,
      reviewsCount: 1200,
      fee: 150,
      experience: 15,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8MQDeqe_BK1YI3jx3r0mo_Jqg5y0a8G9t_PcOnI7gT6Y98asePjLA7B7NNjXX9ZZwmBJIeHCz6ejyEGDOgkTAx1KsVoIV5M33Ey69DHp6IOgNcZPg9pNwHucW2FZRZOtOJgn9OMjGFmcTOkq3OpQGMhHscbP6ycqS0hEs04YWStFw_5llPTXb6xdSjNgOrYzvzfpHjH2drkoxZi4WMR6OCxi1sqhyWsuVX_WghE0AYEnkkpCoYNXI2cAPUyCDjkzVVv99f75OnAU",
      nextAvail: "Today, Oct 23",
      availableDateType: "Today"
    },
    {
      id: "michael-chen",
      name: "Dr. Michael Chen",
      title: "Senior Cardiologist, MD",
      specialty: "Cardiology",
      rating: 4.8,
      reviewsCount: 120,
      fee: 120,
      experience: 12,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5u9WNQi9wmrl3xH-0ZnySJa5mowvwB8eHWI06cNOVKdgpPHsZ2q2HlyYRzBqcZitqZKnAWUF9qYvgiU6Nc7YBWX76oTFsNt3-4lVbOWrPfkFuhXZnYiIzn2wuPV-bCe1YHDCreia_JKDc7nyP6RXAZ4QULVoSCmWmt43VDJLLcye6TI4XVKQQHrGgDgsMIexZStawFvSKTF6U_MVXTo1Ys_YeJjAwcy7lxQX0NNKirLkxsGEyvpHu7_duuw6O73Q-qZCOoTBxT2w",
      nextAvail: "Tomorrow, Oct 24",
      availableDateType: "Tomorrow"
    },
    {
      id: "sarah-jenkins",
      name: "Dr. Sarah Jenkins",
      title: "Pediatric Cardiologist, MD",
      specialty: "Pediatrics",
      rating: 4.7,
      reviewsCount: 94,
      fee: 140,
      experience: 10,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgdvZGJRQEh0vvrmMZQM7MklEMANJkW7sZy8PX5N2Wh-DJeU-FFp5ynr7MLG_9im4e3SNKID9ibnAp6Ah6sIurfCP_BZk-WjoyjhRepIm1btY4aACQr3eb6-_-VQkKfrHoOkl8PiQS3oWvbrG3sDKxhRP-IJAW_sKobqBfZjZkjViFixuGpaPsNg2Yb08kcZKeYHa0OArMSP_acWwllxSXQ8R9I_zrhVWHwz-GIzDB-aoHM0ubMz8mQn0ULSf8xIu_WVblCri120I",
      nextAvail: "This Friday, Oct 26",
      availableDateType: "This Week"
    },
    {
      id: "james-wilson",
      name: "Dr. James Wilson",
      title: "Senior Neurologist, MD",
      specialty: "Neurology",
      rating: 4.6,
      reviewsCount: 310,
      fee: 160,
      experience: 14,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9BaZtHwqiRB8J6iG-Ufp_7tu9IiA1d6svPw__zib3-8RCmwU4E2WGLt4RHMlxstuAMKanxYYHfiuAybrmIGBUC9a7k6iGKs6CEpxMtO62fpUD5vXHrAne_1zY-EAdUYcJrhZq-ETTEzMMfIKquL3cv1I8ayr6yyO-Ek-QZ-oVomRElKerkomGf_2c1Ynj1YZ_2UHAQ54Q7nX8TQAApQZOBl5cEoeejywg2tL0Wuo73WpwHiAtxOHrnBFIYX3uLtXYnCIP8ffwzpQ",
      nextAvail: "Next Monday, Oct 29",
      availableDateType: "This Week"
    },
    {
      id: "elena-rodriguez",
      name: "Dr. Elena Rodriguez",
      title: "General Pediatrician, MD",
      specialty: "Pediatrics",
      rating: 4.9,
      reviewsCount: 88,
      fee: 110,
      experience: 8,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJI5yc8Vzw2rIus4TZVv_nVXGguccVxGzvOS42B-C76r8P4QdcPP9QVnmGhSG6Wi2WeJ5v6fh4qgTxjR1r17_7EsQ76zpkcafnKQOa03w6E7znAivqr5kHBTC29QsW4Hh5DKkx0uzmuYzWyFAGKeCJ8LvqDujDHVff8UJpX9PN_TDQTybQtisPWrbc66uwW0Q9JGNzjalqcP00ogTkA10vAzNBdEqGwjvNOEB7_tpnS94xTh-BnKJyZtZE67IfYiZMpkJ6aOK41sQ",
      nextAvail: "Today, Oct 23",
      availableDateType: "Today"
    }
  ];

  const specialties = ['Cardiology', 'Pediatrics', 'Neurology'];

  // Simulate loading spinner / skeleton transitions on filter updates
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm, specialty, rating, availability, sortBy]);

  // Filter and sort computation
  const filteredDoctors = fullDoctorDatabase.filter(doc => {
    // Search Term match
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Specialty match
    const matchesSpecialty = specialty === 'All' || doc.specialty === specialty;
    
    // Rating match
    let matchesRating = true;
    if (rating === '4.5+') matchesRating = doc.rating >= 4.5;
    else if (rating === '4.0+') matchesRating = doc.rating >= 4.0;
    else if (rating === '3.5+') matchesRating = doc.rating >= 3.5;

    // Availability match
    let matchesAvail = true;
    if (availability === 'Today') matchesAvail = doc.availableDateType === 'Today';
    else if (availability === 'Tomorrow') matchesAvail = doc.availableDateType === 'Tomorrow';
    else if (availability === 'This Week') matchesAvail = doc.availableDateType === 'Today' || doc.availableDateType === 'Tomorrow' || doc.availableDateType === 'This Week';

    return matchesSearch && matchesSpecialty && matchesRating && matchesAvail;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fee') return a.fee - b.fee;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSpecialty('All');
    setRating('All Ratings');
    setAvailability('All Availabilities');
    setSortBy('rating');
  };

  const handleCardClick = (id) => {
    navigate(`/patient/doctor/${id}`);
  };

  return (
    <DashboardLayout>
      {/* React 19 Document Metadata */}
      <title>Find Specialists | Neo-Health Doctors</title>
      <meta name="description" content="Search verified medical practitioners and book consultations online." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Find Specialists"
          subtitle="Search, filter, and book sessions with verified doctors."
          breadcrumbs={[
            { label: 'Dashboard', path: '/patient/dashboard' },
            { label: 'Doctors', path: '/patient/doctors' }
          ]}
        />

        {/* Search & Filters Section */}
        <div className="neo-glass-card p-4 border bg-white shadow-sm mb-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by specialist name, title, or specialty keyword..."
                id="doc-search"
              />
            </div>
            <div className="col-12 col-lg-4 d-flex align-items-end">
              <div className="d-flex align-items-center gap-2 w-100">
                <label htmlFor="sort-select" className="small fw-semibold text-secondary text-nowrap mb-0">Sort By:</label>
                <select
                  id="sort-select"
                  className="form-select form-control-neo py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Highest Rating</option>
                  <option value="fee">Lowest Consultation Fee</option>
                  <option value="experience">Years of Experience</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="my-3 opacity-25" />

          {/* Filters Grid */}
          <FilterPanel
            specialty={specialty}
            setSpecialty={setSpecialty}
            rating={rating}
            setRating={setRating}
            availability={availability}
            setAvailability={setAvailability}
            specialties={specialties}
          />
        </div>

        {/* Doctor Grid Area */}
        {loading ? (
          <SkeletonLoader type="card" count={3} />
        ) : filteredDoctors.length === 0 ? (
          <EmptyState
            icon="bi-emoji-frown"
            title="No specialists matched your search"
            description="Try modifying search text, resetting specialty categories, or relaxing rating filters to see more results."
            actionLabel="Reset Search Filters"
            onActionClick={handleClearFilters}
          />
        ) : (
          <>
            <div className="row g-4 mb-4">
              {filteredDoctors.map((doc) => (
                <div className="col-12 col-md-6 col-xl-4" key={doc.id}>
                  <div
                    className="neo-glass-card p-4 border bg-white shadow-sm h-100 d-flex flex-column justify-content-between cursor-pointer"
                    onClick={() => handleCardClick(doc.id)}
                  >
                    <div>
                      {/* Doctor Profile Top */}
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <img
                          alt={doc.name}
                          className="rounded-4 border object-fit-cover"
                          style={{ width: '72px', height: '72px' }}
                          src={doc.avatar}
                        />
                        <div className="flex-grow-1">
                          <h4 className="fw-bold text-dark fs-6 mb-1">{doc.name}</h4>
                          <span className="badge bg-primary bg-opacity-10 text-primary small fw-semibold mb-2 d-inline-block">
                            {doc.title}
                          </span>
                          <div className="d-flex align-items-center gap-1 text-warning small">
                            <i className="bi bi-star-fill"></i>
                            <span className="text-dark fw-bold">{doc.rating}</span>
                            <span className="text-secondary">({doc.reviewsCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      {/* Doctor Details */}
                      <div className="d-flex flex-column gap-2 border-top border-bottom py-3 my-3 small text-secondary">
                        <div className="d-flex justify-content-between">
                          <span>Specialty</span>
                          <span className="fw-semibold text-dark">{doc.specialty}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Experience</span>
                          <span className="fw-semibold text-dark">{doc.experience} Years</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Consultation Fee</span>
                          <span className="fw-bold text-primary">${doc.fee.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Availability banner */}
                      <div className="p-2.5 bg-light rounded-3 border mb-3 d-flex align-items-center justify-content-between small">
                        <span className="text-secondary">Next availability:</span>
                        <span className="fw-bold text-dark">{doc.nextAvail}</span>
                      </div>

                      {/* CTA Buttons */}
                      <div className="d-flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/patient/booking/select-slot/${doc.id}`);
                          }}
                          className="btn btn-primary-neo flex-grow-1 py-2 rounded-3 small"
                        >
                          Book Slot
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(doc.id);
                          }}
                          className="btn btn-secondary-neo flex-grow-1 py-2 rounded-3 small bg-transparent text-secondary border"
                        >
                          Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="small text-secondary">Showing {filteredDoctors.length} specialist(s)</span>
              <nav aria-label="Page navigation" className="mb-0">
                <ul className="pagination mb-0 small gap-1">
                  <li className="page-item disabled">
                    <button className="page-link border rounded-3 bg-white text-secondary py-2 px-3" type="button">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link border rounded-3 py-2 px-3 active btn-primary-neo" type="button">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link border rounded-3 bg-white text-secondary py-2 px-3" type="button" onClick={() => alert("Simulated pagination. Only Page 1 is populated.")}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

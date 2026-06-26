import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout.jsx';
import PageHeader from '../../components/shared/PageHeader.jsx';
import RatingSummary from '../../components/shared/RatingSummary.jsx';
import ReviewCard from '../../components/shared/ReviewCard.jsx';
import SearchBar from '../../components/shared/SearchBar.jsx';
import EmptyState from '../../components/shared/EmptyState.jsx';

export default function DoctorReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, highest, lowest

  // Mock patient reviews database
  const [reviews] = useState([
    {
      id: "rev-1",
      authorName: "Sarah Mitchell",
      date: "2 weeks ago",
      rating: 5,
      comment: "Dr. Thorne is incredibly thorough. He took the time to explain my cardiac condition in a way I could actually understand. Highly recommend!"
    },
    {
      id: "rev-2",
      authorName: "James Lee",
      date: "1 month ago",
      rating: 4,
      comment: "Very professional staff and Dr. Thorne was very punctual. The clinic itself is state-of-the-art. Great experience overall."
    },
    {
      id: "rev-3",
      authorName: "Emily Fox",
      date: "2 months ago",
      rating: 5,
      comment: "Excellent virtual consultation. His explanation of the Lisinopril medication helped me understand the dosage cycles clearly."
    }
  ]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setRatingFilter('All');
    setSortBy('newest');
  };

  // Filter and sort computation
  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = rev.authorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rev.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'All' || rev.rating === Number(ratingFilter);
    return matchesSearch && matchesRating;
  }).sort((a, b) => {
    // Note: We use static order for mock date times, but ratings are numerical
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0; // default order remains
  });

  return (
    <DoctorLayout>
      {/* React 19 Document Metadata */}
      <title>Patient Reviews Ledger | Neo-Health Doctors</title>
      <meta name="description" content="Read rating reviews left by verified patients post-consultation and review practice statistics." />

      <div className="container-fluid p-0">
        {/* Page Header */}
        <PageHeader
          title="Patient Feedback Reviews"
          subtitle="Track patient satisfaction scores and reviews details."
          breadcrumbs={[
            { label: 'Dashboard', path: '/doctor/dashboard' },
            { label: 'Reviews Board', path: '/doctor/reviews' }
          ]}
        />

        {/* Rating summary cards */}
        <div className="row g-4 mb-4">
          <div className="col-12">
            <RatingSummary
              average={4.8}
              totalReviews={1200}
              distribution={[88, 8, 3, 1, 0]}
            />
          </div>
        </div>

        {/* Filters and search card */}
        <div className="neo-glass-card p-4 border bg-white shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-12 col-lg-5">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search reviews by patient name or comments..."
                id="review-search"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="rev-filter-rating" className="small fw-semibold text-secondary text-nowrap mb-0">Stars:</label>
                <select
                  id="rev-filter-rating"
                  className="form-select form-control-neo py-2"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="All">All Stars</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="rev-sort-by" className="small fw-semibold text-secondary text-nowrap mb-0">Sort:</label>
                <select
                  id="rev-sort-by"
                  className="form-select form-control-neo py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest Feedback</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews scrolling list */}
        {filteredReviews.length === 0 ? (
          <EmptyState
            icon="bi-chat-left-quote"
            title="No reviews match your query"
            description="Try typing different patient names or clearing rating star filters to populate your review desk."
            actionLabel="Reset Review Filters"
            onActionClick={handleClearFilters}
          />
        ) : (
          <div className="d-flex flex-column gap-3 mb-4">
            {filteredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}

      </div>
    </DoctorLayout>
  );
}

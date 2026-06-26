import React from 'react';

export default function FilterPanel({
  specialty,
  setSpecialty,
  rating,
  setRating,
  availability,
  setAvailability,
  specialties = [],
  ratings = ['4.5+', '4.0+', '3.5+', 'All Ratings'],
  availabilities = ['Today', 'Tomorrow', 'This Week', 'All Availabilities']
}) {
  return (
    <div className="row g-3">
      {/* Specialty Filter */}
      <div className="col-12 col-md-4">
        <label htmlFor="filter-specialty" className="form-label small fw-semibold text-secondary mb-1">Specialty</label>
        <select
          id="filter-specialty"
          className="form-select form-control-neo py-2"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="All">All Specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="col-12 col-md-4">
        <label htmlFor="filter-rating" className="form-label small fw-semibold text-secondary mb-1">Minimum Rating</label>
        <select
          id="filter-rating"
          className="form-select form-control-neo py-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {ratings.map((rateOption) => (
            <option key={rateOption} value={rateOption}>{rateOption}</option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div className="col-12 col-md-4">
        <label htmlFor="filter-availability" className="form-label small fw-semibold text-secondary mb-1">Availability</label>
        <select
          id="filter-availability"
          className="form-select form-control-neo py-2"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          {availabilities.map((availOption) => (
            <option key={availOption} value={availOption}>{availOption}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

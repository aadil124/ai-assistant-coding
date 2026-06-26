import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search...', id = 'search-input' }) {
  return (
    <div className="position-relative w-100">
      <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control form-control-neo ps-5 pe-4 w-100 small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
      />
      {value && (
        <button
          type="button"
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary p-0 border-0 bg-transparent text-decoration-none"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <i className="bi bi-x-circle-fill"></i>
        </button>
      )}
    </div>
  );
}

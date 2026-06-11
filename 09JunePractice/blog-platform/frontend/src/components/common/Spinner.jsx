import React from 'react';

const Spinner = ({ className = '', ...props }) => {
  return (
    <div className={`d-flex justify-content-center my-3 ${className}`} {...props}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

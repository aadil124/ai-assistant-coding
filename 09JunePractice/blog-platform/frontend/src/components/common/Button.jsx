import React from 'react';

const Button = ({
  children,
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-lumina-primary w-full py-2 rounded-3 ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="d-flex align-items-center justify-content-center gap-2">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

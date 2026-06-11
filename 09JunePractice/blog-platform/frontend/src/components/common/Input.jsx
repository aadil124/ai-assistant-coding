import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error = '',
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label text-secondary fw-semibold small mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`form-control px-3 py-2 bg-white border focus-ring ${
          error ? 'is-invalid border-danger' : 'border-light-subtle'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        {...props}
      />
      {error && <div className="invalid-feedback d-block mt-1 text-danger small">{error}</div>}
    </div>
  );
};

export default Input;

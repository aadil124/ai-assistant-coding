import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`auth-card p-4 border rounded-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;

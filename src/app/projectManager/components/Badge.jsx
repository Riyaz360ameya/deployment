import React from 'react';

const Badge = ({ label, color }) => {
  return (
    <span className={`inline-block px-2 py-1 text-sm font-semibold rounded ${color}`}>
      {label}
    </span>
  );
};

export default Badge;

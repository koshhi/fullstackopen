import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <input value={searchTerm} onChange={handleSearchChange} placeholder="find countries" />
    </div>
  );
};

export default Filter;

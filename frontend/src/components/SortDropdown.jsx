// src/components/SortDropdown.js
import React from "react";

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
      <option value="quantity">Sort by Quantity</option>
    </select>
  );
};

export default SortDropdown;
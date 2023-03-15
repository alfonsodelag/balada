import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <ul className="flex justify-around mt-20 w-7/12 mx-auto">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`px-2 py-1 ${
            pageNumber === currentPage
              ? 'bg-blue-500 text-white rounded-lg '
              : ''
          }`}
          onClick={() => handleClick(pageNumber)}
        >
          <a href="#" className="cursor-pointer">
            {pageNumber}
          </a>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;

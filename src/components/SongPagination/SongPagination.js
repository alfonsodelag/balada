import React from 'react';
import PropTypes from 'prop-types';

const SongPagination = ({
  currentPage,
  setCurrentPage,
  filteredSongs,
  itemsPerPage,
}) => {
  const pageNumbers = Math.ceil(filteredSongs.length / itemsPerPage);
  const buttons = [];

  for (let i = 1; i <= pageNumbers; i++) {
    buttons.push(
      <li
        key={i}
        className={`px-2 py-1 ${
          i === currentPage ? 'bg-blue-500 text-white rounded-lg' : ''
        }`}
        onClick={() => setCurrentPage(i)}
      >
        <a href="#" className="cursor-pointer">
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="flex justify-around mt-20 w-7/12 mx-auto">{buttons}</ul>
  );
};

SongPagination.propTypes = {
  filteredSongs: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default SongPagination;

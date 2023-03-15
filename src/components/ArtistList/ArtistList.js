import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ArtistList = ({
  artists,
  searchQuery,
  itemsPerPage,
  handleSearchChange,
  handleItemsPerPageChange,
}) => {
  return (
    <div>
      <div className="px-4">
        <h1 className="text-xl font-bold mb-4">Artists</h1>
        <input
          type="text"
          placeholder="Search artist"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-400 rounded px-2 py-1 mb-4 mr-4"
        />
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-gray-400 rounded px-2 py-1 mb-4"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="30">30 per page</option>
        </select>
      </div>
      <table className="table-auto w-11/12 mx-auto mt-10">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Artist</th>
            <th className="px-4 py-2 text-right"># Songs</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr
              key={artist.name}
              className="hover:bg-gray-100 border-b-2 border-gray-200"
            >
              <td className="px-4 py-3">
                <Link
                  to={`/artists/${encodeURIComponent(artist.name)}/songs`}
                  className="text-blue-500"
                >
                  {artist.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-right">{artist.n_songs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ArtistList.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      n_songs: PropTypes.number.isRequired,
    }),
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleItemsPerPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ArtistList;

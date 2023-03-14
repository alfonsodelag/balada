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
    <div className="m-auto">
      <h1>Artists</h1>
      <input
        type="text"
        placeholder="Search artist"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
        <option value="50">50 per page</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th># Songs</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.name}>
              <td>
                <Link to={`/artists/${encodeURIComponent(artist.name)}/songs`}>
                  {artist.name}
                </Link>
              </td>
              <td>{artist.n_songs}</td>
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

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSongList from '../../common/hooks/useSongList';
import SongList from '../../components/SongList/SongList';
import SongPagination from '../../components/SongPagination/SongPagination';
import PropTypes from 'prop-types';

const Songs = ({ artistTerm, setArtistTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const { artistName } = useParams();
  const navigate = useNavigate();

  const { songs, filteredSongs } = useSongList({
    artistName,
    currentPage,
    itemsPerPage,
    searchTerm,
    artistTerm,
  });

  // Paginate songs
  const indexOfLastSong = currentPage * itemsPerPage;
  const indexOfFirstSong = indexOfLastSong - itemsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Handle search input change
  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    navigate(
      `/artists/${encodeURIComponent(artistName)}/songs/${encodeURIComponent(
        newSearchTerm,
      )}`,
    );
  };

  // Handle artist input change
  const handleArtistTermChange = (event) => {
    const newArtistTerm = event.target.value;
    setArtistTerm(newArtistTerm);
    if (newArtistTerm !== '') {
      setArtistTerm(newArtistTerm);
      navigate(`/artists/${newArtistTerm}/songs`);
    } else {
      navigate(`/artists/${artistTerm}/songs`);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSongs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by song name"
          className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <input
          type="text"
          placeholder="Search by artist"
          className="border border-gray-300 rounded-md py-2 px-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={artistTerm}
          onChange={handleArtistTermChange}
        />
      </div>
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
      </select>
      {songs.length > 0 && currentSongs.length > 0 && (
        <h2 className="text-3xl font-bold my-2">
          Artist: {currentSongs[0].group}
        </h2>
      )}
      {songs.length > 0 && currentSongs.length === 0 && (
        <h2 className="text-3xl font-bold my-2">
          No songs found for {searchTerm}
        </h2>
      )}

      <SongList songs={currentSongs} />
      <SongPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        filteredSongs={filteredSongs}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

Songs.propTypes = {
  artistTerm: PropTypes.string.isRequired,
  setArtistTerm: PropTypes.func.isRequired,
};

export default Songs;

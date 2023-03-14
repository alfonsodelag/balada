import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SongService from '../../common/services/song.service';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [artistTerm, setArtistTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { artistName } = useParams();

  useEffect(() => {
    // Fetch the list of songs for the artist from the SongService
    const fetchSongs = async () => {
      try {
        const response = await SongService.listaCanciones(
          currentPage - 1,
          itemsPerPage,
          (song) => {
            return song.group === artistName || artistName === undefined;
          },
        );
        setSongs(response.canciones);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, [artistName, currentPage, itemsPerPage]);

  // Filter songs based on search and artist terms
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      song.group.toLowerCase().includes(artistTerm.toLowerCase()),
  );

  console.log('filteredSongs!!', filteredSongs);
  // Paginate songs
  const indexOfLastSong = currentPage * itemsPerPage;
  const indexOfFirstSong = indexOfLastSong - itemsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Handle search input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle artist input change
  const handleArtistTermChange = (event) => {
    setArtistTerm(event.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  // Render paginated list of songs
  const renderSongs = () => {
    return (
      <ul>
        {currentSongs.map((song) => (
          <li key={song.title}>{song.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Songs</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
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
        <option value="20">20 per page</option>
        <option value="30">30 per page</option>
      </select>
      {renderSongs()}
    </div>
  );
};

export default Songs;

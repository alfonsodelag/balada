import { useState, useEffect } from 'react';
import SongService from '../services/song.service';

const useSongList = ({
  artistName,
  currentPage,
  itemsPerPage,
  searchTerm,
  artistTerm,
}) => {
  const [songs, setSongs] = useState([]);

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

  return { songs, filteredSongs };
};

export default useSongList;

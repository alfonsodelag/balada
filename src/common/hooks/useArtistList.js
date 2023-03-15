import { useState, useEffect } from 'react';
import SongService from '../services/song.service';

const useArtistList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArtists();
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 0) {
        const filtered = artists.filter((a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredArtists(filtered);
      } else {
        setFilteredArtists(artists);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, artists]);

  const loadArtists = () => {
    setIsLoading(true);
    SongService.listaArtistas(
      currentPage,
      itemsPerPage,
      (artist) => artist.includes(searchQuery),
      (a, b) => a.localeCompare(b),
    )
      .then(({ artistas, nPages }) => {
        setArtists(artistas);
        setTotalPages(nPages);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const value = Number(event.target.value);
    setItemsPerPage(value);
  };

  return {
    currentPage,
    itemsPerPage,
    artists,
    searchQuery,
    totalPages,
    filteredArtists,
    isLoading,
    handleSearchChange,
    handlePageChange,
    handleItemsPerPageChange,
  };
};

export default useArtistList;

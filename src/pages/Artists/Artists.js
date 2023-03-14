import React, { useState, useEffect } from 'react';
import ArtistList from '../../components/ArtistList/ArtistList';
import Pagination from '../../components/Pagination/Pagination';
import SongService from '../../common/services/song.service';

const Artists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    console.log('useEffect: loadArtists triggered');
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
    SongService.listaArtistas(
      currentPage,
      itemsPerPage, // use updated itemsPerPage state
      (artist) => artist.includes(searchQuery),
      (a, b) => a.localeCompare(b),
    )
      .then(({ artistas, nPages }) => {
        setArtists(artistas);
        setTotalPages(nPages);
      })
      .catch((error) => {
        console.error(error);
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
    console.log('handleItemsPerPageChange: ', value);
    setItemsPerPage(value);
  };

  return (
    <div>
      <h2 className="text-center text-3xl">List of Artists</h2>
      <div className="flex m-auto flex-col">
        <ArtistList
          artists={filteredArtists}
          searchQuery={searchQuery}
          itemsPerPage={itemsPerPage}
          handleSearchChange={handleSearchChange}
          handleItemsPerPageChange={handleItemsPerPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Artists;

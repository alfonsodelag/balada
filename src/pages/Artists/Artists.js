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

  useEffect(() => {
    loadArtists();
  }, [currentPage, itemsPerPage, searchQuery]);

  const loadArtists = () => {
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
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

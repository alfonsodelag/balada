import React, { useState, useEffect, useContext } from 'react';
import { SongContext } from './common/context/SongContext';
import SongService from './common/services/song.service';
import ArtistList from './components/ArtistList/ArtistList';
import Pagination from './components/Pagination/Pagination';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { artistTerm, setArtistTerm, songName, setSongName } =
    useContext(SongContext);

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

  return (
    <SongContext.Provider
      value={{ artistTerm, setArtistTerm, songName, setSongName }}
    >
      <div>
        <h2 className="text-center text-3xl my-4">List of Artists</h2>
        <div className="flex m-auto flex-col">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </SongContext.Provider>
  );
};

export default App;

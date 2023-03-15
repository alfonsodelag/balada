import React, { useContext } from 'react';
import { SongContext } from './common/context/SongContext';
import useArtistList from './common/hooks/useArtistList';
import ArtistList from './components/ArtistList/ArtistList';
import Pagination from './components/Pagination/Pagination';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const {
    currentPage,
    itemsPerPage,
    searchQuery,
    totalPages,
    filteredArtists,
    isLoading,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
  } = useArtistList();

  const { artistTerm, setArtistTerm, songName, setSongName } =
    useContext(SongContext);

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
                filteredArtists={filteredArtists}
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

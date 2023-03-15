import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SongContext = createContext({
  artistTerm: '',
  setArtistTerm: () => {},
  songName: '',
  setSongName: () => {},
});

export const SongProvider = ({ children }) => {
  const [artistTerm, setArtistTerm] = useState('');
  const [songName, setSongName] = useState('');

  return (
    <SongContext.Provider
      // @ts-ignore
      value={{ artistTerm, setArtistTerm, songName, setSongName }}
    >
      {children}
    </SongContext.Provider>
  );
};

SongProvider.propTypes = { children: PropTypes.any.isRequired };

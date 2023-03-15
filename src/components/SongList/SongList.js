import React from 'react';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const SongList = ({ songs }) => {
  return (
    <>
      {songs.map((song) => (
        <MusicPlayer key={uuidv4()} song={song} />
      ))}
    </>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SongList;

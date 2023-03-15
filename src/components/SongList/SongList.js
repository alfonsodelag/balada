import React from 'react';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import PropTypes from 'prop-types';

const SongList = ({ songs }) => {
  return (
    <>
      {songs.map((song) => (
        <MusicPlayer key={song.title} song={song} />
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

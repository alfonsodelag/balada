import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const MusicPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration);
    });

    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime);
    });

    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audioRef.current.removeEventListener('loadedmetadata', () => {});
      audioRef.current.removeEventListener('timeupdate', () => {});
      audioRef.current.removeEventListener('ended', () => {});
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(audioRef.current.volume);
  };

  console.log('song', song);

  return (
    <div className="bg-white rounded-lg p-4 border-2 shadow-md my-4 w-full">
      <h2 className="text-xl font-semibold my-2">Song Title: {song.title}</h2>
      <h2 className="text-xl font-semibold my-2">Song Album: {song.album}</h2>
      <h2 className="text-xl font-semibold my-2">
        Song Rating: {'⭐'.repeat(song.rating)}
      </h2>
      <audio ref={audioRef} src={song.src} />
      <div className="flex items-center">
        <div>
          <div>
            <button
              className="p-2 bg-blue-500 text-white rounded mr-4"
              onClick={togglePlay}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              className="p-2 bg-red-500 text-white rounded mr-4"
              onClick={stop}
            >
              Stop
            </button>
          </div>
          <label className="text-sm">Song Duration</label>
          <input
            className="w-full"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <div className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="flex-1">
            <input
              className="w-full"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
            <div className="text-sm">Volume: {Math.round(volume * 100)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

MusicPlayer.propTypes = {
  song: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      score: PropTypes.number,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  initialVolume: PropTypes.number,
};

export default MusicPlayer;

import React, { useState, useEffect, useRef } from 'react';
import './MusicBox.css';
import canAutoplay from 'can-autoplay';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('./music/music_loop.mp3')); // Ganti dengan path yang sesuai

  useEffect(() => {
    const audio = audioRef.current;
    audio.muted = true; // Set audio muted untuk autoplay

    // Cek apakah autoplay diizinkan
    canAutoplay.audio({ muted: true }).then(({ result }) => {
      if (result) {
        audio.play();
        setIsPlaying(true);
      }
    });

    // Event listener untuk autoplay
    const handleCanPlayThrough = () => {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
      }
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.pause();
      audio.currentTime = 0; // Reset audio saat komponen dibongkar
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    audio.muted = false; // Matikan audio saat pengguna mengklik
    setIsPlaying((prev) => {
      if (!prev) {
        audio.play();
      } else {
        audio.pause();
      }
      return !prev;
    });
  };

  return (
    <div 
      className={`mhMusicBars ${isPlaying ? 'active' : ''}`} 
      onClick={togglePlay}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MusicBox;
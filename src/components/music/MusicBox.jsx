import React, { useState, useEffect } from 'react';
import './MusicBox.css';
import canAutoplay from 'can-autoplay';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio('/music/music_loop.mp3'); // Ganti dengan path yang sesuai

  useEffect(() => {
    const checkAutoplay = async () => {
      const { result } = await canAutoplay.audio({ muted: true });
      if (result) {
        audio.muted = true; // Set audio muted untuk autoplay
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.warn('Autoplay failed:', error);
        }
      } else {
        console.warn('Autoplay is not allowed');
      }
    };

    checkAutoplay();

    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio saat komponen dibongkar
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.muted = false; // Matikan audio saat pengguna mengklik
      audio.play();
    }
    setIsPlaying((prev) => !prev);
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
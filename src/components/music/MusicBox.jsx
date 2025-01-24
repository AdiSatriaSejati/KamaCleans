import React, { useState, useEffect, useRef } from 'react';
import './MusicBox.css';
import canAutoplay from 'can-autoplay';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/music/music_loop.mp3')); // Pastikan path benar

  useEffect(() => {
    const audio = audioRef.current;

    // Set audio muted untuk autoplay
    audio.muted = true;

    // Cek apakah autoplay diizinkan
    const checkAutoplay = async () => {
      const { result } = await canAutoplay.audio({ muted: true });
      if (result) {
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
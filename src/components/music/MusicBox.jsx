import React, { useState, useEffect, useRef } from 'react';
import './MusicBox.css';
import canAutoplay from 'can-autoplay';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(new Audio('/music/music_loop.mp3'));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // Pastikan audio akan berulang
    
    // Event listener untuk klik di mana saja
    const handleFirstInteraction = async () => {
      if (!hasInteracted) {
        try {
          setHasInteracted(true);
          audio.muted = false;
          audio.volume = 1.0; // Pastikan volume maksimal
          await audio.play();
          setIsPlaying(true);
          
          // Hapus event listener setelah interaksi pertama berhasil
          document.removeEventListener('click', handleFirstInteraction);
        } catch (error) {
          console.warn('Playback failed:', error);
        }
      }
    };

    // Tambahkan event listener untuk klik di mana saja
    document.addEventListener('click', handleFirstInteraction);

    // Cek dan siapkan autoplay
    const prepareAutoplay = async () => {
      try {
        const { result } = await canAutoplay.audio();
        if (result) {
          audio.muted = true;
          audio.volume = 0; // Start with volume 0
          await audio.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.warn('Autoplay preparation failed:', error);
      }
    };

    prepareAutoplay();

    // Cleanup
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.volume = 1.0; // Pastikan volume maksimal saat toggle
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.warn('Toggle playback failed:', error));
    }
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
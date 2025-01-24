import React, { useState, useEffect, useRef } from 'react';
import './MusicBox.css';

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const audioRef = useRef(new Audio('../../../public/music/music_loop.mp3'));
  const musicBarsRef = useRef(null);

  useEffect(() => {
    // Inisialisasi Audio Context
    const initAudio = async () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const gain = context.createGain();
      const audioAnalyser = context.createAnalyser();

      gain.connect(audioAnalyser);
      audioAnalyser.connect(context.destination);
      gain.gain.value = 0.45;

      setAudioContext(context);
      setGainNode(gain);
      setAnalyser(audioAnalyser);
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    // Event listener untuk autoplay
    const handleCanPlayThrough = () => {
      audio.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
      setIsPlaying(true);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    // Memastikan audio berhenti saat komponen dibongkar
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
      audio.play().catch((error) => {
        console.error("Play failed:", error);
      });
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div 
      className={`mhMusicBars ${isPlaying ? 'active' : ''}`} 
      onClick={togglePlay}
      ref={musicBarsRef}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MusicBox;
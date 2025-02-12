import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import './MusicBox.css';

// Lazy load audio file
const audioURL = '/music/music_loop.mp3';

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="mhMusicBars">
    <span className="loading"></span>
    <span className="loading"></span>
    <span className="loading"></span>
    <span className="loading"></span>
  </div>
);

const MusicBox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const gainNodeRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        setIsLoading(true);
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        // Buat nodes
        gainNodeRef.current = audioContextRef.current.createGain();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        // Konfigurasi analyzer
        analyserRef.current.fftSize = 512;
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        // Set initial gain
        gainNodeRef.current.gain.value = 0;

        // Hubungkan nodes
        gainNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        // Lazy load audio file
        const response = await fetch(audioURL);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

        // Buat source
        sourceRef.current = audioContextRef.current.createBufferSource();
        sourceRef.current.buffer = audioBuffer;
        sourceRef.current.loop = true;
        sourceRef.current.connect(gainNodeRef.current);

        setIsReady(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing audio:', error);
        setIsLoading(false);
      }
    };

    initAudio();

    return () => {
      if (sourceRef.current) sourceRef.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = async () => {
      if (isReady && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        sourceRef.current.start();
        gainNodeRef.current.gain.value = 0.45;
        setIsPlaying(true);
        
        document.removeEventListener('click', handleGlobalClick);
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isReady]);

  const togglePlay = (e) => {
    e.stopPropagation();
    
    if (!isReady) return;

    if (gainNodeRef.current.gain.value === 0) {
      gainNodeRef.current.gain.value = 0.45;
      setIsPlaying(true);
    } else {
      gainNodeRef.current.gain.value = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div 
          className={`mhMusicBars ${isPlaying ? 'active' : ''}`} 
          onClick={togglePlay}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </Suspense>
  );
};

export default MusicBox;
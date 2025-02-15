import React, { useState, useEffect, useRef, Suspense } from 'react';
import './MusicBox.css';

// Ganti URL ke versi yang sudah dioptimasi
const audioURL = 'https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/music/music_loop.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL211c2ljL211c2ljX2xvb3AubXAzIiwiaWF0IjoxNzM5NjI4NDU0LCJleHAiOjE3NzExNjQ0NTR9.wzqFkFtxBw7XeNrm-b2ljmRu2ORPY3jMxEcQ9oXOPO0';

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
  const audioBufferRef = useRef(null);

  useEffect(() => {
    // Lazy load audio hanya ketika user berinteraksi
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  const initAudio = async () => {
    try {
      setIsLoading(true);
      
      // Inisialisasi Audio Context hanya ketika diperlukan
      if (!audioContextRef.current) {
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
      }

      // Load audio hanya jika belum di-cache
      if (!audioBufferRef.current) {
        const response = await fetch(audioURL);
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
      }

      // Buat source baru
      sourceRef.current = audioContextRef.current.createBufferSource();
      sourceRef.current.buffer = audioBufferRef.current;
      sourceRef.current.loop = true;
      sourceRef.current.connect(gainNodeRef.current);

      setIsReady(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing audio:', error);
      setIsLoading(false);
    }
  };

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
          role="button"
          aria-label="Toggle music"
          tabIndex={0}
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
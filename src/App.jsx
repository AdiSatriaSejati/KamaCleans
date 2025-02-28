import { useState, useEffect } from 'react';
import Loading from './components/loading/Loading';
import { DarkModeProvider } from './context/darkModeContext';
import Navbar from './components/navbar/Navbar';
import Beranda from './pages/Beranda/Beranda';
import Tentang from './pages/Tentang/Tentang';
import Layanan from './pages/Layanan/Layanan';
import Galeri from './pages/Galeri/Galeri';
import Kontak from './pages/Kontak/Kontak';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import OnlineTracker from './components/OnlineTracking/OnlineTracker';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <section id="beranda-section" aria-label="Beranda"><Beranda /></section>
          <section id="tentang-section" aria-label="Tentang Kama"><Tentang /></section>
          <section id="layanan-section" aria-label="Layanan"><Layanan /></section>
          <section id="galeri-section" aria-label="Galeri"><Galeri /></section>
          <section id="kontak-section" aria-label="Kontak"><Kontak /></section>
          <Footer />
          <ScrollToTop />
          <OnlineTracker />
        </div>
      </AuthProvider>
      <Analytics />
    </DarkModeProvider>
  );
}

export default App;
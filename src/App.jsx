import { useState, useEffect } from 'react';
import Loading from './components/loading/Loading';
import { DarkModeProvider } from './context/darkModeContext';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Gallery from './pages/Gallery/Gallery';
import Contact from './pages/Contact/Contact';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Favicon dan title changer
    const updateFaviconAndTitle = () => {
      const isDark = document.documentElement.classList.contains('dark');
      
      if (document.visibilityState === "visible") {
        document.title = "KamaCleans";
        // Menggunakan favicon sesuai mode
        document.querySelector("link[rel='icon']").href = isDark ? "/favicon-dark.ico" : "/favicon-light.ico";
        document.querySelector("link[rel='icon'][sizes='16x16']").href = isDark ? "/favicon-dark-16x16.png" : "/favicon-light-16x16.png";
        document.querySelector("link[rel='icon'][sizes='32x32']").href = isDark ? "/favicon-dark-32x32.png" : "/favicon-light-32x32.png";
        document.querySelector("link[rel='apple-touch-icon']").href = isDark ? "/apple-touch-icon-dark.png" : "/apple-touch-icon-light.png";
      } else {
        document.title = "Come Back";
        document.querySelector("link[rel='icon']").href = "/folded.ico";
      }
    };

    // Tambahkan event listener untuk perubahan mode dan visibility
    document.addEventListener('visibilitychange', updateFaviconAndTitle);
    document.documentElement.addEventListener('change-theme', updateFaviconAndTitle);
    
    // Initial update
    updateFaviconAndTitle();

    // Tambahkan preload untuk gambar kritikal
    const preloadImages = [
      '/images/logo-dark.webp',
      '/images/logo-light.webp',
      '/images/slider/1.webp',
      '/images/slider/2.webp',
      '/images/slider/3.webp',
      '/images/slider/effect-sprite-2.png',
      '/images/slider/effect-sprite.png',
      ,'/images/about.jpg'
      // ... gambar kritikal lainnya
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateFaviconAndTitle);
      document.documentElement.removeEventListener('change-theme', updateFaviconAndTitle);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <DarkModeProvider>
      <div className="App">
        <Navbar />
        <section id="home-section"><Home /></section>
        <section id="about-section"><About /></section>
        <section id="services-section"><Services /></section>
        <section id="gallery-section"><Gallery /></section>
        <section id="contact-section"><Contact /></section>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;
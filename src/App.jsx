import { useState, useEffect } from 'react';
import { DarkModeProvider } from './context/darkModeContext';
import Navbar from './components/navbar/Navbar';
import Loading from './components/loading/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
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
      if (document.visibilityState === "visible") {
        document.title = "KamaCleans";
        document.querySelector("link[rel='icon']").href = "/favicon.ico";
        document.querySelector("link[rel='icon'][sizes='16x16']").href = "/favicon-16x16.png";
        document.querySelector("link[rel='icon'][sizes='32x32']").href = "/favicon-32x32.png";
        document.querySelector("link[rel='apple-touch-icon']").href = "/apple-touch-icon.png";
      } else {
        document.title = "Come Back";
        document.querySelector("link[rel='icon']").href = "/folded.ico";
        document.querySelector("link[rel='icon'][sizes='16x16']").href = "/folded-16x16.png";
        document.querySelector("link[rel='icon'][sizes='32x32']").href = "/folded-32x32.png";
        document.querySelector("link[rel='apple-touch-icon']").href = "/folded-180x180.png";
      }
    };

    // Add visibility change listener
    document.addEventListener('visibilitychange', updateFaviconAndTitle);

    // Cleanup
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', updateFaviconAndTitle);
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
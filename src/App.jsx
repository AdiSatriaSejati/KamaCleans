import { useState, useEffect } from 'react';
import { DarkModeProvider } from './context/darkModeContext';
import Navbar from './components/navbar/Navbar';
import Loading from './components/loading/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <DarkModeProvider>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <section id="home-section"><Home /></section>
          <section id="about-section"><About /></section>
          <section id="services-section"><Services /></section>
          <section id="portfolio-section"><Portfolio /></section>
          <section id="contact-section"><Contact /></section>
        </main>
      </div>
    </DarkModeProvider>
  );
}

export default App;
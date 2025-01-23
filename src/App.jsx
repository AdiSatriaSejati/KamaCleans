// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Loading from './components/loading/Loading';
import './App.css';

// Tambahkan komponen halaman sementara
const Home = () => <div className="page">Home Page</div>;
const About = () => <div className="page">About Page</div>;
const Services = () => <div className="page">Services Page</div>;
const Location = () => <div className="page">Location Page</div>;
const Gallery = () => <div className="page">Gallery Page</div>;
const Contact = () => <div className="page">Contact Page</div>;


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
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/location" element={<Location />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
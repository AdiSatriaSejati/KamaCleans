import { useState, useEffect, lazy, Suspense } from 'react';
import Loading from './components/loading/Loading';
import { DarkModeProvider } from './context/darkModeContext';
import Navbar from './components/navbar/Navbar';
import Beranda from './pages/Beranda/Beranda';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from "@vercel/analytics/react";
import Footer from './components/footer/Footer';
import './App.css';

// Lazy load halaman yang tidak dibutuhkan di awal
const Tentang = lazy(() => import('./pages/Tentang/Tentang'));
const Layanan = lazy(() => import('./pages/Layanan/Layanan')); 
const Galeri = lazy(() => import('./pages/Galeri/Galeri'));
const Kontak = lazy(() => import('./pages/Kontak/Kontak'));

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
        document.querySelector("link[rel='icon']").href = isDark ? "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-dark.ico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tZGFyay5pY28iLCJpYXQiOjE3Mzk0NzMyOTIsImV4cCI6MTc3MTAwOTI5Mn0.PJu2hFTFasqIQJTEpIZL8BhmcBEzemoSqjFUheKjbR0" : "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-light.ico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tbGlnaHQuaWNvIiwiaWF0IjoxNzM5NDczMzI0LCJleHAiOjE3NzEwMDkzMjR9.vzuHw405qVHkt4Wc9-9OY1wbF9FmShdpoHu6o-eDCoc";
        document.querySelector("link[rel='icon'][sizes='16x16']").href = isDark ? "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-dark-16x16.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tZGFyay0xNngxNi5wbmciLCJpYXQiOjE3Mzk0NzMzNzQsImV4cCI6MTc3MTAwOTM3NH0.WbtR1pdo-vhnzA2e1l-z4xk2YjTje7Npl4MOEzp3ZNc" : "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-light-16x16.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tbGlnaHQtMTZ4MTYucG5nIiwiaWF0IjoxNzM5NDczMzYyLCJleHAiOjE3NzEwMDkzNjJ9.XCBcP0TQ193bK3-y4Pjd6SIWdBcEW0Jf56V5A0Udgs4";
        document.querySelector("link[rel='icon'][sizes='32x32']").href = isDark ? "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-dark-32x32.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tZGFyay0zMngzMi5wbmciLCJpYXQiOjE3Mzk0NzM0MTIsImV4cCI6MTc3MTAwOTQxMn0.Sd9z0nD728BXc6inDQdWQMuEGsmrt4ewx8aSMUil9nE" : "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/favicon-light-32x32.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2Zhdmljb24tbGlnaHQtMzJ4MzIucG5nIiwiaWF0IjoxNzM5NDczMzk2LCJleHAiOjE3NzEwMDkzOTZ9.gmSdPRZRd5qHhirs9e3qRknee_o8ieSVbDUkbdkGlVg";
        document.querySelector("link[rel='apple-touch-icon']").href = isDark ? "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/apple-touch-icon-dark.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2FwcGxlLXRvdWNoLWljb24tZGFyay5wbmciLCJpYXQiOjE3Mzk0NzM0NTMsImV4cCI6MTc3MTAwOTQ1M30.14636vC8P4IwXyDBERg5eEc3j5dsL8ajruMeoVZ2nUo" : "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/apple-touch-icon-light.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2FwcGxlLXRvdWNoLWljb24tbGlnaHQucG5nIiwiaWF0IjoxNzM5NDczNDM3LCJleHAiOjE3NzEwMDk0Mzd9.qhuNgdXCrMluRcM3qg9mT5g7iOnhaxGRCV0C2EYbU_4";
      } else {
        document.title = "Come Back";
        document.querySelector("link[rel='icon']").href = "https://synxalrnnjegqzaxydis.supabase.co/storage/v1/object/sign/KamaCleans/folded.ico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJLYW1hQ2xlYW5zL2ZvbGRlZC5pY28iLCJpYXQiOjE3Mzk0NzMxMDksImV4cCI6MTc3MTAwOTEwOX0.w7TW3cDX-LjBvVFFeWlY_UiQXClrNm_Q68vbbgZv0Y8";
      }
    };

    // Tambahkan event listener untuk perubahan mode dan visibility
    document.addEventListener('visibilitychange', updateFaviconAndTitle);
    document.documentElement.addEventListener('change-theme', updateFaviconAndTitle);
    
    // Initial update
    updateFaviconAndTitle();

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
      <AuthProvider>
        <div className="App">
          <Navbar />
          <section id="beranda-section"><Beranda /></section>
          
          <Suspense fallback={<Loading />}>
            <section id="tentang-section"><Tentang /></section>
            <section id="layanan-section"><Layanan /></section>
            <section id="galeri-section"><Galeri /></section>
            <section id="kontak-section"><Kontak /></section>
          </Suspense>

          <Footer />
        </div>
      </AuthProvider>
      <Analytics />
    </DarkModeProvider>
  );
}

export default App;
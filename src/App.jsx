import { useState, useEffect } from 'react'
import Loading from './components/loading/Loading'
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Ganti dengan waktu loading yang diinginkan

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // Tampilkan komponen Loading
  }

  return (
    <>
      <h1 className="gendut">Sabaraha ya nduuttt... <br></br>
        <span>lagi proses</span>
      </h1>
    </>
  );
}

export default App;
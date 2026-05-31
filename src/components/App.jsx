import { useState } from 'react';
import axios from 'axios';
import Header            from './Header';
import UploadImage       from './UploadImage';
import ResultCard        from './ResultCard';
import DistribucionChart from './DistribucionChart';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [resultado, setResultado] = useState(null);
  const [cargando,  setCargando]  = useState(false);
  const [error,     setError]     = useState('');
  const [preview,   setPreview]   = useState(null);

  const handleSeleccionar = async (archivo) => {
    setError(''); setResultado(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(archivo);

    setCargando(true);
    try {
      const form = new FormData();
      form.append('imagen', archivo);
      const { data } = await axios.post(`${API_URL}/predecir`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResultado(data.resultado);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'No se pudo conectar con el servidor. ¿Está el backend activo?'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">

        <UploadImage
          onSeleccionar={handleSeleccionar}
          cargando={cargando}
          preview={preview}
        />

        {error    && <div className="error-box">⚠️ {error}</div>}
        {cargando && (
          <div className="loading-box">
            <div className="spinner" />
            Clasificando imagen MRI con la CNN...
          </div>
        )}
        {resultado && !cargando && <ResultCard resultado={resultado} />}

        <hr className="divider" />
        <DistribucionChart />

      </main>
    </div>
  );
}
export default App;
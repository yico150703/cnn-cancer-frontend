import { useRef } from 'react';

function UploadImage({ onSeleccionar, cargando, preview }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    if (e.target.files[0]) onSeleccionar(e.target.files[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) onSeleccionar(e.dataTransfer.files[0]);
  };

  return (
    <div className="upload-section">
      <div
        className="drop-zone"
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          // La imagen se convierte a escala de grises visualmente
          // (igual que color_mode='grayscale' del notebook)
          <img
            src={preview}
            alt="MRI preview"
            className="preview-img"
            style={{ filter: 'grayscale(100%)' }}
          />
        ) : (
          <>
            <span className="upload-icon">🩻</span>
            <p>Arrastra tu imagen MRI aquí</p>
            <small>JPG · PNG · BMP — máx. 20 MB</small>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.bmp"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <button
        className="btn-analizar"
        onClick={() => inputRef.current.click()}
        disabled={cargando}
      >
        {cargando ? '⏳ Analizando...' : '🔬 Seleccionar imagen MRI'}
      </button>
    </div>
  );
}
export default UploadImage;
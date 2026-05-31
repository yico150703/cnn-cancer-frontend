// Equivale a la sección "Confusion Matrix" del notebook:
// muestra el diagnóstico basado en el umbral sigmoid 0.5

const CONFIG = {
  cancer: {
    fondo:  '#fff0f0',
    borde:  '#c53030',
    texto:  '#742a2a',
    badge:  '#c53030',
    icono:  '🚨',
    titulo: 'CÁNCER DETECTADO',
    msg:    'Se detectaron patrones compatibles con cáncer pulmonar.'
  },
  no_cancer: {
    fondo:  '#f0fff4',
    borde:  '#276749',
    texto:  '#1a4731',
    badge:  '#276749',
    icono:  '✅',
    titulo: 'SIN CÁNCER',
    msg:    'No se detectaron patrones de cáncer en la imagen MRI.'
  }
};

function ResultCard({ resultado }) {
  const { clase, confianza, probabilidades, valorSigmoid } = resultado;
  const cfg = CONFIG[clase] || CONFIG.no_cancer;

  return (
    <div className="result-card" style={{
      background:  cfg.fondo,
      borderLeft: `6px solid ${cfg.borde}`
    }}>

      {/* Diagnóstico */}
      <div className="result-header">
        <span className="result-icon">{cfg.icono}</span>
        <div>
          <h2 style={{ color: cfg.borde }}>{cfg.titulo}</h2>
          <p style={{ color: cfg.texto }}>{cfg.msg}</p>
        </div>
      </div>

      {/* Badge de confianza */}
      <div className="confianza-badge" style={{ background: cfg.badge }}>
        Confianza del modelo: {confianza}%
      </div>

      {/* Valor sigmoid — explica la decisión del modelo */}
      <div className="sigmoid-info">
        <span>Valor sigmoid: <strong>{valorSigmoid}</strong></span>
        <span className="sigmoid-hint">
          (umbral = 0.5 · {'<'} 0.5 → no_cancer · ≥ 0.5 → cancer)
        </span>
      </div>

      {/* Barras de probabilidad */}
      <div className="probs-section">
        <h3>📊 Probabilidades por clase</h3>
        {Object.entries(probabilidades).map(([c, prob]) => (
          <div key={c} className="prob-row">
            <span className="prob-label">{c.replace('_', ' ')}</span>
            <div className="prob-bar-bg">
              <div
                className="prob-bar"
                style={{
                  width:           `${prob}%`,
                  backgroundColor: c === clase ? cfg.borde : '#a0aec0'
                }}
              />
            </div>
            <span className="prob-value">{prob}%</span>
          </div>
        ))}
      </div>

      <p className="disclaimer">
        ⚕️ Resultado orientativo. Consulta siempre a un médico especialista.
      </p>
    </div>
  );
}
export default ResultCard;
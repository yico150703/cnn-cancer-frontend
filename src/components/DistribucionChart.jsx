import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://cnn-cancer-pulmonar.onrender.com';

function DistribucionChart() {
  const [data,    setData]    = useState(null);
  const [error,   setError]   = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/metricas`)
      .then(({ data }) => setData(data))
      .catch(() => setError('Sin datos de entrenamiento aún'));
  }, []);

  if (error) return <p className="chart-error">{error}</p>;
  if (!data)  return <p className="chart-loading">Cargando métricas...</p>;

  // Distribución del dataset
  const distData = Object.keys(data.conteoTrain).map(clase => ({
    clase,
    Train:    data.conteoTrain[clase] || 0,
    Validate: data.conteoVal[clase]   || 0
  }));

  // Curvas de entrenamiento (accuracy y loss)
  const histData = data.historial.accuracy.map((_, i) => ({
    epoca:        i + 1,
    'Train Acc':  parseFloat((data.historial.accuracy[i] * 100).toFixed(1)),
    'Val Acc':    parseFloat((data.historial.val_accuracy[i] * 100).toFixed(1)),
    'Train Loss': parseFloat(data.historial.loss[i].toFixed(4)),
    'Val Loss':   parseFloat(data.historial.val_loss[i].toFixed(4))
  }));

  return (
    <div className="charts-section">
      <h2>📊 Análisis del Entrenamiento</h2>

      {/* Distribución del Dataset */}
      <div className="chart-box">
        <h3>Distribución del Dataset (train vs validate)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={distData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="clase" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Train"    fill="#6366f1" />
            <Bar dataKey="Validate" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accuracy por época */}
      <div className="chart-box">
        <h3>Accuracy por Época</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={histData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoca" label={{ value: 'Época', position: 'insideBottom', offset: -2 }} />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Train Acc" fill="#10b981" />
            <Bar dataKey="Val Acc"   fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Loss por época */}
      <div className="chart-box">
        <h3>Loss por Época</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={histData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epoca" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Train Loss" fill="#ef4444" />
            <Bar dataKey="Val Loss"   fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default DistribucionChart;

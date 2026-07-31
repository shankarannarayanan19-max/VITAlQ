import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { LineChart as ChartIcon } from 'lucide-react';

export default function LabTrendChart({ labTrends }) {
  if (!labTrends || !labTrends.dates) {
    return (
      <div className="widget-card" id="lab-charts" style={{ scrollMarginTop: '90px' }}>
        <h3 className="widget-card-title">
          <ChartIcon size={20} />
          <span>Longitudinal Laboratory Trends</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No trend data registered.</p>
      </div>
    );
  }

  // Restructure data for Recharts consumption
  const chartData = labTrends.dates.map((date, idx) => {
    const dataObj = { date };
    if (labTrends.hba1c) dataObj.hba1c = labTrends.hba1c[idx];
    if (labTrends.egfr) dataObj.egfr = labTrends.egfr[idx];
    if (labTrends.systolicBP) dataObj.systolic = labTrends.systolicBP[idx];
    if (labTrends.diastolicBP) dataObj.diastolic = labTrends.diastolicBP[idx];
    if (labTrends.ldl) dataObj.ldl = labTrends.ldl[idx];
    return dataObj;
  });

  const latestHba1c = labTrends.hba1c ? labTrends.hba1c[labTrends.hba1c.length - 1] : null;
  const latestEgfr = labTrends.egfr ? labTrends.egfr[labTrends.egfr.length - 1] : null;
  const latestSys = labTrends.systolicBP ? labTrends.systolicBP[labTrends.systolicBP.length - 1] : null;
  const latestDia = labTrends.diastolicBP ? labTrends.diastolicBP[labTrends.diastolicBP.length - 1] : null;
  const latestLdl = labTrends.ldl ? labTrends.ldl[labTrends.ldl.length - 1] : null;

  return (
    <section id="lab-charts" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <h3 className="widget-card-title">
        <ChartIcon size={20} style={{ color: 'var(--teal-500)' }} />
        <span>Longitudinal Laboratory Trends</span>
      </h3>

      <div className="charts-grid">
        {/* 1. HbA1c Chart */}
        {labTrends.hba1c && (
          <div className="chart-card">
            <h4 className="chart-card-title">HbA1c (Glycated Hemoglobin)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{latestHba1c}%</span>
              <span className="chart-val-unit">Target: &lt; 7.0%</span>
              <span 
                className="risk-pill" 
                style={{ 
                  marginLeft: 'auto', 
                  fontSize: '0.7rem',
                  backgroundColor: latestHba1c > 8.0 ? 'var(--red-50)' : 'var(--green-55)',
                  color: latestHba1c > 8.0 ? 'var(--red-600)' : 'var(--green-600)' 
                }}
              >
                {latestHba1c > 8.0 ? 'Elevated Glycemic Trend' : 'Controlled'}
              </span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[4, 10]} stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="hba1c" 
                    name="HbA1c Level" 
                    stroke="var(--teal-500)" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 2. Kidney eGFR Chart */}
        {labTrends.egfr && (
          <div className="chart-card">
            <h4 className="chart-card-title">eGFR (Glomerular Filtration Rate)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{latestEgfr}</span>
              <span className="chart-val-unit">mL/min/1.73m² (Target: &gt; 90)</span>
              <span 
                className="risk-pill" 
                style={{ 
                  marginLeft: 'auto', 
                  fontSize: '0.7rem',
                  backgroundColor: latestEgfr < 60 ? 'var(--red-50)' : (latestEgfr < 90 ? 'var(--amber-50)' : 'var(--green-55)'),
                  color: latestEgfr < 60 ? 'var(--red-600)' : (latestEgfr < 90 ? 'var(--amber-600)' : 'var(--green-600)')
                }}
              >
                {latestEgfr < 60 ? 'Impaired Filtration' : (latestEgfr < 90 ? 'Borderline decline' : 'Healthy')}
              </span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[40, 110]} stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="egfr" 
                    name="eGFR (Renal)" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. Blood Pressure Chart */}
        {labTrends.systolicBP && (
          <div className="chart-card">
            <h4 className="chart-card-title">Blood Pressure Trend</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{latestSys}/{latestDia}</span>
              <span className="chart-val-unit">mmHg (Target: &lt; 130/80)</span>
              <span 
                className="risk-pill" 
                style={{ 
                  marginLeft: 'auto', 
                  fontSize: '0.7rem',
                  backgroundColor: latestSys >= 140 ? 'var(--red-50)' : (latestSys > 120 ? 'var(--amber-50)' : 'var(--green-55)'),
                  color: latestSys >= 140 ? 'var(--red-600)' : (latestSys > 120 ? 'var(--amber-600)' : 'var(--green-600)')
                }}
              >
                {latestSys >= 140 ? 'Stage 2 Hypertension' : (latestSys > 120 ? 'Elevated' : 'Optimal')}
              </span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[60, 180]} stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    name="Systolic BP" 
                    stroke="var(--red-500)" 
                    strokeWidth={2.5} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    name="Diastolic BP" 
                    stroke="var(--amber-500)" 
                    strokeWidth={2.5} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. LDL Chart if present (for patient VIT003) */}
        {labTrends.ldl && (
          <div className="chart-card">
            <h4 className="chart-card-title">LDL Cholesterol Trend</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{latestLdl} mg/dL</span>
              <span className="chart-val-unit">Target: &lt; 100 mg/dL</span>
              <span 
                className="risk-pill" 
                style={{ 
                  marginLeft: 'auto', 
                  fontSize: '0.7rem',
                  backgroundColor: latestLdl > 130 ? 'var(--red-50)' : 'var(--green-55)',
                  color: latestLdl > 130 ? 'var(--red-600)' : 'var(--green-600)' 
                }}
              >
                {latestLdl > 130 ? 'Hyperlipidemia Drift' : 'Optimal'}
              </span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[90, 180]} stroke="var(--text-secondary)" style={{ fontSize: '0.8rem' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--navy-900)', color: '#fff', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="ldl" 
                    name="LDL Level" 
                    stroke="#a855f7" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

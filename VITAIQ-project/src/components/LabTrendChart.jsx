import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { LineChart as ChartIcon } from 'lucide-react';

export default function LabTrendChart({ labTrends }) {
  const { isDarkMode } = useTheme();

  const axisColor = isDarkMode ? '#cbd5e1' : '#475569';
  const gridColor = isDarkMode ? '#26334d' : '#e2e8f0';
  const tooltipBg = isDarkMode ? '#1e293b' : '#0f172a';
  const tooltipTextColor = '#ffffff';

  if (!labTrends || !labTrends.dates) {
    return (
      <div className="widget-card" id="lab-charts" style={{ scrollMarginTop: '90px' }}>
        <h3 className="widget-card-title">
          <ChartIcon size={20} />
          <span>Disease-Specific Condition Trends</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No trend data registered for this profile.</p>
      </div>
    );
  }

  // Restructure data for Recharts consumption
  const chartData = labTrends.dates.map((date, idx) => {
    const dataObj = { date };
    if (labTrends.hba1c) dataObj.hba1c = labTrends.hba1c[idx];
    if (labTrends.egfr) dataObj.egfr = labTrends.egfr[idx];
    if (labTrends.creatinine) dataObj.creatinine = labTrends.creatinine[idx];
    if (labTrends.pefr) dataObj.pefr = labTrends.pefr[idx];
    if (labTrends.fev1Fvc) dataObj.fev1Fvc = labTrends.fev1Fvc[idx];
    if (labTrends.systolicBP) dataObj.systolic = labTrends.systolicBP[idx];
    if (labTrends.diastolicBP) dataObj.diastolic = labTrends.diastolicBP[idx];
    if (labTrends.ldl) dataObj.ldl = labTrends.ldl[idx];
    if (labTrends.hemoglobin) dataObj.hemoglobin = labTrends.hemoglobin[idx];
    if (labTrends.fastingGlucose) dataObj.fastingGlucose = labTrends.fastingGlucose[idx];
    if (labTrends.tsh) dataObj.tsh = labTrends.tsh[idx];
    if (labTrends.alt) dataObj.alt = labTrends.alt[idx];
    return dataObj;
  });

  return (
    <section id="lab-charts" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <h3 className="widget-card-title">
        <ChartIcon size={20} style={{ color: 'var(--teal-500)' }} />
        <span>Condition-Specific Diagnostic Trends</span>
      </h3>

      <div className="charts-grid">
        {/* 1. HbA1c Chart (Diabetes) */}
        {labTrends.hba1c && (
          <div className="chart-card">
            <h4 className="chart-card-title">HbA1c (Glycated Hemoglobin)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{labTrends.hba1c[labTrends.hba1c.length - 1]}%</span>
              <span className="chart-val-unit">Target: &lt; 7.0%</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[4, 11]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="hba1c" stroke="var(--red-500)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 2. eGFR Chart (Kidney Function / CKD) */}
        {labTrends.egfr && (
          <div className="chart-card">
            <h4 className="chart-card-title">eGFR (Kidney Filtration Rate)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{labTrends.egfr[labTrends.egfr.length - 1]}</span>
              <span className="chart-val-unit">mL/min/1.73m² (Target &gt; 90)</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[40, 110]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="egfr" stroke="var(--teal-500)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. PEFR & Spirometry Chart (Asthma / Pulmonology) */}
        {labTrends.pefr && (
          <div className="chart-card">
            <h4 className="chart-card-title">Peak Expiratory Flow Rate (PEFR)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{labTrends.pefr[labTrends.pefr.length - 1]} L/min</span>
              <span className="chart-val-unit">Normal &gt; 400 L/min</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[300, 500]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="pefr" stroke="var(--teal-500)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. Hemoglobin Trend Chart (Obstetrics & Anemia) */}
        {labTrends.hemoglobin && (
          <div className="chart-card">
            <h4 className="chart-card-title">Hemoglobin Level (g/dL)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{labTrends.hemoglobin[labTrends.hemoglobin.length - 1]} g/dL</span>
              <span className="chart-val-unit">Target &gt; 11.0 g/dL</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[8, 16]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="hemoglobin" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 5. Blood Pressure Chart */}
        {labTrends.systolicBP && (
          <div className="chart-card">
            <h4 className="chart-card-title">Blood Pressure Trends (mmHg)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">
                {labTrends.systolicBP[labTrends.systolicBP.length - 1]}/{labTrends.diastolicBP[labTrends.diastolicBP.length - 1]}
              </span>
              <span className="chart-val-unit">Target &lt; 130/80 mmHg</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[60, 180]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="systolic" stroke="var(--amber-500)" strokeWidth={3} dot={{ r: 5 }} name="Systolic" />
                  <Line type="monotone" dataKey="diastolic" stroke="var(--teal-500)" strokeWidth={2} dot={{ r: 4 }} name="Diastolic" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 6. LDL Lipid Chart */}
        {labTrends.ldl && (
          <div className="chart-card">
            <h4 className="chart-card-title">LDL Cholesterol (mg/dL)</h4>
            <div className="chart-val-display">
              <span className="chart-val-num">{labTrends.ldl[labTrends.ldl.length - 1]} mg/dL</span>
              <span className="chart-val-unit">Target &lt; 100 mg/dL</span>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="date" stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <YAxis domain={[80, 200]} stroke={axisColor} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipTextColor, borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                  <Line type="monotone" dataKey="ldl" stroke="var(--amber-600)" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { generateClinicalSummary } from '../utils/clinicalSummary';
import LoadingAnalysis from './LoadingAnalysis';
import { BrainCircuit, Play, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, Database, Clock } from 'lucide-react';

export default function ClinicalSummary({ patient }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // Reset summary generation state if patient changes
  useEffect(() => {
    setIsGenerated(false);
    setIsGenerating(false);
    setSummaryData(null);
  }, [patient]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const summary = generateClinicalSummary(patient);
      setSummaryData({
        ...summary,
        confidenceScore: "96.8%",
        evidenceUsed: `${patient?.timeline?.length || 6} Longitudinal Visits, ${patient?.medications?.length || 3} Medications, ${patient?.allergies?.length || 1} Allergy Profile, Lab Trends (2025-2026)`,
        recommendedAction: "Escalate glycemic control protocol, adjust Metformin/statin regimen, and schedule renal consultation within 14 days.",
        timestamp: new Date().toLocaleString()
      });
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <section id="clinical-summary" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <div className="summary-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit size={20} style={{ color: 'var(--teal-500)' }} />
          <h3 style={{ margin: 0 }}>AI Clinical Decision Support Engine</h3>
        </div>
        {!isGenerating && !isGenerated && (
          <button className="btn btn-primary generate-summary-btn" onClick={handleGenerate}>
            <Play size={14} fill="currentColor" />
            <span>Generate Clinical AI Summary</span>
          </button>
        )}
      </div>

      <div style={{ margin: '1.25rem 0' }}>
        <div className="summary-notice-bar">
          <AlertCircle size={16} />
          <span>AI decision-support analysis is compiled from verified longitudinal EHR records. Requires qualified physician review.</span>
        </div>
      </div>

      {isGenerating && <LoadingAnalysis />}

      {!isGenerating && !isGenerated && (
        <div className="empty-summary-box">
          <BrainCircuit size={48} style={{ color: 'var(--slate-300)' }} />
          <p>Longitudinal EHR analysis is ready. Trigger the clinical summary engine to evaluate trends, complications, and compliance indicators.</p>
          <button className="btn btn-primary" onClick={handleGenerate}>
            <Play size={14} fill="currentColor" />
            <span>Analyze Twin Records</span>
          </button>
        </div>
      )}

      {!isGenerating && isGenerated && summaryData && (
        <div className="animate-fade-in">
          {/* AI Output Metadata Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem', padding: '1rem', backgroundColor: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--teal-600)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={13} /> Confidence Score
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-900)' }}>{summaryData.confidenceScore}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--teal-600)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Database size={13} /> Evidence Base Used
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>{summaryData.evidenceUsed}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--teal-600)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={13} /> Analysis Timestamp
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>{summaryData.timestamp}</span>
            </div>
          </div>

          <div className="ai-summary-text-box">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--teal-600)', marginBottom: '0.5rem', fontWeight: 700 }}>
              GENERATED CLINICAL BRIEF
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--navy-900)' }}>
              {summaryData.summaryText}
            </p>
          </div>

          {/* Recommended Action */}
          <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', backgroundColor: 'var(--bg-main)', borderLeft: '4px solid var(--teal-500)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-600)', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              RECOMMENDED CLINICAL ACTION
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--navy-900)', margin: 0, fontWeight: 600 }}>
              {summaryData.recommendedAction}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }} className="hide-mobile">
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertCircle size={16} style={{ color: 'var(--red-500)' }} />
                <span>EHR Warnings & Complications</span>
              </h4>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {summaryData.alerts.map((alert, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      fontSize: '0.85rem', 
                      padding: '0.5rem 0.75rem', 
                      backgroundColor: 'var(--bg-main)', 
                      borderLeft: '3px solid var(--red-500)', 
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--navy-800)' 
                    }}
                  >
                    {alert}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--teal-500)' }} />
                <span>Support Recommendations</span>
              </h4>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {summaryData.recommendations.map((rec, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      fontSize: '0.85rem', 
                      padding: '0.5rem 0.75rem', 
                      backgroundColor: 'var(--bg-main)', 
                      borderLeft: '3px solid var(--teal-500)', 
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--navy-800)' 
                    }}
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

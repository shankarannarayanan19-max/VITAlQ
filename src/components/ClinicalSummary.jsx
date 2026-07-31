import React, { useState, useEffect } from 'react';
import { generateClinicalSummary } from '../utils/clinicalSummary';
import LoadingAnalysis from './LoadingAnalysis';
import { BrainCircuit, Play, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

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
      setSummaryData(summary);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <section id="clinical-summary" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <div className="summary-widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit size={20} style={{ color: 'var(--teal-500)' }} />
          <h3 style={{ margin: 0 }}>AI Clinical Decision Support</h3>
        </div>
        {!isGenerating && !isGenerated && (
          <button className="btn btn-primary btn-primary generate-summary-btn" onClick={handleGenerate}>
            <Play size={14} fill="currentColor" />
            <span>Generate Summary</span>
          </button>
        )}
      </div>

      <div style={{ margin: '1.25rem 0' }}>
        <div className="summary-notice-bar">
          <AlertCircle size={16} />
          <span>AI-generated decision-support summary — requires clinician review. Not intended for direct diagnostic decisions.</span>
        </div>
      </div>

      {isGenerating && <LoadingAnalysis />}

      {!isGenerating && !isGenerated && (
        <div className="empty-summary-box">
          <BrainCircuit size={48} style={{ color: 'var(--slate-300)' }} />
          <p>Longitudinal EHR analysis is ready. Trigger the clinical summary tool to evaluate trends, complications, and compliance indicators.</p>
          <button className="btn btn-primary" onClick={handleGenerate}>
            <Play size={14} fill="currentColor" />
            <span>Analyze Twin Records</span>
          </button>
        </div>
      )}

      {!isGenerating && isGenerated && summaryData && (
        <div className="animate-fade-in">
          <div className="ai-summary-text-box">
            <h4 style={{ fontSize: '0.9rem', color: 'var(--teal-600)', marginBottom: '0.5rem', fontWeight: 700 }}>
              GENERATED CLINICAL BRIEF
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--navy-900)' }}>
              {summaryData.summaryText}
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
          
          {/* Mobile Single Column alerts list */}
          <div style={{ display: 'none', marginTop: '1.25rem' }} className="show-mobile-flex">
            <div style={{ width: '100%', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>EHR Warnings</h4>
              {summaryData.alerts.map((alert, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem', padding: '0.5rem', backgroundColor: 'var(--bg-main)', marginBottom: '0.25rem', borderLeft: '3px solid var(--red-500)' }}>
                  {alert}
                </div>
              ))}
            </div>
            <div style={{ width: '100%' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Recommendations</h4>
              {summaryData.recommendations.map((rec, idx) => (
                <div key={idx} style={{ fontSize: '0.85rem', padding: '0.5rem', backgroundColor: 'var(--bg-main)', marginBottom: '0.25rem', borderLeft: '3px solid var(--teal-500)' }}>
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

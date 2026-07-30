import React, { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

export default function LoadingAnalysis() {
  const [step, setStep] = useState(0);
  const loadingSteps = [
    "Retrieving longitudinal EHR records...",
    "Correlating HbA1c and lipid panel trendlines...",
    "Reconciling active medications against allergy profiles...",
    "Running rule-based risk complications engine...",
    "Generating clinician summary dashboard..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="analysis-loader-container">
      <div className="analysis-spinner"></div>
      <BrainCircuit 
        size={36} 
        style={{ 
          color: 'var(--teal-500)', 
          animation: 'pulse-slow 1.5s infinite ease-in-out', 
          marginBottom: '1rem' 
        }} 
      />
      <h4>VITAIQ Digital Twin Engine</h4>
      <p style={{ minHeight: '24px', fontWeight: 550, color: 'var(--teal-600)' }}>
        {loadingSteps[step]}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        Rule-Based Analysis Simulation
      </p>
    </div>
  );
}

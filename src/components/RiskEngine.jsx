import React from 'react';
import { calculatePatientRisks } from '../utils/riskEngine';
import RiskCard from './RiskCard';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function RiskEngine({ patient }) {
  if (!patient) return null;

  const risks = calculatePatientRisks(patient);

  return (
    <section id="risk-engine" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <h3 className="widget-card-title">
        <ShieldAlert size={20} style={{ color: 'var(--teal-500)' }} />
        <span>Predictive Future Risk Analysis</span>
      </h3>

      <div className="risk-engine-grid">
        {risks.map((risk) => (
          <RiskCard key={risk.key} risk={risk} />
        ))}
      </div>

      <div className="risk-disclaimer">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <AlertTriangle size={16} style={{ color: 'var(--amber-500)', flexShrink: 0, marginTop: '0.1rem' }} />
          <div>
            <strong>Rule-Based Simulation Notice: </strong>
            Prototype risk estimate based on transparent demonstration rules. Not a diagnosis or medically validated clinical prediction.
          </div>
        </div>
      </div>
    </section>
  );
}

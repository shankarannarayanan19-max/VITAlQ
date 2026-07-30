import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function RiskCard({ risk }) {
  if (!risk) return null;

  const { name, level, score, explanation, factors } = risk;

  let colorClass = 'low';
  let badgeStyle = { backgroundColor: 'var(--green-55)', color: 'var(--green-600)', border: '1px solid var(--green-100)' };
  let Icon = CheckCircle;

  if (level.toLowerCase() === 'high') {
    colorClass = 'high';
    badgeStyle = { backgroundColor: 'var(--red-50)', color: 'var(--red-600)', border: '1px solid var(--red-100)' };
    Icon = AlertCircle;
  } else if (level.toLowerCase() === 'moderate') {
    colorClass = 'moderate';
    badgeStyle = { backgroundColor: 'var(--amber-50)', color: 'var(--amber-600)', border: '1px solid var(--amber-100)' };
    Icon = Info;
  }

  return (
    <div className={`risk-card ${colorClass}`} style={{ borderLeft: `4px solid var(--${colorClass}-500)` }}>
      <div className="risk-card-header">
        <span className="risk-card-name">{name}</span>
        <span className="risk-level-badge" style={badgeStyle}>
          {level} Risk
        </span>
      </div>

      <div className="risk-score-row">
        <div className="risk-progress-container">
          <div 
            className={`risk-progress-bar ${colorClass}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="risk-score-value" style={{ color: `var(--${colorClass}-600)` }}>
          {score}/100
        </span>
      </div>

      <p className="risk-explanation">{explanation}</p>

      {factors && factors.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy-900)' }}>Contributing Risk Factors:</span>
          <ul className="risk-factors-list">
            {factors.map((factor, idx) => (
              <li key={idx}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

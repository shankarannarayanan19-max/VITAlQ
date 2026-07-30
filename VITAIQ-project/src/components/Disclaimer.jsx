import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer({ light = false }) {
  const textColor = light ? 'var(--slate-300)' : 'var(--text-muted)';
  const borderColor = light ? '#1e293b' : 'var(--border-color)';
  const bgColor = light ? 'transparent' : 'rgba(241, 245, 249, 0.5)';

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-md)',
        border: `1.5px solid ${borderColor}`,
        backgroundColor: bgColor,
        color: textColor,
        fontSize: '0.8rem',
        lineHeight: '1.5',
        textAlign: 'left',
        margin: '1rem 0'
      }}
    >
      <AlertTriangle 
        size={24} 
        style={{ 
          color: 'var(--amber-500)', 
          flexShrink: 0 
        }} 
      />
      <div>
        <strong>Notice: </strong>
        VITAIQ is an AI-powered digital patient twin platform. AI-generated outputs provide longitudinal record analysis for clinical decision support and require qualified healthcare-professional review.
      </div>
    </div>
  );
}

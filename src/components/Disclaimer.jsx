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
        VITAIQ is a digital patient twin platform using synthetic patient data. AI-generated outputs are for clinical decision support and require healthcare-professional review. Not intended for direct medical diagnostics.
      </div>
    </div>
  );
}

import React from 'react';
import { Pill, Calendar, HelpCircle } from 'lucide-react';

export default function MedicationList({ medications }) {
  if (!medications || medications.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0.5rem 0' }}>
        No medications currently prescribed.
      </div>
    );
  }

  return (
    <div className="medication-grid">
      {medications.map((med, idx) => (
        <div key={idx} className="medication-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Pill size={16} style={{ color: 'var(--teal-500)', flexShrink: 0 }} />
            <span className="medication-name">{med.name}</span>
          </div>
          <span className="medication-dose">{med.dosage}</span>
          <div className="medication-details">
            <span style={{ fontWeight: 550 }}>Frequency: </span> {med.frequency}
          </div>
          <div className="medication-details">
            <span style={{ fontWeight: 550 }}>Indication: </span> {med.purpose}
          </div>
          <div className="medication-details" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Calendar size={12} />
            <span>Prescribed since: {med.startDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

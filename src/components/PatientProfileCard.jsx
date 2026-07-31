import React from 'react';
import { Calendar, User, Phone, Mail, Award, Clock } from 'lucide-react';

export default function PatientProfileCard({ patient }) {
  if (!patient) return null;

  const { name, id, age, gender, bloodGroup, email, phone, lastVisit, nextFollowUp, followUpStatus } = patient;

  // Follow-up status color scheme
  let statusBadgeStyle = {
    fontSize: '0.8rem',
    fontWeight: '700',
    padding: '0.25rem 0.65rem',
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase'
  };

  if (followUpStatus === "Overdue") {
    statusBadgeStyle = { ...statusBadgeStyle, backgroundColor: 'var(--red-50)', color: 'var(--red-600)', border: '1px solid var(--red-100)' };
  } else if (followUpStatus === "Due Soon") {
    statusBadgeStyle = { ...statusBadgeStyle, backgroundColor: 'var(--amber-50)', color: 'var(--amber-600)', border: '1px solid var(--amber-100)' };
  } else {
    statusBadgeStyle = { ...statusBadgeStyle, backgroundColor: 'var(--green-55)', color: 'var(--green-600)', border: '1px solid var(--green-100)' };
  }

  // Format follow-up date beautifully
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="patient-header-card">
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
        <div className="patient-avatar-box">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="patient-info-block">
          <div className="patient-name-row">
            <h2>{name}</h2>
            <span className="patient-id-badge">{id}</span>
          </div>
          <div className="patient-meta-grid">
            <div className="patient-meta-item">
              <span>Age/Gender: </span> {age} yrs / {gender}
            </div>
            <div className="patient-meta-item">
              <span>Blood Group: </span> {bloodGroup}
            </div>
            <div className="patient-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Mail size={14} />
              <span style={{ fontSize: '0.8rem', textDecoration: 'underline' }}>{email}</span>
            </div>
            <div className="patient-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Phone size={14} />
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '100%', width: '1px', backgroundColor: 'var(--border-color)' }} className="hide-mobile"></div>

      <div className="patient-status-block">
        <div className="status-label-value">
          Last Clinical Assessment: <span style={{ color: '#ffffff' }}>{formatDate(lastVisit)}</span>
        </div>
        <div className="status-label-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          <span>Next Follow-up: </span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{formatDate(nextFollowUp)}</span>
          <span className="risk-pill" style={statusBadgeStyle}>{followUpStatus}</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>
          * Synthetic contact info for demonstration
        </div>
      </div>
    </div>
  );
}

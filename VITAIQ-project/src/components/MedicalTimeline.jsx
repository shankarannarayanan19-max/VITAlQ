import React from 'react';
import { 
  Stethoscope, 
  Pill, 
  Activity, 
  FileText, 
  Syringe, 
  AlertCircle,
  MapPin
} from 'lucide-react';

export default function MedicalTimeline({ timeline }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="widget-card" id="timeline" style={{ scrollMarginTop: '90px' }}>
        <h3 className="widget-card-title">
          <FileText size={20} />
          <span>Longitudinal Medical Timeline</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No medical events registered.</p>
      </div>
    );
  }

  // Helper to map event type to an icon
  const getEventIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'visit':
        return <Stethoscope size={14} />;
      case 'prescription':
        return <Pill size={14} />;
      case 'laboratory':
        return <Activity size={14} />;
      case 'surgery':
        return <FileText size={14} />;
      case 'vaccination':
        return <Syringe size={14} fill="currentColor" />;
      case 'diagnosis':
      default:
        return <AlertCircle size={14} />;
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="timeline" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <h3 className="widget-card-title">
        <FileText size={20} style={{ color: 'var(--teal-500)' }} />
        <span>Longitudinal Medical Timeline</span>
      </h3>
      
      <div className="timeline-track">
        {timeline.map((event, idx) => (
          <div key={idx} className="timeline-event-item">
            <div className="timeline-event-marker" title={event.type}>
              {getEventIcon(event.type)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span className="timeline-event-date">{formatDate(event.date)}</span>
              <h4 className="timeline-event-title">{event.title}</h4>
              <p className="timeline-event-desc">{event.description}</p>
              <div className="timeline-event-location">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import { Bell, X, Calendar, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications } = useHealthRecord();
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const userNotifications = notifications.filter(
    n => !currentUser || n.userId === currentUser.id || n.userId === currentUser.patientId || currentUser.role === 'admin'
  );

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end', backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(3px)', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ width: '100%', maxWidth: '380px', height: '100%', backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            <Bell size={18} style={{ color: 'var(--teal-600)' }} />
            <span>Notifications ({userNotifications.length})</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {userNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Bell size={36} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p style={{ fontSize: '0.9rem', margin: 0 }}>No notifications at this time.</p>
            </div>
          ) : (
            userNotifications.map(n => (
              <div 
                key={n.id}
                style={{
                  padding: '0.85rem',
                  marginBottom: '0.75rem',
                  backgroundColor: n.read ? 'var(--bg-main)' : 'var(--teal-50)',
                  border: n.read ? '1px solid var(--border-color)' : '1px solid var(--teal-100)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  {n.type === 'appointment' && <Calendar size={14} style={{ color: 'var(--teal-600)' }} />}
                  {n.type === 'alert' && <AlertTriangle size={14} style={{ color: 'var(--red-600)' }} />}
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-900)' }}>{n.title}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.4rem', lineHeight: '1.4' }}>
                  {n.message}
                </p>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>{n.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

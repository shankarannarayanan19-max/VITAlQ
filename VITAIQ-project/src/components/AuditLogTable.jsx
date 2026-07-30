import React, { useState, useEffect } from 'react';
import { getAuditLogs } from '../utils/auditLogger';
import { ShieldCheck, Search, Filter, Clock, User, FileText } from 'lucide-react';

export default function AuditLogTable() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    setLogs(getAuditLogs());
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Authentication', 'Onboarding', 'Clinical Data Access', 'Personal Health Record', 'Appointment Management', 'Admin Compliance'];

  return (
    <div className="audit-log-card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={20} style={{ color: 'var(--teal-600)' }} />
            <span>System Audit Trail & Compliance Log</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
            Searchable log of authentication events, patient record views, document uploads, and administrative actions.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search audit trail..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.8rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}
            />
          </div>

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', cursor: 'pointer' }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <th style={{ padding: '0.75rem' }}>Timestamp</th>
              <th style={{ padding: '0.75rem' }}>User / Role</th>
              <th style={{ padding: '0.75rem' }}>Action Event</th>
              <th style={{ padding: '0.75rem' }}>Category</th>
              <th style={{ padding: '0.75rem' }}>Event Details</th>
              <th style={{ padding: '0.75rem' }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No matching audit trail records found.
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '0.75rem', whiteSpace: 'nowrap', color: 'var(--slate-400)', fontSize: '0.75rem' }}>
                    {new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{log.userName}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--teal-600)', textTransform: 'uppercase', fontWeight: 600 }}>{log.userRole}</span>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--navy-900)' }}>
                    {log.action}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'var(--teal-50)', color: 'var(--teal-600)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 600 }}>
                      {log.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)', maxWidth: '320px' }}>
                    {log.details}
                  </td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                    {log.ipAddress}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

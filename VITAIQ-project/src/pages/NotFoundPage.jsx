import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-main)',
        padding: '2rem',
        textAlign: 'center'
      }}
      className="animate-fade-in"
    >
      <HelpCircle size={64} style={{ color: 'var(--teal-500)', marginBottom: '1.5rem' }} />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
        The path you are attempting to access does not exist or has been moved in the VITAIQ clinical system workspace.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowLeft size={16} />
        <span>Return to Safety</span>
      </Link>
    </div>
  );
}

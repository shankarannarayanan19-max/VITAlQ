import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock } from 'lucide-react';

export default function ResendTimer({ onResend, initialSeconds = 60 }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResendClick = () => {
    if (seconds > 0) return;
    setSeconds(initialSeconds);
    onResend();
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
      {seconds > 0 ? (
        <span style={{ color: 'var(--slate-400)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={13} />
          <span>Resend OTP in <strong>{seconds}s</strong></span>
        </span>
      ) : (
        <button 
          type="button" 
          onClick={handleResendClick}
          className="resend-btn"
          style={{ color: 'var(--teal-600)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <RefreshCw size={12} style={{ display: 'inline', marginRight: '3px' }} />
          <span>Resend New OTP Code</span>
        </button>
      )}
    </div>
  );
}

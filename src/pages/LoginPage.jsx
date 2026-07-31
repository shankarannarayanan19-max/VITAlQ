import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import { Mail, Lock, Eye, EyeOff, AlertTriangle, ArrowLeft, User } from 'lucide-react';
import '../styles/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('clinician'); // 'clinician' or 'patient'
  const [email, setEmail] = useState('doctor@vitaiq.demo');
  const [password, setPassword] = useState('demo123');
  const [selectedPatientId, setSelectedPatientId] = useState('VIT001');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleClinicianSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedEmail === 'doctor@vitaiq.demo' && trimmedPassword === 'demo123') {
      localStorage.setItem("vitaiq_auth", "true");
      localStorage.setItem("vitaiq_role", "doctor");
      navigate('/patients');
    } else {
      setError('Invalid clinical credentials.');
    }
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulate login for patient
    localStorage.setItem("vitaiq_auth", "true");
    localStorage.setItem("vitaiq_role", "patient");
    localStorage.setItem("vitaiq_patient_id", selectedPatientId);
    navigate('/portal');
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card">
        
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
          <ArrowLeft size={14} />
          <span>Back to Landing</span>
        </Link>

        <div className="login-header">
          <div className="login-logo">
            <img src="/vitaiq-logo.jpg" alt="VITAIQ Logo" className="login-logo-img" style={{ borderRadius: '6px' }} />
            <span className="brand-name" style={{ fontSize: '1.5rem' }}>VITAIQ</span>
          </div>
          <h2 className="login-title">Secure Portal Access</h2>
          <p className="login-subtitle">Select your portal workspace to sign in.</p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '2.5px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button 
            type="button"
            onClick={() => { setActiveTab('clinician'); setError(''); }}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              color: activeTab === 'clinician' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'clinician' ? '3px solid var(--teal-500)' : '3px solid transparent',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Clinical Workspace
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab('patient'); setError(''); }}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              fontWeight: 600, 
              fontSize: '0.95rem',
              color: activeTab === 'patient' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'patient' ? '3px solid var(--teal-500)' : '3px solid transparent',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Patient Portal
          </button>
        </div>

        {error && (
          <div className="login-error">
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'clinician' ? (
          <form onSubmit={handleClinicianSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">Hospital Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  id="email-input"
                  className="form-input" 
                  placeholder="doctor@hospital.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password-input">Security Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password-input"
                  className="form-input form-input-password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Sign In to Clinical Workspace
            </button>
          </form>
        ) : (
          <form onSubmit={handlePatientSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="patient-select">Select Patient Profile</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <select 
                  id="patient-select"
                  className="form-input" 
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  style={{ 
                    appearance: 'none', 
                    background: 'white',
                    paddingRight: '2rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="VIT001">Arun Kumar (VIT001 - High Risk)</option>
                  <option value="VIT002">Meena Devi (VIT002 - Low Risk)</option>
                  <option value="VIT003">Rahul Sharma (VIT003 - Moderate Risk)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="patient-password-input">Security PIN or Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  id="patient-password-input"
                  className="form-input" 
                  placeholder="PIN Code (Auto-verified)"
                  value="12345678"
                  disabled
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Sign In to Patient Portal
            </button>
          </form>
        )}

        <p className="login-notice">
          Demo Access: Clinical and Patient logins are pre-configured for review. No actual credentials verification is performed.
        </p>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

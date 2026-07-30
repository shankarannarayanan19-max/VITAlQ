import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import ResendTimer from '../components/ResendTimer';
import Disclaimer from '../components/Disclaimer';
import { Mail, Lock, Eye, EyeOff, AlertTriangle, ArrowLeft, User, ShieldCheck, KeyRound, Stethoscope, Heart } from 'lucide-react';
import '../styles/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register-otp'
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // First-Time Registration OTP State
  const [regRole, setRegRole] = useState('doctor'); // 'doctor' or 'patient'
  const [regEmail, setRegEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');

  // Returning Sign-In Submit (Username + Password)
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usernameOrEmail.trim() || !password.trim()) {
      setError('Please enter both username/email and security password.');
      return;
    }

    const res = loginUser(usernameOrEmail.trim(), password.trim());
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'patient') navigate('/portal');
      else navigate('/patients');
    } else {
      setError(res.message);
    }
  };

  // Send First-Time OTP (Zero OTP displayed on UI!)
  const handleSendOtp = async () => {
    setError('');
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setError('Please enter a valid work or personal email address.');
      return;
    }

    const res = await apiService.auth.sendOtp(regEmail.trim());
    if (res.success) {
      setOtpSent(true);
      setOtpNotice(res.message);
    } else {
      setError(res.message);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setError('');
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    const res = await apiService.auth.verifyOtp(regEmail.trim(), otpCode.trim());
    if (res.success) {
      setOtpNotice('Email address verified! Redirecting to profile onboarding...');
      setTimeout(() => {
        if (regRole === 'doctor') {
          navigate('/register/doctor', { state: { email: regEmail } });
        } else {
          navigate('/register/patient', { state: { email: regEmail } });
        }
      }, 1000);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card" style={{ maxWidth: '480px' }}>
        
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', alignSelf: 'flex-start' }}>
          <ArrowLeft size={14} />
          <span>Back to Landing Page</span>
        </Link>

        <div className="login-header">
          <div className="login-logo">
            <img src="/vitaiq-logo.jpg" alt="VITAIQ Logo" className="login-logo-img" style={{ borderRadius: '6px' }} />
            <span className="brand-name" style={{ fontSize: '1.5rem' }}>VITAIQ</span>
          </div>
          <h2 className="login-title">Enterprise Portal Access</h2>
          <p className="login-subtitle">Sign in or verify email to register</p>
        </div>

        {/* Auth Mode Tabs */}
        <div style={{ display: 'flex', borderBottom: '2.5px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button 
            type="button"
            onClick={() => { setAuthMode('signin'); setError(''); setOtpNotice(''); }}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              fontWeight: 700, 
              fontSize: '0.95rem',
              color: authMode === 'signin' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: authMode === 'signin' ? '3px solid var(--teal-500)' : '3px solid transparent',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sign In (Returning)
          </button>
          <button 
            type="button"
            onClick={() => { setAuthMode('register-otp'); setError(''); setOtpNotice(''); }}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              fontWeight: 700, 
              fontSize: '0.95rem',
              color: authMode === 'register-otp' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: authMode === 'register-otp' ? '3px solid var(--teal-500)' : '3px solid transparent',
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            New Registration
          </button>
        </div>

        {error && (
          <div className="login-error">
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {otpNotice && (
          <div style={{ backgroundColor: 'var(--teal-50)', border: '1px solid var(--teal-100)', color: 'var(--teal-600)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <KeyRound size={16} style={{ flexShrink: 0 }} />
            <span>{otpNotice}</span>
          </div>
        )}

        {authMode === 'signin' ? (
          <form onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="user-input">Username or Registered Email</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  id="user-input"
                  className="form-input" 
                  placeholder="Enter your username or email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              Sign In to Portal
            </button>
          </form>
        ) : (
          <div>
            <div className="form-group">
              <label className="form-label">Select Registration Role</label>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setRegRole('doctor')}
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: regRole === 'doctor' ? '2px solid var(--teal-500)' : '1px solid var(--border-color)',
                    backgroundColor: regRole === 'doctor' ? 'var(--teal-50)' : 'var(--bg-main)',
                    color: regRole === 'doctor' ? 'var(--teal-600)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                >
                  <Stethoscope size={16} />
                  <span>Doctor / Clinician</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegRole('patient')}
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: regRole === 'patient' ? '2px solid var(--teal-500)' : '1px solid var(--border-color)',
                    backgroundColor: regRole === 'patient' ? 'var(--teal-50)' : 'var(--bg-main)',
                    color: regRole === 'patient' ? 'var(--teal-600)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={16} />
                  <span>Patient PHR</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Enter Email Address for OTP Delivery</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder={regRole === 'doctor' ? 'doctor@hospital.org' : 'patient@healthmail.com'}
                  value={regEmail}
                  onChange={(e) => { setRegEmail(e.target.value); setOtpSent(false); }}
                  required
                />
              </div>
            </div>

            {!otpSent ? (
              <button type="button" className="btn btn-primary login-btn" onClick={handleSendOtp}>
                Send 6-Digit Email OTP Code
              </button>
            ) : (
              <div className="otp-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Enter 6-Digit Verification OTP Code</label>
                  <ResendTimer onResend={handleSendOtp} />
                </div>
                <div className="input-wrapper" style={{ marginBottom: '1rem' }}>
                  <KeyRound size={16} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter 6-digit OTP code" 
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    style={{ textAlign: 'center', letterSpacing: '3px', fontWeight: 700, fontSize: '1.1rem' }}
                  />
                </div>

                <button type="button" className="btn btn-primary login-btn" onClick={handleVerifyOtp}>
                  Verify OTP & Proceed to Profile Setup
                </button>
              </div>
            )}

            <div style={{ textDecoration: 'none', textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Already registered? </span>
              <button 
                type="button" 
                onClick={() => setAuthMode('signin')}
                style={{ background: 'none', border: 'none', color: 'var(--teal-600)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Sign In with Username & Password
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

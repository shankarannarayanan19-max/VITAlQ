import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AvatarSelector from '../components/AvatarSelector';
import ResendTimer from '../components/ResendTimer';
import Disclaimer from '../components/Disclaimer';
import { User, ArrowLeft, ShieldCheck, Mail, Heart, KeyRound, AlertTriangle } from 'lucide-react';
import '../styles/login.css';

export default function PatientRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendEmailOtp, verifyEmailOtp, registerPatient } = useAuth();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [otpNotice, setOtpNotice] = useState('');

  // Personal Fields
  const [email, setEmail] = useState(location.state?.email || '');
  const [otpCode, setOtpCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(!!location.state?.email);
  const [otpSent, setOtpSent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1985-04-12');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [mobile, setMobile] = useState('+91 91234 56789');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [address, setAddress] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (location.state?.email) {
      setStep(2);
    }
  }, [location.state]);

  // Send OTP
  const handleSendOtp = async () => {
    setError('');
    setOtpNotice('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    const res = await sendEmailOtp(email.trim());
    if (res.success) {
      setOtpSent(true);
      setOtpNotice(res.message);
    } else {
      setError(res.message);
    }
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    setError('');
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    const res = verifyEmailOtp(email.trim(), otpCode.trim());
    if (res.success) {
      setEmailVerified(true);
      setOtpNotice('Email address verified successfully!');
      setTimeout(() => setStep(2), 1000);
    } else {
      setError(res.message);
    }
  };

  // Submit Patient Registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    const patientData = {
      email: email.trim(),
      username: username.trim(),
      password,
      name: fullName.trim(),
      gender,
      dob,
      bloodGroup,
      phone: mobile.trim(),
      emergencyContact: emergencyContact.trim() || "Spouse / Relative - Emergency Contact",
      address: address.trim() || "Chennai, Tamil Nadu",
      avatar: avatarUrl
    };

    const res = registerPatient(patientData);
    if (res.success) {
      navigate('/portal');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="login-container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div className="login-card" style={{ maxWidth: '520px' }}>
        
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>

        <div className="login-header">
          <div className="login-logo">
            <Heart size={28} style={{ color: 'var(--teal-600)' }} />
            <span className="brand-name" style={{ fontSize: '1.5rem' }}>VITAIQ</span>
          </div>
          <h2 className="login-title">Independent Patient PHR Onboarding</h2>
          <p className="login-subtitle">Create your personal lifelong digital health record across all hospitals</p>
        </div>

        {/* Stepper Header */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          {["1. Email Verification", "2. Credentials", "3. Health Profile"].map((label, idx) => (
            <span 
              key={idx}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: step === idx + 1 ? 'var(--teal-600)' : step > idx + 1 ? 'var(--green-600)' : 'var(--slate-400)',
                borderBottom: step === idx + 1 ? '2px solid var(--teal-500)' : 'none',
                paddingBottom: '0.25rem'
              }}
            >
              {label}
            </span>
          ))}
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

        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">Personal Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. arun.kumar@healthmail.com" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setOtpSent(false); }}
                  disabled={emailVerified}
                  required
                />
              </div>
            </div>

            {!otpSent && !emailVerified && (
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleSendOtp}>
                Send 6-Digit Verification OTP Code
              </button>
            )}

            {otpSent && !emailVerified && (
              <div className="otp-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Enter 6-Digit Verification OTP Code</label>
                  <ResendTimer onResend={handleSendOtp} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter 6-digit OTP code" 
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '3px', fontWeight: 700 }}
                  />
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleVerifyOtp}>
                  Verify OTP & Proceed
                </button>
              </div>
            )}

            {emailVerified && (
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--green-55)', borderRadius: 'var(--radius-md)', color: 'var(--green-600)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={20} />
                <span>Email Verified Successfully! Proceeding...</span>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="form-group">
              <label className="form-label">Full Patient Name</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Arun Kumar" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Portal Username</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. arunkumar" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Create Security Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)} style={{ flex: 2 }}>Next: Health Details</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select className="form-input" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-input" value={dob} onChange={(e) => setDob(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="text" className="form-input" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Emergency Contact Name & Phone</label>
                <input type="text" className="form-input" placeholder="e.g. Priya Kumar (Wife) - +91 98765 43211" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Address</label>
              <input type="text" className="form-input" placeholder="Enter full address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <AvatarSelector 
              selectedAvatar={avatarUrl} 
              onSelectAvatar={(url) => setAvatarUrl(url)} 
              isDoctor={false} 
            />

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Complete Patient Registration
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

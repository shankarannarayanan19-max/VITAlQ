import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS } from '../data/enterpriseData';
import AvatarSelector from '../components/AvatarSelector';
import ResendTimer from '../components/ResendTimer';
import Disclaimer from '../components/Disclaimer';
import { Stethoscope, ArrowLeft, ShieldCheck, Mail, User, Building2, Award, KeyRound, AlertTriangle } from 'lucide-react';
import '../styles/login.css';

export default function DoctorRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendEmailOtp, verifyEmailOtp, registerDoctor } = useAuth();

  const [step, setStep] = useState(1); // Step 1: Email & OTP, Step 2: Identity & Password, Step 3: Professional & NMC, Step 4: Avatar & Complete
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
  const [gender, setGender] = useState('Female');
  const [dob, setDob] = useState('1988-06-15');
  const [mobile, setMobile] = useState('+91 98765 12345');

  // Professional Fields
  const [nmcNumber, setNmcNumber] = useState('');
  const [specialty, setSpecialty] = useState(INITIAL_DEPARTMENTS[0]);
  const [qualification, setQualification] = useState('MD (Medicine)');
  const [experience, setExperience] = useState(10);
  const [hospitalName, setHospitalName] = useState(INITIAL_HOSPITALS[0].name);
  const [department, setDepartment] = useState(INITIAL_DEPARTMENTS[0]);
  const [designation, setDesignation] = useState('Senior Consultant');
  const [consultationType, setConsultationType] = useState('Both Physical & Video');
  const [city, setCity] = useState('Chennai');
  const [state, setState] = useState('Tamil Nadu');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [languages, setLanguages] = useState('English, Hindi, Tamil');
  const [bio, setBio] = useState('');
  const [consultationHours, setConsultationHours] = useState('Mon-Sat: 09:00 AM - 04:00 PM');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [certFile, setCertFile] = useState(null);

  useEffect(() => {
    if (location.state?.email) {
      setStep(2);
    }
  }, [location.state]);

  // Send OTP (Resend SDK via Email)
  const handleSendOtp = async () => {
    setError('');
    setOtpNotice('');
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid work or professional email address.');
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

  // Submit Doctor Registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!avatarUrl) {
      setError('Doctor Profile Photo / Avatar is mandatory. Please select a profile avatar.');
      return;
    }

    if (!nmcNumber.trim()) {
      setError('Medical Registration Number (NMC / SMC Number) is mandatory.');
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    const doctorData = {
      email: email.trim(),
      username: username.trim(),
      password,
      name: fullName.trim(),
      gender,
      dob,
      phone: mobile.trim(),
      nmcNumber: nmcNumber.trim(),
      specialty,
      qualification,
      experience: Number(experience),
      hospitalName,
      department,
      designation,
      consultationType,
      city,
      state,
      hospitalAddress: hospitalAddress.trim() || `${city}, ${state}`,
      languages: languages.split(',').map(l => l.trim()),
      bio: bio.trim(),
      consultationHours,
      avatar: avatarUrl,
      certUrl: certFile ? certFile.name : "NMC_Certificate.pdf"
    };

    const res = registerDoctor(doctorData);
    if (res.success) {
      navigate('/patients');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="login-container animate-fade-in" style={{ padding: '2rem 1rem' }}>
      <div className="login-card" style={{ maxWidth: '580px' }}>
        
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>

        <div className="login-header">
          <div className="login-logo">
            <Stethoscope size={28} style={{ color: 'var(--teal-600)' }} />
            <span className="brand-name" style={{ fontSize: '1.5rem' }}>VITAIQ</span>
          </div>
          <h2 className="login-title">Doctor & Clinician Onboarding</h2>
          <p className="login-subtitle">National Medical Commission (NMC) Credential Verification & Registration</p>
        </div>

        {/* Stepper Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          {["1. Email OTP", "2. Credentials", "3. NMC Details", "4. Avatar Photo"].map((label, idx) => (
            <span 
              key={idx}
              style={{
                fontSize: '0.78rem',
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
              <label className="form-label">Professional Hospital / Work Email</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. dr.aditi@apollo.org" 
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
              <label className="form-label">Full Professional Name (with title)</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Dr. Aditi Sharma" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Choose Clinical Username</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. dr.aditisharma" 
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="text" className="form-input" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)} style={{ flex: 2 }}>Next: NMC Details</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="form-group">
              <label className="form-label">Medical Registration Number (NMC / State Council Reg No.) *</label>
              <div className="input-wrapper">
                <Award size={16} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. NMC/2015/04/82910" 
                  value={nmcNumber}
                  onChange={(e) => setNmcNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Primary Specialty</label>
                <select className="form-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                  {INITIAL_DEPARTMENTS.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Years of Clinical Experience</label>
                <input type="number" className="form-input" value={experience} onChange={(e) => setExperience(e.target.value)} min={1} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Affiliated Hospital Name</label>
                <select className="form-input" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}>
                  {INITIAL_HOSPITALS.map((h) => (
                    <option key={h.id} value={h.name}>{h.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Designation</label>
                <input type="text" className="form-input" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Languages Spoken</label>
              <input type="text" className="form-input" placeholder="e.g. English, Hindi, Tamil" value={languages} onChange={(e) => setLanguages(e.target.value)} />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(4)} style={{ flex: 2 }}>Next: Profile Photo</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit}>
            <AvatarSelector 
              selectedAvatar={avatarUrl} 
              onSelectAvatar={(url) => setAvatarUrl(url)} 
              isDoctor={true} 
            />

            <div className="form-group">
              <label className="form-label">Upload Registration Certificate (PDF/Image)</label>
              <input 
                type="file" 
                accept=".pdf,.png,.jpg,.jpeg" 
                className="form-input" 
                onChange={(e) => setCertFile(e.target.files[0])} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Clinical Bio</label>
              <textarea 
                className="form-input" 
                rows={2} 
                placeholder="Brief summary of clinical expertise and patient care focus..." 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(3)} style={{ flex: 1 }}>Back</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Complete Doctor Registration
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

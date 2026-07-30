import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS } from '../data/enterpriseData';
import { Search, UserPlus, Link2, CheckCircle2, User, Mail, Phone, MapPin, Heart, Shield, X, AlertTriangle } from 'lucide-react';

export default function AddPatientModal({ isOpen, onClose }) {
  const { patients, addPatient, linkPatientToDoctor } = useHealthRecord();
  const { currentUser } = useAuth();

  const [mode, setMode] = useState('search'); // 'search' or 'create'
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  // New Patient Form Fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1990-05-15');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('Self-Pay / Private Insurance');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('');
  const [hospitalName, setHospitalName] = useState(INITIAL_HOSPITALS[0].name);

  if (!isOpen) return null;

  const patientList = Object.values(patients || {});
  const filteredSearch = searchQuery.trim() === '' ? [] : patientList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkExisting = (patientId) => {
    linkPatientToDoctor(patientId, currentUser?.id || 'USER_DOC_1', currentUser);
    setNotice(`Patient ID ${patientId} linked successfully to your clinical registry!`);
    setTimeout(() => {
      setNotice('');
      onClose();
    }, 1200);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Patient Full Name is required.');
      return;
    }
    if (!phone.trim() || phone.trim() === '+91') {
      setError('Patient Mobile Phone is required.');
      return;
    }

    // Calculate age from DOB
    const birthYear = new Date(dob).getFullYear();
    const age = new Date().getFullYear() - birthYear;

    const newPatientData = {
      name,
      dob,
      age,
      gender,
      bloodGroup,
      phone,
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@healthmail.com`,
      address,
      emergencyContact,
      insuranceProvider,
      primaryDiagnosis: primaryDiagnosis.trim() || "General Health Checkup",
      hospitalName
    };

    const created = addPatient(newPatientData, currentUser);
    setNotice(`New Patient ${created.name} onboarded! Generated Patient ID: ${created.id}`);
    setTimeout(() => {
      setNotice('');
      onClose();
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Modal Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-header)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={20} style={{ color: 'var(--teal-500)' }} />
              <span>Add Patient to Clinical Registry</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Search existing national registry or register a new patient profile</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '0.25rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
          <button
            onClick={() => { setMode('search'); setError(''); setNotice(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: mode === 'search' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: mode === 'search' ? '3px solid var(--teal-500)' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <Search size={16} />
            <span>Search Existing Patient</span>
          </button>

          <button
            onClick={() => { setMode('create'); setError(''); setNotice(''); }}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: mode === 'create' ? 'var(--teal-500)' : 'var(--text-secondary)',
              borderBottom: mode === 'create' ? '3px solid var(--teal-500)' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <UserPlus size={16} />
            <span>Create New Patient</span>
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {notice && (
            <div style={{ backgroundColor: 'var(--green-55)', border: '1px solid var(--green-100)', color: 'var(--green-600)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} />
              <span>{notice}</span>
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: 'var(--red-50)', border: '1px solid var(--red-100)', color: 'var(--red-600)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          {mode === 'search' ? (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Search by Patient ID, Name, Email, or Phone
                </label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="e.g. VIT001, Arun Kumar, or +91 98765..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', paddingLeft: '2.4rem' }}
                    autoFocus
                  />
                </div>
              </div>

              {searchQuery.trim() !== '' && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Matching Patient Records ({filteredSearch.length})
                  </h4>

                  {filteredSearch.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>No existing patient matches "{searchQuery}".</p>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => setMode('create')}
                        style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}
                      >
                        Click to Create New Patient Profile
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {filteredSearch.map(pat => (
                        <div key={pat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-500)' }}>ID: {pat.id}</span>
                            <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pat.name}</h5>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{pat.age} yrs ({pat.gender}) • {pat.primaryDiagnosis}</span>
                          </div>
                          <button 
                            className="btn btn-primary" 
                            onClick={() => handleLinkExisting(pat.id)}
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                          >
                            <Link2 size={14} />
                            <span>Link to My Patients</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Full Patient Name *</label>
                  <input type="text" placeholder="e.g. Ramesh Chandra" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Date of Birth *</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%' }}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Blood Group</label>
                  <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} style={{ width: '100%' }}>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Mobile Phone *</label>
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email Address</label>
                  <input type="email" placeholder="patient@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Primary Disease / Reason</label>
                  <input type="text" placeholder="e.g. Type 2 Diabetes, Hypertension" value={primaryDiagnosis} onChange={(e) => setPrimaryDiagnosis(e.target.value)} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Emergency Contact</label>
                  <input type="text" placeholder="Spouse / Kin Contact Phone" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Affiliated Hospital</label>
                  <select value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} style={{ width: '100%' }}>
                    {INITIAL_HOSPITALS.map(h => (
                      <option key={h.id} value={h.name}>{h.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Residential Address</label>
                <input type="text" placeholder="Full home address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Create Patient Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import Navbar from '../components/Navbar';
import { patientsData, getPatientById } from '../data/patients';
import { 
  Search, 
  Scan, 
  Users, 
  AlertTriangle, 
  Clock, 
  BellRing, 
  X,
  QrCode
} from 'lucide-react';
import '../styles/search.css';

export default function PatientSearchPage() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!searchId.trim()) {
      setError("Please enter a patient ID.");
      return;
    }

    const patient = getPatientById(searchId);
    if (patient) {
      navigate(`/patient/${patient.id}`);
    } else {
      setError("Patient record not found. Try VIT001, VIT002, or VIT003.");
    }
  };

  const handleRecentClick = (id) => {
    navigate(`/patient/${id}`);
  };

  const handleLoadSimulatedPatient = () => {
    setShowQrModal(false);
    navigate('/patient/VIT001');
  };

  // Quick stats values based on patients.js
  const stats = [
    { label: "Total Demo Twins", val: 3, icon: <Users size={20} />, color: "blue" },
    { label: "High Risk Twins", val: 1, icon: <AlertTriangle size={20} />, color: "red" },
    { label: "Follow-Ups Overdue", val: 1, icon: <Clock size={20} />, color: "amber" },
    { label: "Active EHR Alerts", val: 5, icon: <BellRing size={20} />, color: "teal" }
  ];

  return (
    <div className="search-page animate-fade-in">
      <Navbar />

      <main className="search-content-wrapper">
        <div className="search-greeting">
          <h1>Clinical Digital Twin Hub</h1>
          <p>Retrieve, manage, and inspect high-fidelity synthetic longitudinal health records.</p>
        </div>

        {/* Dashboard Statistics */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className={`stat-icon-wrapper ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-val">{stat.val}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search Panel */}
        <div className="search-panel">
          <h2>Retrieve Patient Twin Record</h2>
          
          <form onSubmit={handleSearch}>
            <div className="search-bar-row">
              <div className="search-input-container">
                <Search className="search-input-icon" size={20} />
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Enter Patient ID (e.g. VIT001, VIT002, VIT003)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary search-btn">
                Fetch Record
              </button>
              <button 
                type="button" 
                className="btn qr-btn"
                onClick={() => setShowQrModal(true)}
                title="Scan Patient QR Wristband"
              >
                <Scan size={18} style={{ marginRight: '0.25rem' }} />
                <span className="hide-mobile">Scan Wristband</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="search-error-msg">
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <div className="search-helper-text">
            <span><strong>Sample IDs for Review:</strong> </span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer', marginRight: '0.75rem' }} onClick={() => setSearchId('VIT001')}>VIT001 (High Risk)</span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer', marginRight: '0.75rem' }} onClick={() => setSearchId('VIT002')}>VIT002 (Low Risk)</span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setSearchId('VIT003')}>VIT003 (Moderate Risk)</span>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="recent-patients-section">
          <h3>EHR Registry Twins</h3>
          <div className="recent-patients-grid">
            {Object.values(patientsData).map((pat) => (
              <div 
                key={pat.id} 
                className="recent-patient-card"
                onClick={() => handleRecentClick(pat.id)}
              >
                <div className="patient-brief">
                  <span className="patient-brief-name">{pat.name}</span>
                  <span className="patient-brief-meta">ID: {pat.id} | {pat.age} yrs | {pat.gender}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Last visit: {pat.lastVisit}
                  </span>
                </div>
                <span className={`risk-pill ${pat.overallRiskStatus.toLowerCase()}`}>
                  {pat.overallRiskStatus} Risk
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Disclaimer />
        </div>
      </main>

      {/* Simulated QR Scan Modal */}
      {showQrModal && (
        <div className="modal-backdrop" onClick={() => setShowQrModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setShowQrModal(false)}
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
            
            <div className="modal-icon-wrapper">
              <QrCode size={32} />
            </div>

            <h3>Scan Patient QR Wristband</h3>
            <p>Scanning wristband QR/RFID codes is simulated in this student prototype dashboard.</p>

            <div className="qr-box-simulation">
              <div className="qr-line-scanner"></div>
              <QrCode size={96} style={{ color: 'var(--navy-900)', opacity: 0.85 }} />
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={handleLoadSimulatedPatient}
              >
                Simulate Wristband Scan (Arun Kumar - VIT001)
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowQrModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

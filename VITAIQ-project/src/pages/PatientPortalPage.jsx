import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHealthRecord } from '../context/HealthRecordContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Disclaimer from '../components/Disclaimer';
import MedicationList from '../components/MedicationList';
import LabTrendChart from '../components/LabTrendChart';
import MedicalTimeline from '../components/MedicalTimeline';
import AllergyBadge from '../components/AllergyBadge';
import DocumentUploadModal from '../components/DocumentUploadModal';
import AppointmentBookingModal from '../components/AppointmentBookingModal';
import { 
  Heart, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Plus, 
  Users, 
  ShieldCheck, 
  FileText, 
  Building2, 
  UserCheck, 
  Search,
  Lock,
  Unlock
} from 'lucide-react';
import '../styles/dashboard.css';

export default function PatientPortalPage() {
  const navigate = useNavigate();
  const { currentUser, users } = useAuth();
  const { patients, patientDoctorConnections, toggleDoctorAccess } = useHealthRecord();

  const patientId = currentUser?.patientId || localStorage.getItem("vitaiq_patient_id") || "VIT001";
  const patient = patients[patientId] || patients["VIT001"];

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [takenMeds, setTakenMeds] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [doctorSearch, setDoctorSearch] = useState('');

  if (!patient) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Navbar patientName="Patient Profile" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: 'var(--red-500)', marginBottom: '1rem' }} />
          <h2>PHR Profile Loading Error</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
            We could not retrieve your Personal Health Record. Please log in again.
          </p>
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleToggleMed = (medName) => {
    setTakenMeds(prev => ({
      ...prev,
      [medName]: !prev[medName]
    }));
  };

  const doctorsList = users.filter(u => u.role === 'doctor');
  const connectedDocIds = patientDoctorConnections[patient.id] || ["USER_DOC_1", "USER_DOC_2"];

  const filteredDoctors = doctorsList.filter(d => 
    d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
    (d.specialty && d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())) ||
    (d.hospitalName && d.hospitalName.toLowerCase().includes(doctorSearch.toLowerCase()))
  );

  return (
    <div className="dashboard-container">
      <Navbar patientName={patient.name} />

      <div className="dashboard-layout">
        <Sidebar activeSection={activeSection} onSectionChange={(id) => setActiveSection(id)} />

        <main className="dashboard-main-content">
          
          {/* Hero Welcome Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, var(--navy-900) 0%, #1e293b 100%)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '2rem', 
            color: '#ffffff',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(20, 184, 166, 0.15)', border: '1px solid rgba(20, 184, 166, 0.3)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-400)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Heart size={14} /> Lifelong Personal Health Record (PHR)
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
                Welcome back, {patient.name}
              </h1>
              <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '580px', lineHeight: '1.4' }}>
                Your complete multi-hospital health history, uploaded lab reports, prescription records, and doctor access permissions in one place.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowUploadModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem' }}
              >
                <UploadCloud size={18} />
                <span>Upload Report / PHR</span>
              </button>

              <button 
                className="btn btn-secondary" 
                onClick={() => setShowBookingModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', backgroundColor: '#ffffff', color: 'var(--navy-900)' }}
              >
                <Calendar size={18} style={{ color: 'var(--teal-600)' }} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '1.75rem' }}>
            <div className="stat-card">
              <div className="stat-icon-wrapper teal">
                <Heart size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Blood Group / Age</span>
                <span className="stat-value">{patient.bloodGroup || 'B+'} / {patient.age} yrs</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <Building2 size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Multi-Hospital Records</span>
                <span className="stat-value">{patient.timeline?.length || 6} Encounters</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <CheckCircle2 size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Medication Adherence</span>
                <span className="stat-value">{patient.adherence}%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper purple">
                <UserCheck size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Connected Doctors</span>
                <span className="stat-value">{connectedDocIds.length} Physicians</span>
              </div>
            </div>
          </div>

          {/* Tab Content Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }}>

            {/* Multi-Hospital Longitudinal Medical Timeline */}
            <div id="phr-timeline" className="widget-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={20} style={{ color: 'var(--teal-600)' }} />
                    <span>Multi-Hospital Unified Medical Timeline</span>
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    Consolidated record of doctor visits, lab reports, MRI scans, and prescriptions across all hospitals.
                  </p>
                </div>

                <button className="btn btn-secondary" onClick={() => setShowUploadModal(true)} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Plus size={14} /> Add Record
                </button>
              </div>

              <MedicalTimeline timeline={patient.timeline} />
            </div>

            {/* Doctor Access Delegation Control */}
            <div id="doctors" className="widget-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={20} style={{ color: 'var(--teal-600)' }} />
                    <span>Doctor Connection & Data Privacy Permissions</span>
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
                    You own 100% of your health data. Grant or revoke record access for consulting physicians anytime.
                  </p>
                </div>

                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search size={14} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search doctor or specialty..." 
                    value={doctorSearch}
                    onChange={(e) => setDoctorSearch(e.target.value)}
                    style={{ padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.8rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {filteredDoctors.map(doc => {
                  const hasAccess = connectedDocIds.includes(doc.id);
                  return (
                    <div key={doc.id} style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={doc.avatar} alt={doc.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--navy-900)', display: 'block' }}>{doc.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--teal-600)', fontWeight: 600 }}>{doc.specialty}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)', display: 'block' }}>{doc.hospitalName}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDoctorAccess(patient.id, doc.id, currentUser)}
                        style={{
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          borderRadius: 'var(--radius-full)',
                          border: hasAccess ? '1px solid var(--red-100)' : '1px solid var(--teal-100)',
                          backgroundColor: hasAccess ? 'var(--red-50)' : 'var(--teal-50)',
                          color: hasAccess ? 'var(--red-600)' : 'var(--teal-600)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {hasAccess ? <Lock size={12} /> : <Unlock size={12} />}
                        <span>{hasAccess ? "Revoke Access" : "Grant Access"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Medications & Lab Trends Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="hide-mobile">
              <MedicationList medications={patient.medications} />
              <AllergyBadge allergies={patient.allergies} />
            </div>

            {/* Vitals Trend Visualizer */}
            <div id="lab-charts">
              <LabTrendChart labTrends={patient.labTrends} />
            </div>

          </div>

          {/* Upload Modal */}
          <DocumentUploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} patientId={patient.id} />

          {/* Booking Modal */}
          <AppointmentBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />

          <div style={{ marginTop: '2rem' }}>
            <Disclaimer />
          </div>
        </main>
      </div>
    </div>
  );
}

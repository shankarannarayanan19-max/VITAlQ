import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatientById } from '../data/patients';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PatientProfileCard from '../components/PatientProfileCard';
import AllergyBadge from '../components/AllergyBadge';
import MedicationList from '../components/MedicationList';
import ClinicalSummary from '../components/ClinicalSummary';
import MedicalTimeline from '../components/MedicalTimeline';
import RiskEngine from '../components/RiskEngine';
import LabTrendChart from '../components/LabTrendChart';
import ClinicalAlerts from '../components/ClinicalAlerts';
import Disclaimer from '../components/Disclaimer';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Clock, 
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import '../styles/dashboard.css';

export default function PatientDashboardPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const loadedPatient = getPatientById(id);
    setPatient(loadedPatient);
  }, [id]);

  // Handle active section highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'clinical-summary', 'timeline', 'risk-engine', 'lab-charts', 'alerts'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!patient) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <AlertTriangle size={48} style={{ color: 'var(--red-500)', marginBottom: '1rem' }} />
          <h2>Patient Digital Twin Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem', maxWidth: '360px' }}>
            The record ID "{id}" does not correspond to any synthetic patient twin in the registry. Try VIT001, VIT002, or VIT003.
          </p>
          <Link to="/patients" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Registry</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container animate-fade-in">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Backdrop for mobile sidebar drawer */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 140
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="dashboard-main">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} patientName={patient.name} />

        <div className="patient-header-section">
          <PatientProfileCard patient={patient} />
        </div>

        <div className="dashboard-grid">
          {/* Left Column: Records & Narrative Summary */}
          <div className="dashboard-left-col">
            
            {/* Overview Widget */}
            <section id="overview" className="widget-card" style={{ scrollMarginTop: '90px' }}>
              <h3 className="widget-card-title">
                <HeartPulse size={20} style={{ color: 'var(--teal-500)' }} />
                <span>Twin Overview Details</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Diagnoses */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Diagnosed Conditions
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {patient.conditions.map((condition, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          fontSize: '0.85rem', 
                          fontWeight: 550, 
                          backgroundColor: 'var(--bg-main)', 
                          border: '1.5px solid var(--border-color)', 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--navy-900)'
                        }}
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Allergies Profile
                  </h4>
                  {patient.allergies.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--green-600)', fontSize: '0.85rem', fontWeight: 550 }}>
                      <CheckCircle2 size={16} />
                      <span>No known drug or environmental allergies recorded.</span>
                    </div>
                  ) : (
                    <div className="allergies-wrapper">
                      {patient.allergies.map((allergy, idx) => (
                        <AllergyBadge key={idx} allergy={allergy} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Prescriptions */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Active Prescriptions & Dosages
                  </h4>
                  <MedicationList medications={patient.medications} />
                </div>

                {/* Surgeries & Vaccinations row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="hide-mobile">
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Surgical History
                    </h4>
                    {patient.surgeries.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No surgical records found.</p>
                    ) : (
                      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {patient.surgeries.map((surg, idx) => (
                          <li key={idx}>
                            <strong>{surg.name}</strong> ({surg.year}) - <em>{surg.hospital}</em>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Immunizations
                    </h4>
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {patient.vaccinations.map((vac, idx) => (
                        <li key={idx}>
                          <strong>{vac.name}</strong> - <em>{vac.date}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Mobile version of Surgeries/Vaccinations */}
                <div style={{ display: 'none' }} className="show-mobile-flex">
                  <div style={{ marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.25rem' }}>Surgical History</h4>
                    {patient.surgeries.map((s, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.name} ({s.year})</div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: 700, marginBottom: '0.25rem' }}>Immunizations</h4>
                    {patient.vaccinations.map((v, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{v.name} ({v.date})</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* AI Summary Section */}
            <ClinicalSummary patient={patient} />

            {/* Timeline Section */}
            <MedicalTimeline timeline={patient.timeline} />

          </div>

          {/* Right Column: Calculations & Diagnostic Alerts */}
          <div className="dashboard-right-col">
            
            {/* Future Risk Engine */}
            <RiskEngine patient={patient} />

            {/* Recharts Laboratory Trend Charts */}
            <LabTrendChart labTrends={patient.labTrends} />

            {/* Clinical Warnings & Referrals */}
            <ClinicalAlerts patient={patient} />

          </div>
        </div>

        <div style={{ padding: '0 2rem 2rem' }}>
          <Disclaimer />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHealthRecord } from '../context/HealthRecordContext';
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
import DocumentUploadModal from '../components/DocumentUploadModal';
import AppointmentBookingModal from '../components/AppointmentBookingModal';
import UpdatePatientModal from '../components/UpdatePatientModal';
import Disclaimer from '../components/Disclaimer';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Clock, 
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  UploadCloud,
  Edit,
  Plus
} from 'lucide-react';
import '../styles/dashboard.css';

export default function PatientDashboardPage() {
  const { id } = useParams();
  const { currentUser, role } = useAuth();
  const { patients } = useHealthRecord();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const formattedId = id ? id.toUpperCase().trim() : "VIT001";
  const patient = patients[formattedId] || patients["VIT001"];

  const userRole = currentUser?.role || role || "doctor";

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
            The record ID "{id}" does not correspond to any active patient profile in the registry. Try VIT001, VIT002, or VIT003.
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
        <Navbar 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          patientName={patient.name}
        />

        <main className="dashboard-content" style={{ padding: '2rem' }}>
          {/* Quick Doctor Actions Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link to="/patients" className="back-search-link">
              <ArrowLeft size={16} />
              <span>Back to Patient Registry</span>
            </Link>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowUpdateModal(true)}
                style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Edit size={16} />
                <span>Update Medical Record</span>
              </button>

              <button 
                className="btn btn-secondary" 
                onClick={() => setShowUploadModal(true)}
                style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <UploadCloud size={16} />
                <span>Upload Report</span>
              </button>

              <button 
                className="btn btn-secondary" 
                onClick={() => setShowBookingModal(true)}
                style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Calendar size={16} />
                <span>Schedule Follow-up</span>
              </button>
            </div>
          </div>

          {/* Demographic Header Profile Card */}
          <div id="overview">
            <PatientProfileCard patient={patient} />
          </div>

          {/* Grid Layout Section */}
          <div className="dashboard-grid">
            
            {/* Left Column: AI Summary, Timeline, Lab Charts */}
            <div className="dashboard-column-left">
              <ClinicalSummary patient={patient} />

              <div id="timeline">
                <MedicalTimeline timeline={patient.timeline} />
              </div>

              <div id="lab-charts">
                <LabTrendChart labTrends={patient.labTrends} />
              </div>
            </div>

            {/* Right Column: Risk Engine, Allergies, Medications, Clinical Alerts */}
            <div className="dashboard-column-right">
              <div id="risk-engine">
                <RiskEngine patient={patient} />
              </div>

              <AllergyBadge allergies={patient.allergies} />

              <MedicationList medications={patient.medications} />

              <div id="alerts">
                <ClinicalAlerts patient={patient} />
              </div>
            </div>

          </div>

          {/* Modals */}
          <DocumentUploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} patientId={patient.id} />
          <AppointmentBookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} defaultDoctorId={currentUser?.id} />
          <UpdatePatientModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} patient={patient} />

          <Disclaimer />
        </main>
      </div>
    </div>
  );
}

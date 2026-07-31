import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { getPatientById } from '../data/patients';
import Navbar from '../components/Navbar';
import Disclaimer from '../components/Disclaimer';
import MedicationList from '../components/MedicationList';
import LabTrendChart from '../components/LabTrendChart';
import MedicalTimeline from '../components/MedicalTimeline';
import AllergyBadge from '../components/AllergyBadge';
import { 
  Heart, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  HelpCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import '../styles/dashboard.css';

export default function PatientPortalPage() {
  const navigate = useNavigate();
  const patientId = localStorage.getItem("vitaiq_patient_id");
  const [patient, setPatient] = useState(null);
  
  // Adherence checklist state
  const [takenMeds, setTakenMeds] = useState({});
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  useEffect(() => {
    if (patientId) {
      const loadedPatient = getPatientById(patientId);
      setPatient(loadedPatient);
    }
  }, [patientId]);

  if (!patientId) {
    return <Navigate to="/login" replace />;
  }

  if (!patient) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Navbar patientName="Patient" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: 'var(--red-500)', marginBottom: '1rem' }} />
          <h2>Profile Loading Error</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 1.5rem' }}>
            We could not retrieve your patient profile. Please try logging in again.
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

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSubmitted(true);
    setSupportMessage('');
    setTimeout(() => setSupportSubmitted(false), 5000);
  };

  // Get customized patient advice based on risk level
  const getRiskExplanation = () => {
    switch (patient.overallRiskStatus.toLowerCase()) {
      case 'high':
        return {
          title: "Important Action Required",
          text: "Based on your latest digital twin simulations, we've identified rising HbA1c and declining kidney filtration rates (eGFR). It is highly critical to take your Metformin twice daily with meals and maintain a low-sodium diet. Please ensure you check your blood pressure daily and schedule a face-to-face consultation with Dr. Aditi Sharma as soon as possible.",
          colorClass: "high",
          icon: <AlertCircle size={22} style={{ color: 'var(--red-600)' }} />
        };
      case 'moderate':
        return {
          title: "Moderate Risk Advisory",
          text: "Your vitals show creeping systolic blood pressure and lipid (LDL) levels. Maintaining consistency with your Atorvastatin bedtime dose is essential to protect your cardiovascular health. Your next routine cardiology review is due soon (within 2 weeks) — please coordinate with our clinic to confirm your visit.",
          colorClass: "moderate",
          icon: <AlertCircle size={22} style={{ color: 'var(--amber-600)' }} />
        };
      default:
        return {
          title: "Healthy & Stable Status",
          text: "Great work! Your simulated digital twin markers show optimal metabolic and kidney metrics. Continue taking your Fluticasone asthma inhaler twice daily as scheduled. Keep up the high adherence to prevent any potential breathing triggers.",
          colorClass: "low",
          icon: <CheckCircle2 size={22} style={{ color: 'var(--green-600)' }} />
        };
    }
  };

  const advice = getRiskExplanation();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
      <Navbar patientName={patient.name} />

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }} className="animate-fade-in">
        
        {/* Welcome Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--navy-900) 0%, #1e293b 100%)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2.5rem 2rem', 
          color: '#ffffff',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ 
              textTransform: 'uppercase', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              letterSpacing: '1px', 
              color: 'var(--teal-400)',
              backgroundColor: 'rgba(20, 184, 166, 0.1)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}>
              Patient Workspace
            </span>
            <h1 style={{ color: '#ffffff', fontSize: '2.25rem', marginBottom: '0.5rem' }}>
              Welcome Back, {patient.name}
            </h1>
            <p style={{ color: 'var(--slate-300)', fontSize: '0.95rem', maxWidth: '600px', marginBottom: '1.5rem' }}>
              Access your digital twin model, check recent health risk factors, track daily medications, and directly message your clinical support team.
            </p>
            
            {/* Quick stats tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-400)' }}>Patient ID:</span> <strong style={{ color: '#fff' }}>{patient.id}</strong>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-400)' }}>Age / Gender:</span> <strong style={{ color: '#fff' }}>{patient.age} yrs / {patient.gender}</strong>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-400)' }}>Blood Group:</span> <strong style={{ color: '#fff' }}>{patient.bloodGroup}</strong>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--slate-400)' }}>Next Follow-Up:</span> <strong style={{ color: '#fff' }}>{patient.nextFollowUp}</strong>
              </div>
            </div>
          </div>
          {/* Subtle decoration */}
          <div style={{ 
            position: 'absolute', 
            right: '-50px', 
            bottom: '-50px', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
            zIndex: 1
          }}></div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '2rem' }} className="hide-mobile-grid-portal">
          
          {/* Left Column: Health advice, charts, timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Advice / Health Risk Card */}
            <div className={`widget-card border-${advice.colorClass}`} style={{ borderLeft: '4px solid', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                {advice.icon}
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--navy-900)' }}>{advice.title}</h3>
                <span className={`risk-pill ${patient.overallRiskStatus.toLowerCase()}`} style={{ marginLeft: 'auto' }}>
                  {patient.overallRiskStatus} Risk Status
                </span>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {advice.text}
              </p>
            </div>

            {/* Vitals & Lab Trends */}
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <h3 className="widget-card-title" style={{ marginBottom: '1.5rem' }}>
                <Activity size={20} style={{ color: 'var(--teal-500)' }} />
                <span>My Vitals & Lab Trends</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Below are your tracked metabolic and blood sugar trends compiled from laboratory tests. Regular monitoring keeps your health risks low.
              </p>
              
              {/* Lab trends graph container */}
              <div style={{ height: '300px', width: '100%' }}>
                <LabTrendChart patient={patient} />
              </div>
            </div>

            {/* Timeline of Health Reviews */}
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <h3 className="widget-card-title" style={{ marginBottom: '1.5rem' }}>
                <Clock size={20} style={{ color: 'var(--teal-500)' }} />
                <span>My Medical Log & Timeline</span>
              </h3>
              <MedicalTimeline timeline={patient.timeline} />
            </div>

          </div>

          {/* Right Column: Medications, Adherence tracker, support widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Adherence and Daily Medication Checklist */}
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <h3 className="widget-card-title" style={{ marginBottom: '0.5rem' }}>
                <Heart size={20} style={{ color: 'var(--teal-500)' }} />
                <span>Active Prescriptions</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Your current adherence rate is <strong style={{ color: 'var(--teal-600)' }}>{patient.adherence}%</strong>. Track your daily medication log below.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {patient.medications.map((med, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => handleToggleMed(med.name)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '0.75rem 1rem', 
                      borderRadius: 'var(--radius-md)', 
                      backgroundColor: takenMeds[med.name] ? 'var(--teal-50)' : 'var(--bg-main)',
                      border: takenMeds[med.name] ? '1.5px solid var(--teal-400)' : '1.5px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '4px', 
                      border: '2px solid var(--teal-500)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: takenMeds[med.name] ? 'var(--teal-500)' : 'white'
                    }}>
                      {takenMeds[med.name] && <CheckCircle2 size={14} style={{ color: 'white' }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 600, 
                        color: 'var(--navy-900)',
                        textDecoration: takenMeds[med.name] ? 'line-through' : 'none',
                        opacity: takenMeds[med.name] ? 0.7 : 1
                      }}>
                        {med.name} ({med.dosage})
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {med.frequency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  <span>Today's Progress</span>
                  <span>
                    {Object.values(takenMeds).filter(Boolean).length} of {patient.medications.length} taken
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    backgroundColor: 'var(--teal-500)', 
                    width: `${(Object.values(takenMeds).filter(Boolean).length / patient.medications.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Allergies profile card */}
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <h3 className="widget-card-title" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={20} style={{ color: 'var(--teal-500)' }} />
                <span>My Allergies Profile</span>
              </h3>
              {patient.allergies.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--green-600)', fontWeight: 550 }}>No allergies recorded.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {patient.allergies.map((allergy, idx) => (
                    <AllergyBadge key={idx} allergy={allergy} />
                  ))}
                </div>
              )}
            </div>

            {/* Contact Doctor & Clinic Support Widget */}
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <h3 className="widget-card-title" style={{ marginBottom: '1rem' }}>
                <MessageSquare size={20} style={{ color: 'var(--teal-500)' }} />
                <span>Contact Clinic Support</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Need to request an appointment, report a medication side effect, or contact support? Send a direct secure message to Dr. Aditi Sharma's staff.
              </p>

              {supportSubmitted ? (
                <div style={{ 
                  backgroundColor: 'var(--green-55)', 
                  border: '1.5px solid var(--green-500)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  color: 'var(--green-600)', 
                  fontSize: '0.85rem',
                  fontWeight: 550, 
                  textAlign: 'center' 
                }}>
                  Message sent! The clinical coordinator will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <textarea 
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Type your message to clinic support..." 
                    required
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1.5px solid var(--border-color)',
                      fontSize: '0.85rem',
                      minHeight: '80px',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.65rem' }}>
                    Send Message
                  </button>
                </form>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid var(--border-color)', marginTop: '1.25rem', paddingTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={14} style={{ color: 'var(--teal-600)' }} />
                  <span>Clinical Hotline: 1800-123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} style={{ color: 'var(--teal-600)' }} />
                  <span>Support Email: support@vitaiq.com</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <Disclaimer />
        </div>
      </main>
    </div>
  );
}

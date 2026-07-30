import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import Disclaimer from '../components/Disclaimer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddPatientModal from '../components/AddPatientModal';
import UpdatePatientModal from '../components/UpdatePatientModal';
import { 
  Search, 
  Users, 
  AlertTriangle, 
  Clock, 
  BellRing, 
  UserPlus, 
  Filter, 
  ChevronRight,
  Activity,
  Heart,
  Stethoscope,
  Pill,
  Calendar
} from 'lucide-react';
import '../styles/search.css';
import '../styles/dashboard.css';

export default function PatientSearchPage() {
  const navigate = useNavigate();
  const { patients } = useHealthRecord();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('All'); // 'All', 'High', 'Moderate', 'Low'
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUpdatePatient, setSelectedUpdatePatient] = useState(null);

  const patientList = Object.values(patients || {});

  // Filtered Patient List
  const filteredPatients = patientList.filter(p => {
    const matchesSearch = 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone?.includes(searchQuery) ||
      p.primaryDiagnosis?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = filterRisk === 'All' || p.overallRiskStatus === filterRisk;

    return matchesSearch && matchesRisk;
  });

  const highRiskCount = patientList.filter(p => p.overallRiskStatus === 'High').length;
  const overdueCount = patientList.filter(p => p.followUpStatus === 'Overdue').length;

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-layout" style={{ display: 'flex', width: '100%' }}>
        <Sidebar activeSection="patient-registry" />

        <main className="dashboard-main-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={28} style={{ color: 'var(--teal-500)' }} />
                <span>Clinical Patient Registry</span>
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Comprehensive longitudinal health records, disease-specific diagnostics, and clinical twins
              </p>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={() => setShowAddModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
            >
              <UserPlus size={18} />
              <span>Add Patient</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--teal-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Active Registry Profiles</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{patientList.length}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--red-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>High Risk Patients</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--red-500)', marginTop: '0.2rem' }}>{highRiskCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--amber-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Overdue Follow-ups</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '0.2rem' }}>{overdueCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid #8b5cf6' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Connected Hospitals</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>4</div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', backgroundColor: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search patient by Name, Patient ID, Mobile, or Diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem', fontSize: '0.9rem' }}
              />
            </div>

            {/* Risk Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={16} style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }} />
              {['All', 'High', 'Moderate', 'Low'].map(risk => (
                <button
                  key={risk}
                  onClick={() => setFilterRisk(risk)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: filterRisk === risk ? 'var(--teal-500)' : 'var(--bg-main)',
                    color: filterRisk === risk ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  {risk} Risk
                </button>
              ))}
            </div>
          </div>

          {/* Patient Cards Registry Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.25rem' }}>
            {filteredPatients.length === 0 ? (
              <div className="widget-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}>
                <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', opacity: 0.5 }} />
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>No Patients Found</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 1rem' }}>
                  No matching patient records were found for "{searchQuery}".
                </p>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                  Add New Patient to Registry
                </button>
              </div>
            ) : (
              filteredPatients.map(patient => (
                <div 
                  key={patient.id} 
                  className="widget-card"
                  style={{
                    borderLeft: `4px solid ${patient.overallRiskStatus === 'High' ? 'var(--red-500)' : patient.overallRiskStatus === 'Moderate' ? 'var(--amber-500)' : 'var(--green-600)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    {/* Header: ID, Name, Risk Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-500)' }}>ID: {patient.id}</span>
                        <h3 style={{ margin: '0.1rem 0 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {patient.name}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {patient.age} yrs ({patient.gender}) • Blood Group: {patient.bloodGroup}
                        </span>
                      </div>

                      <span style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: patient.overallRiskStatus === 'High' ? 'var(--red-50)' : patient.overallRiskStatus === 'Moderate' ? 'var(--amber-50)' : 'var(--green-55)',
                        color: patient.overallRiskStatus === 'High' ? 'var(--red-600)' : patient.overallRiskStatus === 'Moderate' ? 'var(--amber-600)' : 'var(--green-600)',
                        border: `1px solid ${patient.overallRiskStatus === 'High' ? 'var(--red-100)' : patient.overallRiskStatus === 'Moderate' ? 'var(--amber-100)' : 'var(--green-100)'}`
                      }}>
                        {patient.overallRiskStatus} Risk
                      </span>
                    </div>

                    {/* Primary Diagnosis */}
                    <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', marginBottom: '0.85rem', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Primary Diagnosis</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{patient.primaryDiagnosis}</span>
                    </div>

                    {/* Disease Specific Labs Summary */}
                    {patient.diseaseSpecificLabs && patient.diseaseSpecificLabs.length > 0 && (
                      <div style={{ marginBottom: '0.85rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Disease Investigations</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {patient.diseaseSpecificLabs.slice(0, 3).map((lab, idx) => (
                            <span 
                              key={idx}
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.2rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: lab.status === 'High' || lab.status === 'Elevated' ? 'var(--red-50)' : 'var(--bg-main)',
                                color: lab.status === 'High' || lab.status === 'Elevated' ? 'var(--red-600)' : 'var(--text-secondary)',
                                border: '1px solid var(--border-color)',
                                fontWeight: 600
                              }}
                            >
                              {lab.name}: <strong>{lab.value} {lab.unit}</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedUpdatePatient(patient)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      Update Record
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/patient/${patient.id}`)}
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <span>Open Clinical Twin</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Patient Modal */}
          <AddPatientModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />

          {/* Update Patient Modal */}
          {selectedUpdatePatient && (
            <UpdatePatientModal 
              isOpen={!!selectedUpdatePatient} 
              onClose={() => setSelectedUpdatePatient(null)} 
              patient={selectedUpdatePatient} 
            />
          )}

          <div style={{ marginTop: '2rem' }}>
            <Disclaimer />
          </div>
        </main>
      </div>
    </div>
  );
}

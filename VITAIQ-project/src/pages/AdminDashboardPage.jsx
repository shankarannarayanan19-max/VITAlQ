import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealthRecord } from '../context/HealthRecordContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AuditLogTable from '../components/AuditLogTable';
import Disclaimer from '../components/Disclaimer';
import { ShieldCheck, Users, Building2, FileText, CheckCircle2, XCircle, AlertTriangle, Plus, Activity } from 'lucide-react';
import '../styles/dashboard.css';

export default function AdminDashboardPage() {
  const { users, approveDoctor, suspendUser } = useAuth();
  const { hospitals, departments, addHospital } = useHealthRecord();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'doctors', 'hospitals', 'audit'
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false);
  const [newHospName, setNewHospName] = useState('');
  const [newHospCity, setNewHospCity] = useState('');
  const [newHospState, setNewHospState] = useState('');

  const doctorsList = users.filter(u => u.role === 'doctor');
  const pendingDoctors = doctorsList.filter(d => d.verificationStatus === 'Pending Review');
  const approvedDoctors = doctorsList.filter(d => d.verificationStatus === 'Approved' || !d.verificationStatus);

  const handleAddHospitalSubmit = (e) => {
    e.preventDefault();
    if (!newHospName.trim()) return;

    addHospital({
      name: newHospName.trim(),
      city: newHospCity.trim() || "Chennai",
      state: newHospState.trim() || "Tamil Nadu",
      departments: ["General Medicine", "Cardiology", "Emergency"]
    });

    setNewHospName('');
    setNewHospCity('');
    setNewHospState('');
    setShowAddHospitalModal(false);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar activeSection={activeTab} onSectionChange={(id) => setActiveTab(id)} />

        <main className="dashboard-main-content">
          {/* Header Greeting */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={28} style={{ color: '#7e22ce' }} />
                <span>Hospital Administrator Console</span>
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Verify doctor registrations, manage hospital affiliations, inspect audit compliance logs, and set permissions.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '1.75rem' }}>
            <div className="stat-card">
              <div className="stat-icon-wrapper red">
                <AlertTriangle size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Pending Doctor Approvals</span>
                <span className="stat-value">{pendingDoctors.length}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <Users size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Verified Medical Specialists</span>
                <span className="stat-value">{approvedDoctors.length}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper teal">
                <Building2 size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Affiliated Hospitals</span>
                <span className="stat-value">{hospitals.length}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper amber">
                <Activity size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Clinical Departments</span>
                <span className="stat-value">{departments.length}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            {[
              { id: 'overview', label: 'Doctor Approvals' },
              { id: 'hospitals', label: 'Hospitals & Departments' },
              { id: 'audit-logs', label: 'System Audit Logs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.2rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: activeTab === tab.id ? 'var(--teal-500)' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Doctor Approvals Section */}
          {activeTab === 'overview' && (
            <div>
              <div className="widget-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--teal-600)' }} />
                  <span>National Medical Commission (NMC) Verification Queue</span>
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1.5px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                        <th style={{ padding: '0.75rem' }}>Doctor / Photo</th>
                        <th style={{ padding: '0.75rem' }}>NMC Reg Number</th>
                        <th style={{ padding: '0.75rem' }}>Specialty & Hospital</th>
                        <th style={{ padding: '0.75rem' }}>Qualification & Experience</th>
                        <th style={{ padding: '0.75rem' }}>Verification Status</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorsList.map(doc => (
                        <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={doc.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ color: 'var(--navy-900)', display: 'block' }}>{doc.name}</strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{doc.email}</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--teal-600)' }}>
                            {doc.nmcNumber || 'NMC/2015/04/82910'}
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <div style={{ fontWeight: 600 }}>{doc.specialty}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{doc.hospitalName}</span>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <div>{doc.qualification}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{doc.experience} yrs experience</span>
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <span style={{
                              padding: '0.2rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: doc.verificationStatus === 'Suspended' ? 'var(--red-50)' : doc.verificationStatus === 'Pending Review' ? 'var(--amber-50)' : 'var(--green-55)',
                              color: doc.verificationStatus === 'Suspended' ? 'var(--red-600)' : doc.verificationStatus === 'Pending Review' ? 'var(--amber-600)' : 'var(--green-600)',
                              border: `1px solid ${doc.verificationStatus === 'Suspended' ? 'var(--red-100)' : doc.verificationStatus === 'Pending Review' ? 'var(--amber-100)' : 'var(--green-100)'}`
                            }}>
                              {doc.verificationStatus || 'Approved'}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              {doc.verificationStatus !== 'Approved' && (
                                <button 
                                  className="btn btn-primary" 
                                  onClick={() => approveDoctor(doc.id)}
                                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                                >
                                  Approve NMC
                                </button>
                              )}
                              {doc.verificationStatus !== 'Suspended' && (
                                <button 
                                  className="btn btn-secondary" 
                                  onClick={() => suspendUser(doc.id)}
                                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', color: 'var(--red-600)' }}
                                >
                                  Suspend
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Hospitals & Departments Section */}
          {activeTab === 'hospitals' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>
                  Affiliated Health Institutions & Hospitals
                </h3>
                <button className="btn btn-primary" onClick={() => setShowAddHospitalModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Plus size={16} />
                  <span>Onboard New Hospital</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {hospitals.map(hosp => (
                  <div key={hosp.id} className="widget-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                      <Building2 size={24} style={{ color: 'var(--teal-600)' }} />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)' }}>{hosp.name}</h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{hosp.city}, {hosp.state}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <strong>Active Departments: </strong>
                      {hosp.departments ? hosp.departments.join(', ') : 'General Medicine, Cardiology, Endocrinology'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Audit Logs Section */}
          {activeTab === 'audit-logs' && (
            <AuditLogTable />
          )}

          {/* Add Hospital Modal */}
          {showAddHospitalModal && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
              <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy-900)' }}>Onboard New Hospital</h3>
                <form onSubmit={handleAddHospitalSubmit}>
                  <div className="form-group">
                    <label className="form-label">Hospital Name</label>
                    <input type="text" className="form-input" placeholder="e.g. Max Healthcare" value={newHospName} onChange={(e) => setNewHospName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-input" placeholder="e.g. New Delhi" value={newHospCity} onChange={(e) => setNewHospCity(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input type="text" className="form-input" placeholder="e.g. Delhi" value={newHospState} onChange={(e) => setNewHospState(e.target.value)} required />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddHospitalModal(false)} style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Hospital</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <Disclaimer />
          </div>
        </main>
      </div>
    </div>
  );
}

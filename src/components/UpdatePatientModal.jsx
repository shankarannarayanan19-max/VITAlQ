import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import { FilePlus, Activity, Pill, FlaskConical, Calendar, CheckCircle2, X, AlertTriangle } from 'lucide-react';

export default function UpdatePatientModal({ isOpen, onClose, patient }) {
  const { updatePatientRecord } = useHealthRecord();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('visit'); // 'visit', 'diagnosis', 'lab', 'medication'
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  // 1. Visit fields
  const [visitTitle, setVisitTitle] = useState('Routine Clinical Consultation');
  const [visitDesc, setVisitDesc] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // 2. Diagnosis fields
  const [newDiagnosis, setNewDiagnosis] = useState('');

  // 3. Lab fields
  const [labName, setLabName] = useState('');
  const [labValue, setLabValue] = useState('');
  const [labUnit, setLabUnit] = useState('');
  const [labReference, setLabReference] = useState('');
  const [labStatus, setLabStatus] = useState('Normal');

  // 4. Medication fields
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFrequency, setMedFrequency] = useState('Once daily');
  const [medPurpose, setMedPurpose] = useState('');

  if (!isOpen || !patient) return null;

  const handleSubmitVisit = (e) => {
    e.preventDefault();
    setError('');

    if (!visitDesc.trim()) {
      setError('Clinical visit summary description is required.');
      return;
    }

    const visitPayload = {
      date: new Date().toISOString().split('T')[0],
      type: "Visit",
      title: visitTitle,
      description: visitDesc.trim(),
      location: patient.hospitalName || "Apollo Hospitals",
      doctorName: currentUser?.name || "Dr. Aditi Sharma"
    };

    updatePatientRecord(patient.id, { 
      newVisit: visitPayload,
      lastVisit: new Date().toISOString().split('T')[0],
      nextFollowUp: followUpDate || patient.nextFollowUp
    }, currentUser);

    setNotice('Clinical visit record added successfully!');
    setTimeout(() => { setNotice(''); onClose(); }, 1200);
  };

  const handleSubmitDiagnosis = (e) => {
    e.preventDefault();
    if (!newDiagnosis.trim()) {
      setError('Diagnosis statement is required.');
      return;
    }

    updatePatientRecord(patient.id, { newDiagnosis: newDiagnosis.trim() }, currentUser);
    setNotice('Diagnosis updated successfully!');
    setTimeout(() => { setNotice(''); onClose(); }, 1200);
  };

  const handleSubmitLab = (e) => {
    e.preventDefault();
    if (!labName.trim() || !labValue.trim()) {
      setError('Lab Investigation Name and Value are required.');
      return;
    }

    const labObj = {
      name: labName.trim(),
      value: labValue.trim(),
      unit: labUnit.trim(),
      reference: labReference.trim() || "Standard Ref",
      status: labStatus
    };

    updatePatientRecord(patient.id, { newLab: labObj }, currentUser);
    setNotice('Diagnostic lab result added successfully!');
    setTimeout(() => { setNotice(''); onClose(); }, 1200);
  };

  const handleSubmitMedication = (e) => {
    e.preventDefault();
    if (!medName.trim() || !medDosage.trim()) {
      setError('Medication Name and Dosage are required.');
      return;
    }

    const medObj = {
      name: medName.trim(),
      dosage: medDosage.trim(),
      frequency: medFrequency,
      purpose: medPurpose.trim() || "Therapeutic support",
      startDate: new Date().toISOString().split('T')[0]
    };

    updatePatientRecord(patient.id, { newMedication: medObj }, currentUser);
    setNotice('New medication prescribed!');
    setTimeout(() => { setNotice(''); onClose(); }, 1200);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '560px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-header)' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Update Clinical Record — {patient.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--teal-500)', fontWeight: 700 }}>Patient ID: {patient.id}</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)' }}>
          {[
            { id: 'visit', label: 'Add Visit', icon: <FilePlus size={15} /> },
            { id: 'diagnosis', label: 'Diagnosis', icon: <Activity size={15} /> },
            { id: 'lab', label: 'Add Lab', icon: <FlaskConical size={15} /> },
            { id: 'medication', label: 'Prescribe', icon: <Pill size={15} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setError(''); setNotice(''); }}
              style={{
                flex: 1,
                padding: '0.65rem 0.5rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: activeTab === tab.id ? 'var(--teal-500)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '3px solid var(--teal-500)' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>
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

          {activeTab === 'visit' && (
            <form onSubmit={handleSubmitVisit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Visit Consultation Title</label>
                <input type="text" value={visitTitle} onChange={(e) => setVisitTitle(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Clinical Findings & Consultation Notes *</label>
                <textarea rows={3} placeholder="Enter chief complaints, physical findings, and treatment plan..." value={visitDesc} onChange={(e) => setVisitDesc(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Schedule Follow-up Date</label>
                <input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Visit Record</button>
              </div>
            </form>
          )}

          {activeTab === 'diagnosis' && (
            <form onSubmit={handleSubmitDiagnosis} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Update / Add Primary Diagnosis *</label>
                <input type="text" placeholder="e.g. Type 2 Diabetes Mellitus (ICD-10 E11.9)" value={newDiagnosis} onChange={(e) => setNewDiagnosis(e.target.value)} required style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Update Diagnosis</button>
              </div>
            </form>
          )}

          {activeTab === 'lab' && (
            <form onSubmit={handleSubmitLab} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Lab Test Name *</label>
                  <input type="text" placeholder="e.g. Fasting Blood Sugar, HbA1c" value={labName} onChange={(e) => setLabName(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Result Value *</label>
                  <input type="text" placeholder="e.g. 140" value={labValue} onChange={(e) => setLabValue(e.target.value)} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Unit</label>
                  <input type="text" placeholder="mg/dL, %" value={labUnit} onChange={(e) => setLabUnit(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Reference Range</label>
                  <input type="text" placeholder="70-99" value={labReference} onChange={(e) => setLabReference(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Status</label>
                  <select value={labStatus} onChange={(e) => setLabStatus(e.target.value)} style={{ width: '100%' }}>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Elevated">Elevated</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Save Lab Result</button>
              </div>
            </form>
          )}

          {activeTab === 'medication' && (
            <form onSubmit={handleSubmitMedication} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Drug / Medicine Name *</label>
                  <input type="text" placeholder="e.g. Metformin HCL" value={medName} onChange={(e) => setMedName(e.target.value)} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dosage *</label>
                  <input type="text" placeholder="e.g. 500 mg" value={medDosage} onChange={(e) => setMedDosage(e.target.value)} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Frequency</label>
                  <select value={medFrequency} onChange={(e) => setMedFrequency(e.target.value)} style={{ width: '100%' }}>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="As needed (PRN)">As needed (PRN)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Clinical Purpose</label>
                  <input type="text" placeholder="e.g. Glycemic control" value={medPurpose} onChange={(e) => setMedPurpose(e.target.value)} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Add Prescription</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

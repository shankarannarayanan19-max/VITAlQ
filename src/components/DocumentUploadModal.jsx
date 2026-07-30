import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Building2, Calendar, User } from 'lucide-react';

export default function DocumentUploadModal({ isOpen, onClose, patientId = "VIT001" }) {
  const { addDocumentToPHR, hospitals } = useHealthRecord();
  const { currentUser } = useAuth();

  const [category, setCategory] = useState("Laboratory");
  const [title, setTitle] = useState("");
  const [hospitalName, setHospitalName] = useState(hospitals[0]?.name || "Apollo Hospitals");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const categories = [
    "Prescription",
    "Laboratory",
    "Blood Report",
    "ECG",
    "MRI Scan",
    "CT Scan",
    "X-Ray",
    "Discharge Summary",
    "Medical Bill"
  ];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileSelected(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addDocumentToPHR(patientId, {
      category,
      title: title.trim(),
      hospitalName,
      doctorName: doctorName.trim() || "Attending Physician",
      date,
      notes: notes.trim(),
      fileUrl: fileSelected || "uploaded_report.pdf",
      fileType: "pdf"
    }, currentUser);

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setTitle("");
      setNotes("");
      setFileSelected(null);
      onClose();
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', padding: '1rem', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            <UploadCloud size={20} style={{ color: 'var(--teal-600)' }} />
            <span>Upload Medical Record to PHR</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle2 size={42} style={{ color: 'var(--green-600)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>Document Uploaded Successfully!</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>Document added to multi-hospital longitudinal timeline.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Record Category</label>
                  <select 
                    className="form-input" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Document Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Document Title / Report Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Comprehensive Lipid Panel, Knee X-Ray" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Hospital / Diagnostic Center</label>
                  <select 
                    className="form-input" 
                    value={hospitalName} 
                    onChange={(e) => setHospitalName(e.target.value)}
                    style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                  >
                    {hospitals.map((h) => (
                      <option key={h.id} value={h.name}>{h.name}</option>
                    ))}
                    <option value="Other Diagnostics">Other Diagnostics / Lab</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Attending Doctor Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Dr. Aditi Sharma" 
                    value={doctorName} 
                    onChange={(e) => setDoctorName(e.target.value)} 
                  />
                </div>
              </div>

              {/* Upload File Input */}
              <div className="form-group">
                <label className="form-label">Select File (PDF, PNG, JPG, DICOM)</label>
                <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', backgroundColor: 'var(--bg-main)', cursor: 'pointer' }}>
                  <input type="file" id="phr-file" accept=".pdf,.png,.jpg,.jpeg,.dcm" onChange={handleFileChange} style={{ display: 'none' }} />
                  <label htmlFor="phr-file" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                    <UploadCloud size={28} style={{ color: 'var(--teal-600)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-900)' }}>
                      {fileSelected ? `Selected: ${fileSelected}` : "Click to Browse Files"}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>Maximum file size: 25 MB</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Clinical Notes / Findings (Optional)</label>
                <textarea 
                  className="form-input" 
                  rows={2} 
                  placeholder="Enter diagnostic summary, lab values, or physician notes..." 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                Upload & Save to PHR Timeline
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

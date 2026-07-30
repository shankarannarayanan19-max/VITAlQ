import React, { useState } from 'react';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useAuth } from '../context/AuthContext';
import { X, Calendar, Clock, MapPin, Video, UserCheck, QrCode, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export default function AppointmentBookingModal({ isOpen, onClose, defaultDoctorId = null }) {
  const { hospitals, departments, bookAppointment } = useHealthRecord();
  const { users, currentUser } = useAuth();

  const doctorsList = users.filter(u => u.role === 'doctor' && u.verificationStatus !== 'Suspended');

  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]?.name || "Apollo Hospitals");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Endocrinology");
  const [selectedDoctorId, setSelectedDoctorId] = useState(defaultDoctorId || doctorsList[0]?.id || "");
  const [consultationType, setConsultationType] = useState("Physical Consultation");
  const [appointmentDate, setAppointmentDate] = useState("2026-08-05");
  const [appointmentTime, setAppointmentTime] = useState("10:30 AM");
  const [reason, setReason] = useState("");
  const [completedTicket, setCompletedTicket] = useState(null);

  if (!isOpen) return null;

  const currentDoctor = doctorsList.find(d => d.id === selectedDoctorId) || doctorsList[0];

  const handleBook = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const ticket = bookAppointment({
      patientId: currentUser.patientId || "VIT001",
      patientName: currentUser.name || "Patient",
      patientEmail: currentUser.email || "",
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorSpecialty: currentDoctor.specialty || selectedSpecialty,
      hospitalName: selectedHospital,
      department: selectedSpecialty,
      date: appointmentDate,
      time: appointmentTime,
      consultationType,
      reason: reason || "Routine Consultation"
    }, currentUser);

    setCompletedTicket(ticket);
    setStep(3);
  };

  const handleCloseModal = () => {
    setStep(1);
    setCompletedTicket(null);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', padding: '1rem', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ width: '100%', maxWidth: '520px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={18} style={{ color: 'var(--teal-600)' }} />
              <span>Book Doctor Appointment</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Select hospital, specialist, and time slot</span>
          </div>
          <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          {step === 1 && (
            <div>
              <div className="form-group">
                <label className="form-label">Select Hospital / Medical Center</label>
                <select 
                  className="form-input" 
                  value={selectedHospital} 
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                >
                  {hospitals.map(h => (
                    <option key={h.id} value={h.name}>{h.name} - {h.city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Medical Specialty</label>
                <select 
                  className="form-input" 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                >
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Consulting Specialist Doctor</label>
                <select 
                  className="form-input" 
                  value={selectedDoctorId} 
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                >
                  {doctorsList.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty} - {doc.hospitalName})</option>
                  ))}
                </select>
              </div>

              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem' }}
                onClick={() => setStep(2)}
              >
                <span>Continue to Date & Time</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleBook}>
              <div className="form-group">
                <label className="form-label">Consultation Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {["Physical Consultation", "Video Consultation", "Follow-up"].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setConsultationType(type)}
                      style={{
                        padding: '0.6rem 0.4rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-md)',
                        border: consultationType === type ? '2px solid var(--teal-500)' : '1px solid var(--border-color)',
                        backgroundColor: consultationType === type ? 'var(--teal-50)' : 'var(--bg-main)',
                        color: consultationType === type ? 'var(--teal-600)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Appointment Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={appointmentDate} 
                    onChange={(e) => setAppointmentDate(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select 
                    className="form-input" 
                    value={appointmentTime} 
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    style={{ appearance: 'none', backgroundColor: 'var(--bg-main)' }}
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Reason for Visit / Symptoms</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Routine Diabetes check, Blood Pressure review" 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  Confirm Booking
                </button>
              </div>
            </form>
          )}

          {step === 3 && completedTicket && (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--green-55)', color: 'var(--green-600)', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)', margin: 0 }}>Appointment Confirmed!</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 1.25rem' }}>
                Your appointment ID is <strong style={{ color: 'var(--teal-600)' }}>{completedTicket.id}</strong>
              </p>

              {/* Digital Ticket Card */}
              <div style={{ backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'left', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Doctor:</span>
                  <strong style={{ color: 'var(--navy-900)' }}>{completedTicket.doctorName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hospital:</span>
                  <strong style={{ color: 'var(--navy-900)' }}>{completedTicket.hospitalName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Date & Time:</span>
                  <strong style={{ color: 'var(--navy-900)' }}>{completedTicket.date} at {completedTicket.time}</strong>
                </div>
                
                {/* QR Code Ticket Badge */}
                <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <QrCode size={42} style={{ color: 'var(--navy-900)' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-600)' }}>DIGITAL ENTRY PASS</span>
                    <p style={{ fontSize: '0.7rem', color: 'var(--slate-400)', margin: '0.1rem 0 0' }}>Show this QR code at hospital check-in counter.</p>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleCloseModal}>
                Done & View Calendar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

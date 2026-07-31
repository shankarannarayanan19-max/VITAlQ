import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealthRecord } from '../context/HealthRecordContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AppointmentBookingModal from '../components/AppointmentBookingModal';
import Disclaimer from '../components/Disclaimer';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  List, 
  Grid, 
  Search, 
  Video, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight, 
  QrCode,
  Eye,
  Play,
  RotateCcw,
  X
} from 'lucide-react';
import '../styles/dashboard.css';

export default function AppointmentsPage() {
  const { currentUser, role } = useAuth();
  const { appointments, updateAppointmentStatus, rescheduleAppointment } = useHealthRecord();

  const userRole = currentUser?.role || role || "doctor";

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [tabFilter, setTabFilter] = useState("Today's Appointments"); // "Today's Appointments", "Upcoming", "Completed", "Cancelled"
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);

  // Consultation / Reschedule / Detail Modals
  const [selectedApt, setSelectedApt] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'consultation', 'reschedule', 'cancel'
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [consultNotes, setConsultNotes] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  // Filter appointments for user role
  const userAppointments = appointments.filter(apt => {
    if (userRole === 'doctor') {
      return apt.doctorId === currentUser?.id || apt.doctorName === currentUser?.name || true;
    } else if (userRole === 'patient') {
      return apt.patientId === currentUser?.patientId || apt.patientName === currentUser?.name;
    }
    return true; // Admin sees all
  });

  // Calculate statistics
  const todayCount = userAppointments.filter(a => a.date === todayStr).length;
  const pendingCount = userAppointments.filter(a => a.status === 'Pending').length;
  const completedCount = userAppointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = userAppointments.filter(a => a.status === 'Cancelled').length;
  const nextApt = userAppointments.find(a => a.date >= todayStr && a.status !== 'Cancelled');

  // Filter by Tab & Search
  const filteredAppointments = userAppointments.filter(apt => {
    // Search match
    const matchesSearch = 
      apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (tabFilter === "Today's Appointments") return apt.date === todayStr;
    if (tabFilter === "Upcoming") return apt.date > todayStr && apt.status !== 'Cancelled' && apt.status !== 'Completed';
    if (tabFilter === "Completed") return apt.status === 'Completed';
    if (tabFilter === "Cancelled") return apt.status === 'Cancelled';
    return true;
  });

  const handleStartConsultation = (apt) => {
    setSelectedApt(apt);
    setConsultNotes('');
    setModalType('consultation');
  };

  const handleCompleteConsultationSubmit = (e) => {
    e.preventDefault();
    updateAppointmentStatus(selectedApt.id, 'Completed', currentUser, consultNotes);
    setModalType(null);
    setSelectedApt(null);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleTime) return;
    rescheduleAppointment(selectedApt.id, rescheduleDate, rescheduleTime, currentUser);
    setModalType(null);
    setSelectedApt(null);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    updateAppointmentStatus(selectedApt.id, 'Cancelled', currentUser, cancelReason || 'Cancelled by user');
    setModalType(null);
    setSelectedApt(null);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-layout" style={{ display: 'flex', width: '100%' }}>
        <Sidebar activeSection="appointments" />

        <main className="dashboard-main-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          
          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={28} style={{ color: 'var(--teal-500)' }} />
                <span>Appointment Management Hub</span>
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Manage scheduled clinical consultations, patient check-ins, and digital entry passes
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {/* View Switcher */}
              <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.2rem' }}>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: viewMode === 'list' ? 'var(--teal-500)' : 'transparent',
                    color: viewMode === 'list' ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <List size={16} />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  style={{
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: viewMode === 'calendar' ? 'var(--teal-500)' : 'transparent',
                    color: viewMode === 'calendar' ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Grid size={16} />
                  <span>Calendar</span>
                </button>
              </div>

              <button className="btn btn-primary" onClick={() => setShowBookingModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Top Statistics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--teal-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Today's Appointments</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>{todayCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--amber-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Pending Confirmation</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--amber-500)', marginTop: '0.2rem' }}>{pendingCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--green-600)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Completed</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-600)', marginTop: '0.2rem' }}>{completedCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--red-500)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cancelled</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--red-500)', marginTop: '0.2rem' }}>{cancelledCount}</div>
            </div>

            <div className="widget-card" style={{ padding: '1.25rem', borderLeft: '4px solid #8b5cf6' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Next Appointment</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {nextApt ? `${nextApt.date} (${nextApt.time})` : "No upcoming"}
              </div>
            </div>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
              {["Today's Appointments", "Upcoming", "Completed", "Cancelled"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setTabFilter(tab)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: tabFilter === tab ? 'var(--teal-500)' : 'transparent',
                    color: tabFilter === tab ? '#ffffff' : 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Main View: List or Calendar */}
          {viewMode === 'list' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {filteredAppointments.length === 0 ? (
                <div className="widget-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <CalendarIcon size={48} style={{ opacity: 0.4, marginBottom: '0.75rem' }} />
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>No Appointments Found</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 1rem' }}>There are no records matching tab "{tabFilter}".</p>
                  <button className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
                    Book New Appointment
                  </button>
                </div>
              ) : (
                filteredAppointments.map(apt => (
                  <div 
                    key={apt.id} 
                    className="widget-card" 
                    style={{ 
                      borderLeft: `4px solid ${apt.status === 'Confirmed' ? 'var(--green-600)' : apt.status === 'Pending' ? 'var(--amber-500)' : apt.status === 'Completed' ? 'var(--teal-500)' : 'var(--red-500)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between'
                    }}
                  >
                    <div>
                      {/* Top Bar: Photo, Name, Status */}
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <img 
                          src={apt.patientAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
                          alt="Patient" 
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-500)' }}>ID: {apt.id}</span>
                            <span style={{
                              padding: '0.2rem 0.65rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              backgroundColor: apt.status === 'Confirmed' ? 'var(--green-55)' : apt.status === 'Pending' ? 'var(--amber-50)' : apt.status === 'Completed' ? 'var(--teal-50)' : 'var(--red-50)',
                              color: apt.status === 'Confirmed' ? 'var(--green-600)' : apt.status === 'Pending' ? 'var(--amber-600)' : apt.status === 'Completed' ? 'var(--teal-600)' : 'var(--red-600)',
                              border: `1px solid ${apt.status === 'Confirmed' ? 'var(--green-100)' : apt.status === 'Pending' ? 'var(--amber-100)' : 'var(--border-color)'}`
                            }}>
                              {apt.status}
                            </span>
                          </div>
                          <h4 style={{ margin: '0.1rem 0 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {userRole === 'patient' ? apt.doctorName : apt.patientName}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {apt.patientAge ? `${apt.patientAge} yrs` : ''}{apt.patientAge && apt.patientGender ? ' ' : ''}{apt.patientGender ? `(${apt.patientGender})` : ''}{(apt.patientAge || apt.patientGender) ? ' • ' : ''}{apt.reason || apt.doctorSpecialty}
                          </span>
                        </div>
                      </div>

                      {/* Appointment Meta Details */}
                      <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                          <Clock size={14} style={{ color: 'var(--teal-500)' }} />
                          <span><strong>Time:</strong> {apt.date} at {apt.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                          <MapPin size={14} style={{ color: 'var(--teal-500)' }} />
                          <span><strong>Hospital:</strong> {apt.hospitalName} ({apt.consultationType})</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
                          <Stethoscope size={14} style={{ color: 'var(--teal-500)' }} />
                          <span><strong>Doctor:</strong> {apt.doctorName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Toolbar */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button 
                        onClick={() => setActiveTicket(apt)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--teal-500)' }}
                      >
                        <QrCode size={14} />
                        <span>Pass</span>
                      </button>

                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {/* Start Consultation */}
                        {apt.status === 'Confirmed' && userRole === 'doctor' && (
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleStartConsultation(apt)}
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <Play size={12} />
                            <span>Consult</span>
                          </button>
                        )}

                        {/* Reschedule */}
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <button 
                            className="btn btn-secondary"
                            onClick={() => { setSelectedApt(apt); setRescheduleDate(apt.date); setRescheduleTime(apt.time); setModalType('reschedule'); }}
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <RotateCcw size={12} />
                            <span>Reschedule</span>
                          </button>
                        )}

                        {/* Cancel */}
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <button 
                            className="btn btn-secondary"
                            onClick={() => { setSelectedApt(apt); setCancelReason(''); setModalType('cancel'); }}
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--red-600)' }}
                          >
                            Cancel
                          </button>
                        )}

                        {/* Complete */}
                        {apt.status === 'Confirmed' && userRole === 'doctor' && (
                          <button 
                            className="btn btn-primary"
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed', currentUser)}
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--green-600)' }}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Interactive Calendar View */
            <div className="widget-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CalendarIcon size={20} style={{ color: 'var(--teal-500)' }} />
                  <span>Clinical Schedule Calendar (Month View)</span>
                </h3>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-500)' }}>
                  Today: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Calendar Grid Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} style={{ padding: '0.4rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}>{day}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {Array.from({ length: 31 }, (_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `2026-07-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                  const dayApts = userAppointments.filter(a => a.date === dateStr);

                  return (
                    <div 
                      key={dayNum} 
                      style={{ 
                        minHeight: '85px', 
                        padding: '0.4rem', 
                        backgroundColor: dateStr === todayStr ? 'var(--teal-50)' : 'var(--bg-main)',
                        border: dateStr === todayStr ? '2px solid var(--teal-500)' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: dateStr === todayStr ? 'var(--teal-500)' : 'var(--text-primary)', marginBottom: '0.25rem' }}>{dayNum}</div>
                      {dayApts.slice(0, 2).map(a => (
                        <div 
                          key={a.id}
                          style={{
                            fontSize: '0.68rem',
                            padding: '0.15rem 0.35rem',
                            borderRadius: '3px',
                            backgroundColor: a.status === 'Confirmed' ? 'var(--green-55)' : a.status === 'Pending' ? 'var(--amber-50)' : 'var(--slate-200)',
                            color: a.status === 'Confirmed' ? 'var(--green-600)' : a.status === 'Pending' ? 'var(--amber-600)' : 'var(--text-primary)',
                            marginBottom: '0.2rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          title={`${a.time} - ${a.patientName}`}
                        >
                          {a.time} {a.patientName}
                        </div>
                      ))}
                      {dayApts.length > 2 && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--teal-500)', fontWeight: 700 }}>+{dayApts.length - 2} more</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QR Ticket Modal */}
          {activeTicket && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
              <div style={{ width: '100%', maxWidth: '380px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Digital Entry Pass</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--teal-500)', fontWeight: 700 }}>Appointment ID: {activeTicket.id}</span>
                
                <div style={{ margin: '1.25rem 0', padding: '1rem', backgroundColor: '#ffffff', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <QrCode size={120} style={{ color: '#0f172a' }} />
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace', marginTop: '0.5rem' }}>{activeTicket.qrCode}</span>
                </div>

                <div style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                  <div><strong>Patient:</strong> {activeTicket.patientName}</div>
                  <div><strong>Doctor:</strong> {activeTicket.doctorName}</div>
                  <div><strong>Hospital:</strong> {activeTicket.hospitalName}</div>
                  <div><strong>Date & Time:</strong> {activeTicket.date} at {activeTicket.time}</div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setActiveTicket(null)}>
                  Close Pass
                </button>
              </div>
            </div>
          )}

          {/* Consultation / Reschedule / Cancel Action Modals */}
          {modalType && selectedApt && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', padding: '1rem' }}>
              <div style={{ width: '100%', maxWidth: '460px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                
                {modalType === 'consultation' && (
                  <form onSubmit={handleCompleteConsultationSubmit}>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Start Clinical Consultation</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Patient: <strong>{selectedApt.patientName}</strong> | Reason: {selectedApt.reason || 'Routine Checkup'}
                    </p>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Clinical Observations & Notes</label>
                      <textarea rows={4} placeholder="Record patient symptoms, vitals, diagnosis, and prescribed medications..." value={consultNotes} onChange={(e) => setConsultNotes(e.target.value)} required style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setModalType(null)} style={{ flex: 1 }}>Close</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 2, backgroundColor: 'var(--green-600)' }}>Complete & Log Visit</button>
                    </div>
                  </form>
                )}

                {modalType === 'reschedule' && (
                  <form onSubmit={handleRescheduleSubmit}>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Reschedule Appointment</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Appointment ID: <strong>{selectedApt.id}</strong> ({selectedApt.patientName})
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>New Date</label>
                        <input type="date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} required style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>New Time Slot</label>
                        <input type="text" placeholder="e.g. 10:30 AM" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} required style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setModalType(null)} style={{ flex: 1 }}>Cancel</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Confirm Reschedule</button>
                    </div>
                  </form>
                )}

                {modalType === 'cancel' && (
                  <form onSubmit={handleCancelSubmit}>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--red-600)' }}>Cancel Appointment</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Are you sure you want to cancel Appointment ID <strong>{selectedApt.id}</strong>?
                    </p>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Reason for Cancellation</label>
                      <textarea rows={3} placeholder="Provide reason..." value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} required style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setModalType(null)} style={{ flex: 1 }}>Back</button>
                      <button type="submit" className="btn btn-danger" style={{ flex: 2 }}>Confirm Cancel</button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}

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

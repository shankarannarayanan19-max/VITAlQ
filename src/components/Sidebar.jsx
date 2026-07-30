import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HeartPulse, 
  Activity, 
  BrainCircuit, 
  FileClock, 
  LineChart, 
  BellRing, 
  Users,
  LogOut,
  ShieldCheck,
  Calendar,
  FileText,
  User,
  Settings
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeSection, onSectionChange }) {
  const navigate = useNavigate();
  const { currentUser, logoutUser, role } = useAuth();

  const userRole = currentUser?.role || role || "doctor";

  const handleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  const getMenuItems = () => {
    if (userRole === 'admin') {
      return [
        { id: 'overview', label: 'Admin Overview', icon: <ShieldCheck size={18} /> },
        { id: 'doctors-approval', label: 'Doctor Verifications', icon: <Users size={18} /> },
        { id: 'hospitals', label: 'Hospitals & Departments', icon: <HeartPulse size={18} /> },
        { id: 'audit-logs', label: 'System Audit Logs', icon: <FileText size={18} /> }
      ];
    } else if (userRole === 'patient') {
      return [
        { id: 'overview', label: 'Health Overview', icon: <HeartPulse size={18} /> },
        { id: 'phr-timeline', label: 'Multi-Hospital Timeline', icon: <FileClock size={18} /> },
        { id: 'appointments', label: 'Book Appointments', icon: <Calendar size={18} /> },
        { id: 'doctors', label: 'Connected Doctors', icon: <Users size={18} /> },
        { id: 'lab-charts', label: 'Vitals & Lab Trends', icon: <LineChart size={18} /> }
      ];
    } else {
      // Complete Doctor Clinical Workspace Sections
      return [
        { id: 'dashboard', label: 'Clinical Dashboard', icon: <HeartPulse size={18} /> },
        { id: 'patient-registry', label: 'Patient Registry', icon: <Users size={18} /> },
        { id: 'appointments', label: 'Appointments', icon: <Calendar size={18} /> },
        { id: 'medical-records', label: 'Medical Records', icon: <FileClock size={18} /> },
        { id: 'clinical-analytics', label: 'Clinical Analytics', icon: <LineChart size={18} /> },
        { id: 'notifications', label: 'Notifications & Alerts', icon: <BellRing size={18} /> },
        { id: 'profile', label: 'Doctor Profile', icon: <User size={18} /> },
        { id: 'settings', label: 'Clinical Settings', icon: <Settings size={18} /> }
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleItemClick = (item) => {
    if (onSectionChange) {
      onSectionChange(item.id);
    }

    if (userRole === 'doctor') {
      if (item.id === 'patient-registry') {
        navigate('/patients');
        return;
      }
      if (item.id === 'appointments') {
        navigate('/appointments');
        return;
      }
    }

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{ backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
      <div className="sidebar-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <img 
          src="/vitaiq-logo.jpg" 
          alt="VITAIQ Logo" 
          className="brand-icon" 
          style={{ width: '32px', height: '32px', borderRadius: '4px' }}
        />
        <div className="sidebar-logo">
          <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>VITAIQ</span>
          <span style={{ fontSize: '0.72rem', display: 'block', color: 'var(--teal-500)', fontWeight: 600 }}>
            {userRole === 'admin' ? 'Hospital Admin' : userRole === 'patient' ? 'Personal Health Record' : 'Clinical Decision Twin'}
          </span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
            style={{
              color: activeSection === item.id ? 'var(--teal-500)' : 'var(--text-secondary)',
              backgroundColor: activeSection === item.id ? 'var(--teal-50)' : 'transparent',
              fontWeight: activeSection === item.id ? 700 : 500
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="sidebar-doctor-info">
          <span className="doctor-name" style={{ color: 'var(--text-primary)' }}>{currentUser?.name || "Dr. Aditi Sharma"}</span>
          <span className="doctor-role" style={{ color: 'var(--text-muted)' }}>{userRole.toUpperCase()}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

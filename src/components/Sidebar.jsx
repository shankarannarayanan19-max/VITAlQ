import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  Activity, 
  BrainCircuit, 
  FileClock, 
  LineChart, 
  BellRing, 
  Users,
  LogOut 
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeSection, onSectionChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vitaiq_auth");
    localStorage.removeItem("vitaiq_role");
    localStorage.removeItem("vitaiq_patient_id");
    navigate("/", { replace: true });
  };

  const menuItems = [
    { id: 'overview', label: 'Twin Overview', icon: <HeartPulse size={18} /> },
    { id: 'clinical-summary', label: 'AI Clinical Summary', icon: <BrainCircuit size={18} /> },
    { id: 'timeline', label: 'Medical Timeline', icon: <FileClock size={18} /> },
    { id: 'risk-engine', label: 'Future Risk Engine', icon: <Activity size={18} /> },
    { id: 'lab-charts', label: 'Lab Trend Charts', icon: <LineChart size={18} /> },
    { id: 'alerts', label: 'Clinical Alerts', icon: <BellRing size={18} /> }
  ];

  const handleItemClick = (id) => {
    onSectionChange(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClose) onClose(); // close mobile drawer
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <img 
          src="/vitaiq-logo.jpg" 
          alt="VITAIQ Logo" 
          className="brand-icon" 
          style={{ width: '32px', height: '32px', borderRadius: '4px' }}
        />
        <div className="sidebar-logo">
          <span style={{ fontWeight: 800 }}>VITAIQ</span>
          <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--teal-400)', fontWeight: 500 }}>Digital Twin Workspace</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ margin: '1.5rem 0.75rem 0.5rem', height: '1px', backgroundColor: 'var(--navy-800)' }}></div>
        
        <button
          className="sidebar-item"
          onClick={() => navigate('/patients')}
        >
          <Users size={18} />
          <span>Patient Registry</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-doctor-info">
          <span className="doctor-name">Dr. Aditi Sharma</span>
          <span className="doctor-role">General Physician</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={14} />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
}

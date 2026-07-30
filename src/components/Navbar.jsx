import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, LogOut, ArrowLeft, User } from 'lucide-react';

export default function Navbar({ onMenuToggle, patientName }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("vitaiq_role") || "doctor";

  const handleLogout = () => {
    localStorage.removeItem("vitaiq_auth");
    localStorage.removeItem("vitaiq_role");
    localStorage.removeItem("vitaiq_patient_id");
    navigate("/", { replace: true });
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        {role === "doctor" && onMenuToggle && (
          <button 
            className="menu-toggle" 
            onClick={onMenuToggle}
            aria-label="Toggle Sidebar"
            style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}
          >
            <Menu size={24} />
          </button>
        )}
        {role === "doctor" ? (
          <Link to="/patients" className="back-search-link">
            <ArrowLeft size={16} />
            <span>Patient Registry</span>
          </Link>
        ) : (
          <Link to="/portal" className="back-search-link" style={{ color: 'var(--teal-600)', gap: '0.5rem' }}>
            <img src="/vitaiq-logo.jpg" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '4px' }} />
            <span style={{ fontWeight: 700 }}>VITAIQ Portal</span>
          </Link>
        )}
        {patientName && role === "doctor" && (
          <span 
            className="brand-badge" 
            style={{ 
              backgroundColor: 'var(--navy-800)', 
              marginLeft: '1rem',
              display: 'inline-block'
            }}
          >
            Digital Twin: {patientName}
          </span>
        )}
      </div>

      <div className="navbar-right">
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}
        >
          <User size={16} />
          <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
            {role === "doctor" ? "Dr. Aditi Sharma" : patientName || "Patient"}
          </span>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.35rem', 
            fontSize: '0.85rem', 
            color: 'var(--red-600)',
            fontWeight: 600
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}

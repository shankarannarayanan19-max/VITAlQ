import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, LogOut, ArrowLeft, User, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDrawer from './NotificationDrawer';

export default function Navbar({ onMenuToggle, patientName }) {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAuth();
  const role = currentUser?.role || localStorage.getItem("vitaiq_role") || "doctor";
  const displayName = currentUser?.name || localStorage.getItem("vitaiq_user_name") || (role === "doctor" ? "Doctor" : "Patient");

  const [notifOpen, setNotifOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
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
        {/* Notification Bell */}
        <button
          onClick={() => setNotifOpen(true)}
          aria-label="Open Notifications"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-secondary)',
            padding: '0.25rem'
          }}
        >
          <Bell size={20} />
        </button>

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
            {role === "doctor" ? displayName : patientName || displayName}
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

      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </header>
  );
}

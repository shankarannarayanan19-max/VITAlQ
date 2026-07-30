import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHealthRecord } from '../context/HealthRecordContext';
import { useTheme } from '../context/ThemeContext';
import NotificationDrawer from './NotificationDrawer';
import { Menu, LogOut, User, Bell, Calendar, Sun, Moon } from 'lucide-react';

export default function Navbar({ onMenuToggle, patientName }) {
  const navigate = useNavigate();
  const { currentUser, logoutUser, role } = useAuth();
  const { notifications } = useHealthRecord();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  const userRole = currentUser?.role || role || "doctor";
  const userNotifications = notifications.filter(
    n => !currentUser || n.userId === currentUser.id || n.userId === currentUser.patientId || userRole === 'admin'
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;

  return (
    <>
      <header className="top-navbar" style={{ backgroundColor: 'var(--bg-header)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="navbar-left">
          {onMenuToggle && (
            <button 
              className="menu-toggle" 
              onClick={onMenuToggle}
              aria-label="Toggle Sidebar"
              style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
            >
              <Menu size={24} />
            </button>
          )}

          <Link to="/" className="brand-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/vitaiq-logo.jpg" alt="Logo" style={{ width: '30px', height: '30px', borderRadius: '6px' }} />
            <span className="brand-name" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>VITAIQ</span>
          </Link>

          {/* RBAC Role Pill */}
          <span 
            style={{ 
              backgroundColor: userRole === 'admin' ? 'var(--purple-100, #f3e8ff)' : userRole === 'doctor' ? 'var(--teal-50)' : 'var(--blue-50, #eff6ff)', 
              color: userRole === 'admin' ? '#7e22ce' : userRole === 'doctor' ? 'var(--teal-400)' : '#1d4ed8',
              border: `1px solid ${userRole === 'admin' ? '#d8b4fe' : userRole === 'doctor' ? 'var(--teal-100)' : '#bfdbfe'}`,
              marginLeft: '1rem',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {userRole === 'admin' ? 'Hospital Admin' : userRole === 'doctor' ? 'Clinical Workspace' : 'Personal Health Record'}
          </span>
        </div>

        <div className="navbar-right">
          {/* Quick Navigation Links */}
          {userRole === 'admin' && (
            <Link to="/admin" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', marginRight: '0.5rem' }}>
              Admin Console
            </Link>
          )}

          <Link to="/appointments" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
            <Calendar size={15} style={{ color: 'var(--teal-500)' }} />
            <span>Appointments</span>
          </Link>

          {/* Global Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{ 
              background: 'none', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              padding: '0.4rem', 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} style={{ color: 'var(--teal-500)' }} />}
            <span>{isDarkMode ? "Light" : "Dark"}</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setShowNotifications(true)}
            style={{ position: 'relative', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.35rem', display: 'flex', alignItems: 'center' }}
            title="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '16px', height: '16px', backgroundColor: 'var(--red-600)', color: '#ffffff', fontSize: '0.65rem', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              paddingLeft: '0.5rem',
              borderLeft: '1px solid var(--border-color)'
            }}
          >
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <User size={18} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.82rem', lineHeight: '1.2' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentUser?.name || (userRole === "doctor" ? "Dr. Aditi Sharma" : patientName || "Patient Profile")}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {currentUser?.email || "verified@vitaiq.health"}
              </span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.85rem', 
              color: 'var(--red-600)',
              fontWeight: 600,
              marginLeft: '0.5rem'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Slide-Out Notification Drawer */}
      <NotificationDrawer isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}

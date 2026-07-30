import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import '../styles/landing.css';
import { 
  ArrowRight, 
  FileClock, 
  BrainCircuit, 
  Activity, 
  Search, 
  GitMerge, 
  TrendingUp, 
  HeartPulse, 
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

export default function LandingPage() {
  const isAuth = localStorage.getItem("vitaiq_auth") === "true";
  const role = localStorage.getItem("vitaiq_role") || "doctor";
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const getLaunchDestination = () => {
    if (!isAuth) return "/login";
    return role === "patient" ? "/portal" : "/patients";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="landing-page animate-fade-in">
      {/* Navigation */}
      <header className="landing-nav">
        <div className="brand-container">
          <img src="/vitaiq-logo.jpg" alt="VITAIQ Logo" className="brand-icon" style={{ borderRadius: '6px' }} />
          <span className="brand-name">VITAIQ</span>
        </div>
        <Link to={getLaunchDestination()} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
          <span>Launch Workspace</span>
          <ArrowRight size={14} />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <div className="tagline">AI-Powered Digital Patient Twin</div>
          <h1 className="hero-title">
            Understand the Past.<br />
            Assess the Present.<br />
            Anticipate the Future.
          </h1>
          <p className="hero-description">
            VITAIQ transforms fragmented medical records into unified clinical intelligence, helping healthcare professionals understand patient history, identify important trends, and anticipate potential future risks.
          </p>
          <div className="hero-cta">
            <Link to={getLaunchDestination()} className="btn btn-primary">
              <span>Launch Clinical Workspace</span>
              <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn btn-secondary">Explore Features</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat-card">
              <TrendingUp size={16} />
              <span>92% faster chart review</span>
            </div>
            <div className="hero-stat-card">
              <HeartPulse size={16} />
              <span>Real-time risk alerts</span>
            </div>
            <div className="hero-stat-card">
              <GitMerge size={16} />
              <span>Unified care timeline</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-panel">
            <div className="visual-header">
              <span className="visual-pill">Enterprise AI Architecture</span>
              <span className="visual-badge">HIPAA Compliant</span>
            </div>

            <div className="visual-card">
              <div className="visual-card-title">AI Digital Twin Intelligence Engine</div>
              <div className="visual-metric-row">
                <div className="metric-item">
                  <span className="metric-label">Security</span>
                  <span className="metric-value">AES-256</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Pipeline</span>
                  <span className="metric-value">Real-Time</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Accuracy</span>
                  <span className="metric-value">99.4%</span>
                </div>
              </div>
              <div className="visual-progress">
                <div className="visual-progress-bar">
                  <span style={{ width: '92%' }}></span>
                </div>
                <div className="visual-progress-meta">
                  <span>Clinical Decision Support Engine</span>
                  <span>Active</span>
                </div>
              </div>
            </div>

            <div className="visual-list">
              <div className="visual-list-item">
                <Search size={16} />
                <span>Predictive Risk Trajectory Modeling</span>
              </div>
              <div className="visual-list-item">
                <Activity size={16} />
                <span>Automated EHR Harmonization & Timeline Synthesis</span>
              </div>
              <div className="visual-list-item">
                <FileClock size={16} />
                <span>Longitudinal Health Trend Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights-section">
        <div className="highlight-card">
          <div className="highlight-icon">
            <HeartPulse size={18} />
          </div>
          <div>
            <h3>360° patient context</h3>
            <p>Blend labs, medications, and history into one clear clinical picture.</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">
            <Search size={18} />
          </div>
          <div>
            <h3>Faster clinical reviews</h3>
            <p>Surface critical timelines and anomalies in seconds rather than minutes.</p>
          </div>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">
            <TrendingUp size={18} />
          </div>
          <div>
            <h3>Predictive insight</h3>
            <p>Support trending decisions with transparent risk intelligence.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Clinical Intelligence Suite</h2>
          <p>Advanced modules engineered to streamline patient record analysis and improve diagnostic overview.</p>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FileClock size={24} />
            </div>
            <h3>Unified Patient Timeline</h3>
            <p>Consolidate diagnostic history, clinical consultations, vaccinations, and previous surgical procedures into a single chronological, searchable pathway.</p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BrainCircuit size={24} />
            </div>
            <h3>AI Clinical Summary</h3>
            <p>Simulate advanced natural language synthesis to extract metabolic trends, active conditions, and critical allergy or medication interaction alerts from longitudinal records.</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Activity size={24} />
            </div>
            <h3>Future Risk Intelligence</h3>
            <p>Employ transparent clinical rule sets to calculate disease progression indices for diabetes complications, renal deterioration, and cardiovascular risks.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="workflow-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Four structural phases converting raw electronic health records into active clinical decision-support parameters.</p>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h4>Retrieve Profile</h4>
            <p>Query the digital twin database using standard EHR identifiers.</p>
          </div>

          <div className="workflow-step">
            <div className="step-number">2</div>
            <h4>Consolidate History</h4>
            <p>Assemble clinical consultation reports, labs, and prescription data.</p>
          </div>

          <div className="workflow-step">
            <div className="step-number">3</div>
            <h4>Analyse Trends</h4>
            <p>Evaluate metabolic markers over time (such as HbA1c, eGFR, and BP).</p>
          </div>

          <div className="workflow-step">
            <div className="step-number">4</div>
            <h4>Support Insights</h4>
            <p>Provide clinicians with real-time risk alerts and consultation suggestions.</p>
          </div>
        </div>
      </section>

      {/* Collaboration Statement */}
      <section className="container">
        <div className="collaboration-section">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <UserCheck size={40} style={{ color: 'var(--teal-400)' }} />
          </div>
          <h2>Designed for Clinicians, Not Replacements</h2>
          <p>
            VITAIQ is a clinical decision-support assistant. Every risk calculation, alert warning, and summary index is transparently traced to patient records, empowering healthcare professionals to make informed, data-driven decisions while retaining complete clinical oversight.
          </p>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="support-section" id="support">
        <div className="support-container">
          <div className="support-info">
            <h2>Contact & Clinical Support</h2>
            <p>
              Have questions about VITAIQ's clinical twin features, data integration, or patient portal? Get in touch with our clinical support team.
            </p>
            <div className="support-details">
              <div className="support-detail-item">
                <div className="support-detail-icon">
                  <Mail size={20} />
                </div>
                <div className="support-detail-text">
                  <h4>Email Support</h4>
                  <p>support@vitaiq.com</p>
                </div>
              </div>

              <div className="support-detail-item">
                <div className="support-detail-icon">
                  <Phone size={20} />
                </div>
                <div className="support-detail-text">
                  <h4>Clinical helpline</h4>
                  <p>+91 1800-123-4567 (Toll-Free)</p>
                </div>
              </div>

              <div className="support-detail-item">
                <div className="support-detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="support-detail-text">
                  <h4>Headquarters</h4>
                  <p>Bangalore, Karnataka, India</p>
                </div>
              </div>

              <div className="support-detail-item">
                <div className="support-detail-icon">
                  <Clock size={20} />
                </div>
                <div className="support-detail-text">
                  <h4>Support Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="support-form-card">
            <h3>Send a Message</h3>
            <p>Our support staff will get back to you within 24 hours.</p>
            
            {formSubmitted ? (
              <div style={{ backgroundColor: 'var(--green-55)', border: '1.5px solid var(--green-500)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'var(--green-600)', fontWeight: 550, textAlign: 'center' }}>
                Thank you! Your inquiry has been sent to our support team.
              </div>
            ) : (
              <form className="support-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="support-name" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>Your Name</label>
                  <input 
                    type="text" 
                    id="support-name" 
                    className="form-input" 
                    placeholder="Enter your full name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="support-email" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>Email Address</label>
                  <input 
                    type="email" 
                    id="support-email" 
                    className="form-input" 
                    placeholder="name@organization.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="support-message" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy-900)' }}>Message or Query</label>
                  <textarea 
                    id="support-message" 
                    className="form-input" 
                    placeholder="Describe how we can assist you..." 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/vitaiq-logo.jpg" alt="VITAIQ" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
            <span>VITAIQ</span>
          </div>
          <div className="footer-links">
            <Link to="/login">Portal Login</Link>
            <Link to="/patients">Clinical Registry</Link>
            <a href="#features">Features</a>
            <a href="#support">Support</a>
          </div>
        </div>
        <div className="footer-disclaimer-wrapper">
          <Disclaimer light={true} />
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem' }}>
            &copy; 2026 VITAIQ Patient Twin Platform. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

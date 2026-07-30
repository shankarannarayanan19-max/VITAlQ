import React from 'react';
import { 
  BellRing, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Stethoscope, 
  ExternalLink,
  ClipboardList
} from 'lucide-react';

export default function ClinicalAlerts({ patient }) {
  if (!patient) return null;

  const { conditions, allergies, adherence, followUpStatus, labTrends } = patient;

  const alerts = [];
  const referrals = [];

  // 1. Allergies Check
  if (allergies && allergies.length > 0) {
    allergies.forEach(allergy => {
      alerts.push({
        id: 'allergy',
        severity: allergy.severity.toLowerCase() === 'high' ? 'High' : 'Moderate',
        message: `Registered Drug Allergy: Severe reaction (${allergy.reaction}) to ${allergy.substance}. Check all prescriptions for cross-reactants.`,
        icon: <AlertOctagon size={16} />
      });
    });
  }

  // 2. Glycemic Drift Check
  const hba1c = labTrends?.hba1c || [];
  if (hba1c.length > 0) {
    const latestHba1c = hba1c[hba1c.length - 1];
    if (latestHba1c >= 8.5) {
      alerts.push({
        id: 'hba1c-critical',
        severity: 'Critical',
        message: `Glycemic control crisis: HbA1c has escalated to ${latestHba1c}%. Immediate glycemic optimization is indicated.`,
        icon: <AlertOctagon size={16} />
      });
      referrals.push("Consider endocrinology review for intensive diabetic management and insulin titration.");
    } else if (latestHba1c >= 7.0) {
      alerts.push({
        id: 'hba1c-elevated',
        severity: 'Moderate',
        message: `Glycemic control sub-optimal: HbA1c is ${latestHba1c}% (Target < 7.0%).`,
        icon: <AlertTriangle size={16} />
      });
    }
  }

  // 3. Kidney Function Check
  const egfr = labTrends?.egfr || [];
  if (egfr.length > 0) {
    const latestEgfr = egfr[egfr.length - 1];
    const firstEgfr = egfr[0];
    if (latestEgfr < 60) {
      alerts.push({
        id: 'egfr-critical',
        severity: 'Critical',
        message: `Critical renal filtration decline: eGFR is ${latestEgfr} mL/min/1.73m² (dropped from ${firstEgfr}). Indication of Stage 3a CKD.`,
        icon: <AlertOctagon size={16} />
      });
      referrals.push("Consider nephrology review for Stage 3 Chronic Kidney Disease (CKD) and renal dosage adjustments.");
    } else if (latestEgfr < 90) {
      alerts.push({
        id: 'egfr-warning',
        severity: 'Moderate',
        message: `Borderline renal function: eGFR is ${latestEgfr} mL/min/1.73m² (Target > 90). Monitor creatinine clearance.`,
        icon: <AlertTriangle size={16} />
      });
    }
  }

  // 4. Medication Compliance Check
  if (adherence < 60) {
    alerts.push({
      id: 'compliance-critical',
      severity: 'High',
      message: `Critical compliance alert: Medication adherence rate is ${adherence}%. High risk of microvascular and macrovascular complications.`,
      icon: <AlertTriangle size={16} />
    });
    referrals.push("Schedule counseling review to establish pill-organizers, phone reminder alarms, or simplify regimen.");
  } else if (adherence < 80) {
    alerts.push({
      id: 'compliance-warning',
      severity: 'Moderate',
      message: `Sub-optimal compliance detected: Medication adherence is ${adherence}%. Review patient barrier complaints (e.g. muscular complaints).`,
      icon: <Info size={16} />
    });
  }

  // 5. Missed Follow-up Check
  if (followUpStatus === 'Overdue') {
    alerts.push({
      id: 'followup-overdue',
      severity: 'High',
      message: "Outpatient visit is OVERDUE: Patient has missed clinical review for 3 months.",
      icon: <AlertTriangle size={16} />
    });
    referrals.push("Schedule follow-up assessment and full clinical reconciliation as soon as possible.");
  } else if (followUpStatus === 'Due Soon') {
    alerts.push({
      id: 'followup-due',
      severity: 'Information',
      message: "Outpatient monitoring session due within 14 days.",
      icon: <Info size={16} />
    });
    referrals.push("Prepare lipid and metabolic blood panels for upcoming follow-up visit.");
  }

  // 6. Blood Pressure Check
  const sysBP = labTrends?.systolicBP || [];
  if (sysBP.length > 0) {
    const latestSys = sysBP[sysBP.length - 1];
    if (latestSys >= 140) {
      alerts.push({
        id: 'bp-critical',
        severity: 'High',
        message: `Elevated arterial pressure: BP is currently ${latestSys}/${labTrends.diastolicBP[labTrends.diastolicBP.length-1]} mmHg. Titration of hypertensive therapy may be required.`,
        icon: <AlertTriangle size={16} />
      });
    }
  }

  // 7. Simulated Drug-Drug/Contraindication interaction check
  const isTakingMetformin = patient.medications.some(m => m.name.toLowerCase().includes("metformin"));
  const latestEgfrVal = egfr.length > 0 ? egfr[egfr.length - 1] : 90;
  if (isTakingMetformin && latestEgfrVal < 60) {
    alerts.push({
      id: 'metformin-contraindication',
      severity: 'Critical',
      message: `Clinical Alert: Metformin is active in a patient with eGFR of ${latestEgfrVal}. Assess risk of Metformin-associated lactic acidosis (MALA). Demonstration alert only. Medication information requires verification by a qualified healthcare professional and an approved clinical database.`,
      icon: <AlertOctagon size={16} />
    });
  }

  // Fallback default referral
  if (referrals.length === 0) {
    referrals.push("Continue with scheduled outpatient health maintenance reviews.");
  }

  return (
    <section id="alerts" className="widget-card" style={{ scrollMarginTop: '90px' }}>
      <h3 className="widget-card-title">
        <BellRing size={20} style={{ color: 'var(--teal-500)' }} />
        <span>Clinical Alerts & Referrals</span>
      </h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.75rem' }}>
          Active Diagnostics Alerts
        </h4>
        {alerts.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No critical alerts flagged.</p>
        ) : (
          <div className="alerts-list">
            {alerts.map((alert, idx) => {
              const severityClass = alert.severity.toLowerCase();
              return (
                <div key={idx} className={`alert-item-card ${severityClass}`}>
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {alert.icon}
                  </div>
                  <div className="alert-message">
                    <span style={{ fontWeight: 800, textTransform: 'uppercase', marginRight: '0.35rem' }}>
                      [{alert.severity}]
                    </span>
                    {alert.message}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--divider-color)', paddingTop: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ClipboardList size={16} style={{ color: 'var(--teal-500)' }} />
          <span>Clinician Referral Suggestions</span>
        </h4>
        <div className="referrals-list">
          {referrals.map((referral, idx) => (
            <div key={idx} className="referral-item">
              <Stethoscope size={14} className="referral-icon" />
              <span>{referral}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
          * Prototype referral suggestion — final decisions must be made by a qualified healthcare professional.
        </p>
      </div>
    </section>
  );
}

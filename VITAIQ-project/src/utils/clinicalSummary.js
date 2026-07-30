/**
 * Transparent rule-based clinical summary generator for demonstration.
 * This is a demonstration clinical summary generator and is not a validated medical tool.
 */

export function generateClinicalSummary(patient) {
  if (!patient) return null;

  const { name, age, gender, conditions, allergies, medications, labTrends, adherence, followUpStatus } = patient;
  
  const summaryParts = [];
  const recommendationParts = [];
  const alertParts = [];

  // Demographics and overview
  summaryParts.push(`Patient ${name} is a ${age}-year-old ${gender.toLowerCase()} presenting with a history of ${conditions.map(c => c.split(' (')[0]).join(' and ')}.`);

  // Analyze Allergies
  if (allergies && allergies.length > 0) {
    const allergyList = allergies.map(a => `${a.substance} (${a.reaction}, Severity: ${a.severity})`).join(", ");
    summaryParts.push(`Allergies include: ${allergyList}. Avoid related cross-reactants.`);
  } else {
    summaryParts.push(`No drug allergies are currently registered in the EHR.`);
  }

  // Analyze Lab Trends
  const hba1c = labTrends?.hba1c || [];
  const egfr = labTrends?.egfr || [];
  const sysBP = labTrends?.systolicBP || [];
  const diaBP = labTrends?.diastolicBP || [];
  const ldl = labTrends?.ldl || [];

  let glycemicIssue = false;
  let kidneyIssue = false;
  let bpIssue = false;
  let lipidIssue = false;

  // HbA1c
  if (hba1c.length > 1) {
    const latestHba1c = hba1c[hba1c.length - 1];
    const firstHba1c = hba1c[0];
    if (latestHba1c > 8.0) {
      glycemicIssue = true;
      summaryParts.push(`Glycemic control is critically sub-optimal. HbA1c is currently at ${latestHba1c}%, demonstrating a clear upward trend from ${firstHba1c}% over the past year.`);
      alertParts.push("Critical Glycemic Drift: HbA1c has escalated to 9.0%. Re-evaluate oral hypoglycemic therapy or consider insulin initiation.");
      recommendationParts.push("Urgent Endocrinology Consultation: For uncontrolled Type 2 Diabetes and therapeutic adjustment.");
    } else if (latestHba1c >= 5.7 && latestHba1c <= 6.4) {
      summaryParts.push(`Glycemic assessment indicates stable pre-diabetic levels at ${latestHba1c}%. Keep under active monitoring.`);
    }
  }

  // Kidney eGFR
  if (egfr.length > 1) {
    const latestEgfr = egfr[egfr.length - 1];
    const firstEgfr = egfr[0];
    if (latestEgfr < 60) {
      kidneyIssue = true;
      summaryParts.push(`Renal profiles indicate moderate impairment with eGFR declining from ${firstEgfr} to ${latestEgfr} mL/min/1.73m² (indicative of Stage 3a Chronic Kidney Disease).`);
      alertParts.push("Progressive Nephron Decline: eGFR dropped below 60 to 54. Advise nephroprotective review and avoid NSAIDs.");
      recommendationParts.push("Nephrology Referral: Review of progressive renal filtration decline and check urine microalbumin levels.");
    }
  }

  // Blood Pressure
  if (sysBP.length > 1) {
    const latestSys = sysBP[sysBP.length - 1];
    const latestDia = diaBP[diaBP.length - 1];
    const firstSys = sysBP[0];
    if (latestSys >= 140) {
      bpIssue = true;
      summaryParts.push(`Hypertension is uncontrolled with blood pressure trending upward from ${firstSys}/${diaBP[0]} mmHg to a current reading of ${latestSys}/${latestDia} mmHg.`);
      alertParts.push(`Uncontrolled Hypertension: Blood pressure at ${latestSys}/${latestDia} mmHg requires immediate dosage titration.`);
      recommendationParts.push("Hypertension Optimization: Consider increasing Amlodipine dosage or adding secondary class (e.g., ACEi/ARB) pending renal review.");
    } else if (latestSys > 120) {
      summaryParts.push(`Vitals record pre-hypertensive readings (latest BP ${latestSys}/${latestDia} mmHg).`);
    }
  }

  // LDL lipids
  if (ldl.length > 1) {
    const latestLdl = ldl[ldl.length - 1];
    if (latestLdl > 130) {
      lipidIssue = true;
      summaryParts.push(`Hyperlipidemia is poorly managed with LDL cholesterol rising to ${latestLdl} mg/dL, showing poor response to current lipid-lowering dosage.`);
      alertParts.push(`Sub-optimal Statin Efficacy: LDL at ${latestLdl} mg/dL is above target. Check compliance and statin tolerability.`);
      recommendationParts.push("Lipid Management Review: Re-evaluate statin tolerance and consider titrating Atorvastatin or adding Ezetimibe.");
    }
  }

  // Medication compliance
  if (adherence < 60) {
    summaryParts.push(`Critical non-compliance is noted: patient medication adherence is only ${adherence}%. The patient reports forgetting evening doses due to work schedules.`);
    alertParts.push("Critical Adherence Failure: Adherence of 58% puts patient at high risk for major adverse cardiovascular and microvascular events.");
    recommendationParts.push("Medication Adherence Counseling: Implement pill organizer, mobile alerts, or once-daily therapy simplification.");
  } else if (adherence < 80) {
    summaryParts.push(`Medication adherence is sub-optimal at ${adherence}%. Patient notes occasional muscle stiffness with statins, potentially contributing to non-compliance.`);
    alertParts.push("Sub-optimal Adherence: Adherence at 76%. Evaluate patient reports of statin-induced muscle stiffness.");
    recommendationParts.push("Medication Adherence Review: Address statin-related muscular symptoms (consider switching statins or CoQ10 supplementation).");
  } else {
    summaryParts.push(`Medication adherence is excellent at ${adherence}%, and the patient displays strong compliance with the prescribed regime.`);
  }

  // Appointments
  if (followUpStatus === "Overdue") {
    summaryParts.push(`Clinical follow-up is overdue by three months, which contributes to the risk of unmonitored disease progression.`);
    alertParts.push("Overdue Outpatient Appointment: Overdue by 3 months. Schedule diagnostic review as soon as possible.");
    recommendationParts.push("Schedule Immediate Patient Clinic Visit: To perform a comprehensive health assessment and reconcile medications.");
  } else if (followUpStatus === "Due Soon") {
    recommendationParts.push("Prepare Routine Diagnostic Panel: For upcoming follow-up appointment in 2 weeks.");
  }

  // Fallbacks if stable
  if (!glycemicIssue && !kidneyIssue && !bpIssue && !lipidIssue && adherence >= 80) {
    summaryParts.push("Overall, the clinical profile is highly stable. Chronic conditions are well controlled, and laboratory metrics are within target limits.");
    recommendationParts.push("Maintain Current Clinical Regime: Re-evaluate at next annual health check.");
    alertParts.push("Information Alert: Vitals and lab panels are completely stable and on-target.");
  }

  return {
    summaryText: summaryParts.join(" "),
    alerts: alertParts.length ? alertParts : ["No immediate critical alerts flagged."],
    recommendations: recommendationParts.length ? recommendationParts : ["Continue with current maintenance care plan."]
  };
}

/**
 * Transparent rule-based risk evaluation logic for demonstration.
 * This is a demonstration clinical rule engine and is not a validated clinical device.
 */

export function calculatePatientRisks(patient) {
  if (!patient) return [];

  const risks = [];

  // 1. Diabetes Complication Risk
  const hasDiabetes = patient.conditions.some(c => c.toLowerCase().includes("diabetes"));
  const hba1cData = patient.labTrends?.hba1c || [];
  const latestHba1c = hba1cData.length ? hba1cData[hba1cData.length - 1] : 5.0;
  const oldestHba1c = hba1cData.length ? hba1cData[0] : 5.0;
  
  let dbScore = 10;
  let dbFactors = [];
  
  if (hasDiabetes) {
    dbScore = 30;
    dbFactors.push("Diagnosis of Type 2 Diabetes Mellitus");
    if (latestHba1c > 8.5) {
      dbScore += 40;
      dbFactors.push(`Critical glycemic control concerns: Latest HbA1c is ${latestHba1c}%`);
    } else if (latestHba1c > 7.0) {
      dbScore += 20;
      dbFactors.push(`Elevated glycemic control: Latest HbA1c is ${latestHba1c}% (Target < 7.0%)`);
    } else {
      dbFactors.push(`Glycemic control is within target: Latest HbA1c is ${latestHba1c}%`);
    }

    if (latestHba1c > oldestHba1c) {
      dbScore += 25;
      dbFactors.push(`Upward trend: HbA1c rose from ${oldestHba1c}% to ${latestHba1c}% over 12 months`);
    }
  } else {
    // Check if pre-diabetic or creeping
    if (latestHba1c >= 5.7 && latestHba1c <= 6.4) {
      dbScore = 25;
      dbFactors.push(`Pre-diabetes range: Latest HbA1c is ${latestHba1c}%`);
    } else {
      dbScore = 12;
      dbFactors.push(`No history of diabetes; HbA1c is stable at ${latestHba1c}%`);
    }
  }
  
  dbScore = Math.min(dbScore, 100);
  let dbLevel = "Low";
  if (dbScore >= 70) dbLevel = "High";
  else if (dbScore >= 40) dbLevel = "Moderate";

  risks.push({
    key: "diabetes",
    name: "Diabetes Complication Risk",
    level: dbLevel,
    score: dbScore,
    explanation: "Assesses risks of neuropathy, retinopathy, and cardiovascular comorbidities related to blood sugar control.",
    factors: dbFactors
  });

  // 2. Kidney Complication Risk
  const egfrData = patient.labTrends?.egfr || [];
  const latestEgfr = egfrData.length ? egfrData[egfrData.length - 1] : 95;
  const oldestEgfr = egfrData.length ? egfrData[0] : 95;
  
  let kdScore = 10;
  let kdFactors = [];

  if (latestEgfr < 60) {
    kdScore = 65;
    kdFactors.push(`eGFR of ${latestEgfr} mL/min/1.73m² indicates Stage 3 CKD`);
  } else if (latestEgfr < 90) {
    kdScore = 30;
    kdFactors.push(`Borderline kidney function: eGFR of ${latestEgfr} mL/min/1.73m² (Target > 90)`);
  } else {
    kdFactors.push(`Healthy renal filtration: eGFR is ${latestEgfr} mL/min/1.73m²`);
  }

  if (latestEgfr < oldestEgfr) {
    const drop = oldestEgfr - latestEgfr;
    if (drop >= 15) {
      kdScore += 25;
      kdFactors.push(`Significant decline: eGFR dropped by ${drop} points over 12 months`);
    } else if (drop > 5) {
      kdScore += 15;
      kdFactors.push(`Gradual decline: eGFR dropped from ${oldestEgfr} to ${latestEgfr} points`);
    }
  }

  if (hasDiabetes && latestEgfr < 90) {
    kdScore += 10;
    kdFactors.push("Co-existing diabetic nephropathy risk factors");
  }

  kdScore = Math.min(kdScore, 100);
  let kdLevel = "Low";
  if (kdScore >= 70) kdLevel = "High";
  else if (kdScore >= 40) kdLevel = "Moderate";

  risks.push({
    key: "kidney",
    name: "Kidney Complication Risk",
    level: kdLevel,
    score: kdScore,
    explanation: "Evaluates renal filtration rates and signs of progressive Chronic Kidney Disease (CKD).",
    factors: kdFactors
  });

  // 3. Cardiovascular Risk
  const hasHTN = patient.conditions.some(c => c.toLowerCase().includes("hypertension"));
  const hasLipids = patient.conditions.some(c => c.toLowerCase().includes("cholesterol") || c.toLowerCase().includes("hyperlipidemia"));
  const bpSysData = patient.labTrends?.systolicBP || [];
  const latestBP = bpSysData.length ? bpSysData[bpSysData.length - 1] : 120;
  const oldestBP = bpSysData.length ? bpSysData[0] : 120;
  
  const ldlData = patient.labTrends?.ldl || [];
  const latestLDL = ldlData.length ? ldlData[ldlData.length - 1] : null;

  let cvScore = 15;
  let cvFactors = [];

  if (hasHTN) {
    cvScore += 20;
    cvFactors.push("History of diagnosed Hypertension");
  }
  if (hasLipids) {
    cvScore += 15;
    cvFactors.push("History of diagnosed Hypercholesterolemia");
  }

  if (latestBP > 150) {
    cvScore += 30;
    cvFactors.push(`Severely elevated BP: Latest reading is ${latestBP} mmHg`);
  } else if (latestBP > 130) {
    cvScore += 15;
    cvFactors.push(`Pre-hypertensive or elevated BP: Latest reading is ${latestBP} mmHg`);
  }

  if (latestBP > oldestBP) {
    cvScore += 10;
    cvFactors.push(`Upward trend: Systolic BP increased from ${oldestBP} to ${latestBP} mmHg`);
  }

  if (latestLDL) {
    if (latestLDL > 150) {
      cvScore += 25;
      cvFactors.push(`Elevated LDL cholesterol: ${latestLDL} mg/dL (Target < 100 mg/dL)`);
    } else if (latestLDL > 100) {
      cvScore += 10;
      cvFactors.push(`Sub-optimal LDL cholesterol: ${latestLDL} mg/dL`);
    }
  }

  cvScore = Math.min(cvScore, 100);
  let cvLevel = "Low";
  if (cvScore >= 70) cvLevel = "High";
  else if (cvScore >= 40) cvLevel = "Moderate";

  risks.push({
    key: "cardiovascular",
    name: "Cardiovascular Complication Risk",
    level: cvLevel,
    score: cvScore,
    explanation: "Calculated risk of heart disease, stroke, or arterial stiffness using blood pressure and lipid trends.",
    factors: cvFactors
  });

  // 4. Medication Adherence Risk
  const adherence = patient.adherence || 100;
  let adScore = 100 - adherence;
  let adLevel = "Low";
  let adFactors = [];

  adFactors.push(`Patient medication compliance is recorded at ${adherence}%`);
  if (adherence < 60) {
    adLevel = "High";
    adFactors.push("Critical compliance concern: Adherence is well below clinical threshold (80%)");
    if (patient.adherenceNotes) {
      adFactors.push(`Recorded reason: "${patient.adherenceNotes}"`);
    }
  } else if (adherence < 85) {
    adLevel = "Moderate";
    adFactors.push("Sub-optimal compliance: Occasional missed doses reported");
    if (patient.adherenceNotes) {
      adFactors.push(`Notes: ${patient.adherenceNotes}`);
    }
  } else {
    adLevel = "Low";
    adFactors.push("Excellent compliance: Adherence exceeds target clinical range (>85%)");
  }

  risks.push({
    key: "adherence",
    name: "Medication Adherence Risk",
    level: adLevel,
    score: adScore,
    explanation: "Assesses safety and therapeutic efficacy based on how regularly prescriptions are taken.",
    factors: adFactors
  });

  // 5. Follow-up Risk
  const followUp = patient.followUpStatus || "Scheduled";
  let fuScore = 15;
  let fuLevel = "Low";
  let fuFactors = [];

  if (followUp === "Overdue") {
    fuLevel = "High";
    fuScore = 85;
    fuFactors.push("Follow-up appointment is OVERDUE");
    fuFactors.push("Delayed assessment increases the risk of undetected disease progression or complications.");
  } else if (followUp === "Due Soon") {
    fuLevel = "Moderate";
    fuScore = 45;
    fuFactors.push("Follow-up is due in the next 14 days");
    fuFactors.push("Upcoming assessment should review compliance, vitals, and adjust treatment if necessary.");
  } else {
    fuLevel = "Low";
    fuScore = 15;
    fuFactors.push("Follow-up is on schedule");
    fuFactors.push("Routine monitoring appointments are active.");
  }

  risks.push({
    key: "followup",
    name: "Follow-Up Overdue Risk",
    level: fuLevel,
    score: fuScore,
    explanation: "Reflects clinical danger associated with missing routine monitoring visits and laboratory checkups.",
    factors: fuFactors
  });

  return risks;
}

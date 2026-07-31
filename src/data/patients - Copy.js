export const patientsData = {
  "VIT001": {
    "id": "VIT001",
    "name": "Arun Kumar",
    "age": 52,
    "gender": "Male",
    "bloodGroup": "B+",
    "email": "arun.kumar@synthetic.mail",
    "phone": "+91 98765 43210 (Synthetic)",
    "emergencyContact": "Priya Kumar (Wife) - +91 98765 43211 (Synthetic)",
    "lastVisit": "2025-10-12",
    "nextFollowUp": "2026-04-12", // Overdue based on current date Jul 2026
    "followUpStatus": "Overdue",
    "overallRiskStatus": "High",
    "conditions": [
      "Type 2 Diabetes Mellitus (E11.9)",
      "Essential Hypertension (I10)"
    ],
    "allergies": [
      { "substance": "Penicillin", "type": "Drug", "severity": "High", "reaction": "Anaphylaxis" }
    ],
    "medications": [
      { "name": "Metformin HCL", "dosage": "500 mg", "frequency": "Twice daily with meals", "purpose": "Glycemic control", "startDate": "2023-04-15" },
      { "name": "Amlodipine Besylate", "dosage": "5 mg", "frequency": "Once daily in the morning", "purpose": "Blood pressure management", "startDate": "2024-02-10" },
      { "name": "Atorvastatin Calcium", "dosage": "10 mg", "frequency": "Once daily at bedtime", "purpose": "Hyperlipidemia", "startDate": "2024-02-10" }
    ],
    "surgeries": [
      { "name": "Appendectomy", "year": 2012, "hospital": "City Care Hospital" }
    ],
    "vaccinations": [
      { "name": "COVID-19 (3 Doses)", "date": "2022-08-14" },
      { "name": "Influenza Vaccine", "date": "2025-09-05" }
    ],
    "adherence": 58, // % of doses taken on time
    "adherenceNotes": "Patient reports frequently forgetting evening dose of Metformin and statin due to irregular work hours.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "hba1c": [7.2, 8.1, 9.0], // Increasing trend (Target < 7.0%)
      "egfr": [82, 68, 54],     // Declining trend (Kidney distress, Target > 90)
      "systolicBP": [138, 146, 154], // Escalating hypertension
      "diastolicBP": [88, 92, 96]
    },
    "timeline": [
      {
        "date": "2026-01-15",
        "type": "Laboratory",
        "title": "Comprehensive Metabolic & Lipid Panel",
        "description": "HbA1c escalated to 9.0%. Serum creatinine increased with eGFR dropping to 54 mL/min/1.73m² indicating Stage 3a CKD progression. BP measured high at 154/96 mmHg.",
        "location": "Metro Diagnostics"
      },
      {
        "date": "2025-10-12",
        "type": "Visit",
        "title": "Routine Endocrinology Consultation",
        "description": "Discussed medication compliance issues. Clinician noted worsening glycemic control and advised strict diet modification, self-monitoring of blood glucose, and medication diary.",
        "location": "Aesthetic Health Clinic"
      },
      {
        "date": "2025-06-20",
        "type": "Laboratory",
        "title": "Bi-Annual Renal & Glycemic Assessment",
        "description": "HbA1c noted at 8.1% and eGFR decreased to 68. BP noted at 146/92. Microalbuminuria screening initiated.",
        "location": "Metro Diagnostics"
      },
      {
        "date": "2025-03-05",
        "type": "Prescription",
        "title": "Medication Adjustment",
        "description": "Metformin dose confirmed at 500mg BID. Amlodipine 5mg and Atorvastatin 10mg continued. Urged patient to track adherence.",
        "location": "Aesthetic Health Clinic"
      },
      {
        "date": "2025-01-10",
        "type": "Laboratory",
        "title": "Baseline Health Checkup",
        "description": "HbA1c was 7.2%, eGFR 82, and BP 138/88. Mild proteinuria detected.",
        "location": "Metro Diagnostics"
      },
      {
        "date": "2024-02-10",
        "type": "Surgery",
        "title": "Diagnosis of Essential Hypertension",
        "description": "Initiated antihypertensive treatment with Amlodipine 5mg and lipid management with Atorvastatin 10mg.",
        "location": "City Care Hospital"
      }
    ]
  },
  "VIT002": {
    "id": "VIT002",
    "name": "Meena Devi",
    "age": 38,
    "gender": "Female",
    "bloodGroup": "O+",
    "email": "meena.devi@synthetic.mail",
    "phone": "+91 91234 56789 (Synthetic)",
    "emergencyContact": "Rajesh Devi (Spouse) - +91 91234 56780 (Synthetic)",
    "lastVisit": "2026-05-10",
    "nextFollowUp": "2026-11-10", // On schedule
    "followUpStatus": "Scheduled",
    "overallRiskStatus": "Low",
    "conditions": [
      "Mild Persistent Asthma (J45.30)"
    ],
    "allergies": [
      { "substance": "Dust Mites", "type": "Environmental", "severity": "Moderate", "reaction": "Allergic Rhinitis / Bronchospasm" }
    ],
    "medications": [
      { "name": "Fluticasone Propionate (Inhaler)", "dosage": "110 mcg", "frequency": "1 puff twice daily", "purpose": "Asthma maintenance", "startDate": "2022-11-05" },
      { "name": "Albuterol Sulfate (Inhaler)", "dosage": "90 mcg", "frequency": "As needed (rescue)", "purpose": "Acute bronchospasm relief", "startDate": "2022-11-05" }
    ],
    "surgeries": [],
    "vaccinations": [
      { "name": "COVID-19 (3 Doses)", "date": "2022-04-10" },
      { "name": "Tdap Booster", "date": "2023-05-15" }
    ],
    "adherence": 92,
    "adherenceNotes": "Excellent adherence. Patient uses a smartphone reminder app and carries a rescue inhaler in her handbag at all times.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "hba1c": [5.4, 5.5, 5.4], // Stable & healthy
      "egfr": [95, 96, 94],     // Perfect kidney function
      "systolicBP": [118, 120, 119], // Normotensive
      "diastolicBP": [76, 78, 77]
    },
    "timeline": [
      {
        "date": "2026-05-10",
        "type": "Visit",
        "title": "Annual Pulmonology Review",
        "description": "Asthma fully controlled. Inhaler technique reviewed and confirmed excellent. Spirometry shows FEV1/FVC ratios within 92% of predicted values.",
        "location": "Pulmonary Care Associates"
      },
      {
        "date": "2026-01-08",
        "type": "Laboratory",
        "title": "Routine Blood Panel & Metabolic Profile",
        "description": "All vitals stable. HbA1c is 5.4%, kidney function is optimal (eGFR 94), and lipid panel is within target ranges.",
        "location": "Apex Labs"
      },
      {
        "date": "2025-06-15",
        "type": "Visit",
        "title": "Semi-Annual Health Evaluation",
        "description": "Routine checkup. Vitals stable. Encouraged to continue regular exercise and allergen avoidance.",
        "location": "Aesthetic Health Clinic"
      },
      {
        "date": "2025-01-05",
        "type": "Laboratory",
        "title": "Bi-Annual Metabolic Check",
        "description": "HbA1c 5.4% and normal chemistry panel verified.",
        "location": "Apex Labs"
      }
    ]
  },
  "VIT003": {
    "id": "VIT003",
    "name": "Rahul Sharma",
    "age": 61,
    "gender": "Male",
    "bloodGroup": "A+",
    "email": "rahul.sharma@synthetic.mail",
    "phone": "+91 99887 76655 (Synthetic)",
    "emergencyContact": "Amit Sharma (Son) - +91 99887 76650 (Synthetic)",
    "lastVisit": "2026-01-20",
    "nextFollowUp": "2026-07-27", // Due within 2 weeks from Jul 13 2026
    "followUpStatus": "Due Soon",
    "overallRiskStatus": "Moderate",
    "conditions": [
      "Essential Hypertension (I10)",
      "Hypercholesterolemia (E78.00)"
    ],
    "allergies": [], // No known recorded allergies
    "medications": [
      { "name": "Amlodipine Besylate", "dosage": "5 mg", "frequency": "Once daily", "purpose": "Blood pressure controls", "startDate": "2024-11-18" },
      { "name": "Atorvastatin Calcium", "dosage": "10 mg", "frequency": "Once daily at night", "purpose": "Cholesterol lowering", "startDate": "2025-01-22" }
    ],
    "surgeries": [
      { "name": "Knee Arthroscopy (Left)", "year": 2019, "hospital": "Orthopaedic Care Center" }
    ],
    "vaccinations": [
      { "name": "COVID-19 (3 Doses)", "date": "2022-09-01" },
      { "name": "Pneumococcal Vaccine", "date": "2024-10-05" }
    ],
    "adherence": 76,
    "adherenceNotes": "Moderate adherence. Patient occasionally forgets medication on weekends, and feels statin causes mild muscle stiffness.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "hba1c": [5.7, 5.8, 5.9], // Pre-diabetic territory, needs watching
      "egfr": [88, 87, 86],     // Mild decline, borderline normal
      "systolicBP": [126, 132, 138], // Creeping upward
      "diastolicBP": [82, 85, 88],
      "ldl": [110, 135, 160] // Escalating lipid levels despite atorvastatin
    },
    "timeline": [
      {
        "date": "2026-01-20",
        "type": "Visit",
        "title": "Cardiology Follow-Up",
        "description": "BP noted elevated at 138/88. LDL levels elevated at 160 mg/dL. Discussed statin compliance and muscular complaints. Advised to repeat lipid profile in 6 months.",
        "location": "Cardio Health Associates"
      },
      {
        "date": "2026-01-10",
        "type": "Laboratory",
        "title": "Lipid & Renal Profile",
        "description": "LDL measured high at 160 mg/dL (Target < 100 mg/dL). HbA1c noted at 5.9%, showing a slight creeping trend towards pre-diabetes. eGFR stable at 86.",
        "location": "Apex Labs"
      },
      {
        "date": "2025-06-25",
        "type": "Laboratory",
        "title": "Mid-Year Routine Testing",
        "description": "LDL was 135 mg/dL, BP 132/85. Liver function test (LFT) normal.",
        "location": "Apex Labs"
      },
      {
        "date": "2025-01-22",
        "type": "Prescription",
        "title": "Cholesterol Management Initiation",
        "description": "Diagnosed with hypercholesterolemia. Initiated Atorvastatin 10mg once daily at bedtime. Recommended dietary modifications.",
        "location": "Aesthetic Health Clinic"
      },
      {
        "date": "2025-01-15",
        "type": "Laboratory",
        "title": "Annual Metabolic Screening",
        "description": "Baseline LDL found elevated at 110 mg/dL. BP 126/82. HbA1c 5.7%.",
        "location": "Apex Labs"
      }
    ]
  }
};

export const getPatientById = (id) => {
  if (!id) return null;
  const formattedId = id.toUpperCase().trim();
  return patientsData[formattedId] || null;
};

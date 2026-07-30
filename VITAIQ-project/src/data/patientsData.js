// Clinically Realistic, Disease-Specific Patient Database

export const patientsData = {
  "VIT001": {
    "id": "VIT001",
    "name": "Arun Kumar",
    "age": 52,
    "gender": "Male",
    "occupation": "Software Engineering Manager",
    "bloodGroup": "B+",
    "email": "arun.kumar@healthmail.com",
    "phone": "+91 98765 43210",
    "emergencyContact": "Priya Kumar (Wife) - +91 98765 43211",
    "lastVisit": "2026-01-15",
    "nextFollowUp": "2026-04-15",
    "followUpStatus": "Overdue",
    "overallRiskStatus": "High",
    "specialty": "Endocrinology & Nephrology",
    "primaryDiagnosis": "Type 2 Diabetes Mellitus & Stage 3a Chronic Kidney Disease (CKD)",
    "familyHistory": "Father had Type 2 Diabetes and Coronary Artery Disease (CAD); Mother has Hypertension.",
    "lifestyle": "Sedentary desk job, high stress, non-smoker, occasional social alcohol.",
    "conditions": [
      "Type 2 Diabetes Mellitus (ICD-10 E11.9)",
      "Essential Hypertension (ICD-10 I10)",
      "Stage 3a Chronic Kidney Disease (ICD-10 N18.31)"
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
    "adherence": 58,
    "adherenceNotes": "Patient frequently forgets evening Metformin dose due to long working hours.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "hba1c": [7.2, 8.1, 9.0],
      "egfr": [82, 68, 54],
      "creatinine": [1.1, 1.4, 1.8],
      "systolicBP": [138, 146, 154],
      "diastolicBP": [88, 92, 96]
    },
    "diseaseSpecificLabs": [
      { "name": "HbA1c (Glycated Hb)", "value": "9.0", "unit": "%", "reference": "< 7.0", "status": "High" },
      { "name": "Fasting Blood Sugar (FBS)", "value": "184", "unit": "mg/dL", "reference": "70-99", "status": "High" },
      { "name": "Random Blood Sugar (RBS)", "value": "242", "unit": "mg/dL", "reference": "< 140", "status": "High" },
      { "name": "Serum Creatinine", "value": "1.8", "unit": "mg/dL", "reference": "0.7-1.3", "status": "High" },
      { "name": "eGFR (Kidney Filtration)", "value": "54", "unit": "mL/min", "reference": "> 90", "status": "Low" },
      { "name": "Urine Microalbumin", "value": "85", "unit": "mg/g", "reference": "< 30", "status": "High" }
    ],
    "timeline": [
      {
        "date": "2026-01-15",
        "type": "Laboratory",
        "title": "Comprehensive Diabetic & Renal Panel",
        "description": "HbA1c escalated to 9.0%. Serum creatinine increased to 1.8 mg/dL with eGFR dropping to 54 mL/min/1.73m² indicating Stage 3a CKD progression. BP measured at 154/96 mmHg.",
        "location": "Metro Diagnostics",
        "doctorName": "Dr. Aditi Sharma"
      },
      {
        "date": "2025-10-12",
        "type": "Visit",
        "title": "Endocrinology Consultation",
        "description": "Discussed glycemic control deteriorating. Advised strict dietary modifications, self-monitoring of blood glucose (SMBG), and daily medication diary.",
        "location": "Apollo Hospitals",
        "doctorName": "Dr. Aditi Sharma"
      }
    ]
  },

  "VIT002": {
    "id": "VIT002",
    "name": "Meena Devi",
    "age": 38,
    "gender": "Female",
    "occupation": "High School Teacher",
    "bloodGroup": "O+",
    "email": "meena.devi@medicare.in",
    "phone": "+91 91234 56789",
    "emergencyContact": "Rajesh Devi (Spouse) - +91 91234 56780",
    "lastVisit": "2026-05-10",
    "nextFollowUp": "2026-11-10",
    "followUpStatus": "Scheduled",
    "overallRiskStatus": "Low",
    "specialty": "Pulmonology",
    "primaryDiagnosis": "Mild Persistent Asthma (ICD-10 J45.30)",
    "familyHistory": "Mother has allergic rhinitis and eczema.",
    "lifestyle": "Active, non-smoker, exercises 4 times a week, minimal allergen exposure.",
    "conditions": [
      "Mild Persistent Asthma (ICD-10 J45.30)",
      "Allergic Rhinitis (ICD-10 J30.9)"
    ],
    "allergies": [
      { "substance": "Dust Mites", "type": "Environmental", "severity": "Moderate", "reaction": "Bronchospasm & Rhinitis" }
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
    "adherenceNotes": "Excellent adherence. Uses smartphone inhaler reminder app daily.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "pefr": [410, 420, 425],
      "fev1Fvc": [91, 92, 92],
      "systolicBP": [118, 120, 119],
      "diastolicBP": [76, 78, 77]
    },
    "diseaseSpecificLabs": [
      { "name": "Peak Flow (PEFR)", "value": "425", "unit": "L/min", "reference": "> 400", "status": "Normal" },
      { "name": "FEV1 / FVC Ratio", "value": "92%", "unit": "%", "reference": "> 80%", "status": "Normal" },
      { "name": "Oxygen Saturation (SpO2)", "value": "99", "unit": "%", "reference": "95-100", "status": "Normal" },
      { "name": "Eosinophil Count", "value": "2.8", "unit": "%", "reference": "1-4", "status": "Normal" },
      { "name": "Chest X-Ray", "value": "Clear", "unit": "", "reference": "No infiltrates", "status": "Normal" }
    ],
    "timeline": [
      {
        "date": "2026-05-10",
        "type": "Visit",
        "title": "Annual Pulmonology Review",
        "description": "Asthma fully controlled. Inhaler technique reviewed and confirmed excellent. Spirometry FEV1/FVC ratio is 92% of predicted values.",
        "location": "Fortis Healthcare",
        "doctorName": "Dr. Rajesh Varma"
      }
    ]
  },

  "VIT003": {
    "id": "VIT003",
    "name": "Rahul Sharma",
    "age": 61,
    "gender": "Male",
    "occupation": "Bank Senior Manager",
    "bloodGroup": "A+",
    "email": "rahul.sharma@healthmail.com",
    "phone": "+91 99887 76655",
    "emergencyContact": "Amit Sharma (Son) - +91 99887 76650",
    "lastVisit": "2026-01-20",
    "nextFollowUp": "2026-07-27",
    "followUpStatus": "Due Soon",
    "overallRiskStatus": "Moderate",
    "specialty": "Cardiology",
    "primaryDiagnosis": "Essential Hypertension & Hypercholesterolemia",
    "familyHistory": "Father had fatal Myocardial Infarction at age 64.",
    "lifestyle": "Moderate physical activity, high dietary sodium intake, non-smoker.",
    "conditions": [
      "Essential Hypertension (ICD-10 I10)",
      "Hypercholesterolemia (ICD-10 E78.00)"
    ],
    "allergies": [],
    "medications": [
      { "name": "Amlodipine Besylate", "dosage": "5 mg", "frequency": "Once daily in the morning", "purpose": "BP Control", "startDate": "2024-11-18" },
      { "name": "Atorvastatin Calcium", "dosage": "10 mg", "frequency": "Once daily at bedtime", "purpose": "Lipid Lowering", "startDate": "2025-01-22" }
    ],
    "surgeries": [
      { "name": "Left Knee Arthroscopy", "year": 2019, "hospital": "Orthopaedic Care Center" }
    ],
    "vaccinations": [
      { "name": "COVID-19 (3 Doses)", "date": "2022-09-01" },
      { "name": "Pneumococcal Vaccine", "date": "2024-10-05" }
    ],
    "adherence": 76,
    "adherenceNotes": "Occasionally forgets statin dose on weekends.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "ldl": [110, 135, 160],
      "hdl": [46, 44, 42],
      "triglycerides": [160, 175, 188],
      "systolicBP": [126, 132, 138],
      "diastolicBP": [82, 85, 88]
    },
    "diseaseSpecificLabs": [
      { "name": "Blood Pressure", "value": "138/88", "unit": "mmHg", "reference": "< 130/80", "status": "Elevated" },
      { "name": "LDL Cholesterol", "value": "160", "unit": "mg/dL", "reference": "< 100", "status": "High" },
      { "name": "Serum Triglycerides", "value": "188", "unit": "mg/dL", "reference": "< 150", "status": "High" },
      { "name": "12-Lead ECG", "value": "Sinus Rhythm", "unit": "", "reference": "No ischemia", "status": "Normal" },
      { "name": "Troponin I", "value": "0.01", "unit": "ng/mL", "reference": "< 0.04", "status": "Normal" }
    ],
    "timeline": [
      {
        "date": "2026-01-20",
        "type": "Visit",
        "title": "Cardiology Follow-Up",
        "description": "BP noted elevated at 138/88 mmHg. Serum LDL elevated at 160 mg/dL. Recommended dietary fat restriction.",
        "location": "Fortis Healthcare",
        "doctorName": "Dr. Rajesh Varma"
      }
    ]
  },

  "VIT004": {
    "id": "VIT004",
    "name": "Suresh Nair",
    "age": 55,
    "gender": "Male",
    "occupation": "Business Owner",
    "bloodGroup": "O-",
    "email": "suresh.nair@healthmail.com",
    "phone": "+91 94455 66778",
    "emergencyContact": "Lakshmi Nair (Wife) - +91 94455 66770",
    "lastVisit": "2026-02-10",
    "nextFollowUp": "2026-05-10",
    "followUpStatus": "Scheduled",
    "overallRiskStatus": "Moderate",
    "specialty": "Gastroenterology & Hepatology",
    "primaryDiagnosis": "Non-Alcoholic Fatty Liver Disease (NAFLD / MASH)",
    "familyHistory": "Mother had Type 2 Diabetes; Uncle had Liver Cirrhosis.",
    "lifestyle": "Sedentary, high refined carbohydrate diet, non-smoker.",
    "conditions": [
      "Non-Alcoholic Fatty Liver Disease (ICD-10 K76.0)",
      "Hypertriglyceridemia (ICD-10 E78.1)"
    ],
    "allergies": [],
    "medications": [
      { "name": "Saroglitazar", "dosage": "4 mg", "frequency": "Once daily", "purpose": "Hepatic steatosis reduction", "startDate": "2025-06-10" },
      { "name": "Ursodeoxycholic Acid", "dosage": "300 mg", "frequency": "Twice daily", "purpose": "Hepatoprotection", "startDate": "2025-06-10" }
    ],
    "surgeries": [],
    "vaccinations": [
      { "name": "Hepatitis B (3 Doses)", "date": "2023-02-15" }
    ],
    "adherence": 85,
    "adherenceNotes": "Regular compliance with liver medications.",
    "labTrends": {
      "dates": ["Jan 2025", "Jun 2025", "Jan 2026"],
      "alt": [72, 65, 58],
      "ast": [64, 55, 48],
      "systolicBP": [128, 126, 124],
      "diastolicBP": [82, 80, 80]
    },
    "diseaseSpecificLabs": [
      { "name": "ALT (SGPT)", "value": "58", "unit": "U/L", "reference": "< 45", "status": "Elevated" },
      { "name": "AST (SGOT)", "value": "48", "unit": "U/L", "reference": "< 35", "status": "Elevated" },
      { "name": "Serum Bilirubin", "value": "1.1", "unit": "mg/dL", "reference": "0.2-1.2", "status": "Normal" },
      { "name": "Serum Albumin", "value": "4.2", "unit": "g/dL", "reference": "3.5-5.2", "status": "Normal" },
      { "name": "Ultrasound Abdomen", "value": "Grade 2 Fatty Liver", "unit": "", "reference": "Normal Echogenicity", "status": "Moderate" }
    ],
    "timeline": [
      {
        "date": "2026-02-10",
        "type": "Visit",
        "title": "Hepatology Review",
        "description": "ALT improving from 72 to 58 U/L following diet & exercise plan. Advised weight loss of 5-7%.",
        "location": "Global Health City",
        "doctorName": "Dr. Aditi Sharma"
      }
    ]
  },

  "VIT007": {
    "id": "VIT007",
    "name": "Ananya Sen",
    "age": 28,
    "gender": "Female",
    "occupation": "Graphic Designer",
    "bloodGroup": "B+",
    "email": "ananya.sen@healthmail.com",
    "phone": "+91 97112 33445",
    "emergencyContact": "Kunal Sen (Husband) - +91 97112 33446",
    "lastVisit": "2026-06-15",
    "nextFollowUp": "2026-08-15",
    "followUpStatus": "Scheduled",
    "overallRiskStatus": "Low",
    "specialty": "Obstetrics & Gynecology",
    "primaryDiagnosis": "Second Trimester Pregnancy (16 Weeks Gestation - 4 Months Pregnant)",
    "familyHistory": "No genetic or chromosomal disorders noted in maternal history.",
    "lifestyle": "Balanced vegetarian diet, prenatal yoga, takes daily Iron & Folic Acid.",
    "conditions": [
      "Normal Pregnancy (ICD-10 Z34.82 - 16 Weeks Gestation)",
      "Mild Morning Sickness (Resolved)"
    ],
    "allergies": [
      { "substance": "Sulfa Drugs", "type": "Drug", "severity": "Moderate", "reaction": "Skin Rash / Urticaria" }
    ],
    "medications": [
      { "name": "Prenatal Folic Acid & Iron", "dosage": "5 mg / 60 mg", "frequency": "Once daily after lunch", "purpose": "Fetal neural tube & maternal iron support", "startDate": "2026-03-01" },
      { "name": "Calcium Carbonate & Vit D3", "dosage": "500 mg", "frequency": "Once daily with breakfast", "purpose": "Bone density & fetal skeletal growth", "startDate": "2026-04-10" }
    ],
    "surgeries": [],
    "vaccinations": [
      { "name": "COVID-19 (2 Doses)", "date": "2022-01-15" },
      { "name": "Tdap (First Dose)", "date": "2026-05-20" }
    ],
    "adherence": 96,
    "adherenceNotes": "Excellent compliance with daily prenatal vitamins and calcium supplements.",
    "labTrends": {
      "dates": ["Apr 2026", "May 2026", "Jun 2026"],
      "hemoglobin": [12.4, 12.2, 12.1],
      "fastingGlucose": [82, 84, 85],
      "systolicBP": [114, 116, 116],
      "diastolicBP": [72, 74, 74]
    },
    "diseaseSpecificLabs": [
      { "name": "Maternal Hemoglobin", "value": "12.1", "unit": "g/dL", "reference": "> 11.0", "status": "Normal" },
      { "name": "Fasting Blood Sugar", "value": "85", "unit": "mg/dL", "reference": "< 92", "status": "Normal" },
      { "name": "Fetal Heart Rate (FHR)", "value": "148", "unit": "bpm", "reference": "110-160", "status": "Normal" },
      { "name": "Quadruple Marker", "value": "Low Risk", "unit": "", "reference": "Low Risk", "status": "Normal" }
    ],
    "timeline": [
      {
        "date": "2026-06-15",
        "type": "Laboratory",
        "title": "16-Week Fetal Ultrasound Anomaly Scan & Quadruple Marker",
        "description": "Fetal heart rate 148 bpm. Biometry consistent with 16 weeks gestation (4 months). Quadruple marker screening negative for chromosomal trisomies. Maternal Hb stable at 12.1 g/dL.",
        "location": "Manipal Hospital",
        "doctorName": "Dr. Kavita Reddy"
      }
    ]
  }
};

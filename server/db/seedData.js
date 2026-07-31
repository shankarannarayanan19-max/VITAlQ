// VITAIQ Server Seed Data — Schema A (canonical, matches src/data/patientsData.js)
// All patient records use: labTrends (parallel arrays), timeline (description/location/doctorName),
// medications (purpose field), allergies (substance/type/severity/reaction)

export const SEED_PATIENTS = {
  "VIT001": {
    "id": "VIT001",
    "name": "Arun Kumar",
    "age": 52,
    "gender": "Male",
    "occupation": "Software Engineering Manager",
    "bloodGroup": "B+",
    "email": "arun.kumar@healthmail.com",
    "phone": "+91 98765 43210",
    "dob": "1973-05-14",
    "emergencyContact": "Priya Kumar (Wife) - +91 98765 43211",
    "address": "Flat 4B, Emerald Heights, T. Nagar, Chennai",
    "insuranceProvider": "Star Health Insurance (Policy #SH-882910)",
    "wristbandId": "WB-88192-AK",
    "riskLevel": "High",
    "riskScore": 84,
    "overallRiskStatus": "High",
    "followUpStatus": "Overdue",
    "lastVisit": "2026-01-15",
    "nextFollowUp": "2026-04-15",
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
      { "substance": "Penicillin", "type": "Drug", "severity": "High", "reaction": "Anaphylaxis" },
      { "substance": "NSAIDs (Ibuprofen)", "type": "Drug", "severity": "Moderate", "reaction": "Gastric Ulceration / Rash" }
    ],
    "medications": [
      { "name": "Metformin HCL", "dosage": "1000 mg", "frequency": "Twice daily with meals", "purpose": "Glycemic control", "startDate": "2022-04-10" },
      { "name": "Telmisartan", "dosage": "40 mg", "frequency": "Once daily in the morning", "purpose": "Blood pressure management & nephroprotection", "startDate": "2023-01-15" },
      { "name": "Empagliflozin", "dosage": "10 mg", "frequency": "Once daily", "purpose": "Cardioprotection & renal progression delay", "startDate": "2024-02-01" },
      { "name": "Atorvastatin Calcium", "dosage": "20 mg", "frequency": "Once daily at bedtime", "purpose": "Hyperlipidemia", "startDate": "2023-08-20" }
    ],
    "surgeries": [],
    "vaccinations": [
      { "name": "COVID-19 (3 Doses)", "date": "2022-08-14" },
      { "name": "Influenza Vaccine", "date": "2025-09-05" }
    ],
    "adherence": 58,
    "adherenceNotes": "Patient frequently forgets evening Metformin dose due to long working hours.",
    "vitals": {
      "bloodPressure": "148/92 mmHg",
      "heartRate": "78 bpm",
      "spO2": "97%",
      "temperature": "98.6 °F",
      "bmi": "28.4 kg/m²",
      "bloodGlucose": "182 mg/dL"
    },
    "labTrends": {
      "dates": ["Jan 2025", "Apr 2025", "Aug 2025", "Dec 2025", "Mar 2026"],
      "hba1c": [8.4, 8.1, 7.9, 8.2, 8.5],
      "egfr": [62, 60, 58, 57, 54],
      "creatinine": [1.4, 1.45, 1.5, 1.52, 1.58],
      "systolicBP": [148, 146, 145, 150, 148],
      "diastolicBP": [92, 90, 88, 94, 92],
      "ldl": [138, 134, 130, 140, 142]
    },
    "diseaseSpecificLabs": [
      { "name": "HbA1c (Glycated Hb)", "value": "8.5", "unit": "%", "reference": "< 7.0", "status": "High" },
      { "name": "Serum Creatinine", "value": "1.58", "unit": "mg/dL", "reference": "0.7-1.3", "status": "High" },
      { "name": "eGFR (Kidney Filtration)", "value": "54", "unit": "mL/min", "reference": "> 90", "status": "Low" },
      { "name": "Urine Microalbumin", "value": "85", "unit": "mg/g", "reference": "< 30", "status": "High" }
    ],
    "timeline": [
      {
        "date": "2026-03-18",
        "type": "Laboratory",
        "title": "Comprehensive Metabolic & Lipid Panel",
        "description": "HbA1c elevated at 8.5%. eGFR showing gradual decline to 54 mL/min/1.73m².",
        "location": "Apollo Diagnostics",
        "doctorName": "Dr. Aditi Sharma"
      },
      {
        "date": "2025-12-05",
        "type": "Visit",
        "title": "Endocrinology Follow-up",
        "description": "Added Empagliflozin 10mg for cardioprotection. Advised strict low-sodium renal-diabetic diet.",
        "location": "Apollo Hospitals",
        "doctorName": "Dr. Aditi Sharma"
      },
      {
        "date": "2025-08-10",
        "type": "Diagnostic",
        "title": "Renal Ultrasound",
        "description": "Bilateral kidneys normal size, mild cortical echogenicity consistent with diabetic nephropathy.",
        "location": "Apollo Diagnostics",
        "doctorName": "Dr. S. K. Nambiar"
      }
    ],
    "alerts": [
      { "type": "Warning", "title": "Progressive eGFR Decline Detected", "message": "eGFR has decreased from 62 to 54 mL/min/1.73m² over 14 months. Nephrology co-consultation recommended.", "severity": "high" },
      { "type": "Alert", "title": "Suboptimal Glycemic Control", "message": "HbA1c 8.5% despite triple oral therapy. Consider insulin initiation assessment.", "severity": "medium" },
      { "type": "Contraindication", "title": "Penicillin Allergy Alert", "message": "Severe anaphylactic reaction to Penicillin. Use Fluoroquinolones or Macrolides.", "severity": "critical" }
    ],
    "clinicalSummary": "Arun Kumar is a 52-year-old male with long-standing Type 2 Diabetes and Hypertension showing Stage 3a CKD (eGFR 54, Creatinine 1.58). HbA1c 8.5% reflects persistent hyperglycemia. Immediate therapeutic adjustment and nephrology co-management indicated."
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
    "dob": "1987-11-20",
    "emergencyContact": "Rajesh Devi (Spouse) - +91 91234 56780",
    "address": "12/4 Anna Salai, Guindy, Chennai",
    "insuranceProvider": "HDFC ERGO Health (Policy #HE-441029)",
    "wristbandId": "WB-44019-MD",
    "riskLevel": "Low",
    "riskScore": 18,
    "overallRiskStatus": "Low",
    "followUpStatus": "Scheduled",
    "lastVisit": "2026-05-10",
    "nextFollowUp": "2026-11-10",
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
    "vitals": {
      "bloodPressure": "118/76 mmHg",
      "heartRate": "72 bpm",
      "spO2": "99%",
      "temperature": "98.4 °F",
      "bmi": "22.1 kg/m²",
      "bloodGlucose": "94 mg/dL"
    },
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
      { "name": "Oxygen Saturation (SpO2)", "value": "99", "unit": "%", "reference": "95-100", "status": "Normal" }
    ],
    "timeline": [
      {
        "date": "2026-05-10",
        "type": "Visit",
        "title": "Annual Pulmonology Review",
        "description": "Asthma fully controlled. Inhaler technique confirmed excellent. Spirometry FEV1/FVC 92% of predicted.",
        "location": "Fortis Healthcare",
        "doctorName": "Dr. Rajesh Varma"
      },
      {
        "date": "2025-09-15",
        "type": "Laboratory",
        "title": "Lipid & Fasting Glucose Profile",
        "description": "Glucose 94 mg/dL, HbA1c 5.3%. Excellent metabolic health. All renal markers within optimal range.",
        "location": "Apollo Diagnostics",
        "doctorName": "Dr. K. Srinivas"
      }
    ],
    "alerts": [
      { "type": "Info", "title": "Optimal Health Profile", "message": "All vital indicators and lab values within ideal reference ranges.", "severity": "low" }
    ],
    "clinicalSummary": "Meena Devi is a 38-year-old female with well-controlled mild asthma. HbA1c 5.4%, eGFR >100 mL/min/1.73m², BP normotensive. Maintain current preventative regimen."
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
    "dob": "1980-08-05",
    "emergencyContact": "Amit Sharma (Son) - +91 99887 76650",
    "address": "45 Koramangala 4th Block, Bengaluru",
    "insuranceProvider": "Niva Bupa Health (Policy #NB-772810)",
    "wristbandId": "WB-99201-RS",
    "riskLevel": "Moderate",
    "riskScore": 56,
    "overallRiskStatus": "Moderate",
    "followUpStatus": "Due Soon",
    "lastVisit": "2026-01-20",
    "nextFollowUp": "2026-07-27",
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
      { "name": "Amlodipine Besylate", "dosage": "5 mg", "frequency": "Once daily in the morning", "purpose": "BP Control", "startDate": "2024-01-10" },
      { "name": "Rosuvastatin", "dosage": "10 mg", "frequency": "Once daily at bedtime", "purpose": "Lipid Lowering", "startDate": "2024-05-15" }
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
    "vitals": {
      "bloodPressure": "136/88 mmHg",
      "heartRate": "82 bpm",
      "spO2": "98%",
      "temperature": "98.6 °F",
      "bmi": "26.8 kg/m²",
      "bloodGlucose": "108 mg/dL"
    },
    "labTrends": {
      "dates": ["Feb 2025", "Jul 2025", "Jan 2026"],
      "ldl": [158, 148, 142],
      "hdl": [46, 44, 42],
      "triglycerides": [160, 175, 188],
      "systolicBP": [132, 134, 136],
      "diastolicBP": [84, 86, 88]
    },
    "diseaseSpecificLabs": [
      { "name": "Blood Pressure", "value": "136/88", "unit": "mmHg", "reference": "< 130/80", "status": "Elevated" },
      { "name": "LDL Cholesterol", "value": "142", "unit": "mg/dL", "reference": "< 100", "status": "High" },
      { "name": "Serum Triglycerides", "value": "188", "unit": "mg/dL", "reference": "< 150", "status": "High" }
    ],
    "timeline": [
      {
        "date": "2026-01-20",
        "type": "Visit",
        "title": "Cardiology Follow-Up",
        "description": "BP noted elevated at 136/88 mmHg. LDL improved to 142 mg/dL on Rosuvastatin. Dietary fat restriction recommended.",
        "location": "Fortis Healthcare",
        "doctorName": "Dr. Rajesh Varma"
      },
      {
        "date": "2025-07-22",
        "type": "Diagnostic",
        "title": "Abdominal Ultrasound Scan",
        "description": "Grade I fatty liver changes noted. Normal gallbladder and pancreas.",
        "location": "Fortis Diagnostics",
        "doctorName": "Dr. V. Ramanathan"
      }
    ],
    "alerts": [
      { "type": "Warning", "title": "Elevated LDL Cholesterol", "message": "LDL remains above target (<100 mg/dL). Consider statin titration.", "severity": "medium" },
      { "type": "Caution", "title": "Stage 1 Pre-Hypertension", "message": "BP 136/88 mmHg — moderate risk elevation. Monitor sodium intake.", "severity": "medium" }
    ],
    "clinicalSummary": "Rahul Sharma is a 61-year-old male with Essential Hypertension and Hypercholesterolemia. LDL improving (142 mg/dL) on Rosuvastatin, but remains above cardiovascular target. Dietary modification and adherence reinforcement advised."
  }
};

export const SEED_DOCTORS = [
  {
    id: "USER_DOC_1",
    username: "dr.aditisharma",
    email: "aditi.sharma@apollo.org",
    role: "doctor",
    name: "Dr. Aditi Sharma",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    nmcNumber: "NMC/2015/04/82910",
    specialty: "Endocrinology",
    qualification: "MD (Medicine), DM (Endocrinology)",
    experience: 12,
    hospitalName: "Apollo Hospitals",
    department: "Endocrinology",
    designation: "Senior Consultant Endocrinologist",
    city: "Chennai",
    state: "Tamil Nadu",
    hospitalAddress: "21 Greams Lane, Thousand Lights, Chennai",
    consultationType: "Both Physical & Video",
    languages: ["English", "Hindi", "Tamil"],
    bio: "Specialist in Type 2 Diabetes Management, Thyroid disorders, and Metabolic Syndrome risk reduction.",
    consultationHours: "Mon-Sat: 09:00 AM - 04:00 PM",
    verificationStatus: "Approved",
    certUrl: "NMC_Cert_82910.pdf",
    verified: true,
    createdAt: "2025-01-10"
  },
  {
    id: "USER_DOC_2",
    username: "dr.rajeshvarma",
    email: "rajesh.varma@fortis.org",
    role: "doctor",
    name: "Dr. Rajesh Varma",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    nmcNumber: "NMC/2012/08/44312",
    specialty: "Cardiology",
    qualification: "MBBS, MD, DM (Cardiology)",
    experience: 15,
    hospitalName: "Fortis Healthcare",
    department: "Cardiology",
    designation: "Chief Interventional Cardiologist",
    city: "Bengaluru",
    state: "Karnataka",
    hospitalAddress: "Bannerghatta Road, Opposite IIMB, Bengaluru",
    consultationType: "Both Physical & Video",
    languages: ["English", "Kannada", "Hindi"],
    bio: "Focused on preventive cardiology, hypertension control, and lipid management.",
    consultationHours: "Mon-Fri: 10:00 AM - 05:00 PM",
    verificationStatus: "Approved",
    certUrl: "NMC_Cert_44312.pdf",
    verified: true,
    createdAt: "2025-02-01"
  },
  {
    id: "USER_DOC_3",
    username: "dr.kavitareddy",
    email: "kavita.reddy@manipal.org",
    role: "doctor",
    name: "Dr. Kavita Reddy",
    avatar: "https://images.unsplash.com/photo-1594824813566-8885557d0d08?w=150&auto=format&fit=crop&q=80",
    nmcNumber: "NMC/2011/05/29182",
    specialty: "Obstetrics & Gynecology",
    qualification: "MBBS, MD, DGO, FRCOG",
    experience: 16,
    hospitalName: "Manipal Hospital",
    department: "Obstetrics & Gynecology",
    designation: "Head of Obstetrics & Maternal Health",
    city: "Hyderabad",
    state: "Telangana",
    hospitalAddress: "HAL Airport Road, Kodihalli, Hyderabad",
    consultationType: "Both Physical & Video",
    languages: ["English", "Telugu", "Hindi"],
    bio: "Specializing in High-Risk Pregnancy Care, Prenatal Screening, and Fetal Wellbeing.",
    consultationHours: "Mon-Sat: 09:30 AM - 03:30 PM",
    verificationStatus: "Approved",
    certUrl: "NMC_Cert_29182.pdf",
    verified: true,
    createdAt: "2025-02-15"
  }
];

// VITAIQ — Roshini S. (VIT004) Seed Data
// Obstetric Digital Twin — G2P1, 16 weeks gestation (current pregnancy)
// Step 3a: Previous pregnancy (G1, 2023) historical record
// Step 3b: Current pregnancy (G2, 2026) profile, labs, ultrasounds, risk scores

export const SEED_PATIENT_VIT004 = {
  "id": "VIT004",
  "name": "Roshini S.",
  "age": 28,
  "gender": "Female",
  "occupation": "Software Quality Analyst",
  "bloodGroup": "B+",
  "email": "roshini.s@healthmail.in",
  "phone": "+91 94445 67890",
  "dob": "1997-09-12",
  "emergencyContact": "Karthik S. (Husband) — +91 94445 67891",
  "address": "Plot 14, Velachery Main Road, Chennai — 600042",
  "insuranceProvider": "ICICI Lombard Health (Policy #IL-204819)",
  "wristbandId": "WB-20481-RS",
  "riskLevel": "Moderate",
  "riskScore": 42,
  "overallRiskStatus": "Moderate",
  "followUpStatus": "Scheduled",
  "lastVisit": "2026-07-15",
  "nextFollowUp": "2026-08-12",
  "specialty": "Obstetrics & Gynecology",
  "primaryDiagnosis": "G2P1L1 — 16 Weeks Gestation, Previous LSCS (ICD-10 O34.2)",
  "familyHistory": "Mother has Type 2 Diabetes (diagnosed age 45); Maternal aunt had gestational diabetes. No family history of hypertension, cardiac disease, or congenital anomalies.",
  "lifestyle": "Non-smoker, no alcohol, vegetarian diet, mild walking 20 min/day. Works from home since pregnancy confirmation.",
  "conditions": [
    "G2P1L1 — 16 Weeks Gestation (ICD-10 O09.52)",
    "Previous Lower Segment Caesarean Section (ICD-10 O34.2)",
    "Mild Iron Deficiency Anaemia (ICD-10 O99.01)",
    "Subclinical Hypothyroidism in Pregnancy (ICD-10 O99.28)"
  ],
  "allergies": [
    { "substance": "Sulfonamides", "type": "Drug", "severity": "Moderate", "reaction": "Rash and urticaria" }
  ],
  "medications": [
    { "name": "Ferrous Ascorbate + Folic Acid", "dosage": "100 mg + 1.5 mg", "frequency": "Once daily after dinner", "purpose": "Iron deficiency anaemia & neural tube defect prevention", "startDate": "2026-05-20" },
    { "name": "Levothyroxine", "dosage": "25 mcg", "frequency": "Once daily empty stomach", "purpose": "Subclinical hypothyroidism management in pregnancy", "startDate": "2026-06-02" },
    { "name": "Calcium + Vitamin D3", "dosage": "500 mg + 250 IU", "frequency": "Twice daily with meals", "purpose": "Fetal bone development and maternal calcium balance", "startDate": "2026-05-20" },
    { "name": "Omega-3 Fatty Acids (DHA 200 mg)", "dosage": "200 mg DHA", "frequency": "Once daily", "purpose": "Fetal neurodevelopment", "startDate": "2026-06-15" }
  ],
  "surgeries": [
    { "name": "Lower Segment Caesarean Section (LSCS)", "year": 2023, "hospital": "Manipal Hospital, Chennai", "indication": "Fetal Distress — Non-Reassuring CTG", "notes": "Spinal anaesthesia, uncomplicated. Baby: 2940g, APGAR 8/9." }
  ],
  "vaccinations": [
    { "name": "Tdap (Tetanus-Diphtheria-Pertussis)", "date": "2026-07-08", "gestationalAge": "14 weeks 3 days" },
    { "name": "Influenza (Inactivated)", "date": "2026-06-25", "gestationalAge": "12 weeks 1 day" }
  ],
  "adherence": 91,
  "adherenceNotes": "Very good adherence. Takes iron tablet with orange juice as instructed. Occasional nausea with evening dose.",
  "vitals": {
    "bloodPressure": "116/74 mmHg",
    "heartRate": "88 bpm",
    "spO2": "99%",
    "temperature": "98.4 °F",
    "bmi": "23.8 kg/m²",
    "weight": "62.5 kg",
    "bloodGlucose": "88 mg/dL (fasting)",
    "fundalHeight": "16 cm"
  },
  "labTrends": {
    "dates":           ["8w",   "10w",  "12w",  "14w",  "16w"],
    "hemoglobin":      [10.2,   10.6,   10.9,   11.1,   11.4],
    "systolicBP":      [112,    114,    116,    115,    116],
    "diastolicBP":     [70,     72,     74,     72,     74],
    "weight":          [58.2,   59.0,   60.1,   61.3,   62.5],
    "bmi":             [22.3,   22.6,   23.0,   23.5,   23.8],
    "heartRate":       [84,     86,     88,     87,     88],
    "spo2":            [99,     99,     99,     99,     99],
    "temperature":     [98.2,   98.4,   98.3,   98.5,   98.4],
    "tsh":             [3.8,    null,   3.2,    null,   2.9],
    "ferritin":        [10.2,   null,   14.8,   null,   18.6],
    "vitaminD":        [null,   null,   18.4,   null,   null],
    "vitaminB12":      [null,   null,   284,    null,   null]
  },
  "infectionScreening": {
    "hiv":     { "result": "Non-Reactive", "date": "2026-05-22" },
    "hbsag":   { "result": "Non-Reactive", "date": "2026-05-22" },
    "hcv":     { "result": "Non-Reactive", "date": "2026-05-22" },
    "vdrl":    { "result": "Non-Reactive", "date": "2026-05-22" },
    "rubella":  { "result": "IgG Positive", "titre": "48 IU/mL", "date": "2026-05-22", "immune": true }
  },
  "diseaseSpecificLabs": [
    { "name": "Haemoglobin", "value": "11.4", "unit": "g/dL", "reference": "> 11.0 in pregnancy", "status": "Borderline" },
    { "name": "TSH (Thyroid Stimulating Hormone)", "value": "2.9", "unit": "mIU/L", "reference": "< 2.5 (T2)", "status": "Borderline" },
    { "name": "Serum Ferritin", "value": "18.6", "unit": "ng/mL", "reference": "> 30", "status": "Low" },
    { "name": "Vitamin D (25-OH)", "value": "18.4", "unit": "ng/mL", "reference": "> 30", "status": "Deficient" },
    { "name": "Vitamin B12", "value": "284", "unit": "pg/mL", "reference": "200–900", "status": "Normal" },
    { "name": "Blood Pressure (Latest)", "value": "116/74", "unit": "mmHg", "reference": "< 140/90", "status": "Normal" }
  ],
  "obstetricRecord": {
    "gravida": 2,
    "para": 1,
    "lmp": "2026-04-01",
    "edd": "2027-01-06",
    "gestationalAgeWeeks": 16,
    "gestationalAgeDays": 0,
    "bloodGroup": "B+",
    "rhFactor": "Positive",
    "rhImmunoglobulinGiven": false,

    "previousPregnancy": {
      "pregnancyNumber": 1,
      "year": 2023,
      "outcome": "Live Birth via LSCS (Lower Segment Caesarean Section)",
      "gestationalAgeAtDelivery": "38 weeks 4 days",
      "antenatalVisits": [
        {
          "visitNumber": 1,
          "date": "2023-03-08",
          "gestationalAge": "8 weeks 2 days",
          "weight": 56.0,
          "bmi": 21.5,
          "bp": "110/70 mmHg",
          "fetalHeartRate": null,
          "uterineFundus": "Not palpable (early)",
          "presentation": "N/A (early gestation)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "Primigravida. LMP confirmed. Dating scan ordered. Booked for antenatal care. Iron, folic acid, calcium started. Rubella immune.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 2,
          "date": "2023-04-19",
          "gestationalAge": "14 weeks 1 day",
          "weight": 57.2,
          "bmi": 21.9,
          "bp": "112/72 mmHg",
          "fetalHeartRate": 148,
          "uterineFundus": "14 cm",
          "presentation": "N/A (early)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "NT scan normal. Fetal heart present, regular. Blood panel normal. Tdap vaccination given. Advised iron continuation.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 3,
          "date": "2023-05-30",
          "gestationalAge": "20 weeks 0 days",
          "weight": 59.8,
          "bmi": 22.9,
          "bp": "116/74 mmHg",
          "fetalHeartRate": 142,
          "uterineFundus": "20 cm",
          "presentation": "Cephalic",
          "edema": "Trace (feet)",
          "urineProtein": "Nil",
          "clinicalNotes": "Level II anomaly scan completed — all fetal structures normal. Placenta posterior. Liquor adequate. Fetal movements felt. Advised regular walking.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 4,
          "date": "2023-07-04",
          "gestationalAge": "24 weeks 3 days",
          "weight": 62.0,
          "bmi": 23.8,
          "bp": "118/76 mmHg",
          "fetalHeartRate": 146,
          "uterineFundus": "24 cm",
          "presentation": "Cephalic",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "OGTT 75g performed — fasting 84 mg/dL, 1h 148 mg/dL, 2h 118 mg/dL. GDM not diagnosed. Haemoglobin 10.8 — mild anaemia. Iron dose increased to 200 mg elemental.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 5,
          "date": "2023-08-15",
          "gestationalAge": "28 weeks 2 days",
          "weight": 64.4,
          "bmi": 24.7,
          "bp": "120/78 mmHg",
          "fetalHeartRate": 144,
          "uterineFundus": "28 cm",
          "presentation": "Cephalic",
          "edema": "+1 (bilateral feet)",
          "urineProtein": "Trace",
          "clinicalNotes": "Growth scan — EFW 1050g (50th centile). Doppler normal. Mild pedal edema, urine protein trace — BP normal, no pre-eclampsia. Advised dietary salt restriction, rest.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 6,
          "date": "2023-09-20",
          "gestationalAge": "32 weeks 0 days",
          "weight": 66.8,
          "bmi": 25.6,
          "bp": "122/80 mmHg",
          "fetalHeartRate": 140,
          "uterineFundus": "32 cm",
          "presentation": "Cephalic",
          "edema": "+1 (feet and ankles)",
          "urineProtein": "Nil",
          "clinicalNotes": "Growth scan — EFW 1820g (48th centile). Placenta posterior grade II. Liquor AFI 14.2 cm. Thyroid profile: TSH 4.1 — low-dose Levothyroxine 25 mcg initiated.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 7,
          "date": "2023-10-25",
          "gestationalAge": "36 weeks 1 day",
          "weight": 68.6,
          "bmi": 26.3,
          "bp": "126/82 mmHg",
          "fetalHeartRate": 138,
          "uterineFundus": "36 cm",
          "presentation": "Cephalic, head 2/5 engaged",
          "edema": "+1",
          "urineProtein": "Nil",
          "clinicalNotes": "Growth scan — EFW 2780g (52nd centile). Doppler normal. CTG reactive. Pelvic assessment: adequate. Planned trial of vaginal delivery. Hospital admission planned at 38 weeks.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 8,
          "date": "2023-11-15",
          "gestationalAge": "38 weeks 4 days",
          "weight": 69.4,
          "bmi": 26.6,
          "bp": "128/82 mmHg",
          "fetalHeartRate": 136,
          "uterineFundus": "38 cm",
          "presentation": "Cephalic, head 1/5 palpable",
          "edema": "+1",
          "urineProtein": "Nil",
          "clinicalNotes": "Admitted for planned induction. CTG baseline 136 bpm, moderate variability. Induction started with Dinoprostone gel 0.5 mg. Labour established. Intrapartum CTG showed late decelerations — LSCS performed under spinal anaesthesia.",
          "doctorName": "Dr. Kavita Reddy"
        }
      ],
      "scans": [
        {
          "type": "Dating Scan",
          "date": "2023-03-14",
          "gestationalAge": "8 weeks 6 days",
          "findings": "Single live intrauterine pregnancy. CRL 22 mm consistent with 8w6d. Fetal heart rate 174 bpm. Uterus anteverted. No adnexal masses. No free fluid.",
          "efwGrams": null,
          "fetalHeartRate": 174,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "type": "NT Scan (Nuchal Translucency)",
          "date": "2023-04-12",
          "gestationalAge": "13 weeks 0 days",
          "findings": "NT 1.4 mm (normal, < 3.5 mm). Nasal bone present. No major structural anomaly detected. Combined first trimester screening (PAPP-A 1.2 MoM, free beta-hCG 1.0 MoM) — low risk for Trisomy 21, 18, 13. FHR 152 bpm.",
          "efwGrams": null,
          "fetalHeartRate": 152,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "type": "Level II Anomaly Scan (TIFFA)",
          "date": "2023-05-28",
          "gestationalAge": "19 weeks 5 days",
          "findings": "BPD 48 mm, HC 173 mm, AC 148 mm, FL 32 mm — all within normal range for gestational age. Four-chamber cardiac view normal, outflow tracts normal. Neural tube intact. Spine normal. Abdominal wall intact. Kidneys bilateral normal. Bladder visible. Limbs normal. Placenta posterior, grade 0, adequate distance from os. Liquor AFI 12.8 cm (normal). No anomaly detected.",
          "efwGrams": 332,
          "fetalHeartRate": 144,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "type": "Growth Scan",
          "date": "2023-08-14",
          "gestationalAge": "28 weeks 1 day",
          "findings": "BPD 71 mm, HC 258 mm, AC 240 mm, FL 54 mm. EFW 1050g (50th centile for GA). Placenta posterior grade I. AFI 14.2 cm. Umbilical artery Doppler normal (S/D ratio 2.8). FHR 142 bpm.",
          "efwGrams": 1050,
          "fetalHeartRate": 142,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "type": "Growth Scan",
          "date": "2023-09-19",
          "gestationalAge": "31 weeks 6 days",
          "findings": "EFW 1820g (48th centile). BPD 82 mm, HC 296 mm, AC 280 mm, FL 62 mm. Placenta posterior grade II. AFI 13.8 cm. Umbilical artery PI 1.12 (normal). FHR 140 bpm. Cephalic presentation confirmed.",
          "efwGrams": 1820,
          "fetalHeartRate": 140,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "type": "Growth Scan (Pre-Delivery)",
          "date": "2023-10-24",
          "gestationalAge": "36 weeks 0 days",
          "findings": "EFW 2780g (52nd centile). Cephalic presentation. Placenta posterior grade II-III. AFI 11.4 cm. Umbilical artery Doppler normal. FHR 138 bpm. Head 2/5 engaged.",
          "efwGrams": 2780,
          "fetalHeartRate": 138,
          "anomaliesDetected": false,
          "doctorName": "Dr. Kavita Reddy"
        }
      ],
      "investigations": [
        {
          "date": "2023-03-08",
          "type": "Booking Blood Panel",
          "results": {
            "haemoglobin": "11.8 g/dL",
            "bloodGroup": "B Positive",
            "hbsag": "Non-Reactive",
            "hiv": "Non-Reactive",
            "vdrl": "Non-Reactive",
            "rubellaIgG": "Positive (Immune) — 44 IU/mL",
            "tsh": "3.6 mIU/L",
            "fbs": "82 mg/dL",
            "urineRoutine": "Normal, Protein: Nil"
          }
        },
        {
          "date": "2023-04-12",
          "type": "Combined First Trimester Screening",
          "results": {
            "pappA": "1.2 MoM",
            "freeBetaHCG": "1.0 MoM",
            "ntThickness": "1.4 mm",
            "trisomy21Risk": "1:8200 (Low Risk)",
            "trisomy18Risk": "1:15000 (Low Risk)"
          }
        },
        {
          "date": "2023-07-04",
          "type": "OGTT 75g (GDM Screening)",
          "results": {
            "fastingGlucose": "84 mg/dL (Normal < 92)",
            "oneHourGlucose": "148 mg/dL (Normal < 180)",
            "twoHourGlucose": "118 mg/dL (Normal < 153)",
            "gdmDiagnosis": "Not diagnosed (all values within IADPSG criteria)"
          }
        },
        {
          "date": "2023-07-04",
          "type": "Haematology & Iron Profile",
          "results": {
            "haemoglobin": "10.8 g/dL",
            "mcv": "74 fL (Low — microcytic)",
            "mch": "22 pg (Low)",
            "serumIron": "46 mcg/dL (Low)",
            "tibc": "420 mcg/dL (High)",
            "ferritin": "9.2 ng/mL (Low)",
            "assessment": "Mild iron deficiency anaemia. Iron dose increased."
          }
        },
        {
          "date": "2023-09-20",
          "type": "Thyroid Function Test",
          "results": {
            "tsh": "4.1 mIU/L (Borderline — T2 upper limit 3.0 mIU/L)",
            "freeT4": "0.9 ng/dL (Low-normal)",
            "assessment": "Subclinical hypothyroidism in pregnancy. Levothyroxine 25 mcg commenced."
          }
        },
        {
          "date": "2023-11-14",
          "type": "Pre-Operative & Admission Panel",
          "results": {
            "haemoglobin": "11.6 g/dL",
            "plateletCount": "218000 /mm³",
            "prothrombinTime": "12.8 sec (Normal)",
            "aptt": "28 sec (Normal)",
            "serumCreatinine": "0.7 mg/dL",
            "bloodUrea": "18 mg/dL",
            "sodium": "136 mEq/L",
            "potassium": "4.1 mEq/L",
            "urineProtein": "Nil",
            "ecg": "Normal sinus rhythm"
          }
        }
      ],
      "vaccinations": [
        { "vaccine": "Tetanus Toxoid (TT) Dose 1", "date": "2023-03-08", "gestationalAge": "8 weeks 2 days" },
        { "vaccine": "Tetanus Toxoid (TT) Dose 2", "date": "2023-04-12", "gestationalAge": "13 weeks 0 days" },
        { "vaccine": "Tdap Booster", "date": "2023-04-19", "gestationalAge": "14 weeks 1 day" },
        { "vaccine": "Influenza (Inactivated)", "date": "2023-06-10", "gestationalAge": "22 weeks 0 days" }
      ],
      "deliverySummary": {
        "date": "2023-11-15",
        "gestationalAge": "38 weeks 4 days",
        "modeOfDelivery": "Emergency Lower Segment Caesarean Section (LSCS)",
        "indication": "Fetal Distress — Non-Reassuring Intrapartum CTG (Repetitive Late Decelerations with Reduced Variability)",
        "durationOfLabor": "Active labour 6 hours 20 minutes prior to LSCS decision",
        "cervicalDilationAtDecision": "6 cm",
        "anesthesia": "Spinal (Bupivacaine 0.5% heavy + Fentanyl 25 mcg)",
        "skinIncision": "Pfannenstiel (lower transverse)",
        "uterineClosure": "Double layer",
        "bloodLoss": "380 mL (estimated)",
        "intraoperativeComplications": "Nil",
        "postoperativeRecovery": "Uneventful. Ambulated at 12 hours. Foley catheter removed at 24 hours.",
        "antibiotics": "IV Cefazolin 2g prophylaxis at skin closure",
        "oxytocin": "20 units in 500 mL NS post-delivery",
        "hospitalStay": "4 days",
        "dischargeDateG1": "2023-11-19",
        "doctorName": "Dr. Kavita Reddy",
        "assistantDoctor": "Dr. R. Menon (Registrar OB-GYN)",
        "hospital": "Manipal Hospital, Chennai",
        "operativeNotes": "Baby delivered in 8 minutes from incision. Vigorous cry at birth. Cord blood gas pH 7.22. Uterus and appendages normal. Tubal ligation not performed."
      },
      "neonatalRecord": {
        "birthWeight": 2940,
        "sex": "Male",
        "apgar1min": 7,
        "apgar5min": 9,
        "gestationalAge": "38 weeks 4 days",
        "headCircumference": "33 cm",
        "length": "48 cm",
        "condition": "Mild birth asphyxia (APGAR 7 at 1 min) — improved rapidly to 9 at 5 min. No NICU admission required.",
        "neonatalICU": false,
        "breastfeedingInitiated": true,
        "dischargeDay": 4,
        "neonatalPaediatrician": "Dr. S. Krishnaswamy (Neonatology)"
      },
      "postpartumFollowUp": {
        "date": "2023-12-27",
        "weeksPostpartum": 6,
        "bp": "118/74 mmHg",
        "hemoglobin": 11.8,
        "tsh": "3.2 mIU/L",
        "woundHealing": "Pfannenstiel scar well healed, no dehiscence",
        "breastfeeding": true,
        "contraception": "Lactational Amenorrhoea Method (LAM) counselled; OCP deferred",
        "babysWeight": "4200g (good weight gain on exclusive breastfeeding)",
        "clinicalNotes": "Mother and baby well. Levothyroxine dose reduced to 12.5 mcg at 6-week check — TSH normalised postpartum. Iron supplementation continued for 3 months. Advised interval of 2 years before next pregnancy.",
        "doctorName": "Dr. Kavita Reddy"
      }
    },
    "currentPregnancy": {
      "fetalData": {
        "presentation": "Cephalic",
        "lie": "Longitudinal",
        "placentaPosition": "Posterior, upper segment, clear of os",
        "placentaGrade": 0,
        "amnioticFluidIndex": 14.8,
        "liquorVolume": "Adequate",
        "umbilicalCordInsertion": "Central",
        "estimatedFetalWeight": 168,
        "fetalHeartRate": 156,
        "fetalMovements": "Not yet perceived by mother (16 weeks — quickening expected at 18–20 weeks)",
        "cervicalLength": null,
        "biophysicalProfile": null
      },
      "riskMarkers": {
        "gdmScreening": "OGTT 75g scheduled at 24–28 weeks (family history of DM2 — high risk)",
        "gdmDiagnosis": false,
        "anaemia": true,
        "hypothyroidism": true,
        "preeclampsiaRisk": "Low (no features, BP normal, no proteinuria, aspirin not indicated)",
        "placentaPrevia": false,
        "iugr": false,
        "multipleGestation": false,
        "previousCaesarean": true
      },
      "deliveryPlan": {
        "plannedMode": "Trial of Labour After Caesarean (TOLAC / VBAC) — subject to labour progress and CTG",
        "plannedAt": "38–39 weeks gestation",
        "hospital": "Manipal Hospital, Chennai",
        "notes": "Previous LSCS for intrapartum fetal distress (not CPD). Uterine scar assessed adequate. Patient counselled regarding VBAC success rate (~60-70%), uterine rupture risk (~0.5%), and fallback emergency LSCS plan. Continuous intrapartum CTG mandatory. Epidural anaesthesia available."
      },
      "antenatalVisitsG2": [
        {
          "visitNumber": 1,
          "date": "2026-05-20",
          "gestationalAge": "7 weeks 0 days",
          "weight": 58.2,
          "bmi": 22.3,
          "bp": "112/70 mmHg",
          "fetalHeartRate": 162,
          "uterineFundus": "Not palpable",
          "presentation": "N/A (early)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "Booking visit. G2P1L1. Previous LSCS noted. LMP confirmed 01-Apr-2026. EDD 06-Jan-2027. Iron, folic acid, calcium, DHA commenced. Infection screening done. TSH 3.8 — Levothyroxine 25 mcg resumed.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 2,
          "date": "2026-06-10",
          "gestationalAge": "10 weeks 2 days",
          "weight": 59.0,
          "bmi": 22.6,
          "bp": "114/72 mmHg",
          "fetalHeartRate": 176,
          "uterineFundus": "Not palpable",
          "presentation": "N/A (early)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "Dating scan confirms 10w2d. CRL 35mm. FHR 176 bpm. Nuchal fold measurement ordered. First trimester screening arranged. Patient reports mild nausea, managed conservatively.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 3,
          "date": "2026-07-01",
          "gestationalAge": "13 weeks 0 days",
          "weight": 60.1,
          "bmi": 23.0,
          "bp": "116/74 mmHg",
          "fetalHeartRate": 168,
          "uterineFundus": "12 cm",
          "presentation": "N/A (early)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "NT scan: NT 1.2 mm (normal). Nasal bone present. Combined screening: Trisomy 21 risk 1:12000 (low risk). Tdap given this visit. Vitamin D deficiency noted (18.4 ng/mL) — Vit D3 60000 IU weekly x 8 weeks commenced.",
          "doctorName": "Dr. Kavita Reddy"
        },
        {
          "visitNumber": 4,
          "date": "2026-07-15",
          "gestationalAge": "15 weeks 6 days",
          "weight": 61.3,
          "bmi": 23.5,
          "bp": "115/72 mmHg",
          "fetalHeartRate": 158,
          "uterineFundus": "15 cm",
          "presentation": "N/A (< 20w)",
          "edema": "Nil",
          "urineProtein": "Nil",
          "clinicalNotes": "Routine review. TSH improved to 3.2 on Levothyroxine. Ferritin rising (14.8 → target > 30). Haemoglobin 11.1. Patient reports good appetite. OGTT scheduled at 24 weeks due to family history of diabetes. Level II anomaly scan booked at 18–20 weeks.",
          "doctorName": "Dr. Kavita Reddy"
        }
      ]
    },
    "ultrasoundHistory": [
      {
        "scanNumber": 1,
        "type": "Dating Scan (G1)",
        "date": "2023-03-14",
        "gestationalAge": "8 weeks 6 days",
        "findings": "Single live IUP. CRL 22mm. FHR 174 bpm. No adnexal mass. No free fluid.",
        "efwGrams": null,
        "fetalHeartRate": 174,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 2,
        "type": "NT Scan (G1)",
        "date": "2023-04-12",
        "gestationalAge": "13 weeks 0 days",
        "findings": "NT 1.4 mm (normal). Nasal bone present. Low risk T21/T18. FHR 152 bpm.",
        "efwGrams": null,
        "fetalHeartRate": 152,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 3,
        "type": "Level II Anomaly Scan / TIFFA (G1)",
        "date": "2023-05-28",
        "gestationalAge": "19 weeks 5 days",
        "findings": "All fetal structures normal. BPD 48mm, HC 173mm, AC 148mm, FL 32mm. EFW 332g. Placenta posterior grade 0. AFI 12.8 cm. No anomaly detected.",
        "efwGrams": 332,
        "fetalHeartRate": 144,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 4,
        "type": "Growth Scan at 28w (G1)",
        "date": "2023-08-14",
        "gestationalAge": "28 weeks 1 day",
        "findings": "EFW 1050g (50th centile). AFI 14.2 cm. Umbilical artery Doppler normal. FHR 142 bpm.",
        "efwGrams": 1050,
        "fetalHeartRate": 142,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 5,
        "type": "Growth Scan at 32w (G1)",
        "date": "2023-09-19",
        "gestationalAge": "31 weeks 6 days",
        "findings": "EFW 1820g (48th centile). Placenta posterior grade II. AFI 13.8 cm. Cephalic. FHR 140 bpm.",
        "efwGrams": 1820,
        "fetalHeartRate": 140,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 6,
        "type": "Pre-Delivery Growth Scan at 36w (G1)",
        "date": "2023-10-24",
        "gestationalAge": "36 weeks 0 days",
        "findings": "EFW 2780g (52nd centile). Cephalic presentation. AFI 11.4 cm. Umbilical artery Doppler normal. Head 2/5 engaged.",
        "efwGrams": 2780,
        "fetalHeartRate": 138,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 1
      },
      {
        "scanNumber": 7,
        "type": "Dating Scan (G2)",
        "date": "2026-06-05",
        "gestationalAge": "9 weeks 5 days",
        "findings": "Single live IUP. CRL 28mm consistent with 9w5d. FHR 172 bpm. Uterine scar visualised — appears intact. No adnexal pathology.",
        "efwGrams": null,
        "fetalHeartRate": 172,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 2
      },
      {
        "scanNumber": 8,
        "type": "NT Scan (G2)",
        "date": "2026-07-02",
        "gestationalAge": "13 weeks 1 day",
        "findings": "NT 1.2 mm (normal, < 3.5 mm). Nasal bone present. PAPP-A 1.3 MoM, free beta-hCG 0.9 MoM. T21 risk 1:12000 (low), T18 risk 1:18000 (low). FHR 168 bpm. Uterine scar appears intact.",
        "efwGrams": null,
        "fetalHeartRate": 168,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 2
      },
      {
        "scanNumber": 9,
        "type": "Early Fetal Survey (G2)",
        "date": "2026-07-15",
        "gestationalAge": "15 weeks 6 days",
        "findings": "EFW 168g — appropriate for gestational age. Cephalic presentation. Placenta posterior, upper segment, clear of os. AFI 14.8 cm (adequate). FHR 156 bpm. Uterine scar: lower segment thickness 4.2 mm — adequate for trial of labour. No obvious anomalies on early survey (formal TIFFA booked at 18–20 weeks).",
        "efwGrams": 168,
        "fetalHeartRate": 156,
        "anomaliesDetected": false,
        "doctorName": "Dr. Kavita Reddy",
        "pregnancyNumber": 2
      }
    ]
  },
  "timeline": [
    {
      "date": "2026-07-15",
      "type": "Visit",
      "title": "16-Week Antenatal Review (G2)",
      "description": "16-week routine antenatal check. BP 115/72, Hb 11.1. TSH improving on Levothyroxine (3.2 mIU/L). Ferritin trending upward. Early fetal survey: EFW 168g, cephalic, FHR 156 bpm, AFI adequate. Uterine scar thickness 4.2mm — adequate for TOLAC planning. OGTT scheduled at 24 weeks. Level II anomaly scan booked for 18–20 weeks.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2026-07-02",
      "type": "Diagnostic",
      "title": "NT Scan + First Trimester Screening (G2)",
      "description": "NT 1.2mm normal. PAPP-A 1.3 MoM, beta-hCG 0.9 MoM. T21 risk 1:12000 (low risk). FHR 168 bpm. Uterine scar intact on scan.",
      "location": "Manipal Diagnostics, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2026-07-08",
      "type": "Vaccination",
      "title": "Tdap Vaccine Administered",
      "description": "Tetanus-Diphtheria-Pertussis (Tdap) booster administered at 14 weeks 3 days for maternal and neonatal pertussis protection. No adverse reactions.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2026-06-25",
      "type": "Vaccination",
      "title": "Influenza Vaccine Administered",
      "description": "Inactivated influenza vaccine administered at 12 weeks 1 day. Safe in all trimesters. Patient counselled on fetal protection benefit.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2026-05-20",
      "type": "Registration",
      "title": "Antenatal Booking Visit (G2P1)",
      "description": "Second pregnancy booking. G2P1L1. Previous LSCS 2023. LMP 01-Apr-2026, EDD 06-Jan-2027. Baseline blood panel, infection screening, ECG all normal. Iron, folic acid, calcium, DHA, Levothyroxine commenced. TOLAC eligibility discussed.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2023-12-27",
      "type": "Visit",
      "title": "6-Week Postpartum Follow-Up (G1)",
      "description": "Pfannenstiel scar healed well. Hb 11.8 g/dL. TSH normalised postpartum (3.2 mIU/L) — Levothyroxine dose reduced. Baby weight 4200g on exclusive breastfeeding. LAM contraception counselled. Advised 2-year inter-pregnancy interval.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2023-11-15",
      "type": "Procedure",
      "title": "Emergency LSCS — G1 Delivery (38w4d)",
      "description": "Emergency LSCS under spinal anaesthesia for non-reassuring intrapartum CTG (repetitive late decelerations). Pfannenstiel incision. Baby: male, 2940g, APGAR 7/9. Estimated blood loss 380 mL. Uneventful recovery. Discharged day 4.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    },
    {
      "date": "2023-03-08",
      "type": "Registration",
      "title": "First Antenatal Booking Visit (G1 — 2023)",
      "description": "Primigravida registered at 8w2d. LMP confirmed. Baseline investigations, infection screening, blood group, rubella immunity — all normal. Iron, folic acid, calcium commenced. Detailed antenatal counselling.",
      "location": "Manipal Hospital, Chennai",
      "doctorName": "Dr. Kavita Reddy"
    }
  ],
  "alerts": [
    {
      "type": "Warning",
      "title": "Previous LSCS — Scar Uterus",
      "message": "Patient has one prior LSCS (2023). Uterine scar thickness 4.2mm on current scan (adequate). TOLAC planned — continuous intrapartum CTG mandatory. Uterine rupture risk 0.3–0.5%. Crash LSCS team must be on standby.",
      "severity": "medium"
    },
    {
      "type": "Alert",
      "title": "Subclinical Hypothyroidism on Treatment",
      "message": "TSH 2.9 mIU/L on Levothyroxine 25 mcg. Target TSH < 2.5 mIU/L in second trimester (ACOG/ATA trimester-specific guideline — 4.0 mIU/L used as flat threshold in this engine; clinically review). Recheck thyroid function at 20 weeks.",
      "severity": "low"
    },
    {
      "type": "Alert",
      "title": "Iron Deficiency — Improving on Treatment",
      "message": "Ferritin 18.6 ng/mL (target > 30 ng/mL). Haemoglobin trending upward (10.2 → 11.4 g/dL over 16 weeks). Continue oral iron supplementation. Recheck ferritin and Hb at 20 weeks.",
      "severity": "low"
    },
    {
      "type": "Warning",
      "title": "Vitamin D Deficiency — Replacement Ongoing",
      "message": "Vitamin D 18.4 ng/mL (deficient, target > 30 ng/mL). High-dose Vit D3 supplementation commenced. Recheck 25-OH Vitamin D at 20 weeks.",
      "severity": "low"
    },
    {
      "type": "Caution",
      "title": "GDM High-Risk — OGTT Pending at 24 Weeks",
      "message": "Strong family history of Type 2 Diabetes (mother). OGTT 75g must be performed at 24–26 weeks. If GDM confirmed, insulin therapy may be required. Monitor fasting glucose at every ANC visit.",
      "severity": "medium"
    }
  ],
  "clinicalSummary": "Roshini S. is a 28-year-old G2P1L1 currently at 16 weeks gestation with a previous LSCS for intrapartum fetal distress in 2023. Current pregnancy appears well-established with low-risk first trimester screening (T21 risk 1:12000). Active clinical concerns include mild iron deficiency anaemia (Hb 11.4, Ferritin 18.6 — improving on supplementation), subclinical hypothyroidism managed on Levothyroxine 25mcg (TSH 2.9 mIU/L — approaching but not yet at T2 target), and Vitamin D deficiency under replacement. Family history of T2DM necessitates early OGTT at 24 weeks. TOLAC/VBAC is planned — uterine scar thickness 4.2mm is adequate. Fetal survey reassuring: EFW 168g, cephalic, FHR 156 bpm, AFI 14.8cm, placenta posterior and clear of os. Level II anomaly scan (TIFFA) scheduled at 18–20 weeks.",
  "pregnancyRisk": {
    "maternalRisk": {
      "level": "Moderate",
      "score": 40,
      "factors": [
        "Previous caesarean section (+10)",
        "Subclinical hypothyroidism (TSH 2.9 > T2 target of 2.5 mIU/L) (+15)",
        "Iron deficiency anaemia — Hb 11.4 (borderline but not < 9.0) (+5)",
        "Vitamin D deficiency (+5)",
        "GDM risk (family history) — pending OGTT (+5)"
      ],
      "recommendations": [
        "Recheck TSH at 20 weeks — titrate Levothyroxine if > 2.5 mIU/L",
        "OGTT 75g mandatory at 24–26 weeks (family DM history)",
        "Repeat Hb, Ferritin, Vitamin D at 20-week visit",
        "Continuous intrapartum CTG and crash LSCS backup for TOLAC delivery"
      ]
    },
    "fetalRisk": {
      "level": "Low",
      "score": 14,
      "factors": [
        "EFW 168g appropriate for 16 weeks (+0)",
        "AFI 14.8 cm — adequate (+0)",
        "Cephalic presentation — appropriate for gestational age (+0)",
        "No anomalies on available scans (+0)",
        "Uterine scar present — small rupture risk (+14)"
      ],
      "recommendations": [
        "Level II anomaly scan (TIFFA) at 18–20 weeks — mandatory",
        "Growth scan at 28 and 34 weeks",
        "Biophysical profile assessment if any IUGR concern arises"
      ]
    },
    "overallRisk": {
      "level": "Moderate",
      "score": 42,
      "summary": "G2P1 with previous LSCS at 16 weeks gestation. Maternal risk moderate (hypothyroidism, anaemia, GDM family history, scar uterus). Fetal risk currently low. Overall management: continue supplementation, monitor thyroid and iron at 20 weeks, OGTT at 24 weeks, TIFFA at 18–20 weeks. Delivery planning: TOLAC at 38–39 weeks with full intrapartum monitoring."
    }
  }
};

// Roshini's user account
export const SEED_USER_ROSHINI = {
  "id": "USER_PAT_3",
  "username": "roshini.s",
  "email": "roshini.s@healthmail.in",
  "passwordHash": "demo123",
  "role": "patient",
  "name": "Roshini S.",
  "patientId": "VIT004",
  "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
  "dob": "1997-09-12",
  "gender": "Female",
  "bloodGroup": "B+",
  "phone": "+91 94445 67890",
  "emergencyContact": "Karthik S. (Husband) — +91 94445 67891",
  "address": "Plot 14, Velachery Main Road, Chennai — 600042",
  "insuranceProvider": "ICICI Lombard Health (Policy #IL-204819)",
  "verified": true,
  "createdAt": "2026-05-20"
};

// Dr. Kavita Reddy already exists in SEED_DOCTORS (USER_DOC_3) and is the
// unambiguous OB-GYN for Roshini — no new doctor record needed.
// Per spec: "Reuse an existing OB-GYN doctor only if one already exists in
// SEED_DOCTORS and is unambiguously appropriate."

// Roshini's appointments
export const SEED_APPOINTMENTS_ROSHINI = [
  {
    "id": "APT-88220",
    "patientId": "VIT004",
    "patientName": "Roshini S.",
    "patientEmail": "roshini.s@healthmail.in",
    "doctorId": "USER_DOC_3",
    "doctorName": "Dr. Kavita Reddy",
    "doctorSpecialty": "Obstetrics & Gynecology",
    "hospitalName": "Manipal Hospital",
    "department": "Obstetrics & Gynecology",
    "date": "2026-08-12",
    "time": "10:00 AM",
    "consultationType": "Physical Consultation",
    "status": "Confirmed",
    "reason": "18-Week Anomaly Scan Review (Level II TIFFA) & Routine ANC",
    "qrCode": "VITAIQ-APT-88220-VIT004-DOC3",
    "createdAt": "2026-07-20"
  },
  {
    "id": "APT-88221",
    "patientId": "VIT004",
    "patientName": "Roshini S.",
    "patientEmail": "roshini.s@healthmail.in",
    "doctorId": "USER_DOC_3",
    "doctorName": "Dr. Kavita Reddy",
    "doctorSpecialty": "Obstetrics & Gynecology",
    "hospitalName": "Manipal Hospital",
    "department": "Obstetrics & Gynecology",
    "date": "2026-09-23",
    "time": "11:30 AM",
    "consultationType": "Physical Consultation",
    "status": "Pending",
    "reason": "24-Week OGTT GDM Screening + Anomaly Scan Report Review",
    "qrCode": "VITAIQ-APT-88221-VIT004-DOC3",
    "createdAt": "2026-07-20"
  }
];

// Notifications
export const SEED_NOTIFICATIONS_ROSHINI = [
  {
    "id": "NOTIF_R1",
    "userId": "USER_PAT_3",
    "title": "Upcoming Anomaly Scan Appointment",
    "message": "Your Level II Anomaly Scan (TIFFA) review with Dr. Kavita Reddy is confirmed for Aug 12, 2026 at 10:00 AM at Manipal Hospital.",
    "timestamp": "2026-07-20T09:00:00.000Z",
    "read": false,
    "type": "appointment"
  },
  {
    "id": "NOTIF_R2",
    "userId": "USER_DOC_3",
    "title": "Patient Antenatal Review Due — Roshini S.",
    "message": "Roshini S. (VIT004, G2P1, 16w) is due for Level II anomaly scan review on Aug 12, 2026. TSH and iron recheck also due at this visit.",
    "timestamp": "2026-07-20T08:30:00.000Z",
    "read": false,
    "type": "clinical"
  },
  {
    "id": "NOTIF_R3",
    "userId": "USER_PAT_3",
    "title": "OGTT Screening Reminder",
    "message": "You are at high risk for gestational diabetes (family history of T2DM). Your OGTT 75g test is scheduled at 24–26 weeks (around Sep 23, 2026). Please arrive fasting for 8 hours.",
    "timestamp": "2026-07-20T09:15:00.000Z",
    "read": false,
    "type": "alert"
  }
];

// Connections
export const SEED_CONNECTIONS_ROSHINI = {
  "VIT004": ["USER_DOC_3"]
};

// Audit logs
export const SEED_AUDIT_LOGS_ROSHINI = [
  {
    "id": "LOG_R001",
    "timestamp": new Date(Date.now() - 1200000).toISOString(),
    "userId": "USER_DOC_3",
    "userName": "Dr. Kavita Reddy",
    "userRole": "doctor",
    "action": "Patient Record Accessed",
    "category": "Clinical Data Access",
    "details": "Viewed longitudinal obstetric twin record for Patient ID: VIT004 (Roshini S.) — 16-week ANC review",
    "ipAddress": "192.168.2.14"
  },
  {
    "id": "LOG_R002",
    "timestamp": new Date(Date.now() - 3600000).toISOString(),
    "userId": "USER_PAT_3",
    "userName": "Roshini S.",
    "userRole": "patient",
    "action": "Patient Twin Record Registered",
    "category": "Registration",
    "details": "New obstetric digital twin created for VIT004 (Roshini S.) — G2P1L1, 16 weeks gestation",
    "ipAddress": "182.74.14.2"
  }
];

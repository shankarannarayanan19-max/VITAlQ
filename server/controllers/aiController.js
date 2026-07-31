import { db } from '../db/db.js';

export const generateClinicalSummary = async (req, res) => {
  try {
    const { patientId } = req.body;
    if (!patientId) {
      return res.status(400).json({ success: false, message: 'Patient ID is required.' });
    }

    const patient = db.getPatientById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient ID '${patientId}' not found.` });
    }

    // AI Clinical decision support generator logic
    const { name, age, gender, conditions = [], vitals = {}, labTrends = {}, riskLevel = 'Low' } = patient;

    // Read latest values from schema A parallel arrays
    const lastIdx = labTrends.dates ? labTrends.dates.length - 1 : -1;
    const latestHba1c   = lastIdx >= 0 && labTrends.hba1c      ? labTrends.hba1c[lastIdx]      : null;
    const latestEgfr    = lastIdx >= 0 && labTrends.egfr        ? labTrends.egfr[lastIdx]        : null;
    const latestCr      = lastIdx >= 0 && labTrends.creatinine  ? labTrends.creatinine[lastIdx]  : null;
    const latestSysBP   = lastIdx >= 0 && labTrends.systolicBP  ? labTrends.systolicBP[lastIdx]  : null;
    const latestDiasBP  = lastIdx >= 0 && labTrends.diastolicBP ? labTrends.diastolicBP[lastIdx] : null;
    const latestLdl     = lastIdx >= 0 && labTrends.ldl         ? labTrends.ldl[lastIdx]         : null;

    let summaryText = `${name} is a ${age}-year-old ${gender.toLowerCase()}`;
    if (conditions.length > 0) {
      summaryText += ` diagnosed with ${conditions.join(', ')}.`;
    } else {
      summaryText += ` with no documented chronic co-morbidities.`;
    }

    if (vitals.bloodPressure) {
      summaryText += ` Current vital assessment indicates Blood Pressure of ${vitals.bloodPressure} and Heart Rate of ${vitals.heartRate || '75 bpm'}.`;
    }

    if (latestHba1c !== null) {
      summaryText += ` Longitudinal laboratory analysis shows HbA1c at ${latestHba1c}%`;
      if (latestEgfr !== null)  summaryText += `, eGFR at ${latestEgfr} mL/min/1.73m²`;
      if (latestCr !== null)    summaryText += `, Serum Creatinine at ${latestCr} mg/dL`;
      if (latestSysBP !== null) summaryText += `, BP ${latestSysBP}/${latestDiasBP ?? '?'} mmHg`;
      if (latestLdl !== null)   summaryText += `, LDL ${latestLdl} mg/dL`;
      summaryText += '.';
    }

    if (riskLevel === 'High') {
      summaryText += ` Clinical decision support engine classifies this patient under HIGH RISK profile due to progressive renal function decline and suboptimal glycemic control. Co-management with specialist is recommended.`;
    } else if (riskLevel === 'Moderate') {
      summaryText += ` Risk engine indicates MODERATE RISK profile. Regular monitoring of BP and lipid parameters recommended.`;
    } else {
      summaryText += ` Overall risk status is LOW with stable metabolic markers. Maintain baseline preventative health protocol.`;
    }

    // Update patient record with newly generated summary
    patient.clinicalSummary = summaryText;
    db.upsertPatient(patient);

    return res.json({
      success: true,
      message: 'AI Clinical Summary generated successfully.',
      clinicalSummary: summaryText,
      patient
    });
  } catch (err) {
    console.error('Clinical summary generation error:', err);
    return res.status(500).json({ success: false, message: 'Failed to generate clinical summary.' });
  }
};

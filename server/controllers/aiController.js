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
    const { name, age, gender, conditions = [], vitals = {}, labHistory = [], riskLevel = 'Low' } = patient;
    const latestLab = labHistory.length > 0 ? labHistory[labHistory.length - 1] : {};

    let summaryText = `${name} is a ${age}-year-old ${gender.toLowerCase()}`;
    if (conditions.length > 0) {
      summaryText += ` diagnosed with ${conditions.join(', ')}.`;
    } else {
      summaryText += ` with no documented chronic co-morbidities.`;
    }

    if (vitals.bloodPressure) {
      summaryText += ` Current vital assessment indicates Blood Pressure of ${vitals.bloodPressure} and Heart Rate of ${vitals.heartRate || '75 bpm'}.`;
    }

    if (latestLab.hba1c) {
      summaryText += ` Longitudinal laboratory analysis shows HbA1c at ${latestLab.hba1c}%, eGFR at ${latestLab.eGFR || 'N/A'} mL/min/1.73m², and Serum Creatinine at ${latestLab.creatinine || 'N/A'} mg/dL.`;
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

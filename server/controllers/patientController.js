import { db } from '../db/db.js';

export const getAllPatients = async (req, res) => {
  try {
    const patients = db.getPatients();
    return res.json({ success: true, patients });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch patient digital twin records.' });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = db.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient twin record with ID '${id}' not found.` });
    }

    // Log audit event if doctor accessed record
    if (req.user && req.user.role === 'doctor') {
      db.addAuditLog({
        id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        userId: req.user.id,
        userName: req.user.name,
        userRole: req.user.role,
        action: 'Patient Record Accessed',
        category: 'Clinical Data Access',
        details: `Viewed longitudinal health twin record for Patient ID: ${patient.id} (${patient.name})`,
        ipAddress: req.ip || '127.0.0.1'
      });
    }

    return res.json({ success: true, patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving patient twin record.' });
  }
};

export const createPatient = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.id) {
      return res.status(400).json({ success: false, message: 'Patient Name and ID are required.' });
    }

    const created = db.upsertPatient(data);
    return res.status(201).json({ success: true, message: 'Patient twin created.', patient: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create patient twin record.' });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.getPatientById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: `Patient ID '${id}' not found.` });
    }

    const updated = db.upsertPatient({ ...existing, ...req.body, id: existing.id });
    return res.json({ success: true, message: 'Patient twin updated successfully.', patient: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update patient twin record.' });
  }
};

export const addTimelineEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = db.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient ID '${id}' not found.` });
    }

    const newEvent = {
      date: req.body.date || new Date().toISOString().split('T')[0],
      type: req.body.type || 'Consultation',
      title: req.body.title || 'Clinical Encounter',
      description: req.body.description || req.body.notes || '',
      location: req.body.location || req.body.hospital || 'VITAIQ Clinic Network',
      doctorName: req.body.doctorName || req.body.doctor || (req.user ? req.user.name : 'Attending Physician')
    };

    patient.timeline = [newEvent, ...(patient.timeline || [])];
    db.upsertPatient(patient);

    return res.json({ success: true, message: 'Timeline event added.', patient });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error adding timeline event.' });
  }
};

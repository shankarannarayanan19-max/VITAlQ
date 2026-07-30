import { db } from '../db/db.js';

export const getHospitals = async (req, res) => {
  try {
    const hospitals = db.getHospitals();
    return res.json({ success: true, hospitals });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve partner hospitals.' });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = db.getDepartments();
    return res.json({ success: true, departments });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve medical departments.' });
  }
};

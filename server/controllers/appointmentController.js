import { db } from '../db/db.js';

export const getAppointments = async (req, res) => {
  try {
    const { patientId, doctorId } = req.query;
    let appointments = db.getAppointments();

    if (patientId) {
      appointments = appointments.filter(a => a.patientId.toLowerCase() === patientId.toLowerCase());
    }
    if (doctorId) {
      appointments = appointments.filter(a => a.doctorId === doctorId);
    }

    return res.json({ success: true, appointments });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve appointments.' });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const aptId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;
    const qrCode = `VITAIQ-${aptId}-${appointmentData.patientId || 'PAT'}-${appointmentData.doctorId || 'DOC'}`;

    const newApt = {
      id: aptId,
      status: 'Pending',
      qrCode,
      createdAt: new Date().toISOString().split('T')[0],
      ...appointmentData
    };

    db.addAppointment(newApt);

    // Generate notifications
    if (appointmentData.doctorId) {
      db.addNotification({
        id: `NOTIF_${Date.now()}`,
        userId: appointmentData.doctorId,
        title: 'New Patient Appointment Request',
        message: `${appointmentData.patientName || 'A patient'} requested a ${appointmentData.consultationType || 'consultation'} for ${appointmentData.date} at ${appointmentData.time}.`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      });
    }

    if (req.user) {
      db.addNotification({
        id: `NOTIF_${Date.now() + 1}`,
        userId: req.user.id,
        title: 'Appointment Booking Submitted',
        message: `Your booking request with ${appointmentData.doctorName} (${appointmentData.hospitalName}) has been submitted. Appointment ID: ${aptId}`,
        timestamp: 'Just now',
        read: false,
        type: 'appointment'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully.',
      appointment: newApt
    });
  } catch (err) {
    console.error('Create Appointment Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create appointment booking.' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status field is required.' });
    }

    const updated = db.updateAppointmentStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Appointment '${id}' not found.` });
    }

    return res.json({ success: true, message: `Appointment status updated to ${status}.`, appointment: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update appointment status.' });
  }
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS, INITIAL_APPOINTMENTS, INITIAL_NOTIFICATIONS } from '../data/enterpriseData';
import { patientsData } from '../data/patientsData';
import { logAuditEvent } from '../utils/auditLogger';

const HealthRecordContext = createContext(null);

export const HealthRecordProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState(() => {
    const saved = localStorage.getItem("vitaiq_hospitals");
    return saved ? JSON.parse(saved) : INITIAL_HOSPITALS;
  });

  const [departments] = useState(INITIAL_DEPARTMENTS);

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("vitaiq_appointments");
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("vitaiq_notifications");
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Doctor-Patient Access Delegation Store: { [patientId]: [ doctorUserIds ] }
  const [patientDoctorConnections, setPatientDoctorConnections] = useState(() => {
    const saved = localStorage.getItem("vitaiq_connections");
    return saved ? JSON.parse(saved) : {
      "VIT001": ["USER_DOC_1", "USER_DOC_2"],
      "VIT002": ["USER_DOC_1"],
      "VIT003": ["USER_DOC_2"],
      "VIT004": ["USER_DOC_1"],
      "VIT007": ["USER_DOC_1"]
    };
  });

  // Dynamic Patient Records Store
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem("vitaiq_patients_records");
    return saved ? JSON.parse(saved) : patientsData;
  });

  useEffect(() => {
    localStorage.setItem("vitaiq_hospitals", JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem("vitaiq_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("vitaiq_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("vitaiq_connections", JSON.stringify(patientDoctorConnections));
  }, [patientDoctorConnections]);

  useEffect(() => {
    localStorage.setItem("vitaiq_patients_records", JSON.stringify(patients));
  }, [patients]);

  // Book Appointment
  const bookAppointment = (appointmentData, currentUser) => {
    const aptId = `APT-${Math.floor(10000 + Math.random() * 90000)}`;
    const qrCode = `VITAIQ-${aptId}-${appointmentData.patientId || 'PAT'}-${appointmentData.doctorId || 'DOC'}`;

    const newApt = {
      id: aptId,
      status: 'Pending',
      qrCode,
      createdAt: new Date().toISOString().split('T')[0],
      ...appointmentData
    };

    setAppointments(prev => [newApt, ...prev]);

    // Notifications
    const docNotif = {
      id: `NOTIF_${Date.now()}`,
      userId: appointmentData.doctorId,
      title: "New Patient Appointment Request",
      message: `${appointmentData.patientName} requested a ${appointmentData.consultationType} for ${appointmentData.date} at ${appointmentData.time}.`,
      timestamp: "Just now",
      read: false,
      type: "appointment"
    };

    const patNotif = {
      id: `NOTIF_${Date.now() + 1}`,
      userId: currentUser?.id || "USER_PAT_1",
      title: "Appointment Booking Submitted",
      message: `Your booking request with ${appointmentData.doctorName} (${appointmentData.hospitalName}) has been submitted. Appointment ID: ${aptId}`,
      timestamp: "Just now",
      read: false,
      type: "appointment"
    };

    setNotifications(prev => [docNotif, patNotif, ...prev]);

    logAuditEvent({
      action: "Appointment Booked",
      category: "Appointment Management",
      details: `Booked ${appointmentData.consultationType} with ${appointmentData.doctorName} at ${appointmentData.hospitalName} for ${appointmentData.date}`,
      user: currentUser
    });

    return newApt;
  };

  // Update Appointment Status (Doctor Accept / Decline / Complete / Cancel)
  const updateAppointmentStatus = (aptId, newStatus, currentUser, notes = '') => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === aptId) {
        const updated = { ...apt, status: newStatus, notes: notes || apt.notes };

        const patNotif = {
          id: `NOTIF_${Date.now()}`,
          userId: apt.patientId,
          title: `Appointment ${newStatus}`,
          message: `Your appointment with ${apt.doctorName} at ${apt.hospitalName} on ${apt.date} has been ${newStatus.toLowerCase()}.`,
          timestamp: "Just now",
          read: false,
          type: "appointment"
        };

        setNotifications(nPrev => [patNotif, ...nPrev]);

        logAuditEvent({
          action: `Appointment ${newStatus}`,
          category: "Appointment Management",
          details: `Updated Appointment ID ${aptId} status to ${newStatus}`,
          user: currentUser
        });

        return updated;
      }
      return apt;
    }));
  };

  // Reschedule Appointment
  const rescheduleAppointment = (aptId, newDate, newTime, currentUser) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === aptId) {
        const updated = { ...apt, date: newDate, time: newTime, status: 'Confirmed' };
        
        logAuditEvent({
          action: "Appointment Rescheduled",
          category: "Appointment Management",
          details: `Rescheduled Appointment ID ${aptId} to ${newDate} at ${newTime}`,
          user: currentUser
        });

        return updated;
      }
      return apt;
    }));
  };

  // Create New Patient (Add Patient Flow)
  const addPatient = (patientData, currentUser) => {
    const newId = `VIT${Math.floor(100 + Math.random() * 900)}`;
    
    const newPatient = {
      id: newId,
      name: patientData.name.trim(),
      age: Number(patientData.age) || 30,
      gender: patientData.gender || "Male",
      bloodGroup: patientData.bloodGroup || "O+",
      email: patientData.email.trim(),
      phone: patientData.phone.trim(),
      address: patientData.address || "",
      emergencyContact: patientData.emergencyContact || "",
      insuranceProvider: patientData.insuranceProvider || "Self-Pay",
      primaryDiagnosis: patientData.primaryDiagnosis || "Routine Health Evaluation",
      hospitalName: patientData.hospitalName || "Apollo Hospitals",
      lastVisit: new Date().toISOString().split('T')[0],
      nextFollowUp: patientData.nextFollowUp || "",
      followUpStatus: "Scheduled",
      overallRiskStatus: "Low",
      conditions: patientData.primaryDiagnosis ? [patientData.primaryDiagnosis] : [],
      allergies: [],
      medications: [],
      surgeries: [],
      vaccinations: [],
      adherence: 95,
      adherenceNotes: "Newly registered patient profile.",
      labTrends: {
        dates: [new Date().toISOString().split('T')[0]],
        systolicBP: [120],
        diastolicBP: [80]
      },
      diseaseSpecificLabs: [],
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          type: "Registration",
          title: "Patient Account Onboarded",
          description: `Patient profile created by ${currentUser?.name || 'Attending Doctor'}.`,
          location: patientData.hospitalName || "Apollo Hospitals",
          doctorName: currentUser?.name || "Attending Physician"
        }
      ]
    };

    setPatients(prev => ({
      ...prev,
      [newId]: newPatient
    }));

    // Link to current doctor
    if (currentUser?.id) {
      setPatientDoctorConnections(prev => ({
        ...prev,
        [newId]: [...(prev[newId] || []), currentUser.id]
      }));
    }

    logAuditEvent({
      action: "New Patient Registered",
      category: "Patient Management",
      details: `Created new patient profile: ${newPatient.name} (Patient ID: ${newId})`,
      user: currentUser
    });

    return newPatient;
  };

  // Link existing patient to doctor
  const linkPatientToDoctor = (patientId, doctorUserId, currentUser) => {
    setPatientDoctorConnections(prev => {
      const existing = prev[patientId] || [];
      if (existing.includes(doctorUserId)) return prev;
      return {
        ...prev,
        [patientId]: [...existing, doctorUserId]
      };
    });

    logAuditEvent({
      action: "Patient Linked",
      category: "Patient Management",
      details: `Linked Patient ID ${patientId} to Doctor User ID ${doctorUserId}`,
      user: currentUser
    });
  };

  // Update Patient Record (Diagnosis, Medication, Visit, Lab, Note)
  const updatePatientRecord = (patientId, updatePayload, currentUser) => {
    setPatients(prev => {
      const patient = prev[patientId];
      if (!patient) return prev;

      const updated = {
        ...patient,
        ...updatePayload
      };

      if (updatePayload.newVisit) {
        updated.timeline = [updatePayload.newVisit, ...(patient.timeline || [])];
      }

      if (updatePayload.newDiagnosis) {
        updated.conditions = [updatePayload.newDiagnosis, ...(patient.conditions || [])];
        updated.primaryDiagnosis = updatePayload.newDiagnosis;
      }

      if (updatePayload.newMedication) {
        updated.medications = [updatePayload.newMedication, ...(patient.medications || [])];
      }

      if (updatePayload.newLab) {
        updated.diseaseSpecificLabs = [updatePayload.newLab, ...(patient.diseaseSpecificLabs || [])];
      }

      logAuditEvent({
        action: "Patient Record Updated",
        category: "Clinical Data Update",
        details: `Updated medical record for Patient ID ${patientId}`,
        user: currentUser
      });

      return {
        ...prev,
        [patientId]: updated
      };
    });
  };

  // Add Document / Report to Patient PHR
  const addDocumentToPHR = (patientId, documentData, currentUser) => {
    setPatients(prev => {
      const patient = prev[patientId];
      if (!patient) return prev;

      const newTimelineItem = {
        date: documentData.date || new Date().toISOString().split('T')[0],
        type: documentData.category || "Laboratory",
        title: documentData.title,
        description: documentData.notes || documentData.diagnosis || "Medical document uploaded to longitudinal record.",
        location: documentData.hospitalName || "General Clinic",
        doctorName: documentData.doctorName || "Attending Physician",
        fileUrl: documentData.fileUrl || null,
        fileType: documentData.fileType || "pdf"
      };

      const updatedTimeline = [newTimelineItem, ...(patient.timeline || [])];
      const updatedPatient = { ...patient, timeline: updatedTimeline };

      logAuditEvent({
        action: "PHR Document Uploaded",
        category: "Personal Health Record",
        details: `Uploaded ${documentData.category} document '${documentData.title}' for Patient ID ${patientId}`,
        user: currentUser
      });

      return {
        ...prev,
        [patientId]: updatedPatient
      };
    });
  };

  // Toggle Doctor Access
  const toggleDoctorAccess = (patientId, doctorUserId, currentUser) => {
    setPatientDoctorConnections(prev => {
      const currentDocs = prev[patientId] || [];
      const hasAccess = currentDocs.includes(doctorUserId);
      
      const updatedDocs = hasAccess 
        ? currentDocs.filter(id => id !== doctorUserId)
        : [...currentDocs, doctorUserId];

      logAuditEvent({
        action: hasAccess ? "Doctor Access Revoked" : "Doctor Access Granted",
        category: "Data Privacy Delegation",
        details: `${hasAccess ? 'Revoked' : 'Granted'} access for Doctor ID: ${doctorUserId} on Patient ID: ${patientId}`,
        user: currentUser
      });

      return {
        ...prev,
        [patientId]: updatedDocs
      };
    });
  };

  // Add Hospital
  const addHospital = (hospitalData, currentUser) => {
    const newHosp = {
      id: `HOSP_${Date.now()}`,
      status: "Active",
      ...hospitalData
    };

    setHospitals(prev => [newHosp, ...prev]);

    logAuditEvent({
      action: "Hospital Onboarded",
      category: "System Settings",
      details: `Onboarded Hospital: ${hospitalData.name}`,
      user: currentUser
    });
  };

  return (
    <HealthRecordContext.Provider
      value={{
        hospitals,
        departments,
        appointments,
        notifications,
        patientDoctorConnections,
        patients,
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        addPatient,
        linkPatientToDoctor,
        updatePatientRecord,
        addDocumentToPHR,
        toggleDoctorAccess,
        addHospital
      }}
    >
      {children}
    </HealthRecordContext.Provider>
  );
};

export const useHealthRecord = () => useContext(HealthRecordContext);

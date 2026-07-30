// Dedicated Appointments Domain Data Model

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-88210",
    patientId: "VIT001",
    patientName: "Arun Kumar",
    patientEmail: "arun.kumar@healthmail.com",
    doctorId: "USER_DOC_1",
    doctorName: "Dr. Aditi Sharma",
    doctorSpecialty: "Endocrinology",
    hospitalName: "Apollo Hospitals",
    department: "Endocrinology",
    date: "2026-08-05",
    time: "10:30 AM",
    consultationType: "Physical Consultation",
    status: "Confirmed",
    reason: "Routine Glycemic & Renal Follow-up",
    qrCode: "VITAIQ-APT-88210-VIT001-DOC1",
    createdAt: "2026-07-28"
  },
  {
    id: "APT-88211",
    patientId: "VIT001",
    patientName: "Arun Kumar",
    patientEmail: "arun.kumar@healthmail.com",
    doctorId: "USER_DOC_2",
    doctorName: "Dr. Rajesh Varma",
    doctorSpecialty: "Cardiology",
    hospitalName: "Fortis Healthcare",
    department: "Cardiology",
    date: "2026-08-12",
    time: "02:00 PM",
    consultationType: "Video Consultation",
    status: "Pending",
    reason: "Hypertension and Lipid Management Review",
    qrCode: "VITAIQ-APT-88211-VIT001-DOC2",
    createdAt: "2026-07-28"
  },
  {
    id: "APT-88212",
    patientId: "VIT007",
    patientName: "Ananya Sen",
    patientEmail: "ananya.sen@healthmail.com",
    doctorId: "USER_DOC_3",
    doctorName: "Dr. Kavita Reddy",
    doctorSpecialty: "Obstetrics & Gynecology",
    hospitalName: "Manipal Hospital",
    department: "Obstetrics & Gynecology",
    date: "2026-08-15",
    time: "11:00 AM",
    consultationType: "Physical Consultation",
    status: "Confirmed",
    reason: "16-Week Gestation Anomaly Scan Review",
    qrCode: "VITAIQ-APT-88212-VIT007-DOC3",
    createdAt: "2026-07-28"
  }
];

// Dedicated Notifications Domain Data Model

export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF_1",
    userId: "USER_PAT_1",
    title: "Appointment Confirmed",
    message: "Your Physical Consultation with Dr. Aditi Sharma at Apollo Hospitals is confirmed for Aug 05, 2026 at 10:30 AM.",
    timestamp: "10 mins ago",
    read: false,
    type: "appointment"
  },
  {
    id: "NOTIF_2",
    userId: "USER_DOC_1",
    title: "New Patient Appointment Request",
    message: "Arun Kumar booked a physical consultation for Aug 05, 2026.",
    timestamp: "1 hour ago",
    read: false,
    type: "appointment"
  },
  {
    id: "NOTIF_3",
    userId: "USER_PAT_2",
    title: "Pregnancy Antenatal Reminder",
    message: "Your 16-Week Fetal Ultrasound Anomaly Scan review with Dr. Kavita Reddy is scheduled for Aug 15, 2026.",
    timestamp: "2 hours ago",
    read: false,
    type: "appointment"
  }
];

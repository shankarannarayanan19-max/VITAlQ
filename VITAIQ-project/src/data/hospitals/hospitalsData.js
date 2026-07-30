// Dedicated Hospitals Domain Data Model

export const INITIAL_HOSPITALS = [
  { id: "HOSP001", name: "Apollo Hospitals", city: "Chennai", state: "Tamil Nadu", status: "Active", departments: ["Cardiology", "Endocrinology", "Nephrology", "General Medicine"] },
  { id: "HOSP002", name: "Fortis Healthcare", city: "Bengaluru", state: "Karnataka", status: "Active", departments: ["Pulmonology", "Orthopedics", "Cardiology", "Neurology"] },
  { id: "HOSP003", name: "Manipal Hospital", city: "Hyderabad", state: "Telangana", status: "Active", departments: ["Obstetrics & Gynecology", "Endocrinology", "Gastroenterology", "Pediatrics"] },
  { id: "HOSP004", name: "Government General Hospital", city: "New Delhi", state: "Delhi", status: "Active", departments: ["General Medicine", "Emergency", "Pulmonology"] }
];

export const INITIAL_DEPARTMENTS = [
  "Obstetrics & Gynecology",
  "Endocrinology",
  "Cardiology",
  "Nephrology",
  "Pulmonology",
  "Neurology",
  "Orthopedics",
  "General Medicine",
  "Gastroenterology",
  "Pediatrics"
];

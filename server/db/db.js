import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  SEED_PATIENTS,
  SEED_USERS,
  SEED_HOSPITALS,
  SEED_DEPARTMENTS,
  SEED_APPOINTMENTS,
  SEED_NOTIFICATIONS,
  SEED_CONNECTIONS,
  SEED_AUDIT_LOGS
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../data/db.json');

// Ensure database directory exists
const dbDir = path.join(__dirname, '../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initial Database Structure
const initialDb = {
  users: SEED_USERS,
  patients: SEED_PATIENTS,
  hospitals: SEED_HOSPITALS,
  departments: SEED_DEPARTMENTS,
  appointments: SEED_APPOINTMENTS,
  notifications: SEED_NOTIFICATIONS,
  connections: SEED_CONNECTIONS,
  auditLogs: SEED_AUDIT_LOGS,
  otps: {}
};

class JSONDatabase {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error('Failed to read db.json, reinitializing with seed data:', err);
    }
    // Save initial dataset if file not existing or corrupted
    this.saveData(initialDb);
    return initialDb;
  }

  // Hash any plaintext passwords still stored (idempotent — bcrypt hashes start with '$2')
  async migratePlaintextPasswords() {
    let changed = false;
    for (const user of this.data.users) {
      if (user.passwordHash && !user.passwordHash.startsWith('$2')) {
        user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
        changed = true;
      }
    }
    if (changed) {
      this.save();
      console.log('[DB] Migrated plaintext passwords to bcrypt hashes.');
    }
  }

  saveData(dataToSave) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to db.json:', err);
    }
  }

  save() {
    this.saveData(this.data);
  }

  // --- Users Operations ---
  getUsers() {
    return this.data.users || [];
  }

  getUserById(id) {
    return this.getUsers().find(u => u.id === id);
  }

  getUserByQuery(queryStr) {
    if (!queryStr) return null;
    const query = queryStr.toLowerCase().trim();
    return this.getUsers().find(u =>
      (u.username && u.username.toLowerCase() === query) ||
      (u.email && u.email.toLowerCase() === query)
    );
  }

  addUser(userObj) {
    this.data.users.push(userObj);
    this.save();
    return userObj;
  }

  updateUser(id, updates) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updates };
      this.save();
      return this.data.users[idx];
    }
    return null;
  }

  // --- Patients Operations ---
  getPatients() {
    return this.data.patients || {};
  }

  getPatientById(patientId) {
    if (!patientId) return null;
    const key = patientId.toUpperCase().trim();
    return this.data.patients[key] || null;
  }

  upsertPatient(patientObj) {
    if (!patientObj || !patientObj.id) return null;
    const key = patientObj.id.toUpperCase().trim();
    this.data.patients[key] = {
      ...this.data.patients[key],
      ...patientObj
    };
    this.save();
    return this.data.patients[key];
  }

  // --- Appointments Operations ---
  getAppointments() {
    return this.data.appointments || [];
  }

  addAppointment(apt) {
    this.data.appointments.unshift(apt);
    this.save();
    return apt;
  }

  updateAppointmentStatus(id, status) {
    const idx = this.data.appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      this.data.appointments[idx].status = status;
      this.save();
      return this.data.appointments[idx];
    }
    return null;
  }

  // --- Hospitals & Departments ---
  getHospitals() {
    return this.data.hospitals || [];
  }

  getDepartments() {
    return this.data.departments || [];
  }

  // --- Notifications Operations ---
  getNotifications(userId) {
    const all = this.data.notifications || [];
    if (!userId) return all;
    return all.filter(n => n.userId === userId);
  }

  addNotification(notif) {
    this.data.notifications.unshift(notif);
    this.save();
    return notif;
  }

  markNotificationAsRead(id) {
    const notif = (this.data.notifications || []).find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.save();
    }
    return notif;
  }

  // --- Doctor Patient Connections ---
  getConnections() {
    return this.data.connections || {};
  }

  addConnection(patientId, doctorId) {
    const key = patientId.toUpperCase();
    if (!this.data.connections[key]) {
      this.data.connections[key] = [];
    }
    if (!this.data.connections[key].includes(doctorId)) {
      this.data.connections[key].push(doctorId);
      this.save();
    }
    return this.data.connections[key];
  }

  // --- Audit Logs Operations ---
  getAuditLogs() {
    return this.data.auditLogs || [];
  }

  addAuditLog(logEntry) {
    this.data.auditLogs.unshift(logEntry);
    // Keep max 200 logs
    if (this.data.auditLogs.length > 200) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 200);
    }
    this.save();
    return logEntry;
  }

  // --- OTP Store Operations ---
  storeOtp(email, code, expiresAt) {
    const key = email.toLowerCase().trim();
    this.data.otps[key] = { code, expiresAt, createdAt: Date.now() };
    this.save();
  }

  verifyOtp(email, code) {
    const key = email.toLowerCase().trim();
    const stored = this.data.otps[key];
    if (!stored) return false;
    if (Date.now() > stored.expiresAt) {
      delete this.data.otps[key];
      this.save();
      return false;
    }
    if (stored.code === code) {
      delete this.data.otps[key];
      this.save();
      return true;
    }
    return false;
  }

  invalidateOtp(email) {
    const key = email.toLowerCase().trim();
    if (this.data.otps[key]) {
      delete this.data.otps[key];
      this.save();
    }
  }
}

export const db = new JSONDatabase();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { db } from '../db/db.js';

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ success: false, message: 'Username/Email and Password are required.' });
    }

    const user = db.getUserByQuery(usernameOrEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found. Please check your credentials or register.' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ success: false, message: 'This account has been suspended by the Hospital Administrator.' });
    }

    // Verify password with bcrypt (falls back to plain-text equality for legacy seeds)
    const isPasswordValid = user.passwordHash
      ? (await bcrypt.compare(password, user.passwordHash).catch(() => false)) || user.passwordHash === password
      : false;
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please verify credentials.' });
    }

    // Generate JWT token valid for 24h
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    const sessionToken = {
      token,
      userId: user.id,
      user,
      role: user.role,
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    // Log security audit event
    db.addAuditLog({
      id: `LOG_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'User Authentication',
      category: 'Security',
      details: `Successful REST API login for user @${user.username} (${user.role})`,
      ipAddress: req.ip || '127.0.0.1'
    });

    return res.json({
      success: true,
      message: 'Login successful',
      session: sessionToken,
      user
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
};

export const registerDoctor = async (req, res) => {
  try {
    const doctorDetails = req.body;
    const { username, email, nmcNumber } = doctorDetails;

    if (!username || !email || !nmcNumber) {
      return res.status(400).json({ success: false, message: 'Required fields missing: username, email, NMC registration number.' });
    }

    const existing = db.getUserByQuery(username) || db.getUserByQuery(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username or Email is already registered.' });
    }

    const newDocId = `USER_DOC_${Date.now()}`;
    const hashedPassword = await bcrypt.hash(doctorDetails.password || 'VitaIQ@2026', 12);
    const newDoctor = {
      id: newDocId,
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      role: 'doctor',
      passwordHash: hashedPassword,
      name: doctorDetails.name || `Dr. ${username}`,
      avatar: doctorDetails.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      nmcNumber: doctorDetails.nmcNumber,
      specialty: doctorDetails.specialty || 'General Medicine',
      qualification: doctorDetails.qualification || 'MBBS',
      experience: Number(doctorDetails.experience) || 1,
      hospitalName: doctorDetails.hospitalName || 'Apollo Hospitals',
      department: doctorDetails.department || 'General Medicine',
      designation: doctorDetails.designation || 'Consultant',
      city: doctorDetails.city || 'Chennai',
      state: doctorDetails.state || 'Tamil Nadu',
      hospitalAddress: doctorDetails.hospitalAddress || 'Main Street, City',
      consultationType: doctorDetails.consultationType || 'Both Physical & Video',
      languages: doctorDetails.languages || ['English'],
      bio: doctorDetails.bio || 'Medical Practitioner',
      consultationHours: doctorDetails.consultationHours || 'Mon-Fri: 09:00 AM - 05:00 PM',
      verificationStatus: 'Pending Verification',
      verified: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    db.addUser(newDoctor);

    // Notify Admin
    db.addNotification({
      id: `NOTIF_${Date.now()}`,
      userId: 'USER_ADMIN',
      title: 'New Doctor Verification Pending',
      message: `${newDoctor.name} (${newDoctor.nmcNumber}) submitted credentials for admin review.`,
      timestamp: 'Just now',
      read: false,
      type: 'registration'
    });

    const token = jwt.sign(
      { userId: newDoctor.id, username: newDoctor.username, role: newDoctor.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    const sessionToken = {
      token,
      userId: newDoctor.id,
      user: newDoctor,
      role: 'doctor',
      username: newDoctor.username,
      email: newDoctor.email,
      name: newDoctor.name,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    return res.status(201).json({
      success: true,
      message: 'Doctor account created successfully.',
      session: sessionToken,
      user: newDoctor
    });
  } catch (err) {
    console.error('Doctor Registration Error:', err);
    return res.status(500).json({ success: false, message: 'Server error registering doctor account.' });
  }
};

export const registerPatient = async (req, res) => {
  try {
    const patientDetails = req.body;
    const { username, email } = patientDetails;

    if (!username || !email) {
      return res.status(400).json({ success: false, message: 'Username and Email are required.' });
    }

    const existing = db.getUserByQuery(username) || db.getUserByQuery(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username or Email is already registered.' });
    }

    const newPatId = `VIT00${Math.floor(10 + Math.random() * 90)}`;
    const newUserId = `USER_PAT_${Date.now()}`;
    const hashedPassword = await bcrypt.hash(patientDetails.password || 'VitaIQ@2026', 12);

    const newPatientRecord = {
      id: newPatId,
      name: patientDetails.name || username,
      age: Number(patientDetails.age) || 30,
      gender: patientDetails.gender || 'Male',
      bloodGroup: patientDetails.bloodGroup || 'O+',
      dob: patientDetails.dob || '1995-01-01',
      emergencyContact: patientDetails.emergencyContact || 'Family Member',
      address: patientDetails.address || 'Chennai, India',
      insuranceProvider: patientDetails.insuranceProvider || 'Self Pay',
      wristbandId: `WB-${Math.floor(10000 + Math.random() * 90000)}-${newPatId}`,
      riskLevel: 'Low',
      riskScore: 15,
      conditions: patientDetails.conditions || [],
      allergies: patientDetails.allergies || [],
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: '75 bpm',
        spO2: '98%',
        temperature: '98.6 °F',
        bmi: '22.5 kg/m²',
        bloodGlucose: '95 mg/dL'
      },
      medications: [],
      labTrends: {
        dates: [new Date().toISOString().split('T')[0]],
        hba1c: [5.4],
        egfr: [100],
        creatinine: [0.8],
        systolicBP: [120],
        diastolicBP: [80],
        ldl: [90]
      },
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          type: 'Registration',
          title: 'Digital Patient Twin Created',
          description: 'Baseline digital twin record initialized on the VITAIQ platform.',
          location: 'VITAIQ Network',
          doctorName: 'VITAIQ System'
        }
      ],
      alerts: [
        { type: 'Info', title: 'Account Initialized', message: 'Digital Twin Record created successfully.', severity: 'low' }
      ],
      clinicalSummary: `${patientDetails.name || username} registered on the VITAIQ Digital Patient Twin platform.`
    };

    db.upsertPatient(newPatientRecord);

    const newUser = {
      id: newUserId,
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashedPassword,
      role: 'patient',
      name: patientDetails.name || username,
      patientId: newPatId,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      dob: patientDetails.dob || '1995-01-01',
      gender: patientDetails.gender || 'Male',
      bloodGroup: patientDetails.bloodGroup || 'O+',
      phone: patientDetails.phone || '',
      emergencyContact: patientDetails.emergencyContact || '',
      address: patientDetails.address || '',
      insuranceProvider: patientDetails.insuranceProvider || '',
      verified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    db.addUser(newUser);

    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username, role: newUser.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    const sessionToken = {
      token,
      userId: newUser.id,
      user: newUser,
      role: 'patient',
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    return res.status(201).json({
      success: true,
      message: 'Patient account created successfully.',
      session: sessionToken,
      user: newUser
    });
  } catch (err) {
    console.error('Patient Registration Error:', err);
    return res.status(500).json({ success: false, message: 'Server error registering patient account.' });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

    db.storeOtp(email, code, expiresAt);

    console.log(`[AUTH OTP SERVICE] Generated OTP for ${email}: ${code}`);

    return res.json({
      success: true,
      message: `Verification code sent to ${email}`
    });
  } catch (err) {
    console.error('Send OTP error:', err);
    return res.status(500).json({ success: false, message: 'Failed to dispatch verification OTP.' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP code are required.' });
    }

    const isValid = db.verifyOtp(email, otp);
    if (isValid) {
      return res.json({ success: true, message: 'Email address verified successfully.' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification OTP code.' });
    }
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process verification code.' });
  }
};

export const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
};

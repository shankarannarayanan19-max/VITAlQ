import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { db } from './db/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server
  'http://localhost:4173',  // Vite preview
  process.env.FRONTEND_URL  // production URL from env
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin '${origin}' not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'VITAIQ Digital Patient Twin Backend Engine',
    timestamp: new Date().toISOString(),
    patientsCount: Object.keys(db.getPatients()).length,
    usersCount: db.getUsers().length
  });
});

// Mount Domain API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', hospitalRoutes); // mounts /api/hospitals & /api/departments
app.use('/api/notifications', notificationRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/ai', aiRoutes);

// Global 404 Handler for API
app.use((req, res) => {
  res.status(404).json({ success: false, message: `API Endpoint '${req.url}' not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start Express Server
app.listen(config.port, async () => {
  // Migrate any leftover plaintext passwords to bcrypt hashes on first boot
  await db.migratePlaintextPasswords();
  console.log(`=======================================================`);
  console.log(`🚀 VITAIQ Enterprise REST API Server is running!`);
  console.log(`🌐 Server URL: http://localhost:${config.port}`);
  console.log(`🏥 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`=======================================================`);
});

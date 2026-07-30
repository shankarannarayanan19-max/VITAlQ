import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env in root
dotenv.config({ path: path.join(__dirname, '../.env') });

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'vitaiq_enterprise_jwt_secret_key_2026',
  resendApiKey: process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY || '',
  senderEmail: process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev',
  environment: process.env.NODE_ENV || 'development'
};

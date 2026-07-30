// Reusable Enterprise OTP Service Engine
import { sendOTPEmail } from './emailService';

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_ATTEMPTS = 3;

/**
 * Generate a random 6-digit numeric OTP
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Invalidate / Delete OTP immediately for a given email
 */
export const invalidateOTP = (email) => {
  if (!email) return;
  const key = `vitaiq_otp_${email.trim().toLowerCase()}`;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.removeItem(key);
  }
};

/**
 * Generate a new OTP and send it via email using Resend SDK
 * Enforces 60-second cooldown and 5-minute expiry
 * Never exposes the generated OTP in return values or UI
 */
export const sendOTP = async (userEmail) => {
  if (!userEmail || typeof userEmail !== 'string') {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const email = userEmail.trim().toLowerCase();
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Invalid email address format. Please enter a valid email address.' };
  }

  // Retrieve existing record to check 60-second cooldown
  const storageKey = `vitaiq_otp_${email}`;
  let stored = null;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      try { stored = JSON.parse(raw); } catch (e) { stored = null; }
    }
  }

  if (stored && stored.lastSentAt) {
    const elapsed = Date.now() - stored.lastSentAt;
    if (elapsed < RESEND_COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000);
      return { 
        success: false, 
        message: `Resend cooldown active. Please wait ${remainingSeconds} seconds before requesting a new OTP.` 
      };
    }
  }

  // Always generate a fresh random 6-digit numeric OTP
  const code = generateOTP();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  const otpRecord = {
    email,
    code,
    expiresAt,
    attempts: 0,
    lastSentAt: Date.now()
  };

  // Save OTP record
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.setItem(storageKey, JSON.stringify(otpRecord));
  }

  // Send OTP strictly through Email using Resend
  const emailRes = await sendOTPEmail(email, code);

  if (!emailRes.success) {
    return {
      success: false,
      message: emailRes.error || 'Failed to dispatch verification email. Please try again.'
    };
  }

  return {
    success: true,
    message: `A 6-digit verification OTP code has been sent to ${email}. Please check your inbox.`
  };
};

/**
 * Verify input OTP code against stored record
 * Handles expired OTP, maximum attempts limit, wrong OTP, and immediate deletion upon success
 */
export const verifyOTP = (userEmail, inputOtp) => {
  if (!userEmail || typeof userEmail !== 'string') {
    return { success: false, message: 'Invalid email address.' };
  }
  if (!inputOtp || typeof inputOtp !== 'string' || inputOtp.trim().length !== 6) {
    return { success: false, message: 'Please enter a valid 6-digit OTP code.' };
  }

  const email = userEmail.trim().toLowerCase();
  const codeInput = inputOtp.trim();
  const storageKey = `vitaiq_otp_${email}`;

  let stored = null;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const raw = sessionStorage.getItem(storageKey);
    if (raw) {
      try { stored = JSON.parse(raw); } catch (e) { stored = null; }
    }
  }

  if (!stored) {
    return { 
      success: false, 
      message: 'No active OTP request found for this email address. Please click "Send OTP" to request a new code.' 
    };
  }

  // Check 5-minute expiration
  if (Date.now() > stored.expiresAt) {
    invalidateOTP(email);
    return { 
      success: false, 
      message: 'Verification OTP code has expired (5-minute limit). Please request a new code.' 
    };
  }

  // Check maximum verification attempts limit (3 attempts)
  if (stored.attempts >= MAX_ATTEMPTS) {
    invalidateOTP(email);
    return { 
      success: false, 
      message: 'Maximum verification attempts (3) exceeded. OTP has been invalidated. Please request a new code.' 
    };
  }

  // Verify OTP code
  if (codeInput === stored.code) {
    // Delete OTP immediately after successful verification
    invalidateOTP(email);
    return { 
      success: true, 
      message: 'Email address verified successfully!' 
    };
  } else {
    // Increment failed attempt counter
    stored.attempts += 1;
    
    if (stored.attempts >= MAX_ATTEMPTS) {
      invalidateOTP(email);
      return { 
        success: false, 
        message: 'Invalid OTP code. Maximum verification attempts (3) exceeded. Please request a new code.' 
      };
    }

    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(storageKey, JSON.stringify(stored));
    }

    const remaining = MAX_ATTEMPTS - stored.attempts;
    return { 
      success: false, 
      message: `Invalid OTP code. You have ${remaining} attempt(s) remaining before lock.` 
    };
  }
};

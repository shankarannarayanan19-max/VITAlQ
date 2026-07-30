// Enterprise Email Service Engine using Official Resend Node SDK / Server Route
import { Resend } from 'resend';

// Configure Resend API Key securely from environment variables
const getResendClient = () => {
  const apiKey = (typeof process !== 'undefined' && process.env?.RESEND_API_KEY) || 
                 (import.meta.env && import.meta.env.VITE_RESEND_API_KEY) || 
                 (import.meta.env && import.meta.env.RESEND_API_KEY);

  if (!apiKey || apiKey.includes('YOUR_') || apiKey.includes('example')) {
    return null;
  }
  return new Resend(apiKey);
};

// Sender Email Configuration
// Defaulting to Resend's testing sender 'onboarding@resend.dev' for development phase
// When custom domain is verified in Resend, update env variable or change to 'noreply@vitalq.com'
export const SENDER_EMAIL = (typeof process !== 'undefined' && process.env?.RESEND_SENDER_EMAIL) ||
                             (import.meta.env && import.meta.env.VITE_SENDER_EMAIL) ||
                             'onboarding@resend.dev';

/**
 * Send email via server route /api/send-otp-email (Node.js environment)
 * to bypass browser CORS limitations when calling Resend API.
 */
export const sendEmail = async ({ to, subject, htmlText }) => {
  try {
    const response = await fetch('/api/send-otp-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, htmlText })
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error || 'Failed to dispatch email via Resend API.'
      };
    }

    return {
      success: true,
      messageId: data.messageId,
      provider: 'resend'
    };
  } catch (netErr) {
    // Fallback: Direct Resend SDK execution if server route is not active (e.g. standalone production preview)
    const resend = getResendClient();
    if (!resend) {
      return {
        success: false,
        error: 'RESEND_API_KEY environment variable is not configured. Please set RESEND_API_KEY in your .env file.'
      };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: SENDER_EMAIL,
        to: [to],
        subject: subject,
        html: htmlText
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Resend API dispatch error.'
        };
      }

      return {
        success: true,
        messageId: data?.id,
        provider: 'resend'
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Unable to communicate with Resend service.'
      };
    }
  }
};

/**
 * Send OTP Verification Email
 * HTML contains: VITAIQ title, 6-digit OTP, 5-minute expiry, Security Warning, Footer
 */
export const sendOTPEmail = async (userEmail, otpCode) => {
  const subject = "VITAIQ - Email Verification";
  
  const htmlText = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VITAIQ - Email Verification</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
      <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- VITAIQ Header -->
        <div style="background-color: #0f172a; padding: 28px 32px; text-align: center;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px;">VITAIQ</h1>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px; font-weight: 500;">Healthcare Clinical Support System</p>
        </div>

        <!-- Content -->
        <div style="padding: 32px;">
          <h2 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">Email Verification Code</h2>
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Please use the following 6-digit verification code to complete your registration request for <strong>${userEmail}</strong>:
          </p>

          <!-- 6-Digit OTP Box -->
          <div style="background-color: #f0fdf4; border: 2px dashed #059669; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <span style="display: block; font-size: 12px; color: #166534; font-weight: bold; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">Verification OTP Code</span>
            <span style="font-size: 36px; font-weight: 800; color: #065f46; letter-spacing: 8px; font-family: monospace;">${otpCode}</span>
          </div>

          <!-- OTP Expiry Notice -->
          <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 6px 6px 0;">
            <p style="color: #334155; font-size: 14px; margin: 0; font-weight: 600;">
              ⏱️ This code is valid for <strong>5 minutes</strong>. Maximum 3 verification attempts allowed.
            </p>
          </div>

          <!-- Security Warning -->
          <div style="background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 12px 16px; margin-bottom: 28px;">
            <p style="color: #9f1239; font-size: 13px; margin: 0; line-height: 1.5;">
              <strong>Security Warning:</strong> Never share this verification code with anyone. VITAIQ healthcare personnel will never ask for your verification code.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

          <!-- Mandatory Footer -->
          <p style="color: #64748b; font-size: 13px; margin: 0; text-align: center; line-height: 1.5;">
            If you did not request this verification, please ignore this email.
          </p>
        </div>

        <!-- Footer Bar -->
        <div style="background-color: #f1f5f9; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            &copy; ${new Date().getFullYear()} VITAIQ Health System. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: userEmail, subject, htmlText });
};

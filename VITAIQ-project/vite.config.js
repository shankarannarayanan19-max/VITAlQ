import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { Resend } from 'resend';

function resendApiPlugin() {
  return {
    name: 'resend-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-otp-email', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        const env = loadEnv(server.config.mode || 'development', process.cwd(), '');
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { to, subject, htmlText } = JSON.parse(body);
            const apiKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
            const senderEmail = env.RESEND_SENDER_EMAIL || env.VITE_SENDER_EMAIL || process.env.RESEND_SENDER_EMAIL || process.env.VITE_SENDER_EMAIL || 'onboarding@resend.dev';

            if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_')) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'RESEND_API_KEY environment variable is not configured. Please set RESEND_API_KEY in your .env file.'
              }));
              return;
            }

            const resend = new Resend(apiKey.trim());
            const { data, error } = await resend.emails.send({
              from: senderEmail,
              to: [to],
              subject: subject,
              html: htmlText
            });

            if (error) {
              console.error('[Resend API Error]:', error);
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: error.message || 'Resend API error occurred.'
              }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              messageId: data?.id,
              provider: 'resend'
            }));
          } catch (err) {
            console.error('[Resend Server Exception]:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: false,
              error: err.message || 'Internal server error while dispatching email via Resend.'
            }));
          }
        });
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), resendApiPlugin()],
  server: {
    port: 3000,
    open: true
  }
});

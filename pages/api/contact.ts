import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import axios from 'axios';
import xss from 'xss';
import { rateLimit } from 'rate-limit-next';
import { logger } from '../../utils/logger';

// --- Environment Variables --- //
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || '0.5');
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const CONTACT_EMAIL_RECIPIENT = process.env.CONTACT_EMAIL_RECIPIENT;

// --- Rate Limiting Middleware --- //
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10), // Limit each IP to 5 requests per `window`
  message: 'Too many requests from this IP, please try again after a minute',
  statusCode: 429, // 429 Too Many Requests
  headers: true, // Send X-RateLimit-* headers
});

// --- Email Transporter Setup --- //
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // Use STARTTLS, so 'secure' is false for port 587
  requireTLS: true, // Enforce TLS
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  logger: process.env.NODE_ENV === 'development', // Enable nodemailer logs in dev
});

// Test email transporter connection
transporter.verify((error) => {
  if (error) {
    logger.error('Error connecting to email transporter:', error);
  } else {
    logger.info('Email transporter ready.');
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // Apply rate limiting
  await limiter(req, res, async () => {
    // Type check for body fields
    const { name, email, message, 'g-recaptcha-response': recaptchaToken } = req.body as {
      name?: string;
      email?: string;
      message?: string;
      'g-recaptcha-response'?: string;
    };

    // --- Input Validation --- //
    if (!name || !email || !message || !recaptchaToken) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }

    // --- reCAPTCHA Verification --- //
    if (!RECAPTCHA_SECRET_KEY) {
      logger.error('RECAPTCHA_SECRET_KEY is not configured.');
      return res.status(500).json({ success: false, error: 'Server configuration error (reCAPTCHA).' });
    }

    try {
      const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
      const recaptchaResponse = await axios.post(recaptchaVerifyUrl);
      const { success, score } = recaptchaResponse.data;

      if (!success || score < RECAPTCHA_SCORE_THRESHOLD) {
        logger.warn(`reCAPTCHA verification failed for ${email}. Score: ${score}, Success: ${success}`);
        return res.status(403).json({ success: false, error: 'reCAPTCHA verification failed. Please try again.' });
      }
    } catch (error) {
      logger.error('reCAPTCHA server error:', error);
      return res.status(500).json({ success: false, error: 'reCAPTCHA server verification failed.' });
    }

    // --- XSS Sanitization --- //
    const sanitizedName = xss(name);
    const sanitizedEmail = xss(email);
    const sanitizedMessage = xss(message);

    // --- Email Sending --- //
    if (!CONTACT_EMAIL_RECIPIENT) {
      logger.error('CONTACT_EMAIL_RECIPIENT is not configured.');
      return res.status(500).json({ success: false, error: 'Server configuration error (email recipient).' });
    }

    try {
      await transporter.sendMail({
        from: `${sanitizedName} <${sanitizedEmail}>`,
        to: CONTACT_EMAIL_RECIPIENT,
        subject: `New Contact Form Submission from ${sanitizedName}`,
        html: `
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>This email was sent from your portfolio contact form.</em></p>
        `,
        text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      });
      logger.info(`Email sent successfully from ${sanitizedEmail}`);
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      logger.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
    }
  });
}

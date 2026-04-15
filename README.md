# Your Name's Professional Portfolio

This is a modern, single-page portfolio website designed to showcase personal/professional profile, projects, skills, and contact information. It features smooth scrolling navigation, a responsive design, interactive UI elements, and a contact form with email integration.

## Architecture Overview

The application consists of a Next.js frontend, which also hosts the backend logic for the contact form via Next.js API Routes. It leverages external services for email delivery (via Nodemailer with SMTP) and spam protection (Google reCAPTCHA v3).

-   **Frontend:** Built with Next.js (React), styled with Tailwind CSS, and uses TypeScript for type safety.
-   **Backend (Contact Form API):** Implemented as a Next.js API Route (`/pages/api/contact.ts`). It handles form data validation, Google reCAPTCHA v3 server-side verification, XSS sanitization, and email sending via Nodemailer.
-   **Email Service:** Utilizes Nodemailer to send emails through a configured SMTP server (e.g., Gmail, SendGrid, Mailgun).
-   **Spam Protection:** Google reCAPTCHA v3 is integrated on both the client-side (for token generation) and server-side (for verification and scoring) to protect the contact form.
-   **Deployment:** Designed for seamless deployment on platforms like Vercel, which natively supports Next.js applications, including API routes as serverless functions.

## Features

-   **Responsive Design:** Optimized for various screen sizes (desktop, tablet, mobile).
-   **Smooth Scrolling Navigation:** Easy navigation between sections.
-   **Interactive UI:** Modern and engaging user interface elements.
-   **Dynamic Content Sections:** Hero, About, Skills, Projects, Experience, and Contact.
-   **Contact Form:** Securely handles submissions with server-side validation, reCAPTCHA, and email delivery.
-   **SEO Friendly:** Basic SEO optimization with Next.js `Head` component.
-   **Performance:** Fast loading times thanks to Next.js and static asset serving.

## Setup and Installation

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

### 2. Install Dependencies

This project uses `npm`.

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of the project based on the provided `.env.local` example. You will need to obtain API keys and configure email settings.

```ini
# .env.local

# Google reCAPTCHA v3
# 1. Go to https://www.google.com/recaptcha/admin
# 2. Register a new site (choose reCAPTCHA v3)
# 3. Add your domain (e.g., localhost, yourportfolio.com)
# 4. Copy the Site Key and Secret Key.
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_RECAPTCHA_SECRET_KEY
RECAPTCHA_SCORE_THRESHOLD=0.5 # A value between 0.0 (bot) and 1.0 (human). Adjust as needed.

# Email Service (Nodemailer with SMTP)
# Example for Gmail SMTP. For security, it's highly recommended to use an "App Password" for Gmail.
# 1. Go to your Google Account Security settings.
# 2. Enable 2-Step Verification.
# 3. Create an App Password for 'Mail' on 'Other (Custom name)'.
# 4. Use this generated password for EMAIL_PASS.
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587 # Common ports: 465 (SSL/TLS), 587 (STARTTLS)
EMAIL_USER=your_email@example.com # The email address that will send the contact form submissions.
EMAIL_PASS=your_email_app_password # Your email account's app password.
CONTACT_EMAIL_RECIPIENT=recipient_email@example.com # The email address where contact form submissions will be sent.

# API Rate Limiting (for /api/contact endpoint)
RATE_LIMIT_WINDOW_MS=60000 # Time window in milliseconds (e.g., 60000ms = 1 minute)
RATE_LIMIT_MAX_REQUESTS=5  # Max requests allowed from a single IP within the window

# Optional: Enable debug logging for client-side utilities
# NEXT_PUBLIC_DEBUG_LOGGING=true
```

**Important Security Note on `EMAIL_PASS`:** Never use your primary email account password directly. Always use an application-specific password (if your provider supports it) or a dedicated email account for sending transactional emails. For production, consider using a dedicated email service like SendGrid, Mailgun, or AWS SES, and configure Nodemailer with their API keys or SMTP settings.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
```

### 6. Start Production Server

```bash
npm run start
```

## Customization

-   **Content:** Edit the text, images, and data in `sections/*.tsx` and `public/images/` to personalize your portfolio.
-   **Styling:** Modify `tailwind.config.ts` for global theme changes or `styles/globals.css` for custom CSS. Tailwind CSS classes are used extensively for component styling.
-   **Components:** Create or modify components in `components/` to fit your design needs.
-   **Social Links:** Update `components/SocialLinks.tsx` with your actual social media profiles.
-   **Resume:** Replace `public/resume.pdf` with your own resume.
-   **SEO:** Adjust meta tags in `components/SEO.tsx` and `pages/index.tsx`.

## Security Considerations Addressed

-   **XSS Protection:** All user-submitted data in the contact form is sanitized using the `xss` library before being included in the email body, preventing Cross-Site Scripting vulnerabilities.
-   **API Rate Limiting:** The `/api/contact` endpoint is protected by rate limiting (`rate-limit-next`) to prevent abuse and denial-of-service attacks.
-   **reCAPTCHA v3:** Both client-side and server-side reCAPTCHA verification are implemented to protect against spam and bot submissions.
-   **Secure Email Transmission:** Nodemailer is configured to enforce TLS (`requireTLS: true`) for secure communication with the SMTP server on port 587.
-   **Environment Variables:** Sensitive information (API keys, email credentials) is stored in environment variables, not hardcoded in the application.

## Testing

This project currently does not include an automated test suite (unit, integration, or E2E tests). For a production-ready application, implementing comprehensive tests is crucial for maintaining code quality, ensuring reliability, and facilitating future development. Consider adding:

-   **Unit Tests:** For utility functions (`utils/validation.ts`, `utils/helpers.ts`) and individual React components.
-   **Integration Tests:** For the `/api/contact` endpoint to verify form submission, reCAPTCHA verification, and email sending logic.
-   **End-to-End Tests:** Using tools like Cypress or Playwright to simulate user interactions and verify the entire application flow.

## Deployment on Vercel

This Next.js application is ideal for deployment on Vercel.

1.  **Create a Vercel Account:** If you don't have one, sign up at [vercel.com](https://vercel.com).
2.  **Connect Git Repository:** Import your Git repository (GitHub, GitLab, Bitbucket) into Vercel.
3.  **Configure Environment Variables:** In your Vercel project settings, go to "Environment Variables" and add all the variables from your `.env.local` file (e.g., `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`, etc.). Ensure that `NEXT_PUBLIC_` prefixed variables are available to the client, and others are server-only.
4.  **Deploy:** Vercel will automatically detect that it's a Next.js project and deploy it. Subsequent pushes to your main branch will trigger automatic deployments.

## License

[Optional: Choose a license, e.g., MIT License]

---
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useEffect } from 'react';
import { logger } from '../utils/logger';

function MyApp({ Component, pageProps }: AppProps) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!recaptchaSiteKey) {
      logger.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined. reCAPTCHA will not function.');
    }
  }, [recaptchaSiteKey]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey || 'invalid-key'}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: 'recaptcha-nonce', // Recommended for CSP
      }}
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;

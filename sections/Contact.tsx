import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { validateContactForm } from '../utils/validation';
import { logger } from '../utils/logger';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage(null);
    setErrors({});

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      setMessage('Please correct the errors in the form.');
      return;
    }

    if (!executeRecaptcha) {
      logger.error('reCAPTCHA not loaded, unable to submit form.');
      setStatus('error');
      setMessage('reCAPTCHA is not ready. Please try again in a moment.');
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form_submit');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, 'g-recaptcha-response': token }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        logger.error('Contact form submission error:', data.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
      logger.error('Contact form submission failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-light text-center mb-12">
        Get In <span className="text-primary">Touch</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-xl">
        <Input
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          error={errors.name}
          required
        />
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          error={errors.email}
          required
        />
        <TextArea
          id="message"
          name="message"
          label="Message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          error={errors.message}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>

        {message && (
          <p className={`text-center font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">Privacy Policy</a> and
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">Terms of Service</a> apply.
        </p>
      </form>
    </div>
  );
};

export default Contact;

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Using Inter font
      },
      colors: {
        primary: '#6366F1', // Indigo 500
        secondary: '#8B5CF6', // Violet 500
        accent: '#EC4899', // Pink 500
        dark: '#1A202C', // Dark gray
        light: '#F7FAFC', // Light gray
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        pulseScale: 'pulseScale 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;

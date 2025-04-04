/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        // Dark theme specific colors
        dark: {
          bg: '#1a1b26',
          card: '#1f2937',
          text: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          green: {
            light: '#d1fae5',
            DEFAULT: '#10b981',
            dark: '#059669',
            deep: '#064e3b'
          },
          earth: {
            light: '#fef3c7',
            DEFAULT: '#d97706',
            dark: '#b45309',
            deep: '#78350f'
          },
          harvest: {
            light: '#fef08a',
            DEFAULT: '#f59e0b',
            dark: '#d97706'
          },
          bg: {
            light: '#f8faf5',
            dark: '#111827',
            darkSurface: '#1f2937'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

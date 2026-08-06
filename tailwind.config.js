/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:  { DEFAULT: '#07070C', 2: '#0C0C14' },
        iris: { DEFAULT: '#6366F1', soft: '#A5B4FC', deep: '#4338CA' },
      },
    },
  },
  plugins: [],
}

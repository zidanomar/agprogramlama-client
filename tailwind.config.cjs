/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7754b2',
        darkest: '#1b1d2e',
        dark: '#343142',
        textLight: '#eeeff6',
      },
    },
    fontFamily: {
      archivo: ['Archivo', 'sans-serif'],
    },
  },
  plugins: [],
};

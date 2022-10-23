/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        titillilum: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        conduit: {
          green: '#5CB85C',
        },
      },
      spacing: {
        navItem: '0.425rem',
      },
    },
  },
  plugins: [],
};

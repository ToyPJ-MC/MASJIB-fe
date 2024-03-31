/** @type {import('tailwindcss').Config} */
const defalutTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'public/index.html'],
  plugins: [require('tailwind-scrollbar-hide')],
  theme: {
    screens: {
      moblie: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  }
};

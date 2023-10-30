/** @type {import('tailwindcss').Config} */
const defalutTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'public/index.html'],
  plugins: [],
  theme: {
    extend: {}
  }
};

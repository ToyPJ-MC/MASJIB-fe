module.exports = {
  plugins: {
    tailwindcss: { config: './tailwind.config.js' },
    'postcss-import': {},
    autoprefixer: {},
    'tailwindcss/nesting': 'postcss-nesting'
  }
};

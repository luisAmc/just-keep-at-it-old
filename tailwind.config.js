let colors = require('tailwindcss/colors');

const brand = colors.amber;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        brand
      }
    }
  },
  plugins: []
};

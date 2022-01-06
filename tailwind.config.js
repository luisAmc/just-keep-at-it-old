let colors = require('tailwindcss/colors');

const brand = colors.amber;
const aerobic = colors.teal;
const strength = colors.pink;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        brand,
        aerobic,
        strength
      }
    }
  },
  plugins: []
};

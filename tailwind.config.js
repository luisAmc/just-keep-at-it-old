let colors = require('tailwindcss/colors');

const brand = colors.amber;

const aerobic = colors.teal;
const strength = colors.pink;

const arms = colors.cyan;
const chest = colors.blue;
const back = colors.emerald;
const legs = colors.red;
const shoulders = colors.yellow;

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,

        brand,

        aerobic,
        strength,

        arms,
        chest,
        back,
        legs,
        shoulders
      }
    }
  },
  plugins: []
};

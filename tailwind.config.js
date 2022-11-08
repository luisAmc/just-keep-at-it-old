/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

const brand = colors.teal;

const aerobic = colors.teal;
const strength = colors.pink;

const arms = colors.indigo;
const chest = colors.blue;
const back = colors.emerald;
const legs = colors.amber;
const shoulders = colors.orange;

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
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

/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

const brandColor = colors.blue;

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        brand: brandColor
      }
    }
  },
  plugins: []
};

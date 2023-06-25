const colors = require('tailwindcss/colors');

const brand = colors.teal;

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand
      }
    }
  },
  plugins: []
};

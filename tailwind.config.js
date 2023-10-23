const colors = require('tailwindcss/colors');

const brand = colors.teal;

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        dscreen: '100dvh'
      },
      colors: {
        brand

        // brand: {
        //   50: '#fbf6f5',
        //   100: '#f6ecea',
        //   200: '#f0dcd8',
        //   300: '#e4c3bd',
        //   400: '#d3a096',
        //   500: '#ba7264',
        //   600: '#aa6558',
        //   700: '#8e5347',
        //   800: '#77463d',
        //   900: '#643f38',
        //   950: '#351e1a'
        // }
      }
    }
  },
  plugins: []
};

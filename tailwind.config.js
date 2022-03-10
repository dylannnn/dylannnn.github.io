const config = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Open Sans', 'sans-serif'],
      },
      colors: {
        'blue': {
          '100': '#C4BEF8',
          '200': '#A299F4',
          '300': '#8075F0',
          '400': '#5F50EC',
          '500': '#3D2BE8',
          '600': '#2615C5',
          '700': '#1C1093',
          '800': '#130A60',
          '900': '#09052E'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
};

module.exports = config;

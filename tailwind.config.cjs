const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
        heading: ['Orbitron', ...defaultTheme.fontFamily.sans],
      },
    }
  },

  plugins: [forms]
};

module.exports = config;

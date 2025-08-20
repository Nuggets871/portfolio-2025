/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['cupcake','emerald','dracula','lofi','forest'],
  },
  plugins: [require('daisyui')],
};

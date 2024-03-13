/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#297AFF',
        'black-primary': '#172935',
        'grey-primary': '#17293599',
        'grey-secondary': '#17293566',
        'light-grey-primary': '#17293533',
        'yellow-primary': '#FEC400',
        'green-primary': '#6DDA8B',
        'red-primary': '#FF4A4A',
        'purple-primary': '#756bf6',
      },
    },
  },
  plugins: [],
};

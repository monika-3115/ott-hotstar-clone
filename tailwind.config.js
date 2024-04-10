/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'navBlue' : '#00003f',
       ' mainBlue' : '#000059'
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}


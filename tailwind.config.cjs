/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bebasNeue: ["'Bebas Neue', cursive"],
        openSans: ["'Open Sans', sans-serif"],
      },
    },
  },
  plugins: [],
};

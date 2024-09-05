/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#030728",
        "color-green": "#39bc90",
        "color-green-light": "#4eefb2",
        "color-pink": "#f12172",
        "color-yellow": "#ffef42",
        "color-blue": "#32b4ff",
        "bg-input": "#2d2d2d",
      },
    },
  },
  plugins: [],
};

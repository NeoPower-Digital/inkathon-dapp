/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  important: "#__next",
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};

module.exports = config;

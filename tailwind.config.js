/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js'],
  darkMode: "class",
  mode: "jit",
  theme: {
    extend: {
      colors: {
        bgprimary:"#OC1821",
        accent: "#fc4b08",
        dark: "#1e1e1e",
        secondary: "#111111",
        tertiary: "EAE0C8",
        grade: "#c30010"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};

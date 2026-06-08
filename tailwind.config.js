/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        agro: {
          cream: "#f5f0e8",
          "cream-dark": "#ede8dc",
          green: "#2d6a2d",
          "green-dark": "#1a3d1a",
          "green-light": "#e8f5e8",
          gold: "#8b6914",
          "gold-light": "#c9a84c",
          text: "#1a2e1a",
          "text-muted": "#7a8e6a",
        },
      },
    },
  },
  plugins: [],
};

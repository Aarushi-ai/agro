/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#faf6ef",
        card: "#ffffff",
        "card-hover": "#e8dfc8",
        "green-dark": "#1a3d08",
        "green-mid": "#2d5016",
        "green-light": "#3d6b1f",
        "green-pale": "#e8f0dc",
        gold: "#c49a1a",
        "gold-pale": "#fdf3d7",
        terracotta: "#8b6410",
        "terra-pale": "#e8dfc8",
        sky: "#4a5e2a",
        "sky-pale": "#f0ebe0",
        "text-primary": "#1c2e0f",
        "text-secondary": "#3d5220",
        muted: "#6b7c52",
        agro: {
          cream: "#faf6ef",
          "cream-dark": "#f0ebe0",
          tan: "#e8dfc8",
          olive: "#4a5e2a",
          forest: "#2d5016",
          "dark-green": "#1a3d08",
          gold: "#c49a1a",
          "gold-warm": "#8b6410",
          text: "#1c2e0f",
          "text-muted": "#6b7c52",
        },
      },
    },
  },
  plugins: [],
};

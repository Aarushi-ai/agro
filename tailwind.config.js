/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bg: "#faf8f4",
        card: "#ffffff",
        "card-hover": "#f0eee8",
        "green-dark": "#2d361e",
        "green-mid": "#4a5d23",
        "green-light": "#5a6f2e",
        "green-pale": "#e5e8d4",
        gold: "#4a5d23",
        "gold-pale": "#faf8f4",
        terracotta: "#4a5d23",
        "terra-pale": "#f5f3ee",
        sky: "#4a5d23",
        "sky-pale": "#f5f3ee",
        "text-primary": "#2d361e",
        "text-secondary": "#4a5d23",
        muted: "#6b7354",
        agro: {
          cream: "#faf8f4",
          "cream-dark": "#f5f3ee",
          tan: "#f0eee8",
          olive: "#4a5d23",
          forest: "#4a5d23",
          "dark-green": "#2d361e",
          gold: "#4a5d23",
          "gold-warm": "#3d4f1e",
          text: "#2d361e",
          "text-muted": "#6b7354",
        },
      },
    },
  },
  plugins: [],
};

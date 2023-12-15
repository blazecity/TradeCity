/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./*.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        base: "var(--base)",
        "dark-base": "var(--base-dark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)"
      },
      fontSize: {
        normal: "0.77rem"
      },
      fontFamily: {
        icon: ["Material Icons"]
      },
      colors: {
        dark: "var(--dark)",
        base: "var(--base)",
        "dark-base": "var(--base-dark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)"
      },
      boxShadow: {
        "light-b": "0 1px 1px 0 #25272CFF",
        "dark-b": "0 1px 1px 0 #1F2024FF",
        "dark-r": "1px 0px 1px 0 #1F2024FF"
      }
    },
  },
  plugins: [
      require("@tailwindcss/forms")({
        strategy: "class"
      })
  ],
}


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
        base: "var(--base)",
        "dark-base": "var(--base-dark)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)"
      }
    },
  },
  plugins: [
      require("@tailwindcss/forms")({
        strategy: "class"
      })
  ],
}


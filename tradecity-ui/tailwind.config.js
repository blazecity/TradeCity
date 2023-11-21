/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}"
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
        base: "0.8rem"
      },
      fontFamily: {
        icon: ["Material Icons"]
      }
    },
  },
  plugins: [],
}


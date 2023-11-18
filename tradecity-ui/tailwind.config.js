/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        base: "var(--base)",
        "dark-base": "var(--base-dark)"
      },
      fontSize: {
        base: "0.8rem"
      }
    },
  },
  plugins: [],
}


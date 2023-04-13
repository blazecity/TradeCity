/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      "backgroundColor": {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "tertiary": "var(--tertiary)",
        "dark": "var(--dark)"
      },
      "fontFamily": {
        "overpass": '"Overpass"'
      },
      "colors": {
        "gray": "var(--symbol-gray)"
      }
    },
  },
  plugins: [],
}


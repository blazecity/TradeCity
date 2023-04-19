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
        "background-main": "var(--background-main)",
        "dark": "var(--dark)",
        "blue": "var(--blue)"
      },
      "fontFamily": {
        "source": '"Source Sans Pro"'
      },
      "colors": {
        "gray": "var(--symbol-gray)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "tertiary": "var(--tertiary)",
        "dark": "var(--dark)",
        "blue": "var(--blue)",
        "dark-blue": "var(--dark-blue)"
      },
      "transitionProperty": {
        "width": "width",
        "height-width": "height, width"
      }
    },
  },
  plugins: [],
}


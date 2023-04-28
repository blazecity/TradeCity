/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      "fontFamily": {
        "source": '"Webly Sleek UI"'
      },
      "colors": {
        "symbol-gray": "var(--symbol-gray)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "tertiary": "var(--tertiary)",
        "dark": "var(--dark)",
        "tc-blue": "var(--blue)",
        "dark-blue": "var(--dark-blue)",
        "background-main": "var(--background-main)",
        "table-primary": "var(--table-primary)",
        "table-secondary": "var(--table-secondary)"
      },
      "transitionProperty": {
        "width": "width",
        "height-width": "height, width"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class"
    })
  ],
}


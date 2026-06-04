/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eefdf8",
          100: "#d5f8ed",
          500: "#14b88a",
          600: "#0d9672",
          700: "#0b795f",
          900: "#064e3f",
          950: "#022c24"
        },
        ink: {
          900: "#111827",
          700: "#374151",
          500: "#6b7280"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};

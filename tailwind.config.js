/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      colors: {
        black06: "var(--black06)",
        black03: "var(--black03)",
        black12: "var(--black12)",
        black15: "var(--black15)",
        black10: "var(--black10)",
        gray75: "var(--gray75)",
        gray60: "var(--gray60)",
        red45: "var(--red45)",
       },
      boxShadow: {
        '10': 'var(--shadow10)',
      },
    },
  },
  plugins: [],
}
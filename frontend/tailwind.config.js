/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitcount: ['"Bitcount Grid Double Ink"', 'sans-serif'],
        roboto: ['"Roboto Slab"', 'serif'],
        sharetech: ['"Share Tech"', 'sans-serif'],
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-slower": "spin 6s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}

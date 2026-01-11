/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D4D", // Vibrant, modern Red
        secondary: "#1F2937", // Soft dark gray for text
        accent: "#FACC15",
        "base-100": "#ffffff",
        "base-200": "#F3F4F6", // Light gray background
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Assuming we might add Inter later, or use system defaults cleanly
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"], // Allow both light and dark themes
  },
  darkMode: 'class', // Enable class-based dark mode
}

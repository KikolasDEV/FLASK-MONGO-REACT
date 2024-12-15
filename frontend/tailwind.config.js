/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Color principal
        secondary: "#CBD5E1",
        danger: "#E11D48",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5F7F',
        secondary: '#E74C3C',
        accent: '#3498DB',
        light: '#ECF0F1',
        dark: '#2C3E50',
        success: '#27AE60',
        warning: '#F39C12',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

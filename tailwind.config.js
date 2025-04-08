/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          primary: '#23344E',    // Replace with your logo's primary color
          secondary: '#E09510',  // Replace with your logo's secondary color
          accent: '#FFD700',     // Replace with your logo's accent color
          light: '#FFF3E0',      // A lighter shade of primary
          dark: '#1A1A1A',       // Dark color for text
        }
      }
    },
  },
  plugins: [],
} 
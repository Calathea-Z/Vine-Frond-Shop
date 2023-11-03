/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#caafa8",
      },
      placeholderColor: {
        'blue': '#0000ff',
        'white': '#ffffff',
      },
      screens: {
        xs: "450px",
      }
    },
  },
  variants: {
    extend: {
      placeholderColor: ['responsive', 'dark', 'focus', 'hover', 'active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
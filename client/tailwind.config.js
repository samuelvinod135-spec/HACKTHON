/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1A1A1A',
        darkSurface: '#222222',
        darkCard: '#2D2D2D',
        darkBorder: '#3D3D3D',
        charcoal: {
          canvas: '#1A1A1A',
          surface: '#222222',
          card: '#2D2D2D',
          border: '#3D3D3D',
        },
        primaryWhite: '#FFFFFF',
        secondaryGrey: '#A0A0A0',
      },
    },
  },
  plugins: [],
};


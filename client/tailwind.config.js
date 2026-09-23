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
        lavender: {
          DEFAULT: '#B673FF',
          50: '#FBF7FF',
          100: '#F4ECFF',
          200: '#E7D5FF',
          300: '#D4A5FF',
          400: '#C894FF',
          500: '#B673FF',
          600: '#9A4EFF',
          700: '#7E30E0',
          800: '#641CB8',
          900: '#4F1294',
        },
        primaryWhite: '#FFFFFF',
        secondaryGrey: '#A0A0A0',
      },
    },
  },
  plugins: [],
};


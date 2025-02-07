import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      colors: {
        black: '#000000',
        red: {
          400: '#F87171',
          500: '#EF4444',
          900: '#7F1D1D',
          950: '#450A0A'
        },
        zinc: {
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          700: '#3F3F46',
          950: '#09090B'
        },
        green: {
          200: '#A3F7DA',
          400: '#08C19A',
          700: '#007E68',
          800: '#026354',
          900: '#035146',
          950: '#002A25'
        },
        stone: {
          700: '#44403C',
          900: '#1C1917',
          950: '#0C0A09'
        },
        'error': {
          100: '#ef44440f',
          200: '#ef44441a'
        },
        'hover': {
          'btn-gray': '#1A1A1A',
          'btn-green': '#026354',
          'btn-menu_card': '#1D282A',
        },
        white: '#FFFFFF',
        gray: {
          100: '#E7E7E7',
          400: '#888888',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#454545',
          900: '#3D3D3D',
          950: '#161616'
        },
        'topico': {
          100: '#1A1A1A',
          200: '#141414'
        }
      },
      extend: {
        minHeight: {
          'view-without-fill': 'calc(100vh - 3rem)'
        },
        gridTemplateColumns: {
          'view-login': '2fr 3fr',
          'view-home': '241px 1fr 241px',
          'view-all': '241px 1fr'
        }
      }
  },

  plugins: [],
} satisfies Config;

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
          'error': '#ef44441a',
          500: '#EF4444'
        },
        green: {
          200: '#A3F7DA',
          400: '#08C19A',
          950: '#002A25'
        },
        stone: {
          700: '#44403C',
          950: '#0C0A09'
        },
        'hover': {
          'btn-gray': '#1A1A1A',
          'btn-green': '#026354',
          'btn-menu_card': '#1D282A',
        },
        white: '#FFFFFF',
        gray: {
          400: '888888',
        }
      },
      extend: {
        minHeight: {
          'view-without-fill': 'calc(100vh - 3rem)'
        },
        gridTemplateColumns: {
          'view-login': '2fr 3fr'
        }
      }
  },
  plugins: [],
} satisfies Config;

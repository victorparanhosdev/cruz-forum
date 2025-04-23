import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        black: '#000000',
        red: {
          '400': '#F87171',
          '500': '#EF4444',
          '600': '#DC2626',
          '900': '#7F1D1D',
          '950': '#450A0A',
        },
        zinc: {
          '300': '#D4D4D8',
          '400': '#A1A1AA',
          '500': '#71717A',
          '700': '#3F3F46',
          '950': '#09090B',
        },
        green: {
          '200': '#A3F7DA',
          '400': '#08C19A',
          '600': '#009D7F',
          '700': '#007E68',
          '800': '#026354',
          '900': '#035146',
          '950': '#002A25',
        },
        stone: {
          '700': '#44403C',
          '900': '#1C1917',
          '950': '#0C0A09',
        },
        error: {
          '100': '#ef44440f',
          '200': '#ef44441a',
        },
        hover: {
          'btn-gray': '#1A1A1A',
          'btn-green': '#026354',
          'btn-menu_card': '#1D282A',
        },
        white: '#FFFFFF',
        gray: {
          '100': '#E7E7E7',
          '400': '#888888',
          '600': '#5D5D5D',
          '700': '#4F4F4F',
          '800': '#454545',
          '900': '#3D3D3D',
          '950': '#161616',
        },
        topico: {
          '100': '#1A1A1A',
          '200': '#141414',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      minHeight: {
        'view-relevantes': 'calc(100dvh - 3rem)',
      },
      gridTemplateColumns: {
        'view-login': '2fr 3fr',
        'view-home': '1fr 257px',
        'view-all': '241px 1fr',
        'view-perfil': '96px 1fr',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        apple: '440px',
      },
    },
  },

  plugins: [animate],
} satisfies Config

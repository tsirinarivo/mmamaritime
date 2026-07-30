import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2A43',
          50: '#E8F1F8',
          100: '#C5D9EC',
          200: '#8AB3D4',
          300: '#4F8DBD',
          400: '#2B6A9A',
          500: '#0A2A43',
          600: '#082236',
          700: '#061A29',
          800: '#04111B',
          900: '#02090D',
        },
        gold: {
          DEFAULT: '#C9A24B',
          50: '#FAF4E6',
          100: '#F3E4C0',
          200: '#E9CB8A',
          300: '#DFB255',
          400: '#C9A24B',
          500: '#A88535',
          600: '#856829',
          700: '#634C1E',
          800: '#423212',
          900: '#211907',
        },
        teal: {
          DEFAULT: '#1CA5A5',
          50: '#E3F6F6',
          100: '#BAEBEB',
          200: '#7DD6D6',
          300: '#3FC0C0',
          400: '#1CA5A5',
          500: '#168484',
          600: '#116363',
          700: '#0D4949',
          800: '#083030',
          900: '#031818',
        },
        cream: {
          DEFAULT: '#F0E6CC',
          50: '#FDFAF3',
          100: '#F8F1DF',
          200: '#F0E6CC',
          300: '#E5D4A8',
          400: '#D9C183',
          500: '#CDAF5F',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'wave-slow': 'wave 12s ease-in-out infinite reverse',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0A2A43 0%, #0D3557 50%, #0A2A43 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A24B 0%, #DFB255 50%, #A88535 100%)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [typography],
}

export default config

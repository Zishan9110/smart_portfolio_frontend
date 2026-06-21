/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0A0A0F',
          surface: '#111118',
          elevated: '#16161F',
          border: '#23232E',
        },
        ink: {
          DEFAULT: '#F5F5F7',
          muted: '#94A3B8',
          faint: '#5B5F6B',
        },
        accent: {
          indigo: '#6366F1',
          violet: '#A855F7',
          cyan: '#22D3EE',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"General Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', '"General Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 20% 20%, rgba(99,102,241,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(168,85,247,0.2) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(34,211,238,0.15) 0px, transparent 50%)',
        'gradient-accent': 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradient: 'gradient 8s ease infinite',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

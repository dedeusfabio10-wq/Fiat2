/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        sacred: {
          gold: '#d4af37',
          sapphire: '#0d1424',
        },
        fiat: {
          dark: '#05080f',
          navy: '#0d1424',
          'card-blue': '#131c2e', 
          'card-green': '#0c2b1e', 
          gold: '#d4af37',
          text: '#e2e8f0',
          muted: '#64748b'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'snow-slow': 'fall 10s linear infinite',
        'snow-medium': 'fall 7s linear infinite',
        'snow-fast': 'fall 5s linear infinite',
        'rise-slow': 'rise 8s ease-in infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fall: {
          '0%': { transform: 'translateY(-20px) translateX(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) translateX(10px) rotate(360deg)', opacity: '0' },
        },
        rise: {
          '0%': { transform: 'translateY(110vh) scale(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
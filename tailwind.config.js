/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F9F2E1',
          light: '#FAF8F5',
          warm: '#F8F0DF',
          dark: '#EFE3CA',
        },
        burgundy: {
          DEFAULT: '#6B0D1D',
          dark: '#650B1B',
          deep: '#3D0710',
          night: '#27040A',
        },
        gold: {
          light: '#F3E4B2',
          DEFAULT: '#C6A15B',
          rich: '#DFBD79',
          dark: '#8C6F34',
        },
        royalbrown: '#33251E',
      },
      fontFamily: {
        vivaldi: ['Vivaldi', 'Great Vibes', 'cursive', 'serif'],
        vivre: ['"TAN VIVRE LIBRE"', 'Cormorant Garamond', 'serif'],
        patung: ['Patung', 'Cinzel', 'serif'],
        helvetica: ['"Helvetica World"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        arabic: ['"Scheherazade New"', 'Amiri', '"Traditional Arabic"', 'serif'],
      },
      maxWidth: {
        '116.5': '466px',
      },
      width: {
        '43.25': '173px',
      },
      animation: {
        'lantern-swing': 'lanternSwing 4s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        lanternSwing: {
          '0%': { transform: 'rotate(-4deg) translateY(0px)' },
          '100%': { transform: 'rotate(4deg) translateY(-4px)' },
        },
        floatSlow: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 4px rgba(198,161,91,0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 16px rgba(198,161,91,0.85))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}


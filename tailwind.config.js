/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', '"Cairo"', 'system-ui', '-apple-system', 'Segoe UI', 'Tahoma', 'sans-serif'],
        heading: ['"IBM Plex Sans Arabic"', '"Cairo"', 'sans-serif'],
      },
      colors: {
        mawthiq: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00B8D9', // Official Mawthiq Cyan
          600: '#0097b2',
          700: '#0B3B6D', // Official Mawthiq Blue
          800: '#082f57',
          900: '#05244C', // Official Mawthiq Navy
          950: '#031733',
        },
        slate: {
          850: '#0f172a',
          900: '#090f1d',
          950: '#050912',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        cyan: {
          400: '#22d3ee',
          500: '#00B8D9',
          600: '#0891b2',
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glow-primary': '0 0 50px -10px rgba(0, 184, 217, 0.25)',
        'glow-navy': '0 0 50px -10px rgba(11, 59, 109, 0.4)',
        'glow-gold': '0 0 40px -10px rgba(245, 158, 11, 0.25)',
      },
      backgroundImage: {
        'mawthiq-gradient': 'linear-gradient(135deg, #05244C 0%, #0B3B6D 50%, #00B8D9 100%)',
        'mawthiq-glow': 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0, 184, 217, 0.15), transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

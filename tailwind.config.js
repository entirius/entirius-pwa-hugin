/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Readex Pro', 'system-ui', 'sans-serif'],
      },
      colors: {
        basic: {
          100: '#0A0A0F',
          200: '#12141A',
          300: '#1A1C25',
          400: '#22242E',
          500: '#353843',
          600: '#484B57',
          700: '#6B6B7C',
          800: '#9A9CAA',
          900: '#C8CAD4',
          950: '#EBEDF2',
        },
        primary: {
          100: '#00ACC1',
          200: '#00889A',
          300: '#1A3F47',
        },
        secondary: {
          100: '#00E5FF',
          200: '#00B8CC',
          300: '#1A4A54',
        },
        tertiary: {
          100: '#0E7C86',
          200: '#0B636B',
          300: '#1A3136',
        },
        positive: {
          100: '#6AC17F',
          200: '#1E4437',
        },
        negative: {
          100: '#ED6C62',
          200: '#611B11',
        },
        informative: {
          100: '#82AFF9',
          200: '#1C3971',
        },
        notice: {
          100: '#FEF7E0',
          200: '#C6A239',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #00E5FF 0%, #00ACC1 25%, #455A64 60%, #546E7A 100%)',
        'primary-gradient-reversed': 'linear-gradient(135deg, #00E5FF 0%, #00ACC1 60%, #455A64 90%, #546E7A 100%)',
      },
    },
  },
  plugins: [],
}

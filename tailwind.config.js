/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0a',
          dark: '#1a1a1a',
          darker: '#0f0f0f',
          gold: '#d4af37',
          'gold-light': '#f4d03f',
          'gold-dark': '#b8941f',
        },
      },
    },
  },
  plugins: [],
};

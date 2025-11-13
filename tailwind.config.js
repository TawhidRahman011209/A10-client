/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgreen: '#d4f8d4',
        mint: '#bafcc6',
        darkgreen: '#2e8b57',
        limegreen: '#a3f7b5',
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #a8f0c6, #d4f8d4)',
      },
    },
  },
  plugins: [require('daisyui')],
}

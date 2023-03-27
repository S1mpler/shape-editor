/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'canvas-section': 'radial-gradient(black 1px, transparent 0)'
      }
    },
    plugins: []
  }
};

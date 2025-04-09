module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bumper': {
          'primary': '#FF733C',
          'secondary': '#414B6E',
          'accent': '#32BE50',
          'contrast': '#1B1B1B',
        }
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'universal-sans': ['UniversalSans-850', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
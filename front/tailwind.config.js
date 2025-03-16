/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir todos los archivos de tu proyecto
  ],
  /* '#1722FF' */ 
  theme: {
    extend: {
      colors: {
        'primary-domina': '#1722FF',
        'primary-domina-light': '#067cb7',
        'secondary-domina': '#FFD117',
        'secondary-domina-light': '#d7ca94',
      },
    },
  },
  plugins: [],
}


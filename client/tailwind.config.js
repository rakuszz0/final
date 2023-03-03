/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      container: {
        center: true
      }
    },
    extend: {
      colors: {
        'left-color': '#EC7AB7',
        'right-color': '#EC7A7A'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@headlessui/tailwindcss'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}

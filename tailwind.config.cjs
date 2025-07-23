/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        lightGray: '#999',
        softGray: '#666',
      },
      backgroundImage: {
        'blue-pink-gradient': 'linear-gradient(to right, #3b82f6, #ec4899)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

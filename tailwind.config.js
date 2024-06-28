/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#009cff',

          secondary: '#1f2937',

          accent: '#00bcff',

          neutral: '#181818',

          'base-100': '#f0feff',

          info: '#00d4ff',

          success: '#00b300',

          warning: '#be8a00',

          error: '#ff5090',
        },
      },
    ],
  },
};

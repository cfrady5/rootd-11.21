/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rootd: {
          pine: '#4c5937',
          'pine-dark': '#3a4528',
          cream: '#F7F3EB',
          charcoal: '#1F1F1F',
          moss: '#4c5937'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Space Grotesk', 'Inter', 'sans-serif']
      },
      boxShadow: {
        rootd: '0 24px 60px rgba(31,31,31,0.06)'
      },
      borderRadius: {
        xl: '28px'
      }
    }
  },
  plugins: []
};

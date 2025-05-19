/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        primary: '#3A6FC1',      // MindForge Blue
        secondary: '#4CAF50',    // MindForge Green
        accent: '#B1392A',       // MindForge Red
        title: '#1B1F3B',
        paragraph: '#555F6B',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

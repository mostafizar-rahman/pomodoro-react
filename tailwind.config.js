/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background':'var(--background)',
        'foreground':'var(--foreground)',
        'primary':'var(--primary)',
        'primary-foreground':'var(--foreground-foreground)',
        'secondary':'var(--secondary)',
        'button-color':'var(--button-color)',
      }
    },
  },
  plugins: [],
}


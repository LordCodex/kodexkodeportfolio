/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',
        secondary: '#1A1A1A',
        tertiary: '#0F0F0F',
        dark: '#0d0d0d',
        light: '#ededed',
        accent: '#065F46'
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

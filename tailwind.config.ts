import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        ink:   { 950: '#050505', 900: '#0A0A0A', 800: '#141414', 700: '#1B1B1B', 600: '#262626', 500: '#3A3A3A' },
        flame: { 50: '#FFF2EE', 100: '#FFE1D6', 300: '#FF9B7E', 400: '#FF6E4C', 500: '#EF4B36', 600: '#D6392A', 700: '#AD2C20', 800: '#7E2118' },
        mist:  { 300: '#D0D0D0', 400: '#A3A3A3', 500: '#737373' }
      }
    }
  },
  plugins: []
}

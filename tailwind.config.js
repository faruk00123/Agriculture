/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFF8EC',
        bg2: '#EAF6E8',
        bg3: '#F8F8FA',
        'bg-tint': '#FFFBF2',
        'bg-dark': '#062F28',
        'bg-dark2': '#083D32',
        panel: '#FFFFFF',
        ink: '#1F2937',
        'ink-soft': '#687280',
        border: '#E5E7EB',
        border2: '#D7E5DC',
        green700: '#083D32',
        green600: '#0B5D45',
        green500: '#168E5A',
        green300: '#3AAE7A',
        lime: '#D5F36A',
        mint: '#EAF6E8',
        sprout: '#E8FFB9',
        orange: '#FF9F1C',
        orange2: '#FF7A18',
        gold: '#FFF5D9',
        peach: '#FFF0E2',
        coral: '#FCE8E5',
        sky: '#E8F5FB',
        lavender: '#F2EAFE',
      },
      fontFamily: {
        siliguri: ['Hind Siliguri', 'system-ui', '-apple-system', 'Noto Sans Bengali', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'xs': '8px',
        'sm': '10px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'sm': '0 6px 20px rgba(6, 47, 40, .06)',
        'md': '0 12px 40px rgba(6, 47, 40, .08)',
        'lg': '0 20px 60px rgba(6, 47, 40, .1)',
      },
      maxWidth: {
        'max': '1180px',
      },
    },
  },
  plugins: [],
}

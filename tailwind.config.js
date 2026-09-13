/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--c-surface-rgb) / <alpha-value>)',
        raised: 'rgb(var(--c-raised-rgb) / <alpha-value>)',
        ink: 'rgb(var(--c-ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--c-muted-rgb) / <alpha-value>)',
        accent: 'rgb(var(--c-accent-rgb) / <alpha-value>)',
        ok: 'rgb(var(--c-ok-rgb) / <alpha-value>)',
        warn: 'rgb(var(--c-warn-rgb) / <alpha-value>)',
        line: 'var(--c-line)',
        'line-soft': 'var(--c-line-soft)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        ui: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', '"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '6px',
      },
      letterSpacing: {
        mega: '0.28em',
      },
      transitionTimingFunction: {
        glide: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        settle: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        lift: '0 18px 40px -18px rgba(18, 21, 26, 0.38)',
        pop: '0 26px 60px -22px rgba(18, 21, 26, 0.5)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        'cart-bump': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.22) rotate(-6deg)' },
          '55%': { transform: 'scale(0.94) rotate(4deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shake: 'shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'cart-bump': 'cart-bump 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}

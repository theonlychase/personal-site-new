import type { Config } from 'tailwindcss'

// @ts-expect-error - keyframes type
export default <Partial<Config>> {
  darkMode: 'class',
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/content/**/*.md',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/helpers/*.ts',
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s infinite',
        fadeIn: 'fadeIn .5s',
        fadeLeft: 'fadeLeft .5s',
      },
      colors: {
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
      },
      keyframes: {
        blink: {
          '0%': {
            borderColor: 'transparent',
          },
          '45%': {
            borderColor: 'transparent',
          },
          '50%': {
            borderColor: '#9CA3AF',
          },
          '100%': {
            borderColor: '#9CA3AF',
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        fadeLeft: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-1rem, 0, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
      },
      screens: {
        'sm-max': {
          max: '767px',
        },
      },
    },
  },
}

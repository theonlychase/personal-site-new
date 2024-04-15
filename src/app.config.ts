export default defineAppConfig({
  ui: {
    button: {
      color: {
        primary: {
          solid: 'bg-green-500 hover:bg-green-600 text-white',
        },
      },
    },
    footer: {
      wrapper: 'mt-auto',
      top: {
        container: 'max-w-2xl mx-auto !px-4 md:!px-0',
      },
      bottom: {
        wrapper: 'hidden',
      },
    },
    formGroup: {
      error: 'capitalize',
    },
    input: {
      base: 'input-autofill',
      color: {
        white: {
          outline: 'bg-white dark:bg-dark',
        },
      },
    },
    header: {
      container: 'max-w-2xl mx-auto !px-4 md:!px-0',
    },
    icons: {
      dynamic: true,
    },
    main: {
      wrapper: 'min-h-full flex-1',
    },
    page: {
      wrapper: 'max-w-2xl py-8 px-4 md:px-0 mx-auto',
    },
    textarea: {
      base: 'input-autofill',
      color: {
        white: {
          outline: 'bg-white dark:bg-dark',
        },
      },
    },
    variables: {
      dark: {
        background: 'var(--color-dark)',
        foreground: 'var(--color-gray-400)',
      },
      light: {
        background: 'var(--color-gray-50)',
        foreground: 'var(--color-gray-700)',
      },
    },
  },
})
